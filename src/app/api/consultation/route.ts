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

const projectTypeLabels: Record<string, string> = {
  residential: "Жилищен обект",
  commercial: "Търговски обект",
  industrial: "Индустриален обект",
  other: "Друго",
};

const interestLabels: Record<string, string> = {
  installation: "Монтаж на фотоволтаична система",
  design: "Проектиране",
  maintenance: "Поддръжка и мониторинг",
  consulting: "Консултантски услуги",
};

const sourceLabels: Record<string, string> = {
  page: "Страница за консултация",
  section: "Форма на страница За нас",
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const guardResponse = guardFormRequest(
      request,
      sanitizeField(body._gotcha),
    );
    if (guardResponse) return guardResponse;

    const source = sanitizeField(body.source) || "page";
    const name = sanitizeField(body.name);
    const company = sanitizeField(body.company);
    const email = sanitizeField(body.email);
    const phone = sanitizeField(body.phone);
    const projectType = sanitizeField(body.projectType);
    const interest = sanitizeField(body.interest);
    const message = sanitizeField(body.message, 10_000);

    if (!email || !phone) {
      return createValidationError("Missing required fields");
    }

    if (source === "page" && !name) {
      return createValidationError("Missing required fields");
    }

    if (!isValidEmail(email)) {
      return createValidationError("Invalid email address");
    }

    if (!validateMessageLength(message)) {
      return createValidationError("Message is too long");
    }

    const subjectName = name || email;

    await sendFormEmail({
      subject: `Заявка за консултация: ${subjectName}`,
      title: "Нова заявка за консултация",
      replyTo: email,
      fields: [
        { label: "Източник", value: sourceLabels[source] || source },
        { label: "Име", value: name },
        { label: "Фирма", value: company },
        { label: "Имейл", value: email },
        { label: "Телефон", value: phone },
        {
          label: "Тип проект",
          value: projectTypeLabels[projectType] || projectType,
        },
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

    console.error("Error sending consultation email:", error);
    return createServerError();
  }
}
