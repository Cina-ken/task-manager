# 📝 Task Manager

A full-featured, responsive task management web application built with **Next.js 15**, **Tailwind CSS**, **Prisma**, **PostgreSQL (Neon)**, and **Clerk Authentication**. This app allows users to create, read, update, delete, and filter tasks based on due dates and priorities.

---

## 🚀 Features

- 🔐 User Authentication (via Clerk)
- 🧠 Task CRUD operations
- 📅 Due date & priority management
- 📊 Filter tasks by status, date, and priority
- 💡 Responsive and modern UI with Tailwind CSS
- 🌙 Dark mode support
- 📦 REST API routes with Prisma + PostgreSQL
- ⚙️ Clerk Middleware-protected dashboard routes
- 🛠️ Fully responsive and mobile-friendly

---

## 🛠 Tech Stack

- **Frontend**: Next.js 15 (App Router), Tailwind CSS
- **Backend**: Prisma ORM, PostgreSQL (Neon)
- **Auth**: Clerk.dev
- **Deployment**: Vercel
- **Styling**: Tailwind CSS
- **Utilities**: date-fns, qrcode

---

## 📂 Folder Structure

```bash
├── src/
│   ├── app/
│   │   ├── layout.js
│   │   ├── page.js
│   │   ├── dashboard/
│   │   └── api/
│   ├── components/
│   ├── lib/
│   └── styles/
│       └── globals.css
├── prisma/
│   └── schema.prisma
├── .env.local
├── middleware.js
└── README.md

Getting Started
1. Clone the repository
     git clone https://github.com/yourusername/task-manager.git
     cd task-manager

2. Install dependencies
    npm install

3. Set up environment variables
    Create environmentvariable file in the root directory and add:

    DATABASE_URL=your_postgresql_neon_url
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
    CLERK_SECRET_KEY=your_clerk_secret_key
    NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
    NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

    Ensure your .env* files are ignored in .gitignore for security.

4. Set up Prisma
    npx prisma generate
    npx prisma migrate dev --name init

5. Run the development server
    npm run dev
    Then visit: http://localhost:3000

🚀 Deployment
Deploy your project to Vercel for free.

Push code to GitHub.

Create a new project on Vercel and connect the repo.

Set up the same .env.local variables in Vercel's Project Settings → Environment Variables.

Choose Next.js as the framework.

Deploy!

 Production Setup (Clerk)
To use Clerk in production:

Go to your Clerk Dashboard.

Add your production domain (e.g., https://taskmanager.vercel.app) to Production Instances.

Use your production Clerk keys in Vercel's environment variables.
     