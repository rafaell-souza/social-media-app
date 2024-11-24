import { PrismaService } from "src/prisma/prisma.service"
import { HashService } from "src/helpers/hash.service";

describe("auth/signinLocal", () => {
    let prisma: PrismaService;

    beforeAll(async () => {
        prisma = new PrismaService();
        const hash = new HashService();

        await prisma.user.create({
            data: {
                id: "123",
                first_name: "Marian",
                last_name: "Naschmon",
                email: "example@gmail.com",
                verified: true,
                type: "system_account",
                password: await hash.hashData("password123"),
                token: {
                    create: {
                        hashedRt: "123"
                    }
                }
            }
        })
    })

    afterAll(async () => {
        await prisma.user.deleteMany()
    })

    it("should login a user", async () => {
        const response = await fetch("http://localhost:9000/auth/local/signin", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: "example@gmail.com",
                password: "password123"
            })
        });

        const result = await response.json();

        expect(response.status).toBe(200);
        expect(result).toHaveProperty("access_token");
        expect(result).toHaveProperty("refresh_token")
    })
})