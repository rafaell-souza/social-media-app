import { Injectable } from "@nestjs/common";
import { IUserCreate } from "src/interfaces/iUserCreate";
import { IUserUpdate } from "src/interfaces/IUserUpdate";
import { PrismaService } from "src/prisma.service";
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
                email: data?.email,
                password: data.password,
                phone: data?.phone,
                Profile: {
                    create: {}
                }
            },
            select: {
                id: true
            }
        })
    }

    async findByField(email: string, phone: string) {
        return await this.prisma.user.findFirst({
            where: {
                OR: [
                    { email: email },
                    { phone: phone }
                ]
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
        return await this.prisma.user.update({
            where: { id },
            data
        })
    }

    async delete(id: string) {
        return await this.prisma.user.delete({
            where: { id }
        })
    }
}