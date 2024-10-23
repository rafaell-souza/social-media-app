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

    async createAccount(data: IUserCreate): Promise<string> {
        const myAccount = await this.userRepo.findByEmail(data.email)

        if (myAccount) throw new Conflict("Email is already in use");

        data.password = await this.hashService.hash(data.password);

        const { id, email, verified } = await this.userRepo.create(data);
        const tokens = this.jwtService.generate(id, email, verified);

        const { access_token, refresh_token } = tokens;
        await this.tokenRepo.create(refresh_token, id);
        return access_token;
    }


    async googleAccount(data: IUserCreate): Promise<string> {
        const myAccount = await this.userRepo.findByEmail(data.email)

        if (myAccount) {
            const { id, email, verified } = myAccount;
            const tokens = this.jwtService.generate(id, email, verified);

            const { access_token, refresh_token } = tokens;
            await this.tokenRepo.update(refresh_token, id);
            return access_token;
        }

        const { id, email, verified } = await this.userRepo.create(data);
        const tokens = this.jwtService.generate(id, email, verified);

        const { access_token, refresh_token } = tokens;
        await this.tokenRepo.create(refresh_token, id);
        return access_token;
    }


    async findAccount(data: IUserLogin): Promise<string> {
        const userAccount = await this.userRepo.findByEmail(data.email)
        const message = `${"There's no account registered with the provided email"}`
        if (!userAccount) throw new NoContent(message)

        const { id, email, password, verified } = userAccount;

        const isPasswordEqual = await this.hashService.compare(
            data.password, password
        )

        if (!isPasswordEqual) throw new BadRequest("Incorrect password")

        const tokens = this.jwtService.generate(id, email, verified);
        const { access_token, refresh_token } = tokens;

        await this.tokenRepo.update(refresh_token, id);
        return access_token;
    }
}