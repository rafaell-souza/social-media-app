import { Module } from "@nestjs/common";
import { FollowerController } from "./follower.controller";
import { FollowerRepository } from "src/repositories/follower";

@Module({
    controllers: [FollowerController],
    providers: [FollowerRepository]
})
export class FollowerModule { }