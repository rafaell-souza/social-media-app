import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

describe("route: api/register", () => {
    afterAll(async () => {
        await prisma.user.deleteMany();
    });

    it("should sign up a new user successfully", async () => {
        const response = await fetch("http://localhost:9000/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: "John Doe",
                email: "jhondoeemail@gmail.com",
                password: "password12"
            })
        })
        const data = await response.json();

        expect(response.status).toBe(201);
        expect(data).toHaveProperty("access_token");
    })
})