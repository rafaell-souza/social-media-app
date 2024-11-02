import { Body, Controller, Post, Req, Res, Param, UseGuards, Put, Get, HttpCode } from "@nestjs/common";
import { ProfileService } from "./profile.service";
import { Request, Response } from "express";

@Controller('profile')
export class ProfileController {
    constructor(private profileService: ProfileService) { }

    @Get()
    async GetProfile(
        @Req() req: Request,
        @Res() res: Response
    ) {
        const profile = await this.profileService.GetProfile(req);
        return res.status(200).json(profile)
    }
}