import { Module, RequestMethod } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtService } from "src/helpers/jwt.service";
import { UserUseCases } from "../../UseCases/UserUseCases.service";
import { UserRepository } from "src/repository/UserRepository";
import { PrismaService } from "src/prisma.service";
import { HashService } from "src/helpers/hash.service";
import { TokenRepository } from "src/repository/TokenRepository";
import { GoogleStrategy } from "../../helpers/google.strategy";
import { SendEmailService } from "src/helpers/smtp/SendEmail.service";
import { NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AccessMiddleware } from "src/middlewares/accessMiddleware";

@Module({
    controllers: [AuthController],
    providers: [
        AuthService, JwtService,
        UserUseCases, UserRepository,
        PrismaService, HashService,
        TokenRepository, GoogleStrategy,
        SendEmailService
    ]
})
export class AuthModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(AccessMiddleware)
            .forRoutes(
                { path: "auth/logout", method: RequestMethod.POST },
                { path: "confirm/:token", method: RequestMethod.PUT }
            )
    }
}