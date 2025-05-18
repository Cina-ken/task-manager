import prisma from '@/lib/prisma';
import { taskSchema } from '@/lib/validation';
import { getAuth } from '@clerk/nextjs/server';

export async function GET(request, { params }) {
  const { id } = await params;
  const { userId } = getAuth(request);
  if (!userId) return new Response('Unauthorized', { status: 401 });

  try {
    const task = await prisma.task.findUnique({
      where: { id: parseInt(id), userId },
    });
    if (!task) return new Response('Task not found', { status: 404 });
    return Response.json(task);
  } catch (error) {
    return new Response('Internal Server Error', { status: 500 });
  }
}

export async function PUT(request, { params }) {
  const { id } = await params;
  const { userId } = getAuth(request);
  if (!userId) return new Response('Unauthorized', { status: 401 });

  try {
    const body = await request.json();
    const validatedData = taskSchema.parse(body);
    const task = await prisma.task.update({
      where: { id: parseInt(id), userId },
      data: {
        ...validatedData,
        dueDate: validatedData.dueDate ? new Date(validatedData.dueDate) : null,
      },
    });
    return Response.json(task);
  } catch (error) {
    return new Response('Invalid input or task not found', { status: 400 });
  }
}

export async function DELETE(request, { params }) {
  const { id } = await params;
  const { userId } = getAuth(request);
  if (!userId) return new Response('Unauthorized', { status: 401 });

  try {
    await prisma.task.delete({
      where: { id: parseInt(id), userId },
    });
    return new Response(null, { status: 204 });
  } catch (error) {
    return new Response('Task not found', { status: 404 });
  }
}