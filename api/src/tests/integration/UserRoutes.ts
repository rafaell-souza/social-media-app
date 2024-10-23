import { JwtService } from "../../helpers/jwt.service";
import { PrismaClient } from "@prisma/client";

describe("route: api/register", () => {
    let access_token: string;

    afterAll(async () => {
        const prisma = new PrismaClient();
        const jwtService = new JwtService();

        const { sub } = jwtService.decode(access_token);
        await prisma.user.delete({ where: { id: sub } });
    })

    // /auth/register
    test("should create user and return access token", async () => {
        const response = await fetch("http://localhost:9000/auth/register",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: "rafael souza",
                    email: "developer@gmail.com",
                    password: "newpass123",
                })
            }
        );

        const data = await response.json();

        expect(data).toHaveProperty("access_token");
        expect(response.status).toBe(201)
    })

    //auth/login
    test("should login user and return access token", async () => {
        const response = await fetch("http://localhost:9000/auth/login",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: "developer@gmail.com",
                    password: "newpass123"
                })
            }
        );

        const data = await response.json();
        access_token = data.access_token;

        expect(data).toHaveProperty("access_token");
        expect(response.status).toBe(200)
    })

    //auth/logout
    test("should logout user and return status 200", async () => {
        const response = await fetch("http://localhost:9000/auth/logout",
            {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    "Authorization": `Bearer ${access_token}`
                }
            }
        );

        expect(response.status).toBe(200)
    })
})