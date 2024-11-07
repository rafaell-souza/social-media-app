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

    async read(postId: number) {
        const comments = await this.prisma.comment.findMany({
            where: { postId: postId },
            select: {
                text: true,
                id: true,
                userId: true,
                parentId: true,
                createdAt: true,
                children: true,
                user: {
                    select: {
                        name: true,
                        profile: {
                            select: {
                                photo: true
                            }
                        }
                    }
                },
            }
        })

        return {
            total_comments: comments.length,
            comments: comments.map(comment => ({
                id: comment.id,
                parentId: comment.parentId,
                userId: comment.userId,
                text: comment.text,
                createdAt: comment.createdAt,
                replies: comment.children,
                user: {
                    name: comment.user.name,
                    profilePhoto: comment.user.profile.photo
                }
            }))
        }
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