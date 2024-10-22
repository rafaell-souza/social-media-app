import { Injectable } from "@nestjs/common";
import { BadRequest, Conflict, NoContent } from "../exceptions/excepetion";
import { IUserCreate } from "../interfaces/iUserCreate";
import { UserRepository } from "../repository/UserRepository";
import { IUserLogin } from "../interfaces/IUserLogin";
import { HashService } from "../helpers/hash.service";
import { TokenRepository } from "../repository/TokenRepository";
import { JwtService } from "../helpers/jwt.service";

@Injectable()
export class UserUseCases {
    constructor(
        private userRepo: UserRepository,
        private hashService: HashService,
        private tokenRepo: TokenRepository,
        private jwtService: JwtService
    ) { }

    async createAccount(data: IUserCreate, ip: string): Promise<string> {
        const Account = await this.userRepo.findByField(
            data.email, data.phone
        )

        if (Account) {
            const field = data.email ? "email" : "phone";
            throw new Conflict(`This ${field} is already in use.`);
        }

        if (data.password) {
            data.password = await this.hashService.hash(data.password);
        }

        const account = await this.userRepo.create(data);
        const { accessToken, refreshToken } = this.jwtService.generate(account.id, ip);

        await this.tokenRepo.create(refreshToken, "accepted")
        return accessToken;
    }


    async findAccount(data: IUserLogin, ip: string): Promise<string> {
        const userAccount = await this.userRepo.findByField(
            data.email, data.phone
        )

        const message = `${"There's no account registered with the provided "}${data.email ? "email" : "phone"}`

        if (!userAccount) throw new NoContent(message)

        const isPasswordEqual = await this.hashService.compare(
            data.password, userAccount.password
        )

        if (!isPasswordEqual) throw new BadRequest("Incorrect password")
        const { accessToken, refreshToken } = this.jwtService.generate(
            userAccount.id, ip
        );

        await this.tokenRepo.create(refreshToken, "accepted")
        return accessToken;
    }
}