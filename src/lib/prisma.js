import { PrismaClient } from '@prisma/client';

let prisma;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  if (!globalThis.prisma) {
    globalThis.prisma = new PrismaClient({
      log: ['query', 'info', 'warn', 'error'], // Enable logging for debugging
    });
  }
  prisma = globalThis.prisma;
}

// Optional: Verify connection on initialization
prisma.$connect()
  .then(() => console.log('Prisma connected to database'))
  .catch((error) => console.error('Prisma connection error:', error));

export default prisma;