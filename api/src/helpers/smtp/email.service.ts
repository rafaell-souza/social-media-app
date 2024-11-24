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

        try {
            await transporter.sendMail({
                to: email,
                from: `dev aplication`,
                subject: "#verification",
                html: template === "email" ? emailTemplate : passTemplate
            })
        } catch (error) {
            console.error(error.message)
        }
    }
}
