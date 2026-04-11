# Pinnacle Hifz College - Full Stack Next.js Application

A modern, high-performance web application built for Pinnacle Hifz College. Designed with cutting-edge web technologies, it features an immersive 3D user experience on the frontend and a robust, secure administrative dashboard on the backend. 

## 🚀 Key Features & Special Integrations

### 🎨 Immersive Frontend Experience
- **3D Interactive Elements**: Powered by **Three.js**, **React Three Fiber (R3F)**, and **Drei** to create a stunning, dynamic, and particle-based user interface.
- **Fluid Animations**: Leveraging **GSAP** and **Framer Motion** for smooth page transitions, scroll-triggered animations, and micro-interactions.
- **Modern Styling**: Styled beautifully using the latest **TailwindCSS (v4)** for maximum responsiveness and an aesthetic premium look.

### 🔐 Secure & Smart Authentication (NextAuth)
- **Zero-Config Admin Setup**: Built with a unique **Single-Admin System**. The very first user to sign in through Google OAuth is automatically assigned the `ADMIN` role and locked into the system. Subsequent logins from unauthorized Google accounts are automatically denied.
- **Session Security**: JWT-based session with secure token expiration limits, ensuring the admin area remains locked down and protected.

### 🖼️ Cloudinary Gallery Management
- **Dynamic Media Handling**: Full integration with **Cloudinary API**.
- **Admin Gallery Uploads**: The admin dashboard allows seamless image uploads which are directly processed and saved securely in Cloudinary folders.
- **Optimized Delivery**: Frontend fetching leverages image optimization to serve images fast with automatic formatting.

### 📊 Comprehensive Database (MongoDB)
- Data persistency fully integrated with **MongoDB via Mongoose**.
- Handles dynamic **Site Content Management** (text, programs, about info) entirely configurable via the admin dashboard without making code changes.
- Stores references to Gallery IDs, keeping the database fast and decoupled from heavy media files.

### 📬 Smart Contact Form & Integrations
- **Form Validation**: Strict schema validation using **Zod** and **React Hook Form**.
- **Google Sheets Integration**: Form submissions automatically connect to a custom Google Apps Script Webhook, logging new inquiries directly into a Google Sheet for easy client tracking.
- **Email Notifications**: Form notifications are dispatched efficiently via Node Mailer or Resend.

## 🛠️ Tech Stack

- **Framework**: [Next.js (v16)](https://nextjs.org/) - App Router
- **Language**: [React 19](https://react.dev/) & TypeScript
- **Styling**: [TailwindCSS v4](https://tailwindcss.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) & Mongoose
- **Authentication**: [NextAuth.js](https://next-auth.js.org/) (Google Provider)
- **Media Engine**: [Cloudinary](https://cloudinary.com/)
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/)
- **Animations & 3D**: Three.js, React Three Fiber, GSAP, Framer Motion

## ⚙️ Local Development Setup

### 1. Prerequisites
Before getting started, ensure you have **Node.js** (v20+) installed and have set up an account for MongoDB, Cloudinary, and Google Cloud Console.

### 2. Configure Environment Variables
Create a `.env` file in the root of the project with the following keys. 

```env
# MongoDB Atlas Connection
MONGODB_URI=your_mongodb_cluster_uri

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_super_secret_string # (Generate using: openssl rand -base64 32)
GOOGLE_CLIENT_ID=your_google_oauth_client_id
GOOGLE_CLIENT_SECRET=your_google_oauth_client_secret

# Cloudinary Integration
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Google Sheets Webhook (Optional/If configured via env)
GOOGLE_SHEETS_WEBHOOK_URL=your_google_apps_script_url
```

### 3. Install & Run
```bash
# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the live application.
To access the admin panel, navigate to `/auth/login` or `/admin/login`.

## 🚢 Deployment (Vercel)

1. Connect your GitHub repository to Vercel.
2. In the Vercel Dashboard, import the project.
3. Add all the **Environment Variables** into the project settings BEFORE deploying.
4. Set `NEXTAUTH_URL` explicitly to your live domain (e.g., `https://your-domain.com`).
5. Ensure Google Cloud Console's "**Authorized Redirect URIs**" allows `https://your-domain.com/api/auth/callback/google`.
6. Deploy!

> **Warning:** The first person to successfully log into the admin portal on the live server will become the permanent `ADMIN` due to the database's auto-assignment logic. Ensure the client does this as soon as the site goes live.
