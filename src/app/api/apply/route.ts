import { NextRequest } from "next/server";
import {
  createServerError,
  createServiceUnavailableError,
  createSpamOkResponse,
  createValidationError,
  guardFormRequest,
} from "@/lib/form-api";
import {
  sanitizeField,
  sendFormEmail,
  validateAttachment,
  validateMessageLength,
} from "@/lib/email";

const MAX_TEXT_LENGTH = 10_000;

const motivationLabels: Record<string, string> = {
  financial: "Финансово възнаграждение",
  development: "Развитие и учене",
  eco: "Приносът към екологични каузи",
  teamwork: "Колективната работа",
};

const effortResponseLabels: Record<string, string> = {
  ask_team: "Ще поискам подкрепа от екипа",
  continue_alone: "Ще продължа самостоятелно, докато не завърша",
  ask_manager: "Ще поискам инструкции от ръководителя",
  reassess: "Ще преразгледам приоритетите си",
};

const multiculturalLabels: Record<string, string> = {
  excited: "Вълнувам се от възможността",
  reserved: "Имам известни резерви, но съм готов/а да опитам",
  worried: "Изпитвам притеснения",
};

const conflictResolutionLabels: Record<string, string> = {
  compromise: "Разговор и търсене на компромис",
  management: "Обсъждане с ръководството",
  avoid: "Избягвам конфликтите",
  insist: "Държа на своето, без да отстъпвам",
};

const differentStyleLabels: Record<string, string> = {
  understand:
    "Опитвам се да разбера тяхната гледна точка и да намерим общо решение",
  insist_own:
    "Изразявам мнението си и настоявам на своя подход, ако смятам, че е правилен",
  manager_decides: "Оставям ръководителя да реши кой подход е по-добър",
  work_alone: "Работя самостоятелно, за да избегна конфликти",
};

function labelFor(value: string, labels: Record<string, string>): string {
  return labels[value] || value;
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const honeypot = sanitizeField(formData.get("_gotcha"));
    const guardResponse = guardFormRequest(request, honeypot);
    if (guardResponse) return guardResponse;

    const fullName = sanitizeField(formData.get("fullName"));
    const phone = sanitizeField(formData.get("phone"));
    const city = sanitizeField(formData.get("city"));
    const age = sanitizeField(formData.get("age"));
    const hasDrivingLicense = sanitizeField(formData.get("hasDrivingLicense"));
    const drivingCategories = sanitizeField(formData.get("drivingCategories"));
    const experienceDescription = sanitizeField(
      formData.get("experienceDescription"),
      MAX_TEXT_LENGTH,
    );
    const outdoorExperience = sanitizeField(
      formData.get("outdoorExperience"),
      MAX_TEXT_LENGTH,
    );
    const languages = sanitizeField(formData.get("languages"));
    const timeAbroadRestrictions = sanitizeField(
      formData.get("timeAbroadRestrictions"),
      MAX_TEXT_LENGTH,
    );
    const certificates = sanitizeField(
      formData.get("certificates"),
      MAX_TEXT_LENGTH,
    );
    const motivation = sanitizeField(formData.get("motivation"));
    const effortResponse = sanitizeField(formData.get("effortResponse"));
    const pressureHandling = sanitizeField(
      formData.get("pressureHandling"),
      MAX_TEXT_LENGTH,
    );
    const procedureAttitude = sanitizeField(
      formData.get("procedureAttitude"),
      MAX_TEXT_LENGTH,
    );
    const multiculturalAttitude = sanitizeField(
      formData.get("multiculturalAttitude"),
    );
    const conflictResolution = sanitizeField(
      formData.get("conflictResolution"),
    );
    const differentStyleHandling = sanitizeField(
      formData.get("differentStyleHandling"),
    );
    const colleagueRefusal = sanitizeField(
      formData.get("colleagueRefusal"),
      MAX_TEXT_LENGTH,
    );
    const nostalgiaHandling = sanitizeField(
      formData.get("nostalgiaHandling"),
      MAX_TEXT_LENGTH,
    );
    const situation1 = sanitizeField(
      formData.get("situation1"),
      MAX_TEXT_LENGTH,
    );
    const situation2 = sanitizeField(
      formData.get("situation2"),
      MAX_TEXT_LENGTH,
    );
    const photoFile = formData.get("photoFile") as File | null;

    if (!fullName || !phone || !city || !age) {
      return createValidationError("Missing required fields");
    }

    const longFields = [
      experienceDescription,
      outdoorExperience,
      timeAbroadRestrictions,
      certificates,
      pressureHandling,
      procedureAttitude,
      colleagueRefusal,
      nostalgiaHandling,
      situation1,
      situation2,
    ];

    if (longFields.some((field) => !validateMessageLength(field))) {
      return createValidationError("Message is too long");
    }

    const attachment = await validateAttachment(photoFile);
    const attachments = attachment ? [attachment] : [];

    await sendFormEmail({
      kind: "jobs",
      subject: `Нова кандидатура за работа: ${fullName}`,
      title: "Нова кандидатура за работа",
      fields: [
        { label: "Име", value: fullName },
        { label: "Телефон", value: phone },
        { label: "Град", value: city },
        { label: "Възраст", value: age },
        {
          label: "Шофьорска книжка",
          value:
            hasDrivingLicense === "yes"
              ? "Да"
              : hasDrivingLicense === "no"
                ? "Не"
                : hasDrivingLicense,
        },
        { label: "Категории", value: drivingCategories },
        { label: "Опит и умения", value: experienceDescription },
        { label: "Опит на открито", value: outdoorExperience },
        { label: "Езици", value: languages },
        {
          label: "Ограничения за престой в чужбина",
          value: timeAbroadRestrictions,
        },
        { label: "Сертификати", value: certificates },
        { label: "Мотивация", value: labelFor(motivation, motivationLabels) },
        {
          label: "Реакция при трудна задача",
          value: labelFor(effortResponse, effortResponseLabels),
        },
        { label: "Работа под натиск", value: pressureHandling },
        { label: "Отношение към процедури", value: procedureAttitude },
        {
          label: "Мултикултурна среда",
          value: labelFor(multiculturalAttitude, multiculturalLabels),
        },
        {
          label: "Разрешаване на конфликти",
          value: labelFor(conflictResolution, conflictResolutionLabels),
        },
        {
          label: "Различен стил на работа",
          value: labelFor(differentStyleHandling, differentStyleLabels),
        },
        { label: "Отказ от колега", value: colleagueRefusal },
        { label: "Носталгия/адаптация", value: nostalgiaHandling },
        { label: "Ситуация 1", value: situation1 },
        { label: "Ситуация 2", value: situation2 },
      ],
      attachments,
    });

    return createSpamOkResponse();
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "SMTP is not configured") {
        return createServiceUnavailableError();
      }

      if (
        error.message === "Attachment is too large" ||
        error.message === "Unsupported attachment type"
      ) {
        return createValidationError(error.message);
      }
    }

    console.error("Error sending application email:", error);
    return createServerError();
  }
}
