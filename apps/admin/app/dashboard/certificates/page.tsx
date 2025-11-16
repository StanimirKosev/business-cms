import { prisma } from "@repo/database/client";
import { CertificatesPageClient } from "./certificates-page-client";

export default async function CertificatesPage() {
  const certificates = await prisma.certificate.findMany({
    orderBy: { createdAt: "desc" },
  });

  return <CertificatesPageClient initialCertificates={certificates} />;
}
