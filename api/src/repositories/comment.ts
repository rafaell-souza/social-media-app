import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class CommentRepository {
    constructor(private prisma: PrismaService) { }

    async create(
        user_id: string,
        post_id: number,
        text: string,
        parent_id?: number
    ) {
        return await this.prisma.comment.create({
            data: {
                author_id: user_id,
                post_id: post_id,
                text: text,
                parent_Id: parent_id
            }
        })
    }

    async update(user_id: string, comment_id: number, text: string) {
        return await this.prisma.comment.update({
            where: {
                id: comment_id,
                author_id: user_id
            },
            data: {
                text: text
            }
        })
    }

    async delete(user_id: string, comment_id: number) {
        return await this.prisma.comment.delete({
            where: {
                id: comment_id,
                author_id: user_id
            }
        }
        )
    }
}