import { NextResponse } from 'next/server';
import { getAuth } from '@clerk/nextjs/server';
import prisma from '@/lib/prisma';
import { z } from 'zod';

// Validation schema for PUT requests
const updateTaskSchema = z.object({
  title: z.string().min(1, 'Title is required').optional(),
  description: z.string().optional(),
  dueDate: z
    .string()
    .optional()
    .transform((val) => (val ? new Date(val).toISOString() : undefined)),
  priority: z.enum(['Low', 'Medium', 'High']).optional(),
  status: z.enum(['To-Do', 'Done']).optional(),
}).refine(
  (data) => !data.dueDate || !isNaN(new Date(data.dueDate).getTime()),
  {
    message: 'Invalid dueDate format. Expected ISO-8601 DateTime or valid date string.',
    path: ['dueDate'],
  }
);

export async function GET(request, { params }) {
  try {
    const { userId } = getAuth(request);
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const id = await params.id;
    const taskId = parseInt(id);
    if (isNaN(taskId)) {
      return NextResponse.json({ error: 'Invalid task ID' }, { status: 400 });
    }

    const task = await prisma.task.findUnique({
      where: { id: taskId, userId },
    });

    if (!task) {
      return NextResponse.json({ error: 'Task not found' }, { status: 404 });
    }

    return NextResponse.json(task);
  } catch (error) {
    console.error('GET /api/tasks/[id] error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const { userId } = getAuth(request);
    console.log('PUT auth:', { userId }); // Debug auth

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Await params before using its properties (App Router dynamic routes)
    const { id } = await params;
    const taskId = parseInt(id);
    console.log('PUT taskId:', { taskId }); // Debug taskId

    if (isNaN(taskId)) {
      return NextResponse.json({ error: 'Invalid task ID' }, { status: 400 });
    }

    const body = await request.json();
    const parsedBody = updateTaskSchema.safeParse(body);

    if (!parsedBody.success) {
      return NextResponse.json({ error: parsedBody.error.errors }, { status: 400 });
    }

    const task = await prisma.task.update({
      where: { id: taskId, userId },
      data: parsedBody.data,
    });

    return NextResponse.json(task);
  } catch (error) {
    console.error('PUT /api/tasks/[id] error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to update task' },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const { userId } = getAuth(request);
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
     
     const { id } = await params;
    const taskId = parseInt(id);
    if (isNaN(taskId)) {
      return NextResponse.json({ error: 'Invalid task ID' }, { status: 400 });
    }

    await prisma.task.delete({
      where: { id: taskId, userId },
    });

    return NextResponse.json({ message: 'Task deleted' });
  } catch (error) {
    console.error('DELETE /api/tasks/[id] error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to delete task' },
      { status: 500 }
    );
  }
}