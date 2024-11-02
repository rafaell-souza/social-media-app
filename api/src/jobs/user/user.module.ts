import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { UserRepository } from "src/repository/UserRepository";
import { HelperModule } from "src/helpers/helper.module";

@Module({
    controllers: [UserController],
    providers: [UserService, UserRepository],
    imports: [HelperModule]
})
export class UserModule { }