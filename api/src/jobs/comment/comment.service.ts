import { Injectable } from "@nestjs/common";
import { JwtService } from "src/helpers/jwt.service";
import { Request } from "express";
import { CommentRepository } from "src/repositories/CommentRepository";


@Injectable()
export class CommentService {
    constructor(
        private jwtService: JwtService,
        private commentRepo: CommentRepository
    ) { }

    async CreateComment(
        req: Request,
        postId: number,
        text: string,
        parentId?: number
    ) {
        const access_token = req.headers.authorization.split(" ")[1];
        const userId = this.jwtService.decode(access_token);
        await this.commentRepo.create(userId, postId, text, parentId);
    }

    async UpdateComment(
        req: Request,
        commentId: number,
        text: string
    ) {
        const access_token = req.headers.authorization.split(" ")[1];
        const userId = this.jwtService.decode(access_token);
        await this.commentRepo.update(userId, commentId, text)
    }

    async DeleteComment(
        req: Request,
        commentId: number,
    ) {
        const access_token = req.headers.authorization.split(" ")[1];
        const userId = this.jwtService.decode(access_token);
        await this.commentRepo.delete(userId, commentId)
    }
}