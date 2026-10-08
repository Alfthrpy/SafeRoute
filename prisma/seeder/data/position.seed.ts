import { PrismaClient } from '@prisma/client';

export const seedPositions = async (prisma: PrismaClient) => {
  console.log('📋 Seeding positions...');
  const adminPosition = await prisma.position.create({
    data: {
      name: 'Administrator',
      description: 'Full system access with all permissions',
    },
  });

  const memberPosition = await prisma.position.create({
    data: {
      name: 'Member',
      description: 'Standard user with limited permissions',
    },
  });

  const commonPosition = await prisma.position.create({
    data:{
      name: 'Common',
      description: 'Common user with basic permissions',
    }
  })

  console.log('✅ Positions seeded');
  return { adminPosition, memberPosition, commonPosition };
};
