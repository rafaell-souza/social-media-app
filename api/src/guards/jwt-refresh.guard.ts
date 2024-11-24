import { ExecutionContext, CanActivate, Injectable } from '@nestjs/common';
import { Request } from "express";
import { JwtService } from 'src/helpers/jwt.service';
import { Unauthorized } from 'src/exceptions/excepetion';
import "dotenv/config";

@Injectable()
export class JwtRefreshGuard implements CanActivate {
    refresh_secret = process.env.JWT_REFRESH_SECRET
    constructor(
        private jwtService: JwtService,
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req = context.switchToHttp().getRequest<Request>();

        const refresh_token = req.headers?.authorization?.split(" ")[1];
        if (!refresh_token) throw new Unauthorized("Refresh token is missing")

        this.jwtService.jwtVerify(refresh_token, this.refresh_secret);
        const decoded = this.jwtService.jwtDecode(refresh_token);

        req.user = { id: decoded.sub, refresh: refresh_token }
        return true;
    }
}