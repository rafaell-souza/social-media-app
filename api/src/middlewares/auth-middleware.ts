import { Request, Response, NextFunction } from "express";
import { Injectable, NestMiddleware } from "@nestjs/common";
import { JwtService } from "src/helpers/jwt.service";
import { Forbidden, Unauthorized } from "src/exceptions/excepetion";
import "dotenv/config";
import { UserRepository } from "src/repositories/user";
import { TokenRepository } from "src/repositories/token";
import { compareAsc } from "date-fns";

type Decode = {
    sub: string,
    email: string;
    createdAt: string;
}

@Injectable()
export class Authmiddleware implements NestMiddleware {
    secret = process.env.JWT_ACCESS_SECRET

    constructor(
        private jwtService: JwtService,
        private userRepo: UserRepository,
        private tokenRepo: TokenRepository
    ) { }

    async use(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        const access_token = req.headers?.authorization?.split(" ")[1];
        if (!access_token) return next(new Unauthorized("Access token is missing"));

        try {
            this.jwtService.jwtVerify(access_token, this.secret);

            const { sub, createdAt, email } =
                this.jwtService.jwtDecode(access_token) as Decode

            const { id } = await this.userRepo.findById(sub);

            const logout = await this.tokenRepo.find(id);

            if (logout.lastLogoutAt) {
                const lastLogout = compareAsc(
                    new Date(createdAt),
                    new Date(logout.lastLogoutAt)
                ) >= 0;

                if (!lastLogout)
                    return next(new Unauthorized("Token's session was closed"));
            }

            req.user = { id: sub, email: email };
            return next();

        } catch (error) {
            return next(error);
        }
    }
}