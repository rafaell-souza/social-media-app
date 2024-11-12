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
        const whereCondition = id ? { userId: id } : {};

        const data = await this.prisma.post.findMany({
            where: whereCondition,
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
                },
                comments: {
                    where: { parentId: null },
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
                        UserInteraction: {
                            select: {
                                id: true,
                                userId: true,
                                commentId: true,
                                interactionId: true,
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
                                interaction: {
                                    select: {
                                        name: true
                                    }
                                }
                            }
                        }
                    }
                },
                UserInteraction: {
                    select: {
                        id: true,
                        userId: true,
                        postId: true,
                        type: true,
                        interactionId: true,
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
                        interaction: {
                            select: {
                                name: true
                            }
                        }
                    }
                }
            }
        });

        return {
            posts: data.map(post => ({
                id: post.id,
                text: post.text,
                content: post.content,
                createdAt: post.createdAt,
                user: {
                    id: post.userId,
                    name: post.user.name,
                    photo: post.user.profile.photo
                },
                comments: post.comments.map(comment => ({
                    id: comment.id,
                    parentId: comment.parentId,
                    text: comment.text,
                    createdAt: comment.createdAt,
                    user: {
                        id: comment.userId,
                        name: comment.user.name,
                        photo: comment.user.profile.photo
                    },
                    userInteractions: comment.UserInteraction.map(interaction => ({
                        id: interaction.id,
                        interaction_Id: interaction.interactionId,
                        interaction_name: interaction.interaction.name,
                        user: {
                            id: interaction.userId,
                            name: interaction.user.name,
                            photo: interaction.user.profile.photo
                        }
                    })),
                    replies: comment.children,
                    total_replies: comment.children.length
                })),
                userInteractions: post.UserInteraction.map(interaction => ({
                    id: interaction.id,
                    interaction_Id: interaction.interactionId,
                    interaction_name: interaction.interaction.name,
                    user: {
                        id: interaction.userId,
                        name: interaction.user.name,
                        photo: interaction.user.profile.photo
                    }
                })),
                total_posts: data.length,
                total_comments: post.comments.length
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