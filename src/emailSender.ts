import nodemailer from "nodemailer";

const smtpHost = "your-smtp-server";
const smtpPort = 587;
const emailUsername = "your-email@example.com";
const emailPassword = "your-email-password";

export async function sendEmail(
  subject: string,
  recipient: string,
  content: string
) {
  try {
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: false,
      auth: {
        user: emailUsername,
        pass: emailPassword,
      },
    });

    const mailOptions = {
      from: emailUsername,
      to: recipient,
      subject: subject,
      text: content,
    };

    const info = await transporter.sendMail(mailOptions);

    console.log("Email sent:", info.response);
    console.log("Preview URL: ", nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.error("Error sending email:", error);
  }
}
