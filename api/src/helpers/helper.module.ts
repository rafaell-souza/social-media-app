import { Module } from "@nestjs/common";
import { JwtService } from "./jwt.service";
import { HashService } from "./hash.service";
import { PrismaService } from "src/prisma.service";
import { SendEmailService } from "./smtp/SendEmail.service";

@Module({
    providers: [JwtService, HashService, PrismaService, SendEmailService],
    exports: [PrismaService, JwtService, HashService, SendEmailService]
})

export class HelperModule { }