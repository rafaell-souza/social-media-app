import { Controller, Post, Put, Body, Req, Res, Param, Delete } from "@nestjs/common";
import { CommentDto } from "src/dto/CommentDto";
import { Request, Response } from "express";
import { CommentService } from "./comment.service";

@Controller("comment")
export class CommentController {
    constructor(private commentService: CommentService) { }

    @Post("/:post_id/:parent_id?")
    async postComment(
        @Body() dto: CommentDto,
        @Req() req: any,
        @Param("post_id") post_id: number,
        @Param("parent_id") parent_id?: number
    ) {
        const userId: string = req.user.id;
        return await this.commentService.postComment(
            userId, post_id, dto.text, parent_id
        );
    }

    @Put("/:comment_id")
    async updateComment(
        @Body() dto: CommentDto,
        @Req() req: any,
        @Param("comment_id") comment_id: number,
    ) {
        const userId: string = req.user.id;
        return await this.commentService.updateComment(userId, comment_id, dto.text);
    }

    @Delete("/:comment_id")
    async deleteComment(
        @Req() req: any,
        @Param("commentId") comment_id: number,
    ) {
        const userId: string = req.user.id;
        return await this.commentService.deleteComment(userId, comment_id);
    }
}