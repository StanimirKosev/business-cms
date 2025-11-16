import { prisma } from "@repo/database/client";
import { ClientsPageClient } from "./clients-page-client";

export default async function ClientsPage() {
  const clients = await prisma.client.findMany({
    orderBy: { createdAt: "desc" },
  });

  return <ClientsPageClient initialClients={clients} />;
}
