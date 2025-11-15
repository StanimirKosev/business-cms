import Link from "next/link";
import { BarChart3, FolderOpen, Tag, Users, Award, Hammer } from "lucide-react";

const navItems = [
  {
    label: "Начало",
    href: "/dashboard",
    icon: BarChart3,
  },
  {
    label: "Проекти",
    href: "/dashboard/projects",
    icon: FolderOpen,
  },
  {
    label: "Категории",
    href: "/dashboard/categories",
    icon: Tag,
  },
  {
    label: "Клиенти",
    href: "/dashboard/clients",
    icon: Users,
  },
  {
    label: "Сертификати",
    href: "/dashboard/certificates",
    icon: Award,
  },
  {
    label: "Оборудване",
    href: "/dashboard/equipment",
    icon: Hammer,
  },
];

export function Sidebar() {
  return (
    <aside className="w-64 bg-sidebar text-sidebar h-screen sticky top-0">
      {/* Logo */}
      <div className="p-6 border-b border-sidebar">
        <Link href="/dashboard" className="text-xl font-bold">
          TSB Admin
        </Link>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-sidebar-hover transition-colors"
            >
              <Icon size={20} />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
