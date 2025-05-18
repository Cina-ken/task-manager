import { currentUser } from '@clerk/nextjs/server';
import Link from 'next/link';
import TaskForm from '@/components/TaskForm';
import TaskList from '@/components/TaskList';
import prisma from '@/lib/prisma';

export const metadata = {
  title: 'Task Manager Pro - Organize Your Tasks Efficiently',
  description:
    'Task Manager Pro is a powerful online task management app to create, track, and organize tasks with due dates, priorities, and a sleek dashboard.',
  keywords: ['task manager app', 'productivity tool', 'online task manager', 'to-do list app'],
  openGraph: {
    title: 'Task Manager Pro',
    description: 'Organize your life with Task Manager Pro. Manage tasks effortlessly.',
    url: 'https://your-domain.com', // Replace with your deployed URL
    type: 'website',
    images: [
      {
        url: 'https://your-domain.com/og-image.jpg', // Replace with your OG image URL
        width: 1200,
        height: 630,
        alt: 'Task Manager Pro Dashboard',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Task Manager Pro',
    description: 'Manage tasks with ease using Task Manager Pro.',
    images: ['https://your-domain.com/og-image.jpg'], // Replace with your Twitter image
  },
};

export default async function Home() {
  const user = await currentUser();
  let tasks = [];

  if (user) {
    tasks = await prisma.task.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' },
    });
  }

  // Structured Data (JSON-LD)
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Task Manager Pro',
    description:
      'Task Manager Pro is an online tool for managing tasks with features like due dates, priorities, and a dashboard.',
    applicationCategory: 'Productivity',
    operatingSystem: 'Web',
    url: 'https://your-domain.com', // Replace with your deployed URL
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  };

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="min-h-screen bg-gray-50">
        {user ? (
          <div className="container mx-auto py-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
              Welcome, {user.firstName || 'User'}!
            </h1>
            <div className="max-w-2xl mx-auto">
              <TaskForm />
              <div className="mt-8">
                <TaskList tasks={tasks} />
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-100 to-gray-50 text-center px-4">
            <h1 className="text-5xl font-extrabold text-gray-900 mb-4 md:text-6xl">
              Task Manager Pro
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl md:text-2xl">
              Organize your life with ease. Create, manage, and track tasks in one place.
            </p>
            <Link
              href="/sign-in"
              className="inline-block bg-blue-600 text-white font-semibold px-8 py-3 rounded-lg shadow-lg hover:bg-blue-700 transition duration-300 hover:scale-105"
              aria-label="Sign in to Task Manager Pro"
            >
              Sign In
            </Link>
            <p className="mt-4 text-gray-500">
              New here?{' '}
              <Link href="/sign-up" className="text-blue-600 hover:underline" aria-label="Sign up for Task Manager Pro">
                Sign Up
              </Link>
            </p>
            {/* Features Section */}
            <div className="py-12 bg-white w-full mt-12">
              <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-8">Why Task Manager Pro?</h2>
                <div className="grid gap-8 md:grid-cols-3">
                  <div className="text-center">
                    <h3 className="text-xl font-semibold mb-2">Easy Task Management</h3>
                    <p className="text-gray-600">Create, edit, and delete tasks with a simple interface.</p>
                  </div>
                  <div className="text-center">
                    <h3 className="text-xl font-semibold mb-2">Stay Organized</h3>
                    <p className="text-gray-600">Set due dates and priorities to keep your tasks on track.</p>
                  </div>
                  <div className="text-center">
                    <h3 className="text-xl font-semibold mb-2">Powerful Dashboard</h3>
                    <p className="text-gray-600">View all your tasks and stats in one place.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}