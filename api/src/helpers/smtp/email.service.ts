import transporter from "./config";
import { Injectable } from "@nestjs/common";
import generateTemplate from "./template";

@Injectable()
export class EmailService {
    async send(
        name: string,
        email: string,
        token: string,
        template: string
    ) {
        const {
            passTemplate,
            emailTemplate
        } = await generateTemplate(name, token);

        await transporter.sendMail({
            to: email,
            from: "No reply",
            html: template === "email" ? emailTemplate : passTemplate
        })

    }
}
