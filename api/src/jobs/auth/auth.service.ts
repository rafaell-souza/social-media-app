import { Injectable } from "@nestjs/common";
import { TokenRepository } from "src/repositories/token";
import { JwtService } from "src/helpers/jwt.service";
import { UserRepository } from "src/repositories/user";
import { HashService } from "src/helpers/hash.service";
import { EmailService } from "src/helpers/smtp/email.service";
import { BadRequest, Conflict, NoContent, Unauthorized } from "src/exceptions/excepetion";
import { IUserSignin } from "src/interfaces/IUserSignin";
import { IUserSignup } from "src/interfaces/IUserSignup";
import { IAuthGoogle } from "src/interfaces/IAuthGoogle";

@Injectable()
export class AuthService {
    constructor(
        private tokenRepo: TokenRepository,
        private jwtService: JwtService,
        private userRepo: UserRepository,
        private emailService: EmailService,
        private hashService: HashService
    ) { }

    async signupLocal(data: IUserSignup): Promise<String> {
        const existentUser = await this.userRepo.findByEmail(data.email);
        if (existentUser) throw new Conflict("This email is signed up");

        // confrimation token
        const ct = this.jwtService.createCt(data.id);
        const hashedCt = await this.hashService.hashData(ct)

        data.password = await this.hashService.hashData(data.password);

        // username will be trated separately via websocket
        const userData = await this.userRepo.create(data, hashedCt);

        const name = userData.first_name + userData.last_name;

        await this.emailService.send(name, userData.email, hashedCt, "email");
        return userData.email;
    }


    async signinLocal(data: IUserSignin) {
        const user = await this.userRepo.findByEmail(data.email)

        if (!user) throw new NoContent(`Email: ${data.email} is not signed up`)

        const { id, email, password } = user;

        const match = await this.hashService.compareData(data.password, password)
        if (!match) throw new BadRequest("Passwords does not match");

        const access_token = this.jwtService.createAT(id, email);
        const refresh_token = this.jwtService.createRt(user.id);

        await this.tokenRepo.update(id, { hashedRt: refresh_token });
        return { access_token, refresh_token };
    }

    async logout(id: string) {
        return await this.tokenRepo.update(id, {
            hashedRt: null,
            hashedCt: null,
        })
    }

    async refreshToken(userId: string, refresh: string) {
        const user = await this.tokenRepo.find(userId);
        if (!user.hashedRt) throw new Unauthorized("Unauthorized access")

        const match = await this.hashService.compareData(user.hashedRt, refresh);
        if (!match) throw new Unauthorized("Unauthorized access");

        const { id, email } = await this.userRepo.findById(userId);

        const access_token = this.jwtService.createAT(id, email);
        const refresh_token = this.jwtService.createRt(id);

        if (access_token && refresh_token) return { access_token, refresh_token };
    }

    async google(data: IAuthGoogle) {
        const user = await this.userRepo.findByEmail(data.email)

        if (user) {
            const access_token = this.jwtService.createAT(user.id, user.email);
            const refresh_token = this.jwtService.createRt(user.id);

            const hashedRt = await this.hashService.hashData(refresh_token);
            if (hashedRt)
                await this.tokenRepo.update(user.id, { hashedRt: hashedRt });

            return { access_token, refresh_token };
        }

        const refresh_token = this.jwtService.createRt(data.id)
        const access_token = this.jwtService.createAT(data.id, data.email);

        const hashedRt = await this.hashService.hashData(refresh_token);
        await this.userRepo.googleCreate(data, hashedRt);

        return { access_token, refresh_token };
    }

    async VerifyLocal(userId: string, token: string) {
        const tokens = await this.tokenRepo.find(userId);
        if (!tokens.hashedCt) throw new Unauthorized("Unauthorized access");

        const match = await this.hashService.compareData(tokens.hashedCt, token);
        if (!match) throw new Unauthorized("Unauthorized access");

        const { id, email } = await this.userRepo.findById(userId);

        const access_token = this.jwtService.createAT(id, email);
        const refresh_token = this.jwtService.createRt(id);

        const hashedRt = await this.hashService.hashData(refresh_token);
        await this.tokenRepo.update(id, { hashedRt: hashedRt })

        if (access_token && refresh_token) return { access_token, refresh_token };
    }


    async sendVerification(
        email: string,
        template: "email" | "password"
    ) {
        const user = await this.userRepo.findByEmail(email);

        if (!user?.email)
            throw new BadRequest("Unable to send verification, since email is not signed up");

        const confirmation_token = this.jwtService.createCt(user.id);
        const hashedCt = await this.hashService.hashData(confirmation_token);

        await this.tokenRepo.update(user.id, { hashedCt: hashedCt });

        const name = user.first_name + user.last_name;
        await this.emailService.send(
            name, user.email,
            confirmation_token, template === "email" ? "email" : "password"
        )
    }

    async passwordReset(password: string, userId: string) {
        const hashedPassword = await this.hashService.hashData(password);

        await this.userRepo.update(userId, { password: hashedPassword });

        return await this.tokenRepo.update(userId, {
            hashedRt: null,
            hashedCt: null
        })
    }
}