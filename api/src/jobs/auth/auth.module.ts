import { Module, RequestMethod } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UserRepository } from "src/repositories/UserRepository";
import { TokenRepository } from "src/repositories/TokenRepository";
import { GoogleStrategy } from "../../helpers/google.strategy";
import { SendEmailService } from "src/helpers/smtp/SendEmail.service";
import { NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AccessMiddleware } from "src/middlewares/accessMiddleware";
import { HelperModule } from "src/helpers/helper.module";

@Module({
    controllers: [AuthController],
    providers: [
        AuthService,
        UserRepository, TokenRepository,
        GoogleStrategy, SendEmailService
    ],
    imports: [HelperModule]
})
export class AuthModule {}