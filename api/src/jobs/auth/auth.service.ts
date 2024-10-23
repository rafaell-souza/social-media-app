import { Injectable } from "@nestjs/common";
import { IUserCreate } from "src/interfaces/iUserCreate";
import { IUserLogin } from "src/interfaces/IUserLogin";
import { UserUseCases } from "../../UseCases/UserUseCases.service";
import { TokenRepository } from "../../repository/TokenRepository";
import { Request } from "express";
import { JwtService } from "src/helpers/jwt.service";

@Injectable()
export class AuthService {
    constructor (
        private userUseCases: UserUseCases,
        private tokenRepo: TokenRepository,
        private jwtService: JwtService
    ) { }

    async registerAccount(data: IUserCreate) {
        return await this.userUseCases.createAccount(data);
    }

    async loginAccount(data: IUserLogin) {
        return await this.userUseCases.findAccount(data)
    }

    async logoutAccount(req: Request) {
        const access_token = req.headers.authorization.split(" ")[1];
        const { sub } = this.jwtService.decode(access_token);

        await this.tokenRepo.delete(sub);
    }

    async googleAccount(data: IUserCreate) {
        return await this.userUseCases.googleAccount(data);
    }
}