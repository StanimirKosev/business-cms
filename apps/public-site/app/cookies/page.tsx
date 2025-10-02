export default function CookiesPage() {
  return (
    <div className="min-h-screen py-20 px-6 md:px-40">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Политика за бисквитки</h1>

        <div className="space-y-6 text-gray-700">
          <section>
            <h2 className="text-2xl font-semibold mb-3">1. Какво са бисквитките?</h2>
            <p>
              Бисквитките (cookies) са малки текстови файлове, които се съхраняват на Вашето устройство
              когато посещавате уебсайт. Те помагат на сайта да функционира правилно и да предоставя
              по-добро потребителско изживяване.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">2. Какви бисквитки използваме?</h2>

            <h3 className="text-xl font-medium mt-4 mb-2">Задължителни бисквитки</h3>
            <p>
              Тези бисквитки са необходими за правилното функциониране на сайта и не могат да бъдат изключени.
            </p>

            <h3 className="text-xl font-medium mt-4 mb-2">Функционални бисквитки</h3>
            <p>
              Помагат за подобряване на функционалността и персонализацията на сайта.
            </p>

            <h3 className="text-xl font-medium mt-4 mb-2">Аналитични бисквитки</h3>
            <p>
              Помагат ни да разберем как посетителите използват сайта, за да можем да го подобрим.
              Използваме Google Analytics за събиране на анонимни статистически данни.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">3. Управление на бисквитките</h2>
            <p>
              Можете да контролирате и/или изтриете бисквитките както желаете. Повечето браузъри
              автоматично приемат бисквитки, но можете да промените настройките си, за да откажете бисквитки.
            </p>
            <p className="mt-3">
              Моля, имайте предвид, че ако изключите бисквитките, някои функции на сайта може да не работят правилно.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">4. Бисквитки на трети страни</h2>
            <p>
              В някои случаи използваме бисквитки, предоставени от доверени трети страни:
            </p>
            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li>Google Analytics - за анализ на трафика</li>
              <li>Cloudinary - за оптимизация на изображения</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">5. Актуализации на политиката</h2>
            <p>
              Можем да актуализираме тази политика за бисквитки периодично. Препоръчваме да проверявате
              тази страница редовно за промени.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">6. Контакт</h2>
            <p>
              Ако имате въпроси относно използването на бисквитки, свържете се с нас на: info@company.bg
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
