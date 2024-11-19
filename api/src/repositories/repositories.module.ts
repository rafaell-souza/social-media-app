import { Module } from "@nestjs/common";
import { Global } from "@nestjs/common";
import { UserRepository } from "./user";
import { ProfileRepository } from "./profile";
import { TokenRepository } from "./token";
import { PostRepository } from "./post";
import { FollowerRepository } from "./follower";
import { CommentRepository } from "./comment";

@Global()
@Module({
    providers: [
        UserRepository, ProfileRepository, TokenRepository,
        PostRepository, FollowerRepository, CommentRepository
    ],
    exports: [
        UserRepository, ProfileRepository, TokenRepository,
        PostRepository, FollowerRepository, CommentRepository
    ]
})

export class RepositoriesModule { }