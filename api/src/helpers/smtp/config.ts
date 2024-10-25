import "dotenv/config";
import * as nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false, 
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
    tls: {
        rejectUnauthorized: false
    }
} as SMTPTransport.Options);


const htmlCode  = (access_token: string, name: string) => {
    const htmlContent = `
    <html>
        <body style="font-family: Arial, sans-serif; margin: 0; padding: 0;">
            <table width="100%" style="background-color: #f4f4f4; padding: 20px;">
                <tr>
                    <td>
                        <table width="600px" align="center" style="background-color: #ffffff; padding: 20px; border-radius: 5px;">
                            <tr>
                                <td>
                                    <h2 style="color: #333;">Welcome, ${name}!</h2>
                                    <p>Thank you for testing my application. I'm excited to have you on board!</p>
                                    <p>Please verify your email by clicking the button below:</p>
                                    <a href="https://your-application-url.com/verify?token=${access_token}" 
                                       style="display: inline-block; padding: 10px 20px; margin-top: 10px; 
                                              color: #ffffff; background-color: #4CAF50; 
                                              text-decoration: none; border-radius: 5px;">
                                        Verify Email
                                    </a>
                                    <p style="color: #777; margin-top: 20px;">If you didn’t request this, you can ignore this email.</p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </body>
    </html>
`;
    return htmlContent;
}

export { htmlCode , transporter };