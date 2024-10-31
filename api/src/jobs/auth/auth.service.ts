import { Injectable } from "@nestjs/common";
import { TokenRepository } from "../../repository/TokenRepository";
import { JwtService } from "src/helpers/jwt.service";
import { UserRepository } from "src/repository/UserRepository";
import { HashService } from "src/helpers/hash.service";
import { SendEmailService } from "src/helpers/smtp/SendEmail.service";
import { BadRequest, Conflict, NoContent, Forbidden, InternalError } from "src/exceptions/excepetion";
import { IUserLogin } from "src/interfaces/IUserLogin";
import { Request } from "express";
import { v4 as uuid } from "uuid";

@Injectable()
export class AuthService {
    constructor(
        private tokenRepo: TokenRepository,
        private jwtService: JwtService,
        private userRepo: UserRepository,
        private sendEmailService: SendEmailService,
        private hashService: HashService,
    ) { }

    async register(data: any) {
        const myAccount = await this.userRepo.findByEmail(data.email);

        if (myAccount)
            throw new Conflict("This email has already been signed up");

        data.id = uuid();
        data.password = await this.hashService.hash(data.password);
        data.confirmationToken = this.jwtService.createAccessToken(data.id);

        const newUser = await this.userRepo.create(data);
        await this.sendEmailService.to(data.name, data.email, data.confirmationToken);
        return newUser.email
    }


    async authentication(data: IUserLogin) {
        const account = await this.userRepo.findByEmail(data.email)

        if (!account)
            throw new NoContent("No register found")

        if (!account.verified)
            throw new Forbidden("This account hasan't been verified yet")

        const match = await this.hashService.compare(data.password, account.password)

        if (!match)
            throw new BadRequest("Password does not match");

        const access_token = this.jwtService.createAccessToken(account.id);
        const refresh_token = this.jwtService.createRefreshToken(account.id);

        await this.tokenRepo.update(account.id, { refreshtoken: refresh_token });
        return access_token;
    }

    // Token is supposed to be valid when hit thsi route
    async logout(req: Request) {
        const authToken = req.headers.authorization.split(" ")[1];
        const id = this.jwtService.decode(authToken);
        await this.tokenRepo.update(id, { refreshtoken: null })
    }


    async googleAccount(data: any) {
        const myAccount = await this.userRepo.findByEmail(data.email)

        if (myAccount) {
            const access_token = this.jwtService.createAccessToken(myAccount.id);
            const refresh_token = this.jwtService.createRefreshToken(myAccount.id)

            await this.tokenRepo.update(
                myAccount.id,
                { refreshtoken: refresh_token }
            );

            return access_token;
        }

        data.id = uuid();
        data.verified = true;
        data.refreshtoken = this.jwtService.createRefreshToken(myAccount.id)

        const newUser = await this.userRepo.googleCreate(data);
        const access_token = this.jwtService.createAccessToken(newUser.id);
        return access_token;
    }


    async verifyAccount(req: Request) {
        const authToken = req.headers.authorization.split(" ")[1];

        const id = this.jwtService.decode(authToken);
        const user = await this.tokenRepo.find(id);

        if (user.confirmationToken !== authToken)
            throw new Forbidden("Invalid confirmation token");

        await this.userRepo.update(id, { verified: true })
        const refresh_token = await this.jwtService.createRefreshToken(id);

        await this.tokenRepo.update(id, {
            confirmationToken: null,
            refreshtoken: refresh_token
        })
    }

    async sendTo(email: string) {
        const account = await this.userRepo.findByEmail(email);

        if (!account)
            throw new Forbidden("Email not signed up");

        if (account.verified) 
            throw new Forbidden("Verified account")

        const newToken = this.jwtService.createAccessToken(account.id)

        await this.tokenRepo.update(account.id, { confirmationToken: newToken })
        await this.sendEmailService.to(account.name, account.email, newToken);
    }
}