import { Injectable } from "@nestjs/common";
import * as jwt from "jsonwebtoken";
import "dotenv/config";
import { format } from "date-fns";

@Injectable()
export class JwtService {
    refresh_token_secret: string | undefined;
    access_token_secret: string | undefined;

    constructor() {
        this.access_token_secret = process.env.JWT_ACCESS_TOKEN_SECRET;
        this.refresh_token_secret = process.env.JWT_REFRESH_TOKEN_SECRET;

        if (!this.access_token_secret || !this.refresh_token_secret) {
            console.error("Environment variables not defined");
            return;
        }
    }

    createAccessToken(
        id: string,
    ): string {
        return jwt.sign({
            id: id,
            createdAt: format(new Date(), "Pp"),
        }, this.access_token_secret, {
            expiresIn: "15m"
        })
    }

    createRefreshToken(id: string): string {
        return jwt.sign({
            id: id,
        }, this.refresh_token_secret, {
            expiresIn: "30d"
        })
    }

    decode(token: string) {
        const decode = jwt.decode(token) as { id: string };
        return decode.id
    }

    verify(token: string, secret: string) {
        const decode = jwt.verify(token, secret) as { id: string };
        return decode.id
    }
}