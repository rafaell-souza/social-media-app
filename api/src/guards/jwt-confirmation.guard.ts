import { ExecutionContext, CanActivate, Injectable } from '@nestjs/common';
import { Request } from "express";
import { JwtService } from 'src/helpers/jwt.service';
import { Forbidden, Unauthorized } from 'src/exceptions/excepetion';
import "dotenv/config";
import { TokenRepository } from 'src/repositories/token';
import { HashService } from 'src/helpers/hash.service';

@Injectable()
export class JwtConfirmationGuard implements CanActivate {
    confirmation_secret = process.env.JWT_CONFIRMATION_TOKEN_SECRET
    constructor(
        private jwtService: JwtService,
        private tokenRepo: TokenRepository,
        private hashService: HashService
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest<Request>();

        const authHeader = request.headers.authorization;
        if (!authHeader) throw new Unauthorized("Authorization header is missing")

        const confirmation_token = authHeader.split(" ")[1];
        if (!confirmation_token) throw new Unauthorized("Confirmation token is missing")

        const data = this.jwtService.jwtVerify(confirmation_token, this.confirmation_secret) as any

        const userTokens = await this.tokenRepo.find(data.sub);
        if (!userTokens.hashedCt) throw new Forbidden("Forbidden resource");

        const { hashedCt } = userTokens;

        const match = await this.hashService.compareData(hashedCt, confirmation_token);
        if (!match) throw new Forbidden("Forbidden resource")

        request.user = { id: data.id, token: confirmation_token }
        return true;
    }
}
