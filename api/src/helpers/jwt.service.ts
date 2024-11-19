import { Injectable } from "@nestjs/common";
import * as jwt from "jsonwebtoken";
import "dotenv/config";
import { format } from "date-fns";

@Injectable()
export class JwtService {
    private readonly access_secret = process.env.JWT_ACCESS_SECRET;
    private readonly refresh_secret = process.env.JWT_REFRESH_SECRET;
    private readonly confirmation_token = process.env.JWT_CONFIRMATION_SECRET

    createAT(
        id: string,
        email: string
    ): string {
        return jwt.sign({
            sub: id,
            email: email,
            iat: format(new Date(), "Pp")
        }, this.access_secret, {
            expiresIn: "30m"
        })
    }

    createCt(id: string): string {
        return jwt.sign({
            sub: id,
        }, this.confirmation_token, {
            expiresIn: "5m"
        })
    }

    createRt(id: string): string {
        return jwt.sign({
            sub: id,
        }, this.refresh_secret, {
            expiresIn: "30d"
        })
    }

    jwtDecode(token: string) {
        return jwt.decode(token);
    }

    jwtVerify(token: string, secret: string) {
        return jwt.verify(token, secret);
    }
}