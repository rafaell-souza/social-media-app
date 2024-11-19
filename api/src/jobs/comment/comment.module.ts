import { Module } from "@nestjs/common";
import { CommentController } from "./comment.controller";
import { CommentService } from "./comment.service";
import { HelperModule } from "src/helpers/helper.module";
import { CommentRepository } from "src/repositories/comment";
import { PrismaModule } from "src/prisma/prisma.module";

@Module({
    controllers: [CommentController],
    providers: [CommentService, CommentRepository],
    imports: [PrismaModule, HelperModule]
})
export class CommentModule { };