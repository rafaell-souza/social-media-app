import { Module } from "@nestjs/common";
import { PostController } from "./post.controller";
import { PostService } from "./post.service";
import { PostRepository } from "src/repositories/post";
import { PrismaModule } from "src/prisma/prisma.module";
import { HelperModule } from "src/helpers/helper.module";

@Module({
    imports: [PrismaModule, HelperModule],
    providers: [PostService, PostRepository],
    controllers: [PostController]
})
export class PostModule {}