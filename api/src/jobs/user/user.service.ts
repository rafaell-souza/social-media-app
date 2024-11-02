import { UserRepository } from "src/repository/UserRepository";
import { Request } from "express";
import { JwtService } from "src/helpers/jwt.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class UserService {
    constructor(
        private userRepo: UserRepository,
        private jwtService: JwtService
    ) { }

    async GetUserDatails(req: Request) {
        const authToken = req.headers.authorization.split(" ")[1];
        const id = this.jwtService.decode(authToken)
        return await this.userRepo.findById(id);
    }

    async DeleteUser(req: Request) {
        const authToken = req.headers.authorization.split(" ")[1];
        const id = this.jwtService.decode(authToken)
        return await this.userRepo.delete(id);
    }
}