import { Injectable } from "@nestjs/common";
import { ICreatePost } from "src/interfaces/IcreatePost";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class PostRepository {
    constructor(private prisma: PrismaService) { }

    async create(id: string, data: ICreatePost) {
        return await this.prisma.post.create({
            data: {
                owner_id: id,
                ...data
            }
        })
    }

    async update(id: string, post_id: number, text: string) {
        return await this.prisma.post.update({
            where: {
                owner_id: id,
                id: post_id
            },
            data: {
                text: text
            }
        })
    }

    async findPosts(id?: string) {
        const whereCondition = id ? { owner_id: id } : {};

        const data = await this.prisma.post.findMany({
            where: whereCondition,
            select: {
                id: true,
                text: true,
                content: true,
                createdAt: true,
                updatedAt: true,
                owner: {
                    select: {
                        id: true,
                        first_name: true,
                        last_name: true,
                        profile: {
                            select: { photo: true }
                        }
                    }
                },
                reactions: {
                    select: {
                        id: true,
                        post_Id: true,
                        User: {
                            select: {
                                id: true,
                                first_name: true,
                                last_name: true,
                                profile: {
                                    select: {
                                        photo: true
                                    }
                                }
                            }
                        }
                    }
                },
                comments: {
                    where: { parent_Id: null },
                    select: {
                        id: true,
                        text: true,
                        content: true,
                        parent_Id: true,
                        children: true,
                        author: {
                            select: {
                                id: true,
                                first_name: true,
                                last_name: true,
                                profile: {
                                    select: {
                                        photo: true
                                    }
                                }
                            }
                        },
                        reactions: {
                            select: {
                                id: true,
                                comment_id: true,
                                User: {
                                    select: {
                                        id: true,
                                        first_name: true,
                                        last_name: true,
                                        profile: {
                                            select: {
                                                photo: true
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
            }
        });

        const posts = data.map(post => ({
            id: post.id,
            text: post.text,
            content: post.content,
            reactions: post.reactions.map(reaction => ({
                id: reaction.id,
                post_id: reaction.post_Id,
                user: {
                    id: reaction.User.id,
                    name: reaction.User.first_name + reaction.User.last_name,
                    photo: reaction.User.profile.photo
                }
            })),
            createdAt: post.createdAt,
            updatedAt: post.updatedAt,
            owner: {
                id: post.owner.id,
                name: post.owner.first_name + post.owner.last_name,
                photo: post.owner.profile.photo
            },
            comments: post.comments.map(comment => ({
                id: comment.id,
                parent_id: comment.parent_Id,
                text: comment.text,
                content: comment.content,
                author: {
                    id: comment.author.id,
                    name: comment.author.first_name + comment.author.last_name,
                    photo: comment.author.profile.photo
                },
                reactions: post.reactions.map(reaction => ({
                    id: reaction.id,
                    post_id: reaction.post_Id,
                    user: {
                        id: reaction.User.id,
                        name: reaction.User.first_name + reaction.User.last_name,
                        photo: reaction.User.profile.photo
                    }
                })),
                children: comment.children.map(children => ({
                    id: comment.id,
                    parent_id: comment.parent_Id,
                    text: comment.text,
                    content: comment.content,
                    author: {
                        id: comment.author.id,
                        name: comment.author.first_name + comment.author.last_name,
                        photo: comment.author.profile.photo
                    },
                    reactions: post.reactions.map(reaction => ({
                        id: reaction.id,
                        post_id: reaction.post_Id,
                        user: {
                            id: reaction.User.id,
                            name: reaction.User.first_name + reaction.User.last_name,
                            photo: reaction.User.profile.photo
                        }
                    })),
                }))
            }))
        }))

        return posts;
    }

    async Delete(userId: string, postId: number) {
        return await this.prisma.post.deleteMany({
            where: {
                owner_id: userId,
                id: postId
            }
        })
    }
}