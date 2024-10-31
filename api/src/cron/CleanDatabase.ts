import { PrismaClient } from "@prisma/client";

const cleanDatabase = async () => {
    const prisma = new PrismaClient()
    await prisma.user.deleteMany()
}

cleanDatabase();