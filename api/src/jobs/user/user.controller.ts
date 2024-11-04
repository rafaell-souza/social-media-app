import { Controller, Req, Res, Get, Delete, Put, Body } from "@nestjs/common";
import { UserService } from "./user.service";
import { Request, Response } from "express";
import UserResetPasswordDto from "src/dtos/UserResetPassword";

@Controller("user")
export class UserController {
    constructor(private userService: UserService) { }

    @Get()
    async GetUserDatails(
        @Res() res: Response,
        @Req() req: Request
    ) {
        const data = await this.userService.GetUserDatails(req);
        return res.status(200).json(data)
    }

    @Delete()
    async DeleteUser(
        @Res() res: Response,
        @Req() req: Request
    ) {
        await this.userService.DeleteUser(req);
        return res.status(200).json({
            message: "Account deleted successfully",
            success: true
        })
    }

    @Put("change_password")
    async UpdatePassword(
        @Res() res: Response,
        @Req() req: Request,
        @Body() userResetPasswordDto: UserResetPasswordDto
    ) {
        await this.userService.ResetPassword(req, userResetPasswordDto);
        return res.status(200).json({
            message: "New password set up successfully",
            success: true
        })
    }
}