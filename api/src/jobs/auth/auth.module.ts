import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UserRepository } from "src/repositories/user";
import { TokenRepository } from "src/repositories/token";
import { GoogleStrategy } from "../../helpers/google.strategy";
import { PrismaModule } from "src/prisma/prisma.module";
import { HelperModule } from "src/helpers/helper.module";

@Module({
    controllers: [AuthController],
    providers: [AuthService, UserRepository, TokenRepository, GoogleStrategy],
    imports: [PrismaModule, HelperModule]
})
export class AuthModule { }