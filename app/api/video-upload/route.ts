import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import { auth } from '@clerk/nextjs/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;

    if (!file) {
      return NextResponse.json({ error: "File not found" }, { status: 400 });
    }

    const clean = (v: any) => v?.toString().replace(/\0/g, "") || "";

    const buffer = Buffer.from(await file.arrayBuffer());

    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          resource_type: "video",
          folder: "video-uploads",
          transformation: [{ quality: "auto", fetch_format: "mp4" }],
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      ).end(buffer);
    });

    const video = await prisma.video.create({
      data: {
        title: clean(title),
        description: clean(description),
        publicId: (result as any).public_id,
        originalSize: String(file.size),
        compressedSize: clean(String((result as any).bytes)),
        duration: Number((result as any).duration || 0),
      },
    });

    return NextResponse.json(video);

  } catch (error) {
    console.log("Upload video failed:", error);
    return NextResponse.json({ error: "Upload video failed" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
