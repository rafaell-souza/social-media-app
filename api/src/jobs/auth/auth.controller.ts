import { Body, Controller, Post, Req, Res, Param, UseGuards, Put, Get, HttpCode } from "@nestjs/common";
import { AuthService } from "./auth.service";
import CreateUserDto from "src/dtos/CreateUserDto";
import { LoginUserDto } from "src/dtos/LoginUserDto";
import { Response, Request } from "express";
import { AuthGuard } from "@nestjs/passport";

@Controller("auth")
export class AuthController {
    constructor(
        private authService: AuthService
    ) { }

    @Post("register")
    async register(@Body() CreateUserDto: CreateUserDto) {
        return await this.authService.register(CreateUserDto);
    }

    @Post("authentication")
    @HttpCode(200)
    async authentication(@Body() loginUserDto: LoginUserDto) {
        return await this.authService.authentication(loginUserDto);
    }

    @Post("logout")
    @HttpCode(200)
    async logout(@Res() res: Response, @Req() req: Request) {
        await this.authService.logout(req);
        return res.status(200).end();
    }


    @Get("google")
    @UseGuards(AuthGuard("google"))
    async googleAuth() { }

    @Get("google/callback")
    @UseGuards(AuthGuard("google"))
    async googleAuthRedirect(
        @Res() res: Response,
        @Req() req: any
    ) {
        const data = {
            name: `${req.user.firstName} ${req.user.lastName}`,
            email: req.user.email,
            password: null,
            photo: req.user.picture,
            verified: true
        }

        const access_token = await this.authService.googleAccount(data);
        return res.status(201).json({ access_token });
    }

    @Put("verify")
    async verify(@Res() res: Response, @Req() req: Request) {
        await this.authService.verifyAccount(req);
        return res.status(200).end();
    }

    @Get("resend_confirmation/:email")
    async sendEmail(@Param("email") email: string) {
        return await this.authService.sendTo(email);
    }
}