import { Metadata } from "next";
import CookiesClient from "./CookiesClient";

export const metadata: Metadata = {
  title: "Политика за cookies | Техно Строй България",
  description: "Информация за използваните cookies на уебсайта.",
};

export default function CookiesPage() {
  return <CookiesClient />;
}
