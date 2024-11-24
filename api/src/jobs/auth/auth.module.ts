import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UserRepository } from "src/repositories/user";
import { TokenRepository } from "src/repositories/token";
import { GoogleStrategy } from "../../helpers/google.strategy";

@Module({
    controllers: [AuthController],
    providers: [AuthService, UserRepository, TokenRepository, GoogleStrategy],
})
export class AuthModule { }