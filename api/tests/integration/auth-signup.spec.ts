import { PrismaService } from "src/prisma/prisma.service"

describe("auth/signupLocal", () => {
    let prisma: PrismaService;

    beforeAll(() => { prisma = new PrismaService(); });
    afterAll(async () => { await prisma.user.deleteMany() })

    it("should create a user", async () => {
        const response = await fetch("http://localhost:9000/auth/signup", {
            method: "POST",
            body: JSON.stringify({
                first_name: "Jhon",
                last_name: "doe",
                email: "jhondoe@gmail.com",
                password: "jhondoe123"
            })
        });

        const data = await response.json();
        
        expect(response.status).toBe(201);
        expect(typeof data).toBe("string");
    })
})