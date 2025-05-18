import prisma from '@/lib/prisma';
import TaskForm from '@/components/TaskForm';
import { currentUser } from '@clerk/nextjs/server';

export default async function EditTask({ params }) {
  const user = await currentUser();
  if (!user) return <p>Please sign in.</p>;

  const task = await prisma.task.findUnique({
    where: { id: parseInt(params.id), userId: user.id },
  });

  if (!task) return <p>Task not found.</p>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Edit Task</h1>
      <TaskForm task={task} />
    </div>
  );
}