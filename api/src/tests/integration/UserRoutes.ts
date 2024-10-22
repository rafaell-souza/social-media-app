import { JwtService } from "../../helpers/jwt.service";
import { PrismaClient } from "@prisma/client";

describe("route: api/register", () => {
    let accessToken: string;

    afterAll(async () => {
        const prisma = new PrismaClient();
        const jwtService = new JwtService();

        const { id } = jwtService.decode(accessToken);
        await prisma.user.delete({ where: { id } });
    })

    // /api/register
    test("should return the new user's access token", async () => {
        const response = await fetch("http://localhost:9000/api/register",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: "rafael souza",
                    email: "developer@gmail.com",
                    password: "newpass123",
                    confirmPassword: "newpass123"
                })
            }
        );

        const data = await response.json();
        accessToken = data.accessToken;

        expect(data).toHaveProperty("accessToken");
        expect(response.status).toBe(201)
    })
})