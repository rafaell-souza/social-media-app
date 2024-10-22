import { Injectable } from "@nestjs/common";
import { JwtService } from "src/helpers/jwt.service";
import { IUserCreate } from "src/interfaces/iUserCreate";
import { IUserLogin } from "src/interfaces/IUserLogin";
import { UserUseCases } from "../../UseCases/UserUseCases.service";

@Injectable()
export class AuthService {
    constructor (
        private userUseCases: UserUseCases,
        private jwtService: JwtService
    ) { }

    async registerAccount(data: IUserCreate, ip: string) {
        const newUserId = await this.userUseCases.createAccount(data);
        return this.jwtService.generate(newUserId, ip);
    }

    async loginAccount(data: IUserLogin, ip: string) {
        const userId = await this.userUseCases.findAccount(data)
        return this.jwtService.generate(userId, ip);
    }
}