import { prisma } from "@repo/database/client";
import MachineryPageClient from "./MachineryPageClient";
import { Suspense } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Машини и Оборудване",
  description:
    "Строителен парк от машини и оборудване. Багери, булдозери, кранове и специализирана строителна техника.",
  openGraph: {
    title: "Машини и Оборудване | Техно Строй България",
    description: "Строителен парк от машини и оборудване.",
    url: "https://technostroy.bg/machinery",
  },
};

export default async function MachineryPage() {
  const categories = await prisma.machineryCategory.findMany({
    include: {
      models: {
        orderBy: { order: "asc" },
      },
      images: {
        orderBy: { order: "asc" },
      },
    },
    orderBy: { order: "asc" },
  });

  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <MachineryPageClient categories={categories} />
    </Suspense>
  );
}
