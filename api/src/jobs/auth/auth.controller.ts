import { Body, Controller, Post, Req, Res } from "@nestjs/common";
import { AuthService } from "./auth.service";
import CreateUserDto from "src/dtos/CreateUserDto";
import { LoginUserDto } from "src/dtos/LoginUserDto";
import { Response, Request } from "express";

@Controller()
export class AuthController {
    constructor(
        private authService: AuthService
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
}