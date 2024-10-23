import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtService } from "src/helpers/jwt.service";
import { UserUseCases } from "../../UseCases/UserUseCases.service";
import { UserRepository } from "src/repository/UserRepository";
import { PrismaService } from "src/prisma.service";
import { HashService } from "src/helpers/hash.service";
import { TokenRepository } from "src/repository/TokenRepository";
import { GoogleStrategy } from "../../helpers/google.strategy";

@Module({
    controllers: [AuthController],
    providers: [
        AuthService, JwtService,
        UserUseCases, UserRepository,
        PrismaService, HashService,
        TokenRepository, GoogleStrategy
    ]
})
export class AuthModule { }