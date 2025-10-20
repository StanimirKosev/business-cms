"use client";

import Link from "next/link";
import Image from "next/image";
import { Phone, Mail } from "lucide-react";
import { useLanguage } from "@/app/context/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-[var(--color-red)] text-[var(--color-white)]">
      <div className="max-w-[1800px] mx-auto px-6 md:px-40 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
          <div>
            <div className="relative w-[180px] h-[46px] mb-3">
              <Image
                src="/logo.svg"
                alt="Техно Покрив България - Строителна фирма"
                fill
                className="object-contain object-left"
              />
            </div>
            <p className="text-sm opacity-90">{t.footer.tagline}</p>
          </div>

          <div className="text-sm space-y-3">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              <p>{t.footer.contact.phone}</p>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              <p>{t.footer.contact.email}</p>
            </div>
          </div>
        </div>

        <div className="border-t border-[var(--color-white)]/20 pt-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-sm opacity-90">
          <p>{t.footer.copyright}</p>
          <div className="flex gap-4">
            <Link
              href="/privacy"
              className="hover:opacity-70 transition-opacity py-2 touch-manipulation"
            >
              {t.footer.links.privacy}
            </Link>
            <span className="py-2">|</span>
            <Link
              href="/cookies"
              className="hover:opacity-70 transition-opacity py-2 touch-manipulation"
            >
              {t.footer.links.cookies}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
