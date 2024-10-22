import { Injectable } from "@nestjs/common";
import { BadRequest, Conflict, NoContent } from "../exceptions/excepetion";
import { IUserCreate } from "../interfaces/iUserCreate";
import { UserRepository } from "../repository/UserRepository";
import { IUserLogin } from "../interfaces/IUserLogin";
import { HashService } from "../helpers/hash.service";

@Injectable()
export class UserUseCases {
    constructor(
        private userRepo: UserRepository,
        private hashService: HashService
    ) {}

    async createAccount(data: IUserCreate): Promise<string> {
        const Account = await this.userRepo.findByField(
            data.email, data.phone
        )

        if (Account) {
            const field = data.email ? "email" : "phone";
            throw new Conflict(`This ${field} is already in use.`);
        }

        data.password = await this.hashService.hash(data.password);
        const account = await this.userRepo.create(data);
        return account.id
    }


    async findAccount(data: IUserLogin): Promise<string> {
        const userAccount = await this.userRepo.findByField(
            data.email, data.phone
        )

        const message = `${"There's no account registered with the provided "}${ data.email ? "email" : "phone"}`

        if (!userAccount) throw new NoContent(message)

        const isPasswordEqual = await this.hashService.compare(
            data.password, userAccount.password
        )

        if (!isPasswordEqual) throw new BadRequest("Incorrect password")
        return userAccount.id;
    }
}