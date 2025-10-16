"use client";

import { Card } from "@/app/components/Card";
import { ImageGallery } from "@/app/components/ImageGallery";
import { PageBreadcrumb } from "@/app/components/PageBreadcrumb";
import { recentProjects, categoryToSlug } from "@/lib/mock-data";
import { useScrollAnimation } from "@/app/hooks/useScrollAnimation";

interface ProjectPageClientProps {
  project: (typeof recentProjects)[0];
}

export function ProjectPageClient({ project }: ProjectPageClientProps) {
  const { ref: infoRef, isVisible: infoVisible } = useScrollAnimation(0.3);
  const { ref: galleryRef, isVisible: galleryVisible } =
    useScrollAnimation(0.3);
  const { ref: relatedRef, isVisible: relatedVisible } =
    useScrollAnimation(0.3);

  const serviceSlug = categoryToSlug(project.category!);

  // Get related projects (same category, exclude current)
  const relatedProjects = recentProjects
    .filter((p) => p.category === project.category && p.id !== project.id)
    .slice(0, 3);

  return (
    <main>
      {/* Hero Section - Full Width using Card */}
      <section className="w-full h-[400px] md:h-[500px] mb-20 md:mb-24">
        <div className="h-full pointer-events-none">
          <Card
            title={project.title}
            description={project.description}
            image={project.image}
            slug={project.slug}
            variant="hero"
            priority
          />
        </div>
      </section>

      {/* Breadcrumb */}
      <section className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 md:px-40 py-5">
          <PageBreadcrumb
            items={[
              { label: "Начало", href: "/" },
              { label: "Проекти", href: "/projects" },
              {
                label: project.category || "",
                href: `/projects/${serviceSlug}`,
              },
              { label: project.title! },
            ]}
          />
        </div>
      </section>

      {/* Main Content Section - Centered with Padding */}
      <section className="max-w-7xl mx-auto px-6 md:px-40 py-16">
        <div className="space-y-12">
          {/* Project Info Grid - 3 columns layout */}
          <section ref={infoRef}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div
                className={`bg-[var(--color-concrete-grey-light)] p-6 rounded-lg transition-all duration-500 ${infoVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
                style={{ transitionDelay: "0ms" }}
              >
                <h3 className="text-sm text-gray-500 uppercase tracking-wider mb-2">
                  Категория
                </h3>
                <p className="text-lg font-medium text-gray-900">
                  {project.category}
                </p>
              </div>

              <div
                className={`bg-[var(--color-concrete-grey-light)] p-6 rounded-lg transition-all duration-500 ${infoVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
                style={{ transitionDelay: "60ms" }}
              >
                <h3 className="text-sm text-gray-500 uppercase tracking-wider mb-2">
                  Локация
                </h3>
                <p className="text-lg font-medium text-gray-900">
                  {project.location}
                </p>
              </div>

              <div
                className={`bg-[var(--color-concrete-grey-light)] p-6 rounded-lg transition-all duration-500 ${infoVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
                style={{ transitionDelay: "120ms" }}
              >
                <h3 className="text-sm text-gray-500 uppercase tracking-wider mb-2">
                  Характер на работите
                </h3>
                <p className="text-lg font-medium text-gray-900">
                  Възстановяване на проектните параметри
                </p>
              </div>

              <div
                className={`bg-[var(--color-concrete-grey-light)] p-6 rounded-lg transition-all duration-500 ${infoVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
                style={{ transitionDelay: "180ms" }}
              >
                <h3 className="text-sm text-gray-500 uppercase tracking-wider mb-2">
                  Възложител
                </h3>
                <p className="text-lg font-medium text-gray-900">
                  Национална компания Железопътна инфраструктура
                </p>
              </div>

              <div
                className={`bg-[var(--color-concrete-grey-light)] p-6 rounded-lg transition-all duration-500 ${infoVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
                style={{ transitionDelay: "240ms" }}
              >
                <h3 className="text-sm text-gray-500 uppercase tracking-wider mb-2">
                  Период на реализация
                </h3>
                <p className="text-lg font-medium text-gray-900">
                  май 2023 г. - юли 2025 г.
                </p>
              </div>

              <div
                className={`bg-[var(--color-concrete-grey-light)] p-6 rounded-lg transition-all duration-500 ${infoVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
                style={{ transitionDelay: "300ms" }}
              >
                <h3 className="text-sm text-gray-500 uppercase tracking-wider mb-2">
                  Роля в проекта
                </h3>
                <p className="text-lg font-medium text-gray-900">
                  Главен изпълнител
                </p>
              </div>
            </div>
          </section>

          {/* Technical Specifications */}
          <div className="space-y-6">
            <div className="flex gap-6">
              <div className="hidden md:block w-1 h-12 bg-[var(--color-red)]" />
              <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-charcoal)]">
                Технически характеристики
              </h2>
            </div>
            <div className="space-y-6 leading-relaxed text-[var(--color-charcoal)] max-w-4xl">
              <p className="text-lg">
                Ремонтът и реконструкцията на гарата е част от цялостното
                обновление на жп линия Русе - Варна.
              </p>
              <p className="text-lg">
                Целта е повишаване на скоростта на движение на железопътния
                превоз и подобряване на условията в гаровите райони.
              </p>
              <p className="text-lg">
                Изпълнява се цялостна реконструкция на приемното здание на
                гарата. Реновиране на помещения, промяна на предназначението на
                част от тях, подмяна на цялата ВиК, електро и ОВК инсталации.
              </p>
              <p className="text-lg">
                Предприемат се мерки за подобряване на енергоефективността на
                сградата. Подмяна на дограма, топлоизолация, реновация на
                покрива.
              </p>
              <p className="text-lg">
                Релсите, траверсите и стрелките на релсовия път в гаровата зона
                biват подменени. Изграждат се нови стрелкови постове и нова
                дренажна система.
              </p>
            </div>
          </div>

          {/* Характер на работите */}
          <div className="space-y-6">
            <div className="flex gap-6">
              <div className="hidden md:block w-1 h-12 bg-[var(--color-red)]" />
              <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-charcoal)]">
                Характер на работите
              </h2>
            </div>
            <div className="space-y-6 leading-relaxed text-[var(--color-charcoal)] max-w-4xl">
              <p className="text-lg">
                Възстановяване на проектните параметри на гара Разград. Извършва
                се ремонт на перони и подмяна на контактната мрежа на гаровата
                територия.
              </p>
              <p className="text-lg">
                Цялостната реконструкция ще спомогне за повишаване на скоростта,
                надежността и сигурността на железопътния транспорт.
              </p>
            </div>
          </div>

          {/* Image Gallery */}
          <section ref={galleryRef} className="space-y-6">
            <div className="flex gap-6">
              <div className="hidden md:block w-1 h-12 bg-[var(--color-red)]" />
              <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-charcoal)]">
                Галерия
              </h2>
            </div>
            <ImageGallery
              images={[
                { src: project.image!, alt: `${project.title} - Снимка 1` },
                { src: project.image!, alt: `${project.title} - Снимка 2` },
                { src: project.image!, alt: `${project.title} - Снимка 3` },
              ]}
              columns={{ mobile: 1, tablet: 2, desktop: 3 }}
              aspectRatio="landscape"
              isVisible={galleryVisible}
            />
          </section>

          {/* Related Projects Section */}
          {relatedProjects.length > 0 && (
            <section ref={relatedRef} className="mt-16 pt-12 space-y-6">
              <div className="flex gap-6">
                <div className="hidden md:block w-1 h-12 bg-[var(--color-red)]" />
                <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-charcoal)]">
                  Свързани проекти
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedProjects.map((relatedProject, index) => (
                  <div
                    key={relatedProject.id}
                    className={`transition-all duration-500 ${relatedVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <Card
                      title={relatedProject.title}
                      description={relatedProject.description}
                      image={relatedProject.image}
                      slug={`/projects/${serviceSlug}/${relatedProject.slug}`}
                      location={relatedProject.location}
                      variant="compact"
                    />
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </section>
    </main>
  );
}
