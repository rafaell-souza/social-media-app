import { 
    Body, Controller, Post, Req, Res, UseGuards, Get, Put, Param, 
    HttpCode, Delete 
} from "@nestjs/common";
import { UserService } from "./user.service";
import { Request } from "@nestjs/common";

@Controller("user")
export class UserController {
    constructor(userService: UserService) {}

    @Get()
    async getUserData() {}

    @Delete(":id")
    async deleteUserData() {}

    @Put()
    async userPassUpdate(@Req() request: Request) {
        
    } 
}
