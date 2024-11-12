import { JwtService } from "src/helpers/jwt.service";

describe("jwt.service", () => {
    test("should return valid tokens", () => {
        const access_token = new JwtService().createAccessToken("1");
        const refresh_token = new JwtService().createRefreshToken("12");

        expect(typeof access_token).toBe("string");
        expect(typeof refresh_token).toBe("string");
    })
})