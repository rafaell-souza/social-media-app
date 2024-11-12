import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

(async () => {
    const interactions = ["like", "love", "hate", "haha", "wow", "angry", "laugh"];
    for (let item of interactions) {
        await prisma.interaction.create({
            data: {
                name: item
            }
        })
    }
})();
