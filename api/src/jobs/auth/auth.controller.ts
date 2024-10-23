import { Body, Controller, Post, Req, Res, UseGuards, Get } from "@nestjs/common";
import { AuthService } from "./auth.service";
import CreateUserDto from "src/dtos/CreateUserDto";
import { LoginUserDto } from "src/dtos/LoginUserDto";
import { Response, Request } from "express";
import { AuthGuard } from "@nestjs/passport";

@Controller("auth")
export class AuthController {
    constructor(
        private authService: AuthService,
    ) { }

    @Post("register")
    async register(
        @Body() CreateUserDto: CreateUserDto,
        @Res() res: Response,
        @Req() req: Request
    ) {
        const access_token = await this.authService.registerAccount( CreateUserDto );
        return res.status(201).json({ access_token });
    }

    @Post("login")
    async login(
        @Body() loginUserDto: LoginUserDto,
        @Res() res: Response,
        @Req() req: Request
    ) {
        const access_token = await this.authService.loginAccount( loginUserDto );
        return res.status(200).json({ access_token });
    }

    @Post("logout")
    async logout(
        @Res() res: Response,
        @Req() req: Request
    ) {
        await this.authService.logoutAccount(req);
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
            photo: req.user.picture
        }

        const access_token = await this.authService.googleAccount(data);
        return res.status(201).json({ access_token });
    }
}