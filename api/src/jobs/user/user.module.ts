import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { UserRepository } from "src/repositories/user";
import { HelperModule } from "src/helpers/helper.module";
import { PrismaModule } from "src/prisma/prisma.module";

@Module({
    controllers: [UserController],
    providers: [UserService, UserRepository],
    imports: [PrismaModule, HelperModule]
})
export class UserModule { }