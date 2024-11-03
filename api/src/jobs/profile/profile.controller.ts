import { Body, Controller, Post, Req, Res, Param, UseGuards, Put, Get, HttpCode, Patch } from "@nestjs/common";
import { ProfileService } from "./profile.service";
import { Request, Response } from "express";
import { ProfileDto } from "src/dtos/Profile-dto";

@Controller('profile')
export class ProfileController {
    constructor(private profileService: ProfileService) { }

    @Get("/:id?")
    async GetProfile(
        @Req() req: Request,
        @Res() res: Response,
        @Param("id") id?: string
    ) {
        const profile = await this.profileService.GetProfile(id, req);
        return res.status(200).json(profile)
    }

    @Patch()
    async UpdateProfile(
        @Body() profile_dto: ProfileDto,
        @Req() req: Request,
        @Res() res: Response
    ) {
        await this.profileService.UpdateProfile(req, profile_dto);
        return res.status(200).send("User updated!");
    }
}