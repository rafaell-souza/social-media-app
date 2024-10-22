import { Injectable } from "@nestjs/common";
import * as jwt from "jsonwebtoken";
import "dotenv/config";
import { format } from "date-fns";
import { ITokenData } from "src/interfaces/ITokenData";

@Injectable()
export class JwtService {
    generate(id: string, ip: string) {
        const { JWT_ACCESS_TOKEN_SECRET } = process.env;
        const { JWT_REFRESH_TOKEN_SECRET } = process.env;

        const accessToken = jwt.sign({
            id: id,
            createdAt: format(new Date(), "Pp"),
            ip: ip
        }, JWT_ACCESS_TOKEN_SECRET, {
            expiresIn: "5m",
        })

        const refreshToken = jwt.sign({
            id: id,
            ip: ip
        }, JWT_REFRESH_TOKEN_SECRET, {
            expiresIn: "30d"
        })

        return { accessToken, refreshToken }
    }

    decode(token: string) {
        const decoded = jwt.decode(token) as ITokenData;
        return {
            id: decoded.id,
            ip: decoded.ip,
            createdAt: decoded.createdAt
        } = decoded;
    }
}