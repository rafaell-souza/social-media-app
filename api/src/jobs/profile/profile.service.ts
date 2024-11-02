import { Injectable } from "@nestjs/common";
import { Request } from "express";
import { JwtService } from "src/helpers/jwt.service";
import { IUpdateProfile } from "src/interfaces/IUpdateProfile";
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
        return await this.profileRepo.find("d23a5d47-04d3-42f8-b24d-0e27798bca5c");
    }

    async UpdateProfile(req: Request, data: IUpdateProfile) {
        const authToken = req.headers.authorization.split(" ")[1];
        const userid = this.jwtService.decode(authToken);
        return await this.profileRepo.update("d23a5d47-04d3-42f8-b24d-0e27798bca5c", data);
    }
}