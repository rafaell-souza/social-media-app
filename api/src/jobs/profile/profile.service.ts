import { Injectable } from "@nestjs/common";
import { Request } from "express";
import { NoContent } from "src/exceptions/excepetion";
import { JwtService } from "src/helpers/jwt.service";
import { IUpdateProfile } from "src/interfaces/IUpdateProfile";
import { ProfileRepository } from "src/repositories/ProfileRepository";

@Injectable()
export class ProfileService {
    constructor(
        private jwtService: JwtService,
        private profileRepo: ProfileRepository
    ) { }

    async GetProfile(id?: string, req?: Request) {
        if (!id) {
            const authToken = req.headers.authorization.split(" ")[1];
            const userid = this.jwtService.decode(authToken);
            return await this.profileRepo.find(userid);
        }

        const profile = await this.profileRepo.find(id);

        if (!profile)
            throw new NoContent("Sorry, no content was found");

        return profile;
    }

    async UpdateProfile(req: Request, data: IUpdateProfile) {
        const authToken = req.headers.authorization.split(" ")[1];
        const userid = this.jwtService.decode(authToken);
        return await this.profileRepo.update(userid, data);
    }
}