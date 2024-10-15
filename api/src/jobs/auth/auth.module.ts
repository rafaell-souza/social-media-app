import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtService } from "src/helpers/jwt.service";
import { UserCases } from "src/UseCases/User-Cases/user.service";
import { UserRepository } from "src/repositories/UserRepository";
import { PrismaService } from "src/prisma.service";

@Module({
    controllers: [AuthController],
    providers: [AuthService, JwtService,  UserCases, UserRepository, PrismaService]
})
export class AuthModule { }