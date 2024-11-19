import { ExecutionContext, CanActivate, Injectable } from '@nestjs/common';
import { Request } from "express";
import { JwtService } from 'src/helpers/jwt.service';
import { Unauthorized } from 'src/exceptions/excepetion';
import "dotenv/config";

@Injectable()
export class JwtRefreshGuard implements CanActivate {
    refresh_secret = process.env.JWT_REFRESH_TOKEN_SECRET
    constructor(
        private jwtService: JwtService,
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest<Request>();

        const authHeader = request.headers.authorization;
        if (!authHeader) throw new Unauthorized("Authorization header is missing")

        const refresh_token = authHeader.split(" ")[1];
        if (!refresh_token) throw new Unauthorized("Refresh token is missing")

        const data = this.jwtService.jwtVerify(refresh_token, this.refresh_secret) as any

        request.user = { id: data.id, email: data.email }
        return true;
    }
}
