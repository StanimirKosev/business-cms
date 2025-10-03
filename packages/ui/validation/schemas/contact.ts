import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Моля въведете поне 2 символа"),
  email: z.string().email("Невалиден имейл адрес"),
  phone: z.string().min(9, "Моля въведете валиден телефонен номер"),
  subject: z.string(),
  message: z.string().min(10, "Съобщението трябва да съдържа поне 10 символа"),
  website: z.string().optional(), // honeypot
});

export type ContactFormValues = z.infer<typeof contactSchema>;
