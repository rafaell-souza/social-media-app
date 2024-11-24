import { Controller, Get, Delete, Post, Param, Req, Res } from "@nestjs/common";
import { Response } from "express";
import { BadRequest } from "src/exceptions/excepetion";
import { FollowerRepository } from "src/repositories/follower";

@Controller("follow")
export class FollowerController {
    constructor(private followerRepo: FollowerRepository,) { }

    @Post("/:following_id")
    async follow(
        @Param("following_id") following_id: string,
        @Req() req: any
    ) {
        const userId: string = req.user.id;

        if (userId === following_id)
            throw new BadRequest("Unable to execute this action")

        return await this.followerRepo.create(userId, following_id);
    }

    @Delete("/:following_id")
    async Unfollow(
        @Param("following_id") following_id: string,
        @Req() req: any
    ) {
        const userId: string = req.user.id;
        return await this.followerRepo.delete(userId, following_id);
    }

    @Get()
    async followers(
        @Res() res: Response,
        @Req() req: any
    ) {
        const userId: string = req.user.id;
        const data = await this.followerRepo.list(userId);
        return res.status(200).json({
            followers: data.followers,
            following: data.following
        })
    }
}