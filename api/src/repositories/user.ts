import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { IAuthGoogle } from "src/interfaces/IAuthGoogle";
import { IUserSignup } from "src/interfaces/IUserSignup";

@Injectable()
export class UserRepository {
    constructor(private prisma: PrismaService) { }

    async create(
        data: IUserSignup,
        hashedCt: string
    ) {
        return await this.prisma.user.create({
            data: {
                ...data,
                type: "system_account",
                profile: { create: {} },
                token: {
                    create: {
                        hashedCt: hashedCt, //Ct - confirmation token
                    }
                }
            },
            select: {
                id: true,
                first_name: true,
                last_name: true,
                email: true,
                verified: true
            }
        })
    }

    async googleCreate(data: IAuthGoogle, hashedRt: string) {
        return await this.prisma.user.create({
            data: {
                id: data.id,
                first_name: data.first_name,
                last_name: data.last_name,
                email: data.email,
                verified: true,
                type: "oauth_account",
                profile: {
                    create: {
                        photo: data.photo
                    }
                },
                token: {
                    create: {
                        hashedRt: hashedRt
                    }
                }
            },
            select: {
                id: true,
                first_name: true,
                last_name: true,
                email: true,
                verified: true
            }
        })
    }

    async findByEmail(email: string) {
        return await this.prisma.user.findUnique({
            where: { email },
        })
    }

    async findById(id: string) {
        return await this.prisma.user.findUnique({
            where: { id }
        })
    }

    async update(id: string, data: any) {
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