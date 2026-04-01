import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const position = formData.get("position") as string;
    const experience = formData.get("experience") as string;
    const currentRole = formData.get("currentRole") as string;
    const message = formData.get("message") as string;
    const cvFile = formData.get("cvFile") as File | null;

    // Validate required fields
    if (!firstName || !lastName || !email || !position) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    // Create email transporter
    // TODO: Configure with your email credentials (Gmail, SMTP, etc.)
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: false,
      auth: {
        user: process.env.SMTP_USER || "your-email@gmail.com",
        pass: process.env.SMTP_PASS || "your-app-password",
      },
    });

    // Build email content
    const positionLabels: Record<string, string> = {
      "solar-installer": "Монтажник на соларни панели",
      "project-manager": "Ръководител проекти",
      "sales-rep": "Търговски представител",
      "electrical-engineer": "Електроинженер",
      other: "Друга",
    };

    const experienceLabels: Record<string, string> = {
      "0-1": "0-1 години (начално ниво)",
      "1-3": "1-3 години",
      "3-5": "3-5 години",
      "5-10": "5-10 години",
      "10+": "10+ години",
    };

    const emailBody = `
<h2>Нова кандидатура за работа</h2>
<p><strong>Име:</strong> ${firstName} ${lastName}</p>
<p><strong>Имейл:</strong> ${email}</p>
<p><strong>Телефон:</strong> ${phone || "Не е посочен"}</p>
<p><strong>Позиция:</strong> ${positionLabels[position] || position}</p>
<p><strong>Опит:</strong> ${experienceLabels[experience] || experience || "Не е посочен"}</p>
<p><strong>Настояща/последна позиция:</strong> ${currentRole || "Не е посочена"}</p>
<p><strong>Съобщение:</strong></p>
<p>${message || "Няма съобщение"}</p>
    `.trim();

    // Prepare attachments
    const attachments = [];
    if (cvFile && cvFile.size > 0) {
      const bytes = await cvFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      attachments.push({
        filename: cvFile.name,
        content: buffer,
      });
    }

    // Send email
    await transporter.sendMail({
      from: process.env.SMTP_FROM || "careers@vscs-bg.com",
      to: process.env.SMTP_TO || "hr@vscs-bg.com",
      subject: `Нова кандидатура: ${firstName} ${lastName} - ${positionLabels[position] || position}`,
      html: emailBody,
      attachments,
    });

    return NextResponse.json(
      { message: "Application submitted successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error sending application email:", error);
    return NextResponse.json(
      { error: "Failed to send application" },
      { status: 500 },
    );
  }
}
