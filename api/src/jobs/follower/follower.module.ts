import { Module } from "@nestjs/common";
import { HelperModule } from "src/helpers/helper.module";
import { FollowerController } from "./follower.controller";
import { FollowerRepository } from "src/repositories/follower";
import { PrismaModule } from "src/prisma/prisma.module";

@Module({
    imports: [PrismaModule, HelperModule],
    controllers: [FollowerController],
    providers: [FollowerRepository]
})
export class FollowerModule { }