import * as XLSX from "xlsx";

export interface EmailData {
  email: string;
  subject: string;
  content: string;
}

export function readEmailDataFromExcel(filePath: string): EmailData[] {
  const workbook = XLSX.readFile(filePath);
  const emailSheetName = workbook.SheetNames[0];
  const emailSheet = workbook.Sheets[emailSheetName];
  const emailData: EmailData[] = [];

  for (let i = 2; ; i++) {
    const emailCell = emailSheet["A" + i];
    const subjectCell = emailSheet["B" + i];
    const bodyCell = emailSheet["C" + i];

    if (!emailCell || !emailCell.v) break;

    const email = emailCell.v.toString().trim();
    const subject = subjectCell ? subjectCell.v.toString().trim() : "";
    const content = bodyCell ? bodyCell.v.toString().trim() : "";

    emailData.push({ email, subject, content });
  }

  return emailData;
}
