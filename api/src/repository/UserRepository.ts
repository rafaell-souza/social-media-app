import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { IUserUpdate } from "../interfaces/IUserUpdate";
import { IUserCreateGoogle } from "src/interfaces/IUserCreateGoogle";
import { IUserCreate } from "src/interfaces/iUserCreate";

@Injectable()
export class UserRepository {
    constructor(private prisma: PrismaService) { }

    async create(data: IUserCreate) {
        return await this.prisma.user.create({
            data: {
                id: data.id,
                name: data.name,
                email: data.email,
                password: data.password,
                profile: { create: {} },
                token: {
                    create: {
                        confirmationToken: data.confirmationToken,
                    }
                }
            }
        })
    }

    async googleCreate(data: IUserCreateGoogle) {
        return await this.prisma.user.create({
            data: {
                id: data.id,
                name: data.name,
                email: data.email,
                verified: data.verified,
                profile: {
                    create: {
                        photo: data.photo
                    }
                },
                token: {
                    create: {
                        refreshtoken: data.refreshtoken
                    }
                }
            }
        })
    }

    async findByEmail(email: string) {
        return await this.prisma.user.findFirst({
            where: { email },
        })
    }

    async findById(id: string) {
        return await this.prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                name: true,
                email: true,
            }
        })
    }

    async update(id: string, data: IUserUpdate) {
        return await this.prisma.user.update({
            where: { id },
            data
        })
    }

    async delete(id: string) {
        await this.prisma.user.delete({
            where: { id }
        })
    }
}