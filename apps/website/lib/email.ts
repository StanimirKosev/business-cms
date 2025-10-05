import { Resend } from "resend";
import { type ContactFormValues } from "@repo/ui/validation";

const RESEND_API_KEY = process.env.RESEND_API_KEY!;
const CONTACT_EMAIL_TO = process.env.CONTACT_EMAIL_TO!;
const CONTACT_EMAIL_FROM = process.env.CONTACT_EMAIL_FROM!;

const resend = new Resend(RESEND_API_KEY);

export async function sendContactEmail(
  data: Omit<ContactFormValues, "website">
) {
  const { name, email, phone, message } = data;

  try {
    const emailHtml = `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Ново запитване</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f2f2f2; font-family: Arial, Helvetica, sans-serif;">
  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f2f2f2; padding: 20px 0;">
    <tr>
      <td align="center">
        <table border="0" cellpadding="0" cellspacing="0" width="600" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">

          <!-- Header -->
          <tr>
            <td style="background-color: #c62828; padding: 40px 30px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 600; letter-spacing: 0.5px;">
                ТЕХНО СТРОЙ БЪЛГАРИЯ
              </h1>
              <p style="color: #ffffff; margin: 10px 0 0 0; font-size: 16px; opacity: 0.95;">
                Ново запитване от уебсайта
              </p>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 0;">
              <table border="0" cellpadding="0" cellspacing="0" width="100%">

                <!-- Name Field -->
                <tr style="background-color: #ffffff;">
                  <td style="padding: 25px 30px; border-bottom: 1px solid #e0e0e0;">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                      <tr>
                        <td style="padding-bottom: 6px;">
                          <span style="color: #666666; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; font-weight: normal;">Име</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="color: #212121; font-size: 17px; font-weight: 600; line-height: 1.5;">
                          ${name}
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Email Field -->
                <tr style="background-color: #f8f8f8;">
                  <td style="padding: 25px 30px; border-bottom: 1px solid #e0e0e0;">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                      <tr>
                        <td style="padding-bottom: 6px;">
                          <span style="color: #666666; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; font-weight: normal;">Имейл</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="color: #212121; font-size: 17px; font-weight: 600; line-height: 1.5;">
                          ${email}
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Phone Field -->
                <tr style="background-color: #ffffff;">
                  <td style="padding: 25px 30px; border-bottom: 1px solid #e0e0e0;">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                      <tr>
                        <td style="padding-bottom: 6px;">
                          <span style="color: #666666; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; font-weight: normal;">Телефон</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="color: #212121; font-size: 17px; font-weight: 600; line-height: 1.5;">
                          ${phone}
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Message Field -->
                <tr style="background-color: #f8f8f8;">
                  <td style="padding: 25px 30px;">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                      <tr>
                        <td style="padding-bottom: 10px;">
                          <span style="color: #666666; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; font-weight: normal;">Съобщение</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 20px; background-color: #f0f0f0; border-radius: 4px;">
                          <p style="color: #212121; font-size: 15px; line-height: 1.7; margin: 0; white-space: pre-wrap;">${message}</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #212121; padding: 30px; text-align: center;">
              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td style="color: #ffffff; font-size: 16px; font-weight: 600; padding-bottom: 15px;">
                    ТЕХНО СТРОЙ БЪЛГАРИЯ ООД
                  </td>
                </tr>
                <tr>
                  <td style="color: #e0e0e0; font-size: 13px; line-height: 1.6;">
                    бул. Витоша № 188, гр. София<br/>
                    Тел: 02/953 27 90 | Email: office@technostroy.bg
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `.trim();

    const result = await resend.emails.send({
      from: CONTACT_EMAIL_FROM,
      to: CONTACT_EMAIL_TO,
      subject: `Ново запитване от ${name}`,
      html: emailHtml,
      replyTo: email,
    });

    return { success: true, data: result };
  } catch (error) {
    console.error("[EMAIL] Failed to send:", error);
    return { success: false, error };
  }
}
