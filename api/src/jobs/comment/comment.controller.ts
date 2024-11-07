import { Controller, Post, Get, Put, Body, Req, Res, Param, Delete } from "@nestjs/common";
import { CommentDto } from "src/dtos/CommentDto";
import { Request, Response } from "express";
import { CommentService } from "./comment.service";

@Controller("comment")
export class CommentController {
    constructor(private commentService: CommentService) { }

    @Post("/:postId/:parentId?")
    async NewComment(
        @Body() commentDto: CommentDto,
        @Res() res: Response,
        @Req() req: Request,
        @Param("postId") postId: string,
        @Param("parentId") parentId?: string
    ) {
        await this.commentService.CreateComment(
            req, Number(postId), commentDto.text, Number(parentId)
        );
        return res.status(201).json({
            message: "New comment created",
            success: true
        })
    }

    @Put("/:commentId")
    async UpdateComment(
        @Body() commentDto: CommentDto,
        @Res() res: Response,
        @Req() req: Request,
        @Param("commentId") commentId: string,
    ) {
        await this.commentService.UpdateComment(req, Number(commentId), commentDto.text);
        return res.status(200).json({
            message: "Comment updated",
            success: true
        })
    }

    @Delete("/:commentId")
    async DeleteComment(
        @Res() res: Response,
        @Req() req: Request,
        @Param("commentId") commentId: string,
    ) {
        await this.commentService.DeleteComment(req, Number(commentId));
        return res.status(200).json({
            message: "Comment deleted",
            success: true
        })
    }
}