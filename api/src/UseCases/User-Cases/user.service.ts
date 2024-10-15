import { Injectable } from "@nestjs/common";
import { BadRequest, Conflict, NoContent } from "src/exceptions/excepetion";
import { IUserCreate } from "src/interfaces/iUserCreate";
import { UserRepository } from "src/repositories/UserRepository";
import * as bcrypt from "bcrypt";
import { IUserLogin } from "src/interfaces/IUserLogin";

@Injectable()
export class UserCases {
    constructor(
        private userRepository: UserRepository,
    ) { }

    async createAccount(data: IUserCreate): Promise<string> {
        let field = "";

        const Account = await this.userRepository.findByField(
            data.email, data.phone
        )

        if (Account) {
            field = data.email !== undefined ? "email" : "phone";
            throw new Conflict(`Fail. This ${field} is already in use.`);
        }

        const hash = await bcrypt.hash(data.password, 10)
        data.password = hash;

        return (await this.userRepository.create(data)).id;
    }

    async findAccount(data: IUserLogin): Promise<string> {
        const userAccount = await this.userRepository.findByField(
            data.email, data.phone
        )

        if (!userAccount) throw new NoContent("Account not found.")

        if (!await bcrypt.compare(data.password, userAccount.password)) {
            throw new BadRequest("Fail when accessing acount.")
        }

        return userAccount.id;
    }
}