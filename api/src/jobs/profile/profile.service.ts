import { Injectable } from "@nestjs/common";
import { Request } from "express";
import { JwtService } from "src/helpers/jwt.service";
import { ProfileRepository } from "src/repository/ProfileRepository";

@Injectable()
export class ProfileService {
    constructor(
        private jwtService: JwtService,
        private profileRepo: ProfileRepository
    ) { }

    async GetProfile(req: Request) {
        const authToken = req.headers.authorization.split(" ")[1];
        const userid = this.jwtService.decode(authToken);
        return await this.profileRepo.find(userid);
    }
}