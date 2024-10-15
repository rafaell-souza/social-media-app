import { Injectable } from "@nestjs/common";
import { JwtService } from "src/helpers/jwt.service";
import { IUserCreate } from "src/interfaces/iUserCreate";
import { IUserLogin } from "src/interfaces/IUserLogin";
import { UserCases } from "src/UseCases/User-Cases/user.service";

@Injectable()
export class AuthService {
    constructor(
        private userCases: UserCases,
        private jwtService: JwtService
    ) { }

    async register(data: IUserCreate) {
        const newUser = await this.userCases.createAccount(data);
        return this.jwtService.generate(newUser);
    }

    async login(data: IUserLogin) {
        const userAccount = await this.userCases.findAccount(data)
        return this.jwtService.generate(userAccount);
    }
}