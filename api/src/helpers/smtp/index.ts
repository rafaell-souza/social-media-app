import * as nodemailer from "nodemailer";
import smtpConfig from "./config";
import SMTPTransport from "nodemailer/lib/smtp-transport"; 

const transporter = nodemailer.createTransport({
    host: smtpConfig.host,
    port: smtpConfig.port,
    secure: false,
    auth: {
        user: smtpConfig.user,
        pass: smtpConfig.pass
    },
    tls: {
        rejectUnauthorized: false
    }
} as SMTPTransport.Options );

export async function SendVerificatioCode(
    name: string,
    email: string,
) {
    await transporter.sendMail({
        text: `Welcome ${name}!`,
        subject: "Email confirmation",
        from: "Rafael Souza <rafaellsza03@gmail.com>",
        to: email
    })
}