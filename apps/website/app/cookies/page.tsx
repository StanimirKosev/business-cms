import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Политика за cookies | Техно Строй България",
  description: "Информация за използваните cookies на уебсайта.",
};

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-white pt-32 md:pt-24 pb-16 px-4 md:px-12 lg:px-40">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[var(--color-charcoal)]">
          Политика за cookies
        </h1>
        <p className="text-sm text-[var(--color-charcoal)] opacity-60 mb-8">
          <strong>Последна актуализация:</strong> 15 октомври 2025
        </p>
        <div className="prose prose-lg max-w-none text-[var(--color-charcoal)] space-y-8">
          <section>
            <h2 className="text-2xl font-bold mb-4">1. Администратор на данни</h2>
            <div className="bg-[var(--color-bg)] p-6 rounded-lg border border-[var(--color-border)]">
              <p className="mb-2"><strong>Име:</strong> Техно Строй България ООД</p>
              <p className="mb-2"><strong>Адрес:</strong> бул. Витоша № 188, гр. София, България</p>
              <p className="mb-2"><strong>Телефон:</strong> <a href="tel:029532790" className="text-[var(--color-red)] hover:underline">02/953 27 90</a></p>
              <p><strong>Имейл:</strong> <a href="mailto:office@technostroy.bg" className="text-[var(--color-red)] hover:underline">office@technostroy.bg</a></p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">2. Какво са cookies?</h2>
            <p className="leading-relaxed">
              Cookies са малки текстови файлове, които се съхраняват на вашето устройство при посещение на уебсайт. Те се използват за подобряване на функционалността и ефективността на уебсайта.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">3. Какви cookies използваме</h2>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-4">
              <p className="font-semibold mb-2">Важно:</p>
              <p className="text-sm leading-relaxed">
                Нашият уебсайт <strong>НЕ използва</strong> маркетингови cookies, аналитични cookies (Google Analytics) или cookies за проследяване на поведение.
              </p>
            </div>

            <h3 className="text-xl font-semibold mb-3">3.1 Технически необходими cookies</h3>
            <p className="leading-relaxed mb-4">
              Next.js (платформата на уебсайта) може да използва временни session cookies за функциониране на формата за контакт и сигурност. Тези cookies са технически необходими и се изтриват при затваряне на браузъра.
            </p>

            <h3 className="text-xl font-semibold mb-3">3.2 Google Maps cookies</h3>
            <p className="leading-relaxed mb-4">
              Използваме Google Maps за показване на нашата локация на страницата за контакти. Google Maps може да постави следните cookies:
            </p>

            <div className="overflow-x-auto">
              <table className="min-w-full border border-[var(--color-border)] text-sm">
                <thead className="bg-[var(--color-bg)]">
                  <tr>
                    <th className="border border-[var(--color-border)] px-4 py-2 text-left">Cookie</th>
                    <th className="border border-[var(--color-border)] px-4 py-2 text-left">Доставчик</th>
                    <th className="border border-[var(--color-border)] px-4 py-2 text-left">Цел</th>
                    <th className="border border-[var(--color-border)] px-4 py-2 text-left">Срок</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-[var(--color-border)] px-4 py-2">NID</td>
                    <td className="border border-[var(--color-border)] px-4 py-2">Google LLC</td>
                    <td className="border border-[var(--color-border)] px-4 py-2">Функционалност на картата</td>
                    <td className="border border-[var(--color-border)] px-4 py-2">6 месеца</td>
                  </tr>
                  <tr>
                    <td className="border border-[var(--color-border)] px-4 py-2">CONSENT</td>
                    <td className="border border-[var(--color-border)] px-4 py-2">Google LLC</td>
                    <td className="border border-[var(--color-border)] px-4 py-2">Съхраняване на предпочитания</td>
                    <td className="border border-[var(--color-border)] px-4 py-2">2 години</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-sm leading-relaxed mt-4 opacity-80">
              <strong>Забележка:</strong> Тези cookies се поставят от Google при зареждане на картата и са технически необходими за нейната функционалност. За повече информация вижте{" "}
              <a href="https://policies.google.com/technologies/cookies" target="_blank" rel="noopener noreferrer" className="text-[var(--color-red)] hover:underline">
                Политиката за cookies на Google
              </a>.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">4. Правно основание</h2>
            <p className="leading-relaxed">
              Съгласно чл. 5, ал. 3 от Директива 2002/58/ЕО (ePrivacy), технически необходимите cookies, които са строго необходими за предоставяне на изрично поискана от вас услуга (като показване на локация на карта), <strong>не изискват предварително съгласие</strong>.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">5. Как да управлявате cookies</h2>
            <p className="leading-relaxed mb-4">
              Можете да блокирате или изтриете cookies чрез настройките на вашия браузър:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Google Chrome:</strong> Settings → Privacy and security → Cookies</li>
              <li><strong>Mozilla Firefox:</strong> Options → Privacy & Security → Cookies</li>
              <li><strong>Safari:</strong> Preferences → Privacy → Cookies</li>
              <li><strong>Microsoft Edge:</strong> Settings → Privacy → Cookies</li>
            </ul>
            <p className="text-sm leading-relaxed mt-4 opacity-80">
              <strong>Важно:</strong> Блокирането на cookies може да попречи на функционалността на Google Maps на страницата за контакти.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">6. Допълнителна информация</h2>
            <p className="leading-relaxed">
              За информация относно обработката на лични данни (име, имейл, телефон от формата за контакт), моля вижте нашата{" "}
              <Link href="/privacy" className="text-[var(--color-red)] hover:underline font-medium">
                Политика за поверителност
              </Link>.
            </p>
          </section>
          <hr className="my-8" />
          <div className="text-center text-sm opacity-70">
            <Link href="/privacy" className="text-[var(--color-red)] hover:underline">Политика за поверителност</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
