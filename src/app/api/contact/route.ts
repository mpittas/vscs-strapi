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
    const message = sanitizeField(body.message, 10_000);

    if (!name || !email || !message) {
      return createValidationError("Missing required fields");
    }

    if (!isValidEmail(email)) {
      return createValidationError("Invalid email address");
    }

    if (!validateMessageLength(message)) {
      return createValidationError("Message is too long");
    }

    await sendFormEmail({
      subject: `Контактно запитване: ${name}`,
      title: "Ново контактно запитване",
      replyTo: email,
      fields: [
        { label: "Име", value: name },
        { label: "Фирма", value: company },
        { label: "Имейл", value: email },
        { label: "Телефон", value: phone },
        { label: "Съобщение", value: message },
      ],
    });

    return createSpamOkResponse();
  } catch (error) {
    if (error instanceof Error && error.message === "SMTP is not configured") {
      return createServiceUnavailableError();
    }

    console.error("Error sending contact email:", error);
    return createServerError();
  }
}
