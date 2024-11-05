import {  Module } from "@nestjs/common";
import { ProfileService } from "./profile.service";
import { ProfileController } from "./profile.controller";
import { HelperModule } from "src/helpers/helper.module";
import { ProfileRepository } from "src/repositories/ProfileRepository";
import { TokenRepository } from "src/repositories/TokenRepository";
import { UserRepository } from "src/repositories/UserRepository";

@Module({
    controllers: [ProfileController],
    providers: [ProfileService, ProfileRepository, TokenRepository, UserRepository],
    imports: [HelperModule]
})
export class ProfileModule {}