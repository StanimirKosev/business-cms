import { prisma } from "@repo/database/client";
import ClientsPageClient from "./ClientsPageClient";

export const revalidate = 3600; // ISR: Revalidate every hour

export default async function ClientsPage() {
  const [clients, projects] = await Promise.all([
    prisma.client.findMany({
      include: {
        _count: {
          select: { projects: true },
        },
      },
      orderBy: { order: "asc" },
    }),
    prisma.project.findMany({
      include: {
        client: true,
      },
      orderBy: { createdAt: "desc" },
    }),
  ]);

  return <ClientsPageClient clients={clients} projects={projects} />;
}
