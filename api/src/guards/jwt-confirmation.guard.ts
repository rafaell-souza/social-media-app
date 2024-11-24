import { ExecutionContext, CanActivate, Injectable } from '@nestjs/common';
import { Request } from "express";
import { JwtService } from 'src/helpers/jwt.service';
import { Unauthorized } from 'src/exceptions/excepetion';
import "dotenv/config";
import { TokenRepository } from 'src/repositories/token';
import { HashService } from 'src/helpers/hash.service';

@Injectable()
export class JwtConfirmationGuard implements CanActivate {
    secret = process.env.JWT_CONFIRMATION_SECRET
    constructor(
        private jwtService: JwtService,
        private tokenRepo: TokenRepository,
        private hashService: HashService
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req = context.switchToHttp().getRequest<Request>();

        const confirmation_token = req.headers?.authorization?.split(" ")[1];
        if (!confirmation_token) throw new Unauthorized("Confirmation token is missing");

        this.jwtService.jwtVerify(confirmation_token, this.secret);

        const decoded = this.jwtService.jwtDecode(confirmation_token) as any

        const myTokens = await this.tokenRepo.find(decoded.sub);

        const match = await this.hashService.compareData(
            confirmation_token, myTokens.hashedCt
        );

        if (!match) throw new Unauthorized("Unable to confirm identity");

        req.user = { id: decoded.sub }
        return true;
    }
}