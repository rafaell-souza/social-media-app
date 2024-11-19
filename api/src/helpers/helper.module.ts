import { Global, Module } from "@nestjs/common";
import { JwtService } from "./jwt.service";
import { HashService } from "./hash.service";
import { EmailService } from "./smtp/email.service";

@Global()
@Module({
    providers: [JwtService, HashService, EmailService],
    exports: [JwtService, HashService, EmailService], 
})
export class HelperModule {}
