import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { UserRepository } from "src/repositories/UserRepository";
import { HelperModule } from "src/helpers/helper.module";
import { AccessMiddleware } from "src/middlewares/accessMiddleware";
import { TokenRepository } from "src/repositories/TokenRepository";

@Module({
    controllers: [UserController],
    providers: [UserService, UserRepository, TokenRepository],
    imports: [HelperModule]
})
export class UserModule  {}