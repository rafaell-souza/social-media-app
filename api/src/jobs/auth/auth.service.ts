import { Injectable } from "@nestjs/common";
import { TokenRepository } from "../../repositories/TokenRepository";
import { JwtService } from "src/helpers/jwt.service";
import { UserRepository } from "src/repositories/UserRepository";
import { HashService } from "src/helpers/hash.service";
import { SendEmailService } from "src/helpers/smtp/SendEmail.service";
import { BadRequest, Conflict, NoContent, Forbidden, Unauthorized } from "src/exceptions/excepetion";
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

        await this.sendEmailService.to(
            data.name,
            data.email,
            data.confirmationToken,
            "email"
        );

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

    async logout(req: Request) {
        const authToken = req.headers.authorization.split(" ")[1];
        const id = this.jwtService.decode(authToken);

        const user = await this.userRepo.findById(id);
        if (!user.verified)
            throw new Unauthorized("Account not verified")

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
        const refresh_token = this.jwtService.createRefreshToken(id);

        await this.tokenRepo.update(id, {
            confirmationToken: null,
            refreshtoken: refresh_token
        })
    }

    async sendConfirmation(
        email: string,
        template: "email" | "password"
    ) {
        if (template !== "email" && template !== "password")
            throw new Forbidden("A template is required")

        const account = await this.userRepo.findByEmail(email);

        if (!account?.email)
            throw new Forbidden("User not found");

        if (template === "email") {
            const newToken = this.jwtService.createAccessToken(account.id)
            await this.tokenRepo.update(account.id, { confirmationToken: newToken });

            await this.sendEmailService.to(
                account.name,
                account.email,
                newToken,
                template
            );
        }

        if (template === "password") {
            if (!account.verified)
                throw new Forbidden("User not verified");

            const newToken = this.jwtService.createAccessToken(account.id)
            await this.tokenRepo.update(account.id, { resetPasswordToken: newToken });

            await this.sendEmailService.to(
                account.name,
                account.email,
                newToken,
                template
            );
        }
    }

    async change(password: any, req: Request) {
        const authToken = req.headers.authorization.split(" ")[1];
        const id = this.jwtService.decode(authToken);

        const user = await this.tokenRepo.find(id);

        if (user.resetPasswordToken !== authToken)
            throw new Forbidden("Invalid reset password token");

        await this.userRepo.update(id, {
            password: await this.hashService.hash(password)
        });

        await this.tokenRepo.update(id, {
            resetPasswordToken: null,
            refreshtoken: null
        })
    }
}