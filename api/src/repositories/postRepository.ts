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
        const data = await this.prisma.post.findMany({
            where: id ? { userId: id } : {},
            select: {
                id: true,
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

        return {
            total_posts: data.length,
            posts: data.map(post => ({
                id: post.id,
                text: post.text,
                content: post.content,
                createdAt: post.createdAt,
                userId: post.userId,
                user: {
                    name: post.user.name,
                    profilePhoto: post.user.profile.photo
                }
            }))
        };
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