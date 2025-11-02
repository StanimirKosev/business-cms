"use client";

import Link from "next/link";
import { useLanguage } from "@/app/context/LanguageContext";

export default function CookiesClient() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-white pt-32 md:pt-24 pb-16 px-4 md:px-12 lg:px-40">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[var(--color-charcoal)]">
          {t.cookies.title}
        </h1>
        <p className="text-sm text-[var(--color-charcoal)] opacity-60 mb-8">
          <strong>{t.cookies.lastUpdated}</strong>
        </p>
        <div className="prose prose-lg max-w-none text-[var(--color-charcoal)] space-y-8">
          <section>
            <h2 className="text-2xl font-bold mb-4">{t.cookies.sections.dataController.title}</h2>
            <div className="bg-[var(--color-bg)] p-6 rounded-lg border border-[var(--color-border)]">
              <p className="mb-2"><strong>Име:</strong> {t.cookies.sections.dataController.company}</p>
              <p className="mb-2"><strong>Адрес:</strong> {t.cookies.sections.dataController.address}</p>
              <p className="mb-2"><strong>Телефон:</strong> <a href="tel:029532790" className="text-[var(--color-red)] hover:underline">{t.cookies.sections.dataController.phone}</a></p>
              <p><strong>Имейл:</strong> <a href="mailto:office@technostroy.bg" className="text-[var(--color-red)] hover:underline">{t.cookies.sections.dataController.email}</a></p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">{t.cookies.sections.whatAreCookies.title}</h2>
            <p className="leading-relaxed">
              {t.cookies.sections.whatAreCookies.content}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">{t.cookies.sections.cookiesUsed.title}</h2>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-4">
              <p className="font-semibold mb-2">Важно:</p>
              <p className="text-sm leading-relaxed">
                {t.cookies.sections.cookiesUsed.important.split('**').map((part, i) =>
                  i % 2 === 0 ? part : <strong key={i}>{part}</strong>
                )}
              </p>
            </div>

            <h3 className="text-xl font-semibold mb-3">{t.cookies.sections.cookiesUsed.technical.title}</h3>
            <p className="leading-relaxed mb-4">
              {t.cookies.sections.cookiesUsed.technical.content}
            </p>

            <h3 className="text-xl font-semibold mb-3">{t.cookies.sections.cookiesUsed.googleMaps.title}</h3>
            <p className="leading-relaxed mb-4">
              {t.cookies.sections.cookiesUsed.googleMaps.intro}
            </p>

            <div className="overflow-x-auto">
              <table className="min-w-full border border-[var(--color-border)] text-sm">
                <thead className="bg-[var(--color-bg)]">
                  <tr>
                    {t.cookies.sections.cookiesUsed.googleMaps.table.headers.map((header, idx) => (
                      <th key={idx} className="border border-[var(--color-border)] px-4 py-2 text-left">{header}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {t.cookies.sections.cookiesUsed.googleMaps.table.rows.map((row, idx) => (
                    <tr key={idx}>
                      {row.map((cell, cellIdx) => (
                        <td key={cellIdx} className="border border-[var(--color-border)] px-4 py-2">{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-sm leading-relaxed mt-4 opacity-80">
              {t.cookies.sections.cookiesUsed.googleMaps.note.split('**').map((part, i) => {
                if (i % 2 === 0) return part;
                return <strong key={i}>{part}</strong>;
              })}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">{t.cookies.sections.legalBasis.title}</h2>
            <p className="leading-relaxed">
              {t.cookies.sections.legalBasis.content.split('**').map((part, i) =>
                i % 2 === 0 ? part : <strong key={i}>{part}</strong>
              )}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">{t.cookies.sections.management.title}</h2>
            <p className="leading-relaxed mb-4">
              {t.cookies.sections.management.intro}
            </p>
            <ul className="list-disc pl-6 space-y-2">
              {t.cookies.sections.management.browsers.map((browser, idx) => (
                <li key={idx}>
                  {browser.split('**').map((part, i) =>
                    i % 2 === 0 ? part : <strong key={i}>{part}</strong>
                  )}
                </li>
              ))}
            </ul>
            <p className="text-sm leading-relaxed mt-4 opacity-80">
              {t.cookies.sections.management.warning.split('**').map((part, i) =>
                i % 2 === 0 ? part : <strong key={i}>{part}</strong>
              )}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">{t.cookies.sections.additionalInfo.title}</h2>
            <p className="leading-relaxed">
              {t.cookies.sections.additionalInfo.content.split('[').map((part, i) => {
                if (i === 0) return part;
                const [linkText, rest] = part.split(']');
                const [url, afterLink] = rest.split(')');
                return (
                  <span key={i}>
                    <Link href={url.substring(1)} className="text-[var(--color-red)] hover:underline font-medium">
                      {linkText}
                    </Link>
                    {afterLink}
                  </span>
                );
              })}
            </p>
          </section>
          <hr className="my-8" />
          <div className="text-center text-sm opacity-70">
            <Link href="/privacy" className="text-[var(--color-red)] hover:underline">{t.cookies.privacyLink}</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
