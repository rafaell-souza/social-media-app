import { Injectable } from "@nestjs/common";
import { JwtService } from "src/helpers/jwt.service";
import { Request } from "express";
import { CommentRepository } from "src/repositories/comment";


@Injectable()
export class CommentService {
    constructor(private commentRepo: CommentRepository) { }

    async postComment(
        user_id: string,
        post_id: number,
        text: string,
        parent_id?: number
    ) {
        await this.commentRepo.create(user_id, post_id, text, parent_id);
    }

    async updateComment(
        user_id: string,
        comment_id: number,
        text: string
    ) {
        await this.commentRepo.update(user_id, comment_id, text)
    }

    async deleteComment(
        user_id: string,
        comment_id: number,
    ) {
        await this.commentRepo.delete(user_id, comment_id)
    }
}