import { ITokenUpdate } from "src/interfaces/ITokenUpdate";
import { PrismaService } from "../prisma/prisma.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class TokenRepository {
    constructor(private prisma: PrismaService) { }

    async find(id: string) {
        return await this.prisma.token.findFirst({
            where: { owner_id: id }
        });
    }

    async update(id: string, data: ITokenUpdate) {
        return await this.prisma.token.update({
            where: { owner_id: id },
            data: { ...data }
        });
    }
}