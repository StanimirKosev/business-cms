import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-[var(--color-red)] text-[var(--color-white)]">
      <div className="max-w-[1800px] mx-auto px-6 md:px-40 py-8">
        {/* Main content */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-6">
          {/* Left: Logo + Tagline */}
          <div>
            <div className="font-bold text-2xl mb-2">LOGO</div>
            <p className="text-sm opacity-90">Строим вашето бъдеще от 2011</p>
          </div>

          {/* Right: Contact Info */}
          <div className="text-sm space-y-1">
            <p>Телефон: +359 XXX XXX XXX</p>
            <p>Email: info@company.bg</p>
          </div>
        </div>

        {/* Bottom: Copyright + Links */}
        <div className="border-t border-[var(--color-white)]/20 pt-4 flex flex-col md:flex-row justify-between items-center gap-2 text-sm opacity-90">
          <p>© 2025 Company Name. Всички права запазени.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:opacity-70 transition-opacity">
              Поверителност
            </Link>
            <span>|</span>
            <Link href="/cookies" className="hover:opacity-70 transition-opacity">
              Бисквитки
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
