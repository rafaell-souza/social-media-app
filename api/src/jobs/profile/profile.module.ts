import {  Module } from "@nestjs/common";
import { ProfileService } from "./profile.service";
import { ProfileController } from "./profile.controller";
import { ProfileRepository } from "src/repositories/profile";
import { TokenRepository } from "src/repositories/token";
import { UserRepository } from "src/repositories/user";

@Module({
    controllers: [ProfileController],
    providers: [ProfileService, ProfileRepository, TokenRepository, UserRepository],
})
export class ProfileModule {}