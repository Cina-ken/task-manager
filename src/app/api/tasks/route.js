import prisma from '@/lib/prisma';
import { taskSchema } from '@/lib/validation';
import { getAuth } from '@clerk/nextjs/server';

export async function GET(request) {
  const { userId } = getAuth(request);
  if (!userId) return new Response('Unauthorized', { status: 401 });

  try {
    const tasks = await prisma.task.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
    return Response.json(tasks);
  } catch (error) {
    return new Response('Internal Server Error', { status: 500 });
  }
}

export async function POST(request) {
  const { userId } = getAuth(request);
  if (!userId) return new Response('Unauthorized', { status: 401 });

  try {
    const body = await request.json();
    const validatedData = taskSchema.parse(body);
    const task = await prisma.task.create({
      data: {
        ...validatedData,
        dueDate: validatedData.dueDate ? new Date(validatedData.dueDate) : null,
        userId,
      },
    });
    return Response.json(task);
  } catch (error) {
    return new Response('Failed to save task', { status: 400 });
  }
}
