import { Injectable } from "@nestjs/common";
import * as jwt from "jsonwebtoken";
import "dotenv/config";
import { format } from "date-fns";

@Injectable()
export class JwtService {
    generate(id: string) {
        const { JWT_ACCESS_TOKEN_SECRET } = process.env;
        const { JWT_REFRESH_TOKEN_SECRET } = process.env;

        const accessToken = jwt.sign({
            id: id,
            createdAt: format(new Date(), "Pp")
        }, JWT_ACCESS_TOKEN_SECRET, {
            expiresIn: "30m",
        })

        const refreshToken = jwt.sign({ id: id }, JWT_REFRESH_TOKEN_SECRET, {
            expiresIn: "2h"
        })

        return { accessToken, refreshToken }
    }
}