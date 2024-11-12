import { Injectable } from "@nestjs/common";
import { IUserInteraction } from "src/interfaces/IUserInteraction";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class UserInteractionRepository {
    constructor(private prisma: PrismaService) { }

    async create(data: IUserInteraction) {
        return await this.prisma.userInteraction.create({
            data:
                data.type === "COMMENT" ? {
                    userId: data.userId,
                    commentId: data.contentId,
                    interactionId: data.interactionId,
                    type: data.type
                } : {
                    userId: data.userId,
                    postId: data.contentId,
                    interactionId: data.interactionId,
                    type: data.type
                }
        })
    }

    async update(
        userId: string,
        userInteractionId: number,
        interactionId: number
    ) {
        return await this.prisma.userInteraction.update({
            where: {
                userId: userId,
                id: userInteractionId
            },
            data: { interactionId: interactionId }
        })
    }

    async delete(
        userId: string,
        userInteractionId: number
    ) {
        return await this.prisma.userInteraction.delete({
            where: {
                id: userInteractionId,
                userId: userId
            }
        })
    }
}