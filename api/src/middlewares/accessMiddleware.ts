import { Request, Response, NextFunction } from "express";
import { Injectable, NestMiddleware } from "@nestjs/common";
import { JwtService } from "src/helpers/jwt.service";
import { Unauthorized } from "src/exceptions/excepetion";
import { TokenRepository } from "src/repository/TokenRepository";
import "dotenv/config";
import * as jwt from "jsonwebtoken";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class AccessMiddleware implements NestMiddleware {
    constructor(
        private jwtService: JwtService,
        private tokenRepo: TokenRepository,
        private prismaService: PrismaService
    ) { }

    async use(req: Request, res: Response, next: NextFunction) {
        const access_token_secret = process.env.JWT_ACCESS_TOKEN_SECRET;
        const refresh_token_secret = process.env.JWT_REFRESH_TOKEN_SECRET

        if (!refresh_token_secret || !access_token_secret) 
            return next(new Error("Fail when proccessing authorization verifications."))

        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader)
            return next(new Unauthorized("Authorization header is missing!"));

        const access_token = req.headers.authorization.split(" ")[1];

        try {
            const decodeId = this.jwtService.verify(access_token, access_token_secret);

            const isVerified = await this.prismaService.user.findFirst({
                where: { id: decodeId }
            })

            if (!isVerified.verified)
                return next(new Unauthorized("Account not verified."));

            return next();
        } 
        
        catch (err) {
            if (err instanceof jwt.JsonWebTokenError) {
                const { sub } = this.jwtService.decode(access_token)
                const { refreshtoken } = await this.tokenRepo.find(sub)

                if (!refreshtoken)
                    return next(new Unauthorized("Account structure error."));

                jwt.verify(refreshtoken, refresh_token_secret, (err, decoded) => {
                    if (err) return next(new Unauthorized("Unauthorized connection."))
                });

                const { access_token: newAccessToken } = this.jwtService.generate(sub)
                
                req.headers.authorization = `Bearer ${newAccessToken}`;
                return next();
            }
        }
    }
}