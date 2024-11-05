import { Injectable } from "@nestjs/common";
import { ICreatePost } from "src/interfaces/IcreatePost";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class PostRepository {
    constructor(private prisma: PrismaService) { }

    async create(id: string, data: ICreatePost) {
        return await this.prisma.post.create({
            data: {
                userId: id,
                ...data
            }
        })
    }

    async update(id: string, postId: number, text: string) {
        return await this.prisma.post.updateMany({
            where: {
                userId: id,
                id: postId
            },
            data: {
                text: text
            }
        })
    }

    async findPosts(id?: string) {
        if (!id)
            return await this.prisma.post.findMany({
                select: {
                    text: true,
                    content: true,
                    createdAt: true,
                    userId: true,
                    user: {
                        select: {
                            name: true,
                            profile: {
                                select: { photo: true }
                            }
                        }
                    }
                }
            });

        return await this.prisma.post.findMany({
            where: { userId: id },
            select: {
                text: true,
                content: true,
                createdAt: true,
                userId: true,
                user: {
                    select: {
                        name: true,
                        profile: {
                            select: { photo: true }
                        }
                    }
                }
            }
        })
    }

    async Delete(userId: string, postId: number) {
        return await this.prisma.post.deleteMany({
            where: {
                userId: userId,
                id: postId
            }
        })
    }
}