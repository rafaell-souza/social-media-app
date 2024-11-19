import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class FollowerRepository {
    constructor(private prisma: PrismaService) { }

    async create(user_id: string, following_Id: string) {
        return await this.prisma.follower.create({
            data: {
                follower_Id: user_id,
                following_Id: following_Id
            }
        })
    }

    async list(user_id: string) {
        const relations = await this.prisma.follower.findMany({
            where: {
                OR: [
                    { follower_Id: user_id },
                    { following_Id: user_id }
                ]
            },
            select: {
                follower: {
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
                following: {
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
        });

        const followers = relations
            .filter(relation => relation.following.id === user_id)
            .map(relation => ({
                id: relation.follower.id,
                name: relation.follower.first_name+relation.follower.last_name,
                photo: relation.follower.profile.photo
            }));

        const following = relations
            .filter(relation => relation.follower.id === user_id)
            .map(relation => ({
                id: relation.following.id,
                name: relation.following.first_name+relation.following.last_name,
                photo: relation.following.profile.photo
            }));

        return { followers, following };
    }

    async delete(user_id: string, following_Id: string) {
        const found = await this.prisma.follower.findFirst({
            where: {
                follower_Id: user_id,
                following_Id: following_Id
            }
        })

        if (found?.id)
            await this.prisma.follower.delete({ where: { id: found.id } })
    }
}