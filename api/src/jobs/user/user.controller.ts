import { Controller, Req, Get, Delete, Put, Body } from "@nestjs/common";
import { UserService } from "./user.service";
import UserResetPasswordDto from "src/dto/UserResetPassword";

@Controller("user")
export class UserController {
    constructor(private userService: UserService) { }

    @Get()
    async getUserData(@Req() req: any) {
        const userId: string = req.user.id;
        return await this.userService.getUserData(userId);
    }

    @Delete()
    async DeleteUser(
        @Req() req: any
    ) {
        const userId: string = req.user.id;
        const result = await this.userService.DeleteUser(userId);
        return { success: result ? true : false }
    }

    @Put("password-reset")
    async UpdatePassword(
        @Req() req: any,
        @Body() userResetPasswordDto: UserResetPasswordDto
    ) {
        const userId: string = req.user.id;
        await this.userService.ResetPassword(userId, userResetPasswordDto);
        
    }
}