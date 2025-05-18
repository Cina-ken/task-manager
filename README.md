# Task Manager

A modern, full-stack Task Management app built with Next.js 15, Prisma, PostgreSQL, Tailwind CSS, and Clerk.

## Features
- User authentication with Clerk
- Task creation, update, and delete
- Priority levels, due dates, and filters
- Secure API routes with protected middleware
- Responsive UI with dark mode

## Tech Stack
- Next.js 15 App Router
- Tailwind CSS
- Prisma + PostgreSQL (Neon)
- Clerk for authentication

## Getting Started

1. **Clone the repository**
   ```sh
   git clone https://github.com/yourusername/task-manager.git
   cd task-manager
   ```

2. **Install dependencies**
   ```sh
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory and add:
   ```env
   DATABASE_URL=your_postgresql_neon_url
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
   ```
   Ensure your `.env*` files are ignored in `.gitignore` for security.

4. **Set up Prisma**
   ```sh
   npx prisma generate
   npx prisma migrate dev --name init
   ```

5. **Run the development server**
   ```sh
   npm run dev
   ```
   Then visit: [http://localhost:3000](http://localhost:3000)

## 🚀 Deployment
Deploy your project to Vercel for free.

- Push code to GitHub.
- Create a new project on Vercel and connect the repo.
- Set up the same `.env.local` variables in Vercel's Project Settings → Environment Variables.
- Choose Next.js as the framework.
- Deploy!

### Production Setup (Clerk)
To use Clerk in production:

1. Go to your Clerk Dashboard.
2. Add your production domain (e.g., `https://taskmanager.vercel.app`) to Production Instances.
3. Use your production Clerk keys in Vercel's environment variables.

---

Feel free to open issues or contribute!


