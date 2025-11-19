import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Контакти",
  description:
    "Свържете се с нас. Адрес: бул. Витоша 188, София. Телефон: +359 953 27 90. Email: office@technostroy.bg",
  openGraph: {
    title: "Контакти | Техно Строй България",
    description: "Контакти за връзка относно строителни проекти.",
    url: "https://technostroy.bg/contact",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
