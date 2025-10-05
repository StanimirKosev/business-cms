import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Моля въведете поне 2 символа")
    .max(100, "Името е твърде дълго")
    .regex(/^[а-яА-Яa-zA-Z\s'-]+$/, "Моля използвайте само букви")
    .trim(),
  email: z
    .string()
    .email("Невалиден имейл адрес")
    .max(255, "Имейлът е твърде дълъг")
    .toLowerCase()
    .trim(),
  phone: z
    .string()
    .min(8, "Моля въведете валиден телефонен номер")
    .max(20, "Телефонният номер е твърде дълъг")
    .regex(
      /^[\d\s\-\+\(\)]+$/,
      "Моля използвайте само цифри, +, -, (), и интервали"
    )
    .transform((val) => val.replace(/[\s-]/g, "")),
  message: z
    .string()
    .min(10, "Съобщението трябва да съдържа поне 10 символа")
    .max(2000, "Съобщението е твърде дълго")
    .trim(),
  website: z.string().optional(),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
