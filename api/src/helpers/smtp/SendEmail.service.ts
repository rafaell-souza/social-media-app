import transporter from "./config";
import { Injectable } from "@nestjs/common";
import generateTemplate from "./template";

@Injectable()
export class SendEmailService {
    async to(
        name: string,
        email: string,
        token: string,
        template: string
    ) {
        try {
            const {
                resetPasswordTemplate,
                confirmEmailTemplate
            } = await generateTemplate(name, token);

            await transporter.sendMail({
                to: email,
                from: "No reply",
                html: template === "email" ? confirmEmailTemplate : resetPasswordTemplate
            } as any)
        }
        catch (error) {
            console.error(error)
        }
    }
}
