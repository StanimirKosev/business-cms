import { NextRequest, NextResponse } from "next/server";
import { contactSchema } from "@repo/ui/validation";
import { sendContactEmail } from "@/lib/email";

// Error codes for frontend translation
export const ContactErrorCodes = {
  VALIDATION_ERROR: "VALIDATION_ERROR",
  RATE_LIMIT_EXCEEDED: "RATE_LIMIT_EXCEEDED",
  EMAIL_SEND_FAILED: "EMAIL_SEND_FAILED",
  SERVER_ERROR: "SERVER_ERROR",
} as const;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const validationResult = contactSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          errorCode: ContactErrorCodes.VALIDATION_ERROR,
        },
        { status: 400 }
      );
    }

    const { name, email, phone, message, website } = validationResult.data;

    if (website) {
      console.log("[SPAM DETECTED] Honeypot field filled:", { name, email });
      return NextResponse.json(
        {
          success: false,
          errorCode: ContactErrorCodes.VALIDATION_ERROR,
        },
        { status: 400 }
      );
    }

    console.log("[CONTACT FORM] Submission received:", {
      name,
      email,
      phone,
      message,
    });

    const emailResult = await sendContactEmail({ name, email, phone, message });

    if (!emailResult.success) {
      return NextResponse.json(
        {
          success: false,
          errorCode: ContactErrorCodes.EMAIL_SEND_FAILED,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      messageCode: "CONTACT_SUCCESS",
    });
  } catch (error) {
    console.error("[CONTACT FORM] Error:", error);

    return NextResponse.json(
      {
        success: false,
        errorCode: ContactErrorCodes.SERVER_ERROR,
      },
      { status: 500 }
    );
  }
}
