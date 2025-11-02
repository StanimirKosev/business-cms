import { NextRequest, NextResponse } from "next/server";
import { contactSchema } from "@repo/ui/validation";
import { sendContactEmail } from "@/lib/email";

// Error codes for frontend translation
const ContactErrorCodes = {
  VALIDATION_ERROR: "VALIDATION_ERROR",
  RATE_LIMIT_EXCEEDED: "RATE_LIMIT_EXCEEDED",
  EMAIL_SEND_FAILED: "EMAIL_SEND_FAILED",
  SERVER_ERROR: "SERVER_ERROR",
} as const;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Bot detection: Check submission time (must be >= 3 seconds)
    const { _submitTime, ...formData } = body;
    if (typeof _submitTime === "number" && _submitTime < 3000) {
      console.log("[CONTACT FORM] Bot detected: submission too fast", {
        submitTime: _submitTime,
      });
      return NextResponse.json(
        { success: false, errorCode: ContactErrorCodes.RATE_LIMIT_EXCEEDED },
        { status: 429 }
      );
    }

    const validationResult = contactSchema.safeParse(formData);

    if (!validationResult.success) {
      return NextResponse.json(
        { success: false, errorCode: ContactErrorCodes.VALIDATION_ERROR },
        { status: 400 }
      );
    }

    const { name, email, phone, message, consent, website } =
      validationResult.data;

    // Honeypot check: if website field is filled, it's a bot
    if (!consent || website) {
      console.log("[CONTACT FORM] Bot detected: honeypot triggered or no consent", {
        website: !!website,
        consent,
      });
      return NextResponse.json(
        { success: false, errorCode: ContactErrorCodes.VALIDATION_ERROR },
        { status: 400 }
      );
    }

    console.log("[CONTACT FORM] Submission received:", {
      name,
      email,
      phone,
      message,
    });

    const emailResult = await sendContactEmail({
      name,
      email,
      phone,
      message,
      consent,
    });

    if (!emailResult.success) {
      return NextResponse.json(
        { success: false, errorCode: ContactErrorCodes.EMAIL_SEND_FAILED },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, messageCode: "CONTACT_SUCCESS" });
  } catch (error) {
    console.error("[CONTACT FORM] Error:", error);

    return NextResponse.json(
      { success: false, errorCode: ContactErrorCodes.SERVER_ERROR },
      { status: 500 }
    );
  }
}
