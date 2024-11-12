import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class CommentRepository {
    constructor(private prisma: PrismaService) { }

    async create(
        userId: string,
        postId: number,
        text: string,
        parentId?: number
    ) {
        return await this.prisma.comment.create({
            data: {
                userId: userId,
                postId: postId,
                text: text,
                parentId: parentId
            }
        })
    }

    async update(userId: string, commentId: number, text: string) {
        return await this.prisma.comment.update({
            where: {
                id: commentId,
                userId: userId
            },
            data: {
                text: text
            }
        })
    }

    async delete(userId: string, commentId: number) {
        return await this.prisma.comment.delete({
            where: {
                id: commentId,
                userId: userId
            }
        }
        )
    }
}