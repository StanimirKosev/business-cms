import { prisma } from "@repo/database/client";
import QualityPageClient from "./QualityPageClient";

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
