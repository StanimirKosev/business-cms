import { prisma } from "@repo/database/client";
import ClientsPageClient from "./ClientsPageClient";
import { Metadata } from "next";

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
