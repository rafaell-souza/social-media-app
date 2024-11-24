import { Body, Controller, Post, Req, Res, Param, UseGuards, Put, Get, HttpCode } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginUserDto } from "src/dto/LoginUserDto";
import { Response, Request } from "express";
import { AuthGuard } from "@nestjs/passport";
import AuthCreateUserDto from "src/dto/auth-create-user.dto";
import { v4 as uuid } from "uuid";
import { IUserSignup } from "src/interfaces/IUserSignup";
import { JwtRefreshGuard } from "src/guards/jwt-refresh.guard";
import { JwtConfirmationGuard } from "src/guards/jwt-confirmation.guard";
import AuthResetPasswordDto from "src/dto/auth-reset-password.dto";

@Controller("auth")
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post("local/signup")
    async signupLocal(
        @Body() dto: AuthCreateUserDto) {
        const user: IUserSignup = {
            id: uuid(),
            ...dto
        }
        const email = await this.authService.signupLocal(user);
        return { email: email }
    }

    @Post("local/signin")
    @HttpCode(200)
    async signinLocal(@Body() dto: LoginUserDto) {
        return await this.authService.signinLocal(dto);
    }

    @Post("signout")
    @HttpCode(200)
    async logout(@Req() req: any) {
        const id = req.user.id;
        await this.authService.logout(id);
    }

    @Post("refresh")
    @UseGuards(JwtRefreshGuard)
    @HttpCode(200)
    async refreshToken(@Req() req: Request) {
        const { id, refresh } = req.user as any;
        const access_token = await this.authService.refreshToken(id, refresh);
        return { access_token: access_token }
    }

    @Get("google")
    @UseGuards(AuthGuard("google"))
    async GoogleAuth() { }

    @Get("google/callback")
    @UseGuards(AuthGuard("google"))
    async GoogleAuthRedirect(
        @Req() req: any
    ) {
        const data = {
            id: uuid(),
            first_name: req.user.first_name,
            last_name: req.user.last_name,
            email: req.user.email,
            photo: req.user.photo,
        }

        return await this.authService.google(data);
    }

    @Put("verify")
    @UseGuards(JwtConfirmationGuard)
    async VerifyLocal(@Req() req: any) {
        const userId = req.user.id as string;
        return await this.authService.VerifyLocal(userId);
    }


    @Get("verification/:template")
    async SendVerification(
        @Req() request: Request,
        @Param('template') template: "email" | "password"
    ) {
        const email = request.body.email;
        await this.authService.sendVerification(email, template);
        return { message: `A verification was sent to: ${email}` }
    }

    @Put("password-reset")
    @UseGuards(JwtConfirmationGuard)
    async passwordReset(
        @Body() dto: AuthResetPasswordDto,
        @Req() req: any
    ) {
        const id = req.user.id
        return await this.authService.passwordReset(dto.password, id);
    }
}