import { JwtService } from "../../helpers/jwt.service";

describe("Jwt.service",
    () => {
        test("should return an object with 'accessToken' and 'refreshToken' properities", () => {
            const data = { id: "123", ip: "12.1.1" }

            const jwtService = new JwtService();
            const results = jwtService.generate(data.id, data.ip);

            expect(results).toHaveProperty("accessToken")
            expect(results).toHaveProperty("refreshToken")
        })
    });