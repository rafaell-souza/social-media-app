import { Module } from "@nestjs/common";
import { CommentController } from "./comment.controller";
import { CommentService } from "./comment.service";
import { CommentRepository } from "src/repositories/comment";

@Module({
    controllers: [CommentController],
    providers: [CommentService, CommentRepository],
})
export class CommentModule { };