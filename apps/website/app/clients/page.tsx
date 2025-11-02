import { prisma } from "@repo/database/client";
import ClientsPageClient from "./ClientsPageClient";
import { Metadata } from "next";

export const revalidate = 3600; // ISR: Revalidate every hour

export const metadata: Metadata = {
  title: "Клиенти",
  description:
    "Нашите клиенти и партньори в строителството. Над 15 години опит в работата с български и международни компании.",
  openGraph: {
    title: "Клиенти | Техно Строй България",
    description: "Клиенти и партньори в строителството.",
    url: "https://technostroy.bg/clients",
  },
};

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
