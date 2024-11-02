import { PrismaService } from "src/prisma.service";
import { Injectable } from "@nestjs/common";
import { IUpdateProfile } from "src/interfaces/IUpdateProfile";

@Injectable()
export class ProfileRepository {
    constructor(private prisma: PrismaService) { }

    async update(id: string, data: IUpdateProfile) {
        await this.prisma.profile.update({
            where: { userId: id },
            data: {
                ...data,
                user: {
                    update: {
                        name: data.name
                    }
                }
            }
        })
    }

    async find(id: string) {
        return await this.prisma.profile.findFirst({
            where: { userId: id },
            select: {
                id: true,
                photo: true,
                background: true,
                bio: true,
                from: true,
                site: true,
                url: true,
                createdAt: true,
                user: {
                    select: {
                        name: true
                    }
                }
            }
        })
    }
}