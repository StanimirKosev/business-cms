import { prisma } from "@repo/database/client";
import QualityPageClient from "./QualityPageClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Качество",
  description:
    "Сертификати за качество и политики. ISO сертификация и стандарти за безопасност при строителството.",
  openGraph: {
    title: "Качество | Техно Строй България",
    description: "Сертификати за качество и политики за безопасност.",
    url: "https://technostroy.bg/quality",
  },
};

export default async function QualityPage() {
  const [certificates, policies] = await Promise.all([
    prisma.certificate.findMany({
      orderBy: { order: "desc" },
    }),
    prisma.policy.findMany({
      orderBy: { order: "asc" },
    }),
  ]);

  return <QualityPageClient certificates={certificates} policies={policies} />;
}
