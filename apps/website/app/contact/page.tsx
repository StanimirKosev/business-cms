import type { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Контакти",
  description:
    "Свържете се с Техно Строй България ООД. Телефон: +359 953 27 90, имейл: office@technostroy.bg. Офис на бул. Витоша № 188, гр. София.",
  openGraph: {
    title: "Контакти | Техно Строй България",
    description:
      "Свържете се с нас за строителни проекти. Телефон: +359 953 27 90, имейл: office@technostroy.bg.",
    url: "https://technostroy.bg/contact",
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
