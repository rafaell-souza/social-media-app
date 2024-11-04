import { Body, Controller, Post, Req, Res, Param, UseGuards, Put, Get, HttpCode } from "@nestjs/common";
import { AuthService } from "./auth.service";
import CreateUserDto from "src/dtos/CreateUserDto";
import { LoginUserDto } from "src/dtos/LoginUserDto";
import { Response, Request } from "express";
import { AuthGuard } from "@nestjs/passport";
import ResetPasswordAuthDto from "src/dtos/ResetPasswordDto";

@Controller("auth")
export class AuthController {
    constructor(
        private authService: AuthService
    ) { }

    @Post("register")
    async Register(@Body() CreateUserDto: CreateUserDto) {
        const data = await this.authService.register(CreateUserDto);
        return {
            email: data,
            message: `A confirmation email was sent to: ${data}`,
            success: true
        }
    }

    @Post("authentication")
    @HttpCode(200)
    async Authentication(@Body() loginUserDto: LoginUserDto) {
        const token = await this.authService.authentication(loginUserDto);
        return {
            access_token: token,
            message: `You signed in successfully`,
            success: true
        }
    }

    @Post("logout")
    @HttpCode(200)
    async Logout(@Res() res: Response, @Req() req: Request) {
        await this.authService.logout(req);
        return res.status(200).json({
            message: "You logged out successfully",
            success: true
        });
    }

    @Get("google")
    @UseGuards(AuthGuard("google"))
    async GoogleAuth() { }

    @Get("google/callback")
    @UseGuards(AuthGuard("google"))
    async GoogleAuthRedirect(
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

        const token = await this.authService.googleAccount(data);
        return res.status(201).json({
            access_token: token,
            message: "Google OAuth login completed successfully",
            success: true
        });
    }

    @Put("verify")
    async Verify(@Res() res: Response, @Req() req: Request) {
        await this.authService.verifyAccount(req);
        return res.status(200).json({
            message: "Verification completed successfully",
            success: true
        });
    }

    @Get("send_confirmation/:email/:template")
    async SendConfirmation(
        @Param('email') email: string,
        @Param('template') template: "email" | "password"
    ) {
        await this.authService.sendConfirmation(email, template);
        return {
            message: `Check your mail box for a new confirmation email`,
            success: true
        }
    }

    @Put("change_password")
    async ChangePassword(
        @Body() resetPasswordAuthDto: ResetPasswordAuthDto,
        @Res() res: Response,
        @Req() req: Request
    ) {
        await this.authService.change(resetPasswordAuthDto.password, req);
        return res.status(200).json({
            message: "Your password has been changed",
            success: true
        })
    }
}