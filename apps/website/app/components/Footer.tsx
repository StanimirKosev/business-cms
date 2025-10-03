import Link from "next/link";
import { Phone, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[var(--color-red)] text-[var(--color-white)]">
      <div className="max-w-[1800px] mx-auto px-6 md:px-40 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
          <div>
            <div className="font-bold text-2xl mb-3">LOGO</div>
            <p className="text-sm opacity-90">Строим вашето бъдеще от 2011</p>
          </div>

          <div className="text-sm space-y-3">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              <p>02/953 27 90</p>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              <p>office@technostroy.bg</p>
            </div>
          </div>
        </div>

        <div className="border-t border-[var(--color-white)]/20 pt-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-sm opacity-90">
          <p>© 2025 Техно Строй България ООД. Всички права запазени.</p>
          <div className="flex gap-4">
            <Link
              href="/privacy"
              className="hover:opacity-70 transition-opacity py-2 touch-manipulation"
            >
              Поверителност
            </Link>
            <span className="py-2">|</span>
            <Link
              href="/cookies"
              className="hover:opacity-70 transition-opacity py-2 touch-manipulation"
            >
              Бисквитки
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
