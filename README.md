# 🎬 Cloudinary Showcase

Upload. Compress. Download. Create — all in one modern cloud-powered platform.

🚀 **Live App:**
👉 saasapp-sigma.vercel.app

---

## 📌 Overview

A full-stack SaaS application built with **Next.js 14** that allows users to:

* Upload and compress videos
* Browse a personal video gallery
* Generate platform-ready social media images

🔐 Secured with Clerk Authentication
🗄️ Backed by PostgreSQL (NeonDB)

---

## ✨ Features

### 🎥 Video Management

* 📤 **Upload Videos** — Upload videos up to 70MB with title & description
* 🗜️ **Auto Compression** — Cloudinary-powered compression on upload
* 🎬 **Video Gallery** — Browse uploads in a clean, responsive grid
* ⬇️ **One-Click Download** — Download any video instantly

---

### 🖼️ Social Media Image Generator

* Generate images optimized for:

  * Instagram
  * Twitter
  * Facebook
* Powered by Cloudinary transformation API

---

### 🔐 Authentication & Data

* Secure login/signup with Clerk
* Persistent storage using Prisma ORM + NeonDB

---

### 🎨 UI & Experience

* Smooth animations using Framer Motion
* Fully responsive design
* Clean modern UI with Tailwind CSS

---

## 🛠️ Tech Stack

| Technology       | Purpose                    |
| ---------------- | -------------------------- |
| ⚡ Next.js 14     | App Router framework       |
| 🟦 TypeScript    | Type-safe development      |
| 🔐 Clerk         | Authentication             |
| ☁️ Cloudinary    | Media storage & processing |
| 🗄️ Prisma       | ORM                        |
| 🐘 NeonDB        | PostgreSQL database        |
| 🎭 Framer Motion | Animations                 |
| 🎨 Tailwind CSS  | Styling                    |

---

## 🚀 Getting Started

### Prerequisites

* Node.js 18+
* Clerk account
* Cloudinary account
* Neon database

---

### 1️⃣ Clone Repository

```bash
git clone https://github.com/kashishnaaz/cloudinary-showcase.git
cd cloudinary-showcase
```

---

### 2️⃣ Install Dependencies

```bash
npm install
```

---

### 3️⃣ Setup Environment Variables

Create `.env.local` file:

```env
# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_key
CLERK_SECRET_KEY=your_secret

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_name
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret

# Database
DATABASE_URL=your_database_url
```

---

### 4️⃣ Push Database Schema

```bash
npx prisma db push
```

---

### 5️⃣ Run App

```bash
npm run dev
```

👉 Open: http://localhost:3000

---

## 📂 Project Structure

```
cloudinary-showcase/
├── app/
│   ├── home/
│   ├── video-upload/
│   ├── social-share/
│   ├── layout.tsx
│   └── page.tsx
├── components/
├── prisma/
├── .env.local
└── README.md
```

---

## ☁️ Deployment (Vercel)

1. Push code to GitHub
2. Import repo in Vercel
3. Add environment variables
4. Deploy 🚀

---

## 🛣️ Roadmap

* 🔍 Search & filter videos
* 📊 Analytics dashboard
* 👥 Public/private toggle
* 🤖 AI tagging
* 📱 Mobile app

---

## 🤝 Contributing

1. Fork the repo
2. Create branch
3. Commit changes
4. Open Pull Request

---

## 📄 License

MIT License

---

## 🧑‍💻 Author

Built by **Kashish Naaz**

---

⭐ If you like this project, give it a star!
