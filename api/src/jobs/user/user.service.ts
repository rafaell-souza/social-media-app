import { UserRepository } from "src/repositories/user";
import { Injectable } from "@nestjs/common";
import { HashService } from "src/helpers/hash.service";
import { BadRequest } from "src/exceptions/excepetion";
import { IuserResetPassword } from "src/interfaces/IUserResetPassword";

@Injectable()
export class UserService {
    constructor(
        private userRepo: UserRepository,
        private hashService: HashService
    ) { }

    async getUserData(userId: string) {
        const data = await this.userRepo.findById(userId);
        return {
            id: data.id,
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email, verified: data.verified,
            type: data.type
        }
    }

    async DeleteUser(userId: string) {
        return await this.userRepo.delete(userId);
    }

    async ResetPassword(userId: string, data: IuserResetPassword) {
        const { password } = await this.userRepo.findById(userId);

        const match = await this.hashService.compareData(data.oldPassword, password);
        if (!match) throw new BadRequest("Wrong user password");

        const hashedPassword = await this.hashService.hashData(data.password)
        return await this.userRepo.update(userId, { password: hashedPassword });
    }
}