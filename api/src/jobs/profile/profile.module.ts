import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { ProfileService } from "./profile.service";
import { ProfileController } from "./profile.controller";
import { HelperModule } from "src/helpers/helper.module";
import { ProfileRepository } from "src/repository/ProfileRepository";
import { AccessMiddleware } from "src/middlewares/accessMiddleware";
import { TokenRepository } from "src/repository/TokenRepository";
import { UserRepository } from "src/repository/UserRepository";

@Module({
    controllers: [ProfileController],
    providers: [ProfileService, ProfileRepository, TokenRepository, UserRepository],
    imports: [HelperModule]
})
export class ProfileModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(AccessMiddleware)
            .forRoutes(
                { path: "profile/:id?", method: RequestMethod.GET },
                { path: "profile", method: RequestMethod.PATCH }
            )
    }
}