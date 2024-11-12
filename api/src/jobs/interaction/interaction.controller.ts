import { Controller, Post, Put, Delete, Query, Req, Res, Param } from "@nestjs/common";
import { JwtService } from "src/helpers/jwt.service";
import { UserInteractionRepository } from "src/repositories/UserInteractionRepository";
import { Request, Response } from "express";

@Controller("interaction")
export class InteractionController {
    constructor(
        private userInteractionRepo: UserInteractionRepository,
        private jwtService: JwtService
    ) { }

    @Post()
    async CreateInteraction(
        @Query("contentId") contentId: number,
        @Query("type") type: "COMMENT" | "POST",
        @Query("interactionId") interactionId: number,
        @Res() res: Response,
        @Req() req: Request
    ) {
        const access_token = req.headers.authorization.split(" ")[1];
        const userId = this.jwtService.decode(access_token);

        const data = {
            userId: userId,
            type: type,
            contentId: contentId,
            interactionId: interactionId
        }

        const interact = await this.userInteractionRepo.create(data);

        if (!interact)
            throw new Error("Failed to react to the content");

        return res.status(201).send({
            message: "Interaction added successfully",
            success: true
        })
    }

    @Put("/:interactionId")
    async UpdateInteraction(
        @Param("userInterationId") userInterationId: number,
        @Query("interactionId") interactionId: number,
        @Res() res: Response,
        @Req() req: Request
    ) {
        const access_token = req.headers.authorization.split(" ")[1];
        const userId = this.jwtService.decode(access_token);

        const interact = await this.userInteractionRepo.update(
            userId, userInterationId, interactionId
        );

        if (!interact)
            throw new Error("Failed to react to the content");

        return res.status(200).send({
            message: "Interaction updated successfully",
            success: true
        })
    }

    @Delete("/:interactionId")
    async DeleteInteraction(
        @Param("userInterationId") userInterationId: number,
        @Res() res: Response,
        @Req() req: Request
    ) {
        const access_token = req.headers.authorization.split(" ")[1];
        const userId = this.jwtService.decode(access_token);

        const interact = await this.userInteractionRepo.delete(
            userId, userInterationId,
        );

        if (!interact)
            throw new Error("Failed to delete content");

        return res.status(200).send({
            message: "Interaction updated successfully",
            success: true
        })
    }
}