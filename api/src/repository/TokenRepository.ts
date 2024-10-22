import { PrismaService } from "../prisma.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class TokenRepository {
    constructor(private prisma: PrismaService) { }

    async create(token: string, status: string) {
        return this.prisma.token.create({
            data: {
                token,
                status
            }
        });
    }
}