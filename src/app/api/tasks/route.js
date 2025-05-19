import { NextResponse } from 'next/server';
import { getAuth } from '@clerk/nextjs/server';
import prisma from '@/lib/prisma';
import { z } from 'zod';

// Validation schema for POST requests
const createTaskSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  dueDate: z
    .string()
    .optional()
    .transform((val) => (val ? new Date(val).toISOString() : undefined)),
  priority: z.enum(['Low', 'Medium', 'High']).optional().default('Low'),
  status: z.enum(['To-Do', 'Done']).optional().default('To-Do'),
}).refine(
  (data) => !data.dueDate || !isNaN(new Date(data.dueDate).getTime()),
  {
    message: 'Invalid dueDate format. Expected ISO-8601 DateTime or valid date string.',
    path: ['dueDate'],
  }
);

export async function POST(request) {
  try {
    const { userId } = getAuth(request);
    console.log('POST auth:', { userId }); // Debug auth

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const parsedBody = createTaskSchema.safeParse(body);

    if (!parsedBody.success) {
      return NextResponse.json({ error: parsedBody.error.errors }, { status: 400 });
    }

    const task = await prisma.task.create({
      data: {
        ...parsedBody.data,
        userId,
      },
    });

    return NextResponse.json(task, { status: 201 });
  } catch (error) {
    console.error('POST /api/tasks error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create task' },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    const { userId } = getAuth(request);
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const tasks = await prisma.task.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(tasks);
  } catch (error) {
    console.error('GET /api/tasks error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch tasks' },
      { status: 500 }
    );
  }
}