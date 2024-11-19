import { PrismaService } from "src/prisma/prisma.service";
import { Injectable } from "@nestjs/common";
import { IProfileUpdate } from "src/interfaces/IUpdateProfile";

@Injectable()
export class ProfileRepository {
    constructor(private prisma: PrismaService) { }

    async update(id: string, data: IProfileUpdate) {
        const { first_name, last_name, ...rest } = data;

        return await this.prisma.profile.update({
            where: { owner_id: id },
            data: {
                ...rest,
                owner: {
                    update: {
                        first_name: first_name,
                        last_name: last_name
                    }
                }
            }
        })
    }

    async find(id: string) {
        return await this.prisma.profile.findFirst({
            where: { owner_id: id },
            select: {
                id: true,
                photo: true,
                background: true,
                bio: true,
                from: true,
                site: true,
                url: true,
                createdAt: true,
                owner: {
                    select: {
                        first_name: true,
                        last_name: true,
                        followers: {
                            select: {
                                id: true,
                                follower: {
                                    select: {
                                        first_name: true,
                                        last_name: true,
                                        profile: {
                                            select: { photo: true }
                                        }
                                    }
                                }
                            }
                        },
                        following: {
                            select: {
                                id: true,
                                follower: {
                                    select: {
                                        first_name: true,
                                        last_name: true,
                                        profile: {
                                            select: { photo: true }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        })
    }
}