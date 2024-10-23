import { JwtService } from "../../helpers/jwt.service";

describe("Jwt.service",
    () => {
        test("should return an object with 'access&refresh_token' properities", () => {
            const jwtService = new JwtService();
            const results = jwtService.generate( "123", 'some@gmail.com', true );

            expect(results).toHaveProperty("access_token")
            expect(results).toHaveProperty("refresh_token")
        })
    });