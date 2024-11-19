import { Injectable } from "@nestjs/common";
import { IProfileUpdate } from "src/interfaces/IUpdateProfile";
import { ProfileRepository } from "src/repositories/profile";

@Injectable()
export class ProfileService {
    constructor(
        private profileRepo: ProfileRepository
    ) { }

    async userProfile(userId: string) {
        return await this.profileRepo.find(userId);
    }

    async UpdateProfile(userId: string, data: IProfileUpdate) {
        return await this.profileRepo.update(userId, data);
    }
}