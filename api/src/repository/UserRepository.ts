import { Injectable } from "@nestjs/common";
import { IUserCreate } from "../interfaces/iUserCreate";
import { PrismaService } from "../prisma.service";
import { IUserUpdate } from "../interfaces/iUserUpdate";

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
                Profile: {
                    create: {
                        photo: data.photo
                    }
                },
                Token: {
                    create: {
                        refreshtoken: data.refresh_token
                    }
                }
            }
        })
    }

    async findByEmail(email: string) {
        return await this.prisma.user.findFirst({
            where: { email },
            select: {
                id: true,
                email: true,
                password: true,
                verified: true
            }
        })
    }

    async findById(id: string) {
        return await this.prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                name: true,
                email: true,
                phone: true
            }
        })
    }

    async update(id: string, data: IUserUpdate) {
        await this.prisma.user.update({
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