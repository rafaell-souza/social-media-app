import { InternalError } from "src/exceptions/excepetion";
import transporter from "./config";
import { Injectable } from "@nestjs/common";

@Injectable()
export class SendEmailService {
    async to(
        name: string,
        email: string,
        access_token: string,
        template: string
    ) {
        try {
            await transporter.sendMail({
                to: email,
                from: "No reply",
                html: `Oi ${name} seu token é ${access_token}`
            } as any)
        }
        catch (error) {
            throw new InternalError(`Error: ${error}`)
        }
    }
}
