import { NextRequest } from "next/server";
import {
  createServerError,
  createServiceUnavailableError,
  createSpamOkResponse,
  createValidationError,
  guardFormRequest,
} from "@/lib/form-api";
import {
  isValidEmail,
  sanitizeField,
  sendFormEmail,
  validateMessageLength,
} from "@/lib/email";

const interestLabels: Record<string, string> = {
  utility: "Utility / наземен монтаж",
  commercial: "Търговски покрив",
  bess: "BESS / съхранение",
  agripv: "Agri-PV",
  other: "Друго / проучване",
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const guardResponse = guardFormRequest(
      request,
      sanitizeField(body._gotcha),
    );
    if (guardResponse) return guardResponse;

    const name = sanitizeField(body.name);
    const company = sanitizeField(body.company);
    const email = sanitizeField(body.email);
    const phone = sanitizeField(body.phone);
    const interest = sanitizeField(body.interest);
    const message = sanitizeField(body.message, 10_000);

    if (!name || !email || !phone || !interest) {
      return createValidationError("Missing required fields");
    }

    if (!isValidEmail(email)) {
      return createValidationError("Invalid email address");
    }

    if (!validateMessageLength(message)) {
      return createValidationError("Message is too long");
    }

    await sendFormEmail({
      kind: "office",
      subject: `VSCS Priority waitlist: ${name}`,
      title: "Нова заявка за VSCS Priority waitlist",
      replyTo: email,
      fields: [
        { label: "Име", value: name },
        { label: "Фирма", value: company },
        { label: "Имейл", value: email },
        { label: "Телефон", value: phone },
        {
          label: "Интерес",
          value: interestLabels[interest] || interest,
        },
        { label: "Съобщение", value: message },
      ],
    });

    return createSpamOkResponse();
  } catch (error) {
    if (error instanceof Error && error.message === "SMTP is not configured") {
      return createServiceUnavailableError();
    }

    console.error("Error sending waitlist email:", error);
    return createServerError();
  }
}
