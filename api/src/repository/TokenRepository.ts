import { ITokens } from "src/interfaces/ITokensUpdate";
import { PrismaService } from "../prisma.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class TokenRepository {
    constructor(private prisma: PrismaService) { }

    async find(id: string) {
        return await this.prisma.tokens.findFirst({
            where: { userId: id }
        });
    }

    async update(id: string, data: ITokens) {
        await this.prisma.tokens.update({
            where: { userId: id },
            data
        });
    }
}