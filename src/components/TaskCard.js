'use client';

import { useRouter } from 'next/navigation';
import { format } from 'date-fns';

export default function TaskCard({ task }) {
  const router = useRouter();

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this task?')) {
      try {
        const res = await fetch(`/api/tasks/${task.id}`, { method: 'DELETE' });
        if (!res.ok) throw new Error('Failed to delete task');
        router.refresh();
      } catch (err) {
        alert(err.message);
      }
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold">{task.title}</h3>
      <p className="text-gray-600">{task.description}</p>
      <p className="text-sm">Due: {task.dueDate ? format(new Date(task.dueDate), 'PPP') : 'N/A'}</p>
      <p className="text-sm">Priority: {task.priority}</p>
      <p className="text-sm">Status: {task.status}</p>
      <div className="mt-4 space-x-2">
        <button
          onClick={() => router.push(`/dashboard/edit/${task.id}`)}
          className="bg-yellow-500 text-white p-2 rounded-md"
        >
          Edit
        </button>
        <button onClick={handleDelete} className="bg-red-500 text-white p-2 rounded-md">
          Delete
        </button>
      </div>
    </div>
  );
}