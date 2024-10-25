import { Injectable } from "@nestjs/common";
import { UserUseCases } from "../../UseCases/UserUseCases.service";
import { TokenRepository } from "../../repository/TokenRepository";
import { Request } from "express";
import { JwtService } from "src/helpers/jwt.service";
import { UserRepository } from "src/repository/UserRepository";

@Injectable()
export class AuthService {
    constructor(
        private userUseCases: UserUseCases,
        private tokenRepo: TokenRepository,
        private jwtService: JwtService,
        private userRepo: UserRepository
    ) { }

    async registerAccount(data) {
        return await this.userUseCases.createAccount(data);
    }

    async loginAccount(data) {
        return await this.userUseCases.findAccount(data)
    }

    async logoutAccount(req: Request) {
        const access_token = req.headers.authorization.split(" ")[1];
        const { sub } = this.jwtService.decode(access_token);

        await this.tokenRepo.delete(sub);
    }

    async googleAccount(data) {
        return await this.userUseCases.googleAccount(data);
    }

    async confirmEmail(token: string) {
        const { sub } = this.jwtService.decode(token) as { sub: string }
        if ( sub ) return await this.userRepo.update(sub, { verified: true })
    }
}