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

    async use(
        req: Request,
        res: Response,
        next: NextFunction
    ) { }
}