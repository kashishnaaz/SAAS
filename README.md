<div align="center">

# 🎬 VidStream

### Explore, Upload & Download Videos Seamlessly

[![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Clerk Auth](https://img.shields.io/badge/Auth-Clerk-6C47FF?logo=clerk&logoColor=white)](https://clerk.com/)
[![TailwindCSS](https://img.shields.io/badge/Styled_with-TailwindCSS-38BDF8?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

**A powerful cloud-based platform to upload, explore, and download videos**  
Built with Next.js 14, TypeScript, and Clerk Authentication

• [Features](#-features) • [Installation](#️-installation--setup) • [Tech Stack](#-tech-stack)

<p align="center">
  <a href="https://cloudinary-saas-app-chi.vercel.app/">
    <img src="https://img.shields.io/badge/Live%20App-Open%20Now-green?style=for-the-badge&logo=streamlit" alt="Streamlit App"/>
  </a>
</p>

---

## ✨ Features

<table>
<tr>
<td width="50%">

### 🎥 **Core Functionality**
- 📤 **Video Uploads** — Upload videos up to 70MB with title & description
- 🎬 **Video Explorer** — Browse videos in a modern responsive grid
- ⬇️ **One-Click Download** — Instant video downloads
- 🔐 **Secure Authentication** — Powered by Clerk

</td>
<td width="50%">

### 🎨 **User Experience**
- 🌈 **Modern Design** — Beautiful UI with TailwindCSS
- ✨ **Smooth Animations** — Framer Motion transitions
- 📱 **Fully Responsive** — Perfect on all devices
- ⚡ **Fast Performance** — Optimized with Next.js 14

</td>
</tr>
</table>

---

## 🧠 Tech Stack

<div align="center">

| Technology | Purpose | Version |
|:-----------|:--------|:--------|
| <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nextjs/nextjs-original.svg" width="20"/> **Next.js** | Framework for frontend & API routes | 14 (App Router) |
| <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg" width="20"/> **TypeScript** | Type-safe development | 5.0 |
| 🔐 **Clerk** | User authentication & management | Latest |
| ☁️ **Cloudinary** | Video storage & delivery | Latest |
| 🎭 **Framer Motion** | Animations & transitions | Latest |
| 🎨 **Tailwind CSS** | Modern styling framework | 3.x |
| 📡 **Axios** | API request handling | Latest |
| 🎯 **Lucide Icons** | Clean minimal icon set | Latest |

</div>

---

## 🛠️ Installation & Setup

### Prerequisites

- Node.js 18+ and npm/yarn installed
- Clerk account ([Get one here](https://clerk.com))
- Cloudinary account ([Sign up](https://cloudinary.com))

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/vidstream.git
cd vidstream
```

### 2️⃣ Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3️⃣ Environment Variables

Create a `.env.local` file in the root directory:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# Cloudinary Configuration
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

<details>
<summary>🔍 How to get these credentials?</summary>

**Clerk:**
1. Go to [Clerk Dashboard](https://dashboard.clerk.com)
2. Create a new application
3. Copy the API keys from the settings

**Cloudinary:**
1. Go to [Cloudinary Console](https://cloudinary.com/console)
2. Navigate to Dashboard
3. Copy your Cloud Name, API Key, and API Secret

</details>

### 4️⃣ Run Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

### 5️⃣ Open in Browser

Navigate to [http://localhost:3000](http://localhost:3000)

---

## 📂 Project Structure

```
vidstream/
├── 📁 app/
│   ├── 📁 home/              # Video Explorer Page
│   ├── 📁 video-upload/      # Upload Page
│   ├── layout.tsx            # App Layout with Clerk
│   └── page.tsx              # Landing Page
├── 📁 components/
│   ├── VideoCard.tsx         # Video Card Component
│   └── Sidebar.tsx           # Sidebar Navigation
├── 📁 pages/api/
│   ├── videos.ts             # Fetch All Videos API
│   └── video-upload.ts       # Video Upload Handler
├── 📁 public/
│   └── 📁 assets/            # Static Files
├── 📁 styles/
│   └── globals.css           # Global Styles
├── .env.local                # Environment Variables
├── package.json              # Dependencies
└── README.md                 # Documentation
```

---

## 🎯 Usage

### Uploading Videos

1. Navigate to the **Upload** page
2. Fill in the video title and description
3. Select your video file (max 70MB)
4. Click **Upload** and wait for processing
5. Video will appear in the explorer once complete

### Exploring Videos

1. Go to the **Home** page
2. Browse through the video grid
3. Click on any video card to view details
4. Use the download button to save videos locally

---

## 🚀 Deployment

### Deploy to Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/vidstream)

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy!

### Other Platforms

- **Netlify**: Follow [this guide](https://docs.netlify.com/integrations/frameworks/next-js/)
- **Railway**: Use their [Next.js template](https://railway.app/template/nextjs)
- **Self-hosted**: Build with `npm run build` and start with `npm start`

---

## 💡 Roadmap & Future Enhancements

- [ ] 🧠 AI-based video tagging and categorization
- [ ] 💬 Comment & like system for videos
- [ ] 🔍 Advanced search and filtering
- [ ] 📊 Video analytics dashboard
- [ ] 👥 User profiles and playlists
- [ ] 🎬 Video editing tools
- [ ] 📱 Mobile app (React Native)
- [ ] 🌐 Multi-language support

---

## 🤝 Contributing

Contributions are what make the open-source community amazing! Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

## 🧑‍💻 Author

<div align="center">

**Developed with ❤️ by [GUFRAN KHAN]**
</div>

---

## 📸 Screenshots

<div align="center">

### 🏠 Landing Page
![Landing Page](/public/s1.png)


### 🎥 Video Explorer
![Video Explorer](/public/s2.png)


### 📤 Upload Interface
![Upload Interface](/public/s3.png)

</div>

---

## 🙏 Acknowledgments

- [Next.js Documentation](https://nextjs.org/docs)
- [Clerk Authentication](https://clerk.com/docs)
- [Cloudinary](https://cloudinary.com/documentation)
- [TailwindCSS](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)

---

<div align="center">

**⭐ Star this repo if you found it helpful!**

Made with ☕ and 💻

[Report Bug](https://github.com/your-username/vidstream/issues) • [Request Feature](https://github.com/your-username/vidstream/issues)

</div>
