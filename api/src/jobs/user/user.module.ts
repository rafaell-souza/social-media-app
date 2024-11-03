import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { UserRepository } from "src/repository/UserRepository";
import { HelperModule } from "src/helpers/helper.module";
import { AccessMiddleware } from "src/middlewares/accessMiddleware";
import { TokenRepository } from "src/repository/TokenRepository";
import { ProfileController } from "../profile/profile.controller";

@Module({
    controllers: [UserController],
    providers: [UserService, UserRepository, TokenRepository],
    imports: [HelperModule]
})
export class UserModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(AccessMiddleware)
            .forRoutes(ProfileController)
    }
}