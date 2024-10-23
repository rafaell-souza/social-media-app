import { Injectable } from "@nestjs/common";
import * as jwt from "jsonwebtoken";
import "dotenv/config";
import { format } from "date-fns";
import { ITokenData } from "src/interfaces/ITokenData";

@Injectable()
export class JwtService {
    generate(
        id: string,
        email: string,
        verified: boolean
    ) {

        const { JWT_ACCESS_TOKEN_SECRET } = process.env;
        const { JWT_REFRESH_TOKEN_SECRET } = process.env;

        const access_token = jwt.sign({
            sub: id,
            createdAt: format(new Date(), "Pp"),
            email: email,
            verified: verified
        }, JWT_ACCESS_TOKEN_SECRET, {
            expiresIn: "10m",
        })

        const refresh_token = jwt.sign({
            sub: id,
        }, JWT_REFRESH_TOKEN_SECRET, {
            expiresIn: "30d"
        })

        return { access_token, refresh_token };
    }

    decode(token: string) {
        const decoded = jwt.decode(token) as ITokenData;
        return {
            sub: decoded.sub,
            email: decoded.email,
            verified: decoded.verified,
            createdAt: decoded.createdAt
        } = decoded;
    }
}