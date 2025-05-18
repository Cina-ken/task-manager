'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';

export default function TaskForm({ task = {} }) {
  const [formData, setFormData] = useState({
    title: task.title || '',
    description: task.description || '',
    dueDate: task.dueDate ? format(new Date(task.dueDate), 'yyyy-MM-dd') : '',
    priority: task.priority || 'Low',
    status: task.status || 'To-Do',
  });
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const method = task.id ? 'PUT' : 'POST';
      const url = task.id ? `/api/tasks/${task.id}` : '/api/tasks';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error('Failed to save task');

      router.push('/dashboard');
      router.refresh();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="mb-4">
        <label htmlFor="title" className="block text-sm font-medium">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="mt-1 p-2 w-full border rounded-md"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="description" className="block text-sm font-medium">Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="mt-1 p-2 w-full border rounded-md"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="dueDate" className="block text-sm font-medium">Due Date</label>
        <input
          type="date"
          id="dueDate"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleChange}
          className="mt-1 p-2 w-full border rounded-md"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="priority" className="block text-sm font-medium">Priority</label>
        <select
          id="priority"
          name="priority"
          value={formData.priority}
          onChange={handleChange}
          className="mt-1 p-2 w-full border rounded-md"
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="status" className="block text-sm font-medium">Status</label>
        <select
          id="status"
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="mt-1 p-2 w-full border rounded-md"
        >
          <option value="To-Do">To-Do</option>
          <option value="Done">Done</option>
        </select>
      </div>
      <button type="submit" className="bg-blue-600 text-white p-2 rounded-md w-full">
        {task.id ? 'Update Task' : 'Add Task'}
      </button>
    </form>
  );
}