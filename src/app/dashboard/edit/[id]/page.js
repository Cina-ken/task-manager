import { auth } from '@clerk/nextjs/server';
import prisma from '@/lib/prisma';
import TaskForm from '@/components/TaskForm';
import { notFound, redirect } from 'next/navigation';

export default async function EditTask({ params }) {
  // Use currentUser() instead of auth() for server components
  const { userId } = await auth();
  if (!userId) {
    redirect('/sign-in');
  }

  // Use params directly in page components (do NOT await)
  const { id } = params;
  const taskId = Number(id);
  if (!Number.isFinite(taskId) || !Number.isInteger(taskId) || taskId <= 0) {
    return notFound();
  }

  // Only use id for unique lookup, then check userId for ownership
  const task = await prisma.task.findUnique({
    where: { id: taskId },
  });

  if (!task || task.userId !== userId) {
    return notFound();
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Edit Task</h1>
      <TaskForm task={task} />
    </div>
  );
}