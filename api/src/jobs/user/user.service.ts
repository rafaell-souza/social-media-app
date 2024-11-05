import { UserRepository } from "src/repositories/UserRepository";
import { Request } from "express";
import { JwtService } from "src/helpers/jwt.service";
import { Injectable } from "@nestjs/common";
import { HashService } from "src/helpers/hash.service";
import { BadRequest } from "src/exceptions/excepetion";

@Injectable()
export class UserService {
    constructor(
        private userRepo: UserRepository,
        private jwtService: JwtService,
        private hashService: HashService
    ) { }

    async GetUserDatails(req: Request) {
        const authToken = req.headers.authorization.split(" ")[1];
        const id = this.jwtService.decode(authToken)
        const data = await this.userRepo.findById(id);
        
        return {
            id: data.id,
            name: data.name,
            email: data.email,
            verified: data.verified,
            type: data.type
        }
    }

    async DeleteUser(req: Request) {
        const authToken = req.headers.authorization.split(" ")[1];
        const id = this.jwtService.decode(authToken)
        return await this.userRepo.delete(id);
    }

    async ResetPassword(
        req: Request,
        data: { oldPassword: string, password: string }
    ) {
        const authToken = req.headers.authorization.split(" ")[1];
        const id = this.jwtService.decode(authToken);

        const { password } = await this.userRepo.findById(id);
        const isEqual = await this.hashService.compare(data.oldPassword, password);

        if (!isEqual)
            throw new BadRequest("Wrong user password");

        data.password = await this.hashService.hash(data.password)
        await this.userRepo.update(id, { password: data.password });
    }
}