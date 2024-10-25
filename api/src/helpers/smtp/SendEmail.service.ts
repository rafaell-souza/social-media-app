import { htmlCode , transporter } from "./config";
import { Injectable } from "@nestjs/common";

@Injectable()
export class SendEmailService {
    async to(
        name: string,
        email: string,
        access_token: string
    ) {
        return await transporter.sendMail({
            subject: "Email confirmation",
            from: "Rafael Souza <rafaellsza03@gmail.com>",
            to: email,
            html: htmlCode (access_token, name)
        });
    }
}
