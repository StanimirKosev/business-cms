import { z } from "zod";

// Validation error messages by locale
const validationMessages = {
  bg: {
    name: {
      min: "Моля въведете поне 2 символа",
      max: "Името е твърде дълго",
      invalid: "Моля използвайте само букви",
    },
    email: {
      invalid: "Невалиден имейл адрес",
      max: "Имейлът е твърде дълъг",
    },
    phone: {
      min: "Моля въведете валиден телефонен номер",
      max: "Телефонният номер е твърде дълъг",
      invalid: "Моля използвайте само цифри, +, -, (), и интервали",
    },
    message: {
      min: "Съобщението трябва да съдържа поне 10 символа",
      max: "Съобщението е твърде дълго",
    },
    consent: {
      required: "Трябва да се съгласите с политиката за поверителност",
    },
  },
  en: {
    name: {
      min: "Please enter at least 2 characters",
      max: "Name is too long",
      invalid: "Please use only letters",
    },
    email: {
      invalid: "Invalid email address",
      max: "Email is too long",
    },
    phone: {
      min: "Please enter a valid phone number",
      max: "Phone number is too long",
      invalid: "Please use only digits, +, -, (), and spaces",
    },
    message: {
      min: "Message must contain at least 10 characters",
      max: "Message is too long",
    },
    consent: {
      required: "You must agree to the privacy policy",
    },
  },
};

export const createContactSchema = (locale: "bg" | "en" = "bg") => {
  const messages = validationMessages[locale];

  return z.object({
    name: z
      .string()
      .min(2, messages.name.min)
      .max(100, messages.name.max)
      .regex(/^[а-яА-Яa-zA-Z\s'-]+$/, messages.name.invalid)
      .trim(),
    email: z
      .string()
      .email(messages.email.invalid)
      .max(255, messages.email.max)
      .toLowerCase()
      .trim(),
    phone: z
      .string()
      .min(8, messages.phone.min)
      .max(20, messages.phone.max)
      .regex(/^[\d\s\-\+\(\)]+$/, messages.phone.invalid)
      .transform((val) => val.replace(/[\s-]/g, "")),
    message: z
      .string()
      .min(10, messages.message.min)
      .max(2000, messages.message.max)
      .trim(),
    consent: z
      .boolean()
      .refine((val) => val === true, {
        message: messages.consent.required,
      }),
    website: z.string().optional(),
  });
};

// Default schema (Bulgarian) for backward compatibility
export const contactSchema = createContactSchema("bg");

export type ContactFormValues = z.infer<typeof contactSchema>;
