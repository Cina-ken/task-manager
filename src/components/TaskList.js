'use client';

import { useState } from 'react';
import TaskCard from './TaskCard';

export default function TaskList({ tasks }) {
  const [filter, setFilter] = useState('All');

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'All') return true;
    return task.status === filter;
  });

  return (
    <div>
      <div className="mb-4 flex space-x-2">
        <button
          onClick={() => setFilter('All')}
          className={`p-2 rounded-md ${filter === 'All' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        >
          All
        </button>
        <button
          onClick={() => setFilter('To-Do')}
          className={`p-2 rounded-md ${filter === 'To-Do' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        >
          To-Do
        </button>
        <button
          onClick={() => setFilter('Done')}
          className={`p-2 rounded-md ${filter === 'Done' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        >
          Done
        </button>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredTasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}