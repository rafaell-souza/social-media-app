import { PrismaService } from "../prisma.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class TokenRepository {
    constructor(private prisma: PrismaService) { }

    async create(token: string, userId: string) {
        await this.prisma.token.create({
            data: {
                refreshtoken: token,
                userId: userId
            }
        });
    }

    async delete(userId: string) {
        await this.prisma.token.deleteMany({
            where: {
                userId: userId
            }
        });
    }

    async find(userId: string) {
        return await this.prisma.token.findFirst({
            where: {
                userId: userId
            },
            select: {
                refreshtoken: true
            }
        });
    }

    async update(token: string, userId: string) {
        await this.prisma.token.update({
            where: {
                userId: userId
            },
            data: {
                refreshtoken: token
            }
        });
    }
}