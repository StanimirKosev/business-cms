import { Metadata } from "next";
import PrivacyClient from "./PrivacyClient";

export const metadata: Metadata = {
  title: "Политика за поверителност | Техно Строй България",
  description: "Политика за поверителност и защита на личните данни.",
};

export default function PrivacyPage() {
  return <PrivacyClient />;
}
