export default function PrivacyPage() {
  return (
    <div className="min-h-screen py-20 px-6 md:px-40">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Политика за поверителност</h1>

        <div className="space-y-6 text-gray-700">
          <section>
            <h2 className="text-2xl font-semibold mb-3">1. Обща информация</h2>
            <p>
              Ние зачитаме Вашата поверителност и се ангажираме да защитаваме личните данни, които споделяте с нас.
              Тази политика за поверителност обяснява какви данни събираме, как ги използваме и какви са Вашите права.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">2. Събиране на данни</h2>
            <p>
              Събираме лични данни, които доброволно ни предоставяте чрез контактни формуляри, включително:
            </p>
            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li>Име и фамилия</li>
              <li>Имейл адрес</li>
              <li>Телефонен номер</li>
              <li>Съдържание на запитването</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">3. Използване на данни</h2>
            <p>
              Използваме Вашите лични данни за:
            </p>
            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li>Отговор на Вашите запитвания</li>
              <li>Предоставяне на поискани от Вас услуги</li>
              <li>Подобряване на нашите услуги</li>
              <li>Изпращане на маркетингови съобщения (само с Ваше съгласие)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">4. Защита на данните</h2>
            <p>
              Прилагаме подходящи технически и организационни мерки за защита на Вашите лични данни
              срещу неоторизиран достъп, загуба или промяна.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">5. Вашите права</h2>
            <p>Имате право да:</p>
            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li>Поискате достъп до Вашите лични данни</li>
              <li>Поискате корекция на неточни данни</li>
              <li>Поискате изтриване на Вашите данни</li>
              <li>Оттеглите съгласието си за обработка на данни</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">6. Контакт</h2>
            <p>
              За въпроси относно тази политика за поверителност или за упражняване на Вашите права,
              можете да се свържете с нас на: info@company.bg
            </p>
          </section>

          <section>
            <p className="text-sm text-gray-500">
              Последна актуализация: {new Date().toLocaleDateString('bg-BG')}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
