import path from "path";
import { sendEmail } from "./emailSender";
import { readEmailDataFromExcel, EmailData } from "./emailReader";

async function sendMailsFromExcel(excelFilePath: string) {
  try {
    const emailData: EmailData[] = readEmailDataFromExcel(excelFilePath);

    for (const { email, subject, content } of emailData) {
      await sendEmail(subject, email, content);
    }

    console.log("All emails sent successfully!");
  } catch (error) {
    console.error("Error sending emails:", error);
  }
}

const currentDirectory = __dirname;
const parentDirectory = path.join(currentDirectory, "..");
const excelFileName = "emails.xlsx";
const excelFilePath = path.join(parentDirectory, excelFileName);

sendMailsFromExcel(excelFilePath);
