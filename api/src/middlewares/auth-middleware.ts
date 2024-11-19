import { Request, Response, NextFunction } from "express";
import { Injectable, NestMiddleware } from "@nestjs/common";
import { JwtService } from "src/helpers/jwt.service";
import { Forbidden, Unauthorized } from "src/exceptions/excepetion";
import "dotenv/config";
import { UserRepository } from "src/repositories/user";

@Injectable()
export class Authmiddleware implements NestMiddleware {
    access_secret = process.env.JWT_ACCESS_TOKEN_SECRET
    constructor(
        private jwtService: JwtService,
        private userRepo: UserRepository,
    ) { }

    async use(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        const authHeader = req.headers.authorization;
        if (!authHeader) return next(new Unauthorized("Auth header is missing"));

        const token = authHeader.split(" ")[1];
        if (!token) return next(new Unauthorized("Access token is missing"));

        const data = this.jwtService.jwtVerify(token, this.access_secret) as any;
        if (!data) throw new Unauthorized("Access token is expired/invalid")

        const isSignedup = await this.userRepo.findById(data.sub);
        if (!isSignedup?.verified) return next(new Forbidden("User not identified"));

        req.user = {
            id: data.sub,
            email: data.email,
        };

        return next();
    }
}