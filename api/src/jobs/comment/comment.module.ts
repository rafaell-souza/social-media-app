import { Module } from "@nestjs/common";
import { CommentController } from "./comment.controller";
import { CommentService } from "./comment.service";
import { HelperModule } from "src/helpers/helper.module";
import { CommentRepository } from "src/repositories/CommentRepository";

@Module({
    controllers: [CommentController],
    providers: [CommentService, CommentRepository],
    imports: [HelperModule]
})
export class CommentModule { };