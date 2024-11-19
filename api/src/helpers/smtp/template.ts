const generateTemplate = async (
    name: string,
    token: string
) => {
    const emailTemplate = `
        <html>
        <body>
            <h2>Hello, ${name}!</h2>
            <p>Thank you for signing up. Please confirm your email by clicking the link below:</p>
            <a href="https://yoursite.com/confirm-email?token=${token}">Confirm Email</a>
            <p>If you did not request this, please ignore this email.</p>
            <br />
            <p>Best regards,<br/>developer</p>
        </body>
        </html>
    `;

    const passTemplate = `
        <html>
        <body>
            <h2>Hello, ${name}!</h2>
            <p>We received a request to reset your account password.</p>
            <p>If you wish to reset your password, please click the link below:</p>
            <a href="https://yoursite.com/reset-password?token=${token}">Reset Password</a>
            <p>If you did not request this change, please ignore this email.</p>
            <br />
            <p>Best regards,<br/>developer</p>
        </body>
        </html>
    `;

    return { emailTemplate, passTemplate };
};
export default generateTemplate;
