import { prisma } from "@repo/database/client";

export default async function DashboardPage() {
  const [projectCount, categoryCount, clientCount, certificateCount] =
    await Promise.all([
      prisma.project.count(),
      prisma.category.count(),
      prisma.client.count(),
      prisma.certificate.count(),
    ]);

  return (
    <div className="p-8">
      <div className="max-w-4xl">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Панел</h2>
        <p className="text-gray-600 mb-8">Добре дошли в администраторския панел.</p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard label="Проекти" value={projectCount.toString()} />
          <StatCard label="Категории" value={categoryCount.toString()} />
          <StatCard label="Клиенти" value={clientCount.toString()} />
          <StatCard label="Сертификати" value={certificateCount.toString()} />
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
      <p className="text-sm font-medium text-gray-600 mb-2">{label}</p>
      <p className="text-3xl font-bold text-red-600">{value}</p>
    </div>
  );
}
