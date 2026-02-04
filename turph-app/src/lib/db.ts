import { PrismaClient } from '@prisma/client'
import { PrismaPlanetScale } from '@prisma/adapter-planetscale'
import { Client } from '@planetscale/database'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Create PlanetScale client
const client = new Client({ url: process.env.DATABASE_URL })

// Create adapter
const adapter = new PrismaPlanetScale(client)

// Prisma 7 with PlanetScale adapter
export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
