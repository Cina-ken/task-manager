'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function TaskForm({ task }) {
  const [title, setTitle] = useState(task?.title || '');
  const [description, setDescription] = useState(task?.description || '');
  const [dueDate, setDueDate] = useState(
    task?.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : ''
  );
  const [priority, setPriority] = useState(task?.priority || 'Low');
  const [status, setStatus] = useState(task?.status || 'To-Do');
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const taskData = {
      title,
      description,
      dueDate: dueDate || undefined,
      priority,
      status,
    };

    try {
      const url = task ? `/api/tasks/${task.id}` : '/api/tasks';
      const method = task ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(taskData),
      });

      let responseData;
      try {
        responseData = await res.json();
      } catch {
        responseData = { error: res.statusText || 'Invalid server response' };
      }

      console.log('API response:', { status: res.status, data: responseData }); // Debug API response

      if (!res.ok) {
        const errorMessage =
          typeof responseData.error === 'string'
            ? responseData.error
            : JSON.stringify(responseData.error) || `Failed to ${task ? 'update' : 'create'} task`;
        throw new Error(errorMessage);
      }

      router.push('/dashboard');
      router.refresh();
    } catch (err) {
      console.error('TaskForm error:', err);
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">{task ? 'Edit Task' : 'Add Task'}</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="mb-4">
        <label className="block text-gray-700">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Due Date</label>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Priority</label>
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Status</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="To-Do">To-Do</option>
          <option value="Done">Done</option>
        </select>
      </div>
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {task ? 'Update Task' : 'Add Task'}
      </button>
    </form>
  );
}