import { Module } from "@nestjs/common";
import { ProfileService } from "./profile.service";
import { ProfileController } from "./profile.controller";
import { HelperModule } from "src/helpers/helper.module";
import { ProfileRepository } from "src/repository/ProfileRepository";

@Module({
    controllers: [ProfileController],
    providers: [ProfileService, ProfileRepository],
    imports: [HelperModule]
})
export class ProfileModule { }