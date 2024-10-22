import { Injectable } from "@nestjs/common";
import { IUserCreate } from "src/interfaces/iUserCreate";
import { IUserLogin } from "src/interfaces/IUserLogin";
import { UserUseCases } from "../../UseCases/UserUseCases.service";
import { Request } from "express";

@Injectable()
export class AuthService {
    constructor (
        private userUseCases: UserUseCases
    ) { }

    async registerAccount(data: IUserCreate, ip: string) {
        return await this.userUseCases.createAccount(data, ip);
    }

    async loginAccount(data: IUserLogin, ip: string) {
        return await this.userUseCases.findAccount(data, ip)
    }
}