import {  Module } from "@nestjs/common";
import { ProfileService } from "./profile.service";
import { ProfileController } from "./profile.controller";
import { HelperModule } from "src/helpers/helper.module";
import { ProfileRepository } from "src/repositories/profile";
import { TokenRepository } from "src/repositories/token";
import { UserRepository } from "src/repositories/user";
import { PrismaModule } from "src/prisma/prisma.module";

@Module({
    controllers: [ProfileController],
    providers: [ProfileService, ProfileRepository, TokenRepository, UserRepository],
    imports: [PrismaModule, HelperModule]
})
export class ProfileModule {}