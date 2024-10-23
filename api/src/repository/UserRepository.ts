import { Injectable } from "@nestjs/common";
import { IUserCreate } from "../interfaces/iUserCreate";
import { PrismaService } from "../prisma.service";
import { IUserUpdate } from "../interfaces/iUserUpdate";
import { v4 as uuid } from 'uuid';

@Injectable()
export class UserRepository {
    constructor(private prisma: PrismaService) { }

    async create(data: IUserCreate) {
        const userUuid = uuid();
        return await this.prisma.user.create({
            data: {
                id: userUuid,
                name: data.name,
                email: data.email,
                password: data.password,
                Profile: {
                    create: {
                        photo: data.photo
                    }
                }
            },
            select: {
                id: true,
                email: true,
                verified: true
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