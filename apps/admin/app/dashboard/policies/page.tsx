import { prisma } from "@repo/database/client";
import { PoliciesPageClient } from "./policies-page-client";

export default async function PoliciesPage() {
  const policies = await prisma.policy.findMany({
    orderBy: { createdAt: "desc" },
  });

  return <PoliciesPageClient initialPolicies={policies} />;
}
