import { Body, Controller, Post, Req, Res, UseGuards, Get } from "@nestjs/common";
import { AuthService } from "./auth.service";
import CreateUserDto from "src/dtos/CreateUserDto";
import { LoginUserDto } from "src/dtos/LoginUserDto";
import { Response, Request } from "express";
import { TokenRepository } from "../../repository/TokenRepository";
import { AuthGuard } from "@nestjs/passport";

@Controller("auth")
export class AuthController {
    constructor(
        private authService: AuthService,
        private tokenRepo: TokenRepository
    ) { }

    @Post("register")
    async register(
        @Body() CreateUserDto: CreateUserDto,
        @Res() res: Response,
        @Req() req: Request
    ) {
        const accessToken = await this.authService.registerAccount(
            CreateUserDto,
            req.ip
        );

        return res.status(201).json({ accessToken });
    }

    @Post("login")
    async login(
        @Body() loginUserDto: LoginUserDto,
        @Res() res: Response,
        @Req() req: Request
    ) {
        const accessToken = await this.authService.loginAccount(
            loginUserDto,
            req.ip
        );

        return res.status(200).json({ accessToken });
    }

    @Post("logout")
    async logout(
        @Res() res: Response,
        @Req() req: Request
    ) {
        const token = req.headers.authorization.split(" ")[1];
        await this.tokenRepo.create(token, "forbidden");
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
            phone: null,
            photo: req.user.picture
        }

        const accessToken = await this.authService.registerAccount(data, req.ip);
        return res.status(201).json({ accessToken });
    }
}