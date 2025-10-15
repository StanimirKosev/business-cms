import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Политика за поверителност | Техно Строй България",
  description: "Политика за поверителност и защита на личните данни.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white pt-32 md:pt-24 pb-16 px-4 md:px-12 lg:px-40">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[var(--color-charcoal)]">
          Политика за поверителност
        </h1>
        <p className="text-sm text-[var(--color-charcoal)] opacity-60 mb-8">
          <strong>Последна актуализация:</strong> 15 октомври 2025
        </p>
        <div className="prose prose-lg max-w-none text-[var(--color-charcoal)] space-y-8">
          <section>
            <h2 className="text-2xl font-bold mb-4">1. Въведение</h2>
            <p className="leading-relaxed">
              Добре дошли в уебсайта на{" "}
              <strong>Техно Строй България ООД</strong>. Ние зачитаме вашата
              поверителност и се ангажираме да защитаваме вашите лични данни.
              Тази политика обяснява как събираме и обработваме вашите данни при
              използване на формата за контакт.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-bold mb-4">
              2. Администратор на данни
            </h2>
            <div className="bg-[var(--color-bg)] p-6 rounded-lg border border-[var(--color-border)]">
              <p className="mb-2">
                <strong>Име:</strong> Техно Строй България ООД
              </p>
              <p className="mb-2">
                <strong>ЕИК:</strong> 175410402
              </p>
              <p className="mb-2">
                <strong>Адрес:</strong> бул. Витоша № 188, гр. София, България
              </p>
              <p className="mb-2">
                <strong>Телефон:</strong>{" "}
                <a
                  href="tel:029532790"
                  className="text-[var(--color-red)] hover:underline"
                >
                  02/953 27 90
                </a>
              </p>
              <p>
                <strong>Имейл:</strong>{" "}
                <a
                  href="mailto:office@technostroy.bg"
                  className="text-[var(--color-red)] hover:underline"
                >
                  office@technostroy.bg
                </a>
              </p>
            </div>
          </section>
          <section>
            <h2 className="text-2xl font-bold mb-4">3. Какви данни събираме</h2>
            <p className="leading-relaxed mb-4">
              Чрез <strong>формата за контакт</strong> събираме:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Име (задължително)</li>
              <li>Имейл адрес (задължително)</li>
              <li>Телефонен номер (задължително)</li>
              <li>Съобщение (задължително)</li>
            </ul>
            <p className="text-sm leading-relaxed opacity-80">
              <strong>Забележка:</strong> Не събираме IP адреси, cookies за
              проследяване или аналитични данни.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-bold mb-4">
              4. Как използваме данните
            </h2>
            <p className="leading-relaxed mb-4">
              Използваме вашите данни единствено за отговор на вашето запитване
              и комуникация относно строителни услуги.
            </p>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
              <p className="font-semibold mb-2">Правно основание (GDPR):</p>
              <ul className="text-sm space-y-1">
                <li>
                  • <strong>Чл. 6(1)(a)</strong> - Вашето изрично съгласие (от
                  формата за контакт)
                </li>
                <li>
                  • <strong>Чл. 6(1)(b)</strong> - Изпълнение на договор или
                  предприемане на действия по ваше искане
                </li>
              </ul>
            </div>
          </section>
          <section>
            <h2 className="text-2xl font-bold mb-4">5. Споделяне на данни</h2>
            <p className="leading-relaxed mb-4">
              Вашите данни могат да бъдат споделени с:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Resend.com</strong> (имейл доставчик) - за изпращане на
                съобщения от формата
              </li>
              <li>
                <strong>Vercel Inc.</strong> (хостинг) - за функциониране на
                уебсайта
              </li>
              <li>
                <strong>Google LLC</strong> (Google Maps) - за показване на
                локация
              </li>
            </ul>
            <p className="text-sm leading-relaxed mt-4 opacity-80">
              <strong>Забележка:</strong> Всички доставчици извън ЕС използват
              стандартни договорни клаузи (SCC), одобрени от ЕС.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-bold mb-4">6. Срок на съхранение</h2>
            <p className="leading-relaxed">
              Имейлите от формата за контакт се съхраняват до{" "}
              <strong>1 година</strong> след получаването им, освен ако не е
              необходимо по-дълго съхранение за изпълнение на договор или
              законово задължение.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-bold mb-4">7. Вашите права</h2>
            <p className="leading-relaxed mb-4">
              Съгласно GDPR имате право на:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>
                <strong>Достъп</strong> до вашите лични данни
              </li>
              <li>
                <strong>Коригиране</strong> на неточни данни
              </li>
              <li>
                <strong>Изтриване</strong> на вашите данни (&quot;право да бъдеш
                забравен&quot;)
              </li>
              <li>
                <strong>Ограничаване</strong> на обработването
              </li>
              <li>
                <strong>Преносимост</strong> на данните
              </li>
              <li>
                <strong>Възражение</strong> срещу обработването
              </li>
              <li>
                <strong>Оттегляне на съгласие</strong> по всяко време
              </li>
            </ul>
            <div className="bg-[var(--color-bg)] p-6 rounded-lg border border-[var(--color-border)]">
              <p className="font-semibold mb-3">
                Право на жалба до надзорен орган:
              </p>
              <p className="font-semibold mb-2">
                Комисията за защита на личните данни (КЗЛД)
              </p>
              <p className="text-sm mb-1">
                гр. София 1592, бул. Проф. Цветан Лазаров № 2
              </p>
              <p className="text-sm mb-1">Телефон: 02/915 3 518</p>
              <p className="text-sm mb-1">Имейл: kzld@cpdp.bg</p>
              <p className="text-sm">
                Уебсайт:{" "}
                <a
                  href="https://www.cpdp.bg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--color-red)] hover:underline"
                >
                  www.cpdp.bg
                </a>
              </p>
            </div>
          </section>
          <section>
            <h2 className="text-2xl font-bold mb-4">
              8. Контакти за упражняване на права
            </h2>
            <p className="leading-relaxed mb-4">
              За упражняване на вашите права или въпроси относно обработката на
              данни:
            </p>
            <div className="bg-[var(--color-bg)] p-6 rounded-lg border border-[var(--color-border)]">
              <p className="font-semibold mb-3">Техно Строй България ООД</p>
              <p className="mb-1">бул. Витоша № 188, гр. София, България</p>
              <p className="mb-1">
                Телефон:{" "}
                <a
                  href="tel:029532790"
                  className="text-[var(--color-red)] hover:underline"
                >
                  02/953 27 90
                </a>
              </p>
              <p>
                Имейл:{" "}
                <a
                  href="mailto:office@technostroy.bg"
                  className="text-[var(--color-red)] hover:underline"
                >
                  office@technostroy.bg
                </a>
              </p>
            </div>
            <p className="text-sm leading-relaxed mt-4 opacity-80">
              Ще отговорим на вашето искане в срок до <strong>1 месец</strong>{" "}
              съгласно чл. 12 от GDPR.
            </p>
          </section>
          <hr className="my-8" />
          <div className="text-center text-sm opacity-70">
            <Link
              href="/cookies"
              className="text-[var(--color-red)] hover:underline"
            >
              Политика за cookies
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
