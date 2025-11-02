"use client";

import Link from "next/link";
import { useLanguage } from "@/app/context/LanguageContext";

export default function PrivacyClient() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-white pt-32 md:pt-24 pb-16 px-4 md:px-12 lg:px-40">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[var(--color-charcoal)]">
          {t.privacy.title}
        </h1>
        <p className="text-sm text-[var(--color-charcoal)] opacity-60 mb-8">
          <strong>{t.privacy.lastUpdated}</strong>
        </p>
        <div className="prose prose-lg max-w-none text-[var(--color-charcoal)] space-y-8">
          <section>
            <h2 className="text-2xl font-bold mb-4">{t.privacy.sections.introduction.title}</h2>
            <p className="leading-relaxed">
              {t.privacy.sections.introduction.content.split('**').map((part, i) =>
                i % 2 === 0 ? part : <strong key={i}>{part}</strong>
              )}
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-bold mb-4">
              {t.privacy.sections.dataController.title}
            </h2>
            <div className="bg-[var(--color-bg)] p-6 rounded-lg border border-[var(--color-border)]">
              <p className="mb-2">
                <strong>Име:</strong> {t.privacy.sections.dataController.company}
              </p>
              <p className="mb-2">
                {t.privacy.sections.dataController.ein}
              </p>
              <p className="mb-2">
                <strong>Адрес:</strong> {t.privacy.sections.dataController.address}
              </p>
              <p className="mb-2">
                <strong>Телефон:</strong>{" "}
                <a
                  href="tel:029532790"
                  className="text-[var(--color-red)] hover:underline"
                >
                  {t.privacy.sections.dataController.phone}
                </a>
              </p>
              <p>
                <strong>Имейл:</strong>{" "}
                <a
                  href="mailto:office@technostroy.bg"
                  className="text-[var(--color-red)] hover:underline"
                >
                  {t.privacy.sections.dataController.email}
                </a>
              </p>
            </div>
          </section>
          <section>
            <h2 className="text-2xl font-bold mb-4">{t.privacy.sections.dataCollection.title}</h2>
            <p className="leading-relaxed mb-4">
              {t.privacy.sections.dataCollection.intro.split('**').map((part, i) =>
                i % 2 === 0 ? part : <strong key={i}>{part}</strong>
              )}
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              {t.privacy.sections.dataCollection.items.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
            <p className="text-sm leading-relaxed opacity-80">
              {t.privacy.sections.dataCollection.note.split('**').map((part, i) =>
                i % 2 === 0 ? part : <strong key={i}>{part}</strong>
              )}
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-bold mb-4">
              {t.privacy.sections.dataUsage.title}
            </h2>
            <p className="leading-relaxed mb-4">
              {t.privacy.sections.dataUsage.intro}
            </p>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
              <p className="font-semibold mb-2">{t.privacy.sections.dataUsage.legalBasis}</p>
              <ul className="text-sm space-y-1">
                {t.privacy.sections.dataUsage.legalItems.map((item, idx) => (
                  <li key={idx}>
                    • {item.split('**').map((part, i) =>
                      i % 2 === 0 ? part : <strong key={i}>{part}</strong>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </section>
          <section>
            <h2 className="text-2xl font-bold mb-4">{t.privacy.sections.dataSharing.title}</h2>
            <p className="leading-relaxed mb-4">
              {t.privacy.sections.dataSharing.intro}
            </p>
            <ul className="list-disc pl-6 space-y-2">
              {t.privacy.sections.dataSharing.items.map((item, idx) => (
                <li key={idx}>
                  {item.split('**').map((part, i) =>
                    i % 2 === 0 ? part : <strong key={i}>{part}</strong>
                  )}
                </li>
              ))}
            </ul>
            <p className="text-sm leading-relaxed mt-4 opacity-80">
              {t.privacy.sections.dataSharing.note.split('**').map((part, i) =>
                i % 2 === 0 ? part : <strong key={i}>{part}</strong>
              )}
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-bold mb-4">{t.privacy.sections.retention.title}</h2>
            <p className="leading-relaxed">
              {t.privacy.sections.retention.content.split('**').map((part, i) =>
                i % 2 === 0 ? part : <strong key={i}>{part}</strong>
              )}
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-bold mb-4">{t.privacy.sections.rights.title}</h2>
            <p className="leading-relaxed mb-4">
              {t.privacy.sections.rights.intro}
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              {t.privacy.sections.rights.items.map((item, idx) => (
                <li key={idx}>
                  {item.split('**').map((part, i) =>
                    i % 2 === 0 ? part : <strong key={i}>{part}</strong>
                  )}
                </li>
              ))}
            </ul>
            <div className="bg-[var(--color-bg)] p-6 rounded-lg border border-[var(--color-border)]">
              <p className="font-semibold mb-3">
                {t.privacy.sections.rights.complaint.title}
              </p>
              <p className="font-semibold mb-2">
                {t.privacy.sections.rights.complaint.authority}
              </p>
              <p className="text-sm mb-1">
                {t.privacy.sections.rights.complaint.address}
              </p>
              <p className="text-sm mb-1">Телефон: {t.privacy.sections.rights.complaint.phone}</p>
              <p className="text-sm mb-1">Имейл: {t.privacy.sections.rights.complaint.email}</p>
              <p className="text-sm">
                Уебсайт:{" "}
                <a
                  href={`https://${t.privacy.sections.rights.complaint.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--color-red)] hover:underline"
                >
                  {t.privacy.sections.rights.complaint.website}
                </a>
              </p>
            </div>
          </section>
          <section>
            <h2 className="text-2xl font-bold mb-4">
              {t.privacy.sections.contact.title}
            </h2>
            <p className="leading-relaxed mb-4">
              {t.privacy.sections.contact.intro}
            </p>
            <div className="bg-[var(--color-bg)] p-6 rounded-lg border border-[var(--color-border)]">
              <p className="font-semibold mb-3">{t.privacy.sections.dataController.company}</p>
              <p className="mb-1">{t.privacy.sections.dataController.address}</p>
              <p className="mb-1">
                Телефон:{" "}
                <a
                  href="tel:029532790"
                  className="text-[var(--color-red)] hover:underline"
                >
                  {t.privacy.sections.dataController.phone}
                </a>
              </p>
              <p>
                Имейл:{" "}
                <a
                  href="mailto:office@technostroy.bg"
                  className="text-[var(--color-red)] hover:underline"
                >
                  {t.privacy.sections.dataController.email}
                </a>
              </p>
            </div>
            <p className="text-sm leading-relaxed mt-4 opacity-80">
              {t.privacy.sections.contact.responseTime.split('**').map((part, i) =>
                i % 2 === 0 ? part : <strong key={i}>{part}</strong>
              )}
            </p>
          </section>
          <hr className="my-8" />
          <div className="text-center text-sm opacity-70">
            <Link
              href="/cookies"
              className="text-[var(--color-red)] hover:underline"
            >
              {t.privacy.cookiesLink}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
