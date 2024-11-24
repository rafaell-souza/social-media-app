import { ExecutionContext, CanActivate, Injectable } from '@nestjs/common';
import { Request } from "express";
import { JwtService } from 'src/helpers/jwt.service';
import { Unauthorized } from 'src/exceptions/excepetion';
import "dotenv/config";

@Injectable()
export class JwtAuthOptional implements CanActivate {
    secret = process.env.JWT_ACCESS_SECRET
    constructor(private jwtService: JwtService,) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest<Request>();

        const access_token = request.headers?.authorization?.split(" ")[1];
        if (!access_token) return true;

        this.jwtService.jwtVerify(access_token, this.secret);
        const decoded = this.jwtService.jwtDecode(access_token);
        
        request.user = { id: decoded.sub }
        return true;
    }
}
