import { NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"


const prisma = new PrismaClient()

export async function GET(request: NextRequest){
    let retries = 3;
    while(retries > 0) {
        try {
            const videos = await prisma.video.findMany({
                orderBy: {createdAt: "desc"}
            })
            return NextResponse.json(videos)
        } catch (error) {
            retries--;
            if(retries === 0) {
                console.error("Videos fetch error:", error)
                return NextResponse.json({error: "Error fetching videos"}, {status: 500})
            }
            await new Promise(resolve => setTimeout(resolve, 2000))
        } finally {
            await prisma.$disconnect()
        }
    }
}