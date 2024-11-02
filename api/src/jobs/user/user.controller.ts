import { Controller, Req, Res, Get, Delete } from "@nestjs/common";
import { UserService } from "./user.service";
import { Request, Response } from "express";

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
        return res.status(200).end()
    }
}
