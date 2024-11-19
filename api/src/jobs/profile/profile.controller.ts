import { Body, Controller, Req, Param, Get, Patch, UseGuards } from "@nestjs/common";
import { ProfileService } from "./profile.service";
import { UpdateProfileDto } from "src/dto/UpdateProfile.dto";
import { JwtAuthOptional } from "src/guards/auth-optional.guard";

@Controller('profile')
export class ProfileController {
    constructor(private profileService: ProfileService) { }

    @Get("/:id?")
    @UseGuards(JwtAuthOptional)
    async userProfile(
        @Req() req: any,
        @Param("id") id?: string // another person profile id
    ) {
        const userId = req?.user?.id; // current user id from token
        const profile = await this.profileService.userProfile(id ? id : userId);
        return profile
    }

    @Patch()
    async UpdateProfile(
        @Body() dto: UpdateProfileDto,
        @Req() req: any,
    ) {
        const userId: string = req.user.id;
        const result = await this.profileService.UpdateProfile(userId, dto);
        return { success: result ? true : false }
    }
}