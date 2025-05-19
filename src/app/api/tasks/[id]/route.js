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
  const { id } = params;
  const { userId } = getAuth(request);
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const task = await prisma.task.findUnique({
      where: { id: parseInt(id) },
    });
    if (!task || task.userId !== userId) return NextResponse.json({ error: 'Task not found' }, { status: 404 });
    return NextResponse.json(task);
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  const { id } = params;
  const { userId } = getAuth(request);
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await request.json();
    const parsedBody = updateTaskSchema.safeParse(body);
    if (!parsedBody.success) {
      return NextResponse.json({ error: parsedBody.error.errors }, { status: 400 });
    }
    // Fetch task first to check ownership
    const task = await prisma.task.findUnique({ where: { id: parseInt(id) } });
    if (!task || task.userId !== userId) return NextResponse.json({ error: 'Task not found' }, { status: 404 });
    const updatedTask = await prisma.task.update({
      where: { id: parseInt(id) },
      data: parsedBody.data,
    });
    return NextResponse.json(updatedTask);
  } catch (error) {
    return NextResponse.json({ error: 'Invalid input or task not found' }, { status: 400 });
  }
}

export async function DELETE(request, { params }) {
  const { id } = params;
  const { userId } = getAuth(request);
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const task = await prisma.task.findUnique({ where: { id: parseInt(id) } });
    if (!task || task.userId !== userId) return NextResponse.json({ error: 'Task not found' }, { status: 404 });
    await prisma.task.delete({ where: { id: parseInt(id) } });
    return NextResponse.json({}, { status: 204 });
  } catch (error) {
    return NextResponse.json({ error: 'Task not found' }, { status: 404 });
  }
}