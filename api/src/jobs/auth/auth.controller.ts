import { Body, Controller, Post, Res } from "@nestjs/common";
import { AuthService } from "./auth.service";
import CreateUserDto from "src/dtos/CreateUserDto";
import { LoginUserDto } from "src/dtos/LoginUserDto";
import { Response } from "express";

@Controller("api")
export class AuthController {
    constructor(
        private authService: AuthService
    ) { }

    @Post("register")
    async register(
        @Body() CreateUserDto: CreateUserDto,
        @Res() res: Response
    ) {
        const { accessToken, refreshToken } = await this.authService.register(CreateUserDto);
        res.cookie("refresh-token", refreshToken, {
            httpOnly: true,
            maxAge: 7200000
        })
        return res.status(201).json({ accessToken });
    }

    @Post("login")
    async login(
        @Body() loginUserDto: LoginUserDto,
        @Res() res: Response
    ) {
        const { accessToken, refreshToken } = await this.authService.login(loginUserDto)
        res.cookie("refresh-token", refreshToken, {
            httpOnly: true,
            maxAge: 7200000
        })
        return res.status(200).json({ accessToken });
    }
}