import { prisma } from "@repo/database/client";
import ClientsPageClient from "./ClientsPageClient";

export default async function ClientsPage() {
  const clients = await prisma.client.findMany({
    include: {
      _count: {
        select: { projects: true },
      },
    },
    orderBy: { order: "asc" },
  });

  return <ClientsPageClient clients={clients} />;
}
