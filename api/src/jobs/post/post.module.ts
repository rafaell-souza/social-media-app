import { Module, MiddlewareConsumer, NestModule, RequestMethod } from "@nestjs/common";
import { HelperModule } from "src/helpers/helper.module";
import { PostController } from "./post.controller";
import { PostService } from "./post.service";
import { PostRepository } from "src/repositories/postRepository";
import { AccessMiddleware } from "src/middlewares/accessMiddleware";
import { TokenRepository } from "src/repositories/TokenRepository";
import { UserRepository } from "src/repositories/UserRepository";

@Module({
    imports: [HelperModule],
    providers: [PostService, PostRepository, UserRepository, TokenRepository],
    controllers: [PostController]
})
export class PostModule {}