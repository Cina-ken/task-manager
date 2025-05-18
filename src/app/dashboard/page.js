import { currentUser } from '@clerk/nextjs/server';
import prisma from '@/lib/prisma';
import TaskForm from '@/components/TaskForm';
import TaskList from '@/components/TaskList';

export default async function Dashboard() {
  const user = await currentUser();
  if (!user) return <p>Please sign in.</p>;

  const tasks = await prisma.task.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: 'desc' },
  });

  const totalTasks = tasks.length;
  const todoTasks = tasks.filter((task) => task.status === 'To-Do').length;
  const doneTasks = tasks.filter((task) => task.status === 'Done').length;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-3 mb-6">
        <div className="bg-blue-100 p-4 rounded-lg">
          <h2 className="text-lg font-semibold">Total Tasks</h2>
          <p className="text-2xl">{totalTasks}</p>
        </div>
        <div className="bg-yellow-100 p-4 rounded-lg">
          <h2 className="text-lg font-semibold">To-Do</h2>
          <p className="text-2xl">{todoTasks}</p>
        </div>
        <div className="bg-green-100 p-4 rounded-lg">
          <h2 className="text-lg font-semibold">Done</h2>
          <p className="text-2xl">{doneTasks}</p>
        </div>
      </div>
      <TaskForm />
      <TaskList tasks={tasks} />
    </div>
  );
}