import { Request, Response, NextFunction } from "express";
import { Injectable, NestMiddleware } from "@nestjs/common";
import { JwtService } from "src/helpers/jwt.service";
import { Forbidden, Unauthorized } from "src/exceptions/excepetion";
import { TokenRepository } from "src/repository/TokenRepository";
import "dotenv/config";
import { UserRepository } from "src/repository/UserRepository";
import { JsonWebTokenError } from "jsonwebtoken";

@Injectable()
export class AccessMiddleware implements NestMiddleware {
    private access_secret: string;
    private refresh_secret: string;

    constructor(
        private jwtService: JwtService,
        private tokenRepo: TokenRepository,
        private userRepo: UserRepository
    ) {
        this.access_secret = process.env.JWT_ACCESS_TOKEN_SECRET
        this.refresh_secret = process.env.JWT_REFRESH_TOKEN_SECRET
    }

    private async refreshUserToken(id: string) {
        const tokens = await this.tokenRepo.find(id);

        if (!tokens?.refreshtoken)
            throw new Unauthorized("Refresh token is missing. Sign in again.")

        const { refreshtoken } = tokens;
        const decodedId = this.jwtService.verify(refreshtoken, this.refresh_secret);

        if (!decodedId)
            throw new Unauthorized("Invalid refresh token. Sign in again.")

        return this.jwtService.createAccessToken(decodedId);
    }

    async use(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        if (!req.headers?.authorization)
            return next(new Unauthorized("Authorization header is missing"));

        const token = req.headers.authorization.split(" ")[1];

        if (!token)
            return next(new Unauthorized("Access token is missing from the header"));

        try {
            const id = this.jwtService.verify(token, this.access_secret);
            const isRegistered = await this.userRepo.findById(id);

            if (!isRegistered)
                return next(new Forbidden("User was not found"));

            return next();
            
        } catch (error) {
            if (error instanceof JsonWebTokenError) {
                const id = this.jwtService.decode(token);

                if (!id)
                    return next(new Unauthorized("Access token is invalid"))

                const newToken = await this.refreshUserToken(id);

                req.headers.authorization = `Bearer ${newToken}`;
                return next()
            }

            else return next(new Unauthorized("Unauthorized access."))
        }
    }
}