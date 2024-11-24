import { PrismaService } from "src/prisma/prisma.service"

describe("auth/signupLocal", () => {

    afterAll(async () => {
        const prisma: PrismaService = new PrismaService();
        await prisma.user.deleteMany()
    })

    it("should create a user", async () => {
        const response = await fetch("http://localhost:9000/auth/local/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                first_name: "Jhon",
                last_name: "doe",
                email: "example@gmail.com",
                password: "jhondoe123"
            })
        });

        const data = await response.json();

        expect(response.status).toBe(201);
        expect(typeof data).toBe("string");
    })
})