import { NextRequest, NextResponse } from "next/server";
import {
  getClientIp,
  isHoneypotTriggered,
  isRateLimited,
} from "@/lib/email";

export function createSpamOkResponse() {
  return NextResponse.json({ message: "Submitted successfully" }, { status: 200 });
}

export function createValidationError(message: string) {
  return NextResponse.json({ error: message }, { status: 400 });
}

export function createServerError() {
  return NextResponse.json(
    { error: "Failed to send message. Please try again later." },
    { status: 500 },
  );
}

export function createServiceUnavailableError() {
  return NextResponse.json(
    { error: "Email service is not configured." },
    { status: 503 },
  );
}

export function guardFormRequest(request: NextRequest, honeypot: string) {
  if (isHoneypotTriggered(honeypot)) {
    return createSpamOkResponse();
  }

  const ip = getClientIp(request);
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 },
    );
  }

  return null;
}
