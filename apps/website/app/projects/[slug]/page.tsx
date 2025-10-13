import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Card } from "@/app/components/Card";
import { ImageGallery } from "@/app/components/ImageGallery";
import { PageBreadcrumb } from "@/app/components/PageBreadcrumb";
import { recentProjects } from "@/lib/mock-data";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = recentProjects.find((p) => p.slug === slug);
  if (!project) {
    notFound();
  }

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
                href: `/services/${project.category?.toLowerCase().replace(/\s+/g, "-")}`,
              },
              { label: project.title },
            ]}
          />
        </div>
      </section>

      {/* Main Content Section - Centered with Padding */}
      <section className="max-w-7xl mx-auto px-6 md:px-40 py-16">
        <div className="space-y-12">
          {/* Project Info Grid - 3 columns layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-[var(--color-concrete-grey-light)] p-6 rounded-lg">
              <h3 className="text-sm text-gray-500 uppercase tracking-wider mb-2">
                Категория
              </h3>
              <p className="text-lg font-medium text-gray-900">
                {project.category}
              </p>
            </div>

            <div className="bg-[var(--color-concrete-grey-light)] p-6 rounded-lg">
              <h3 className="text-sm text-gray-500 uppercase tracking-wider mb-2">
                Локация
              </h3>
              <p className="text-lg font-medium text-gray-900">
                {project.location}
              </p>
            </div>

            <div className="bg-[var(--color-concrete-grey-light)] p-6 rounded-lg">
              <h3 className="text-sm text-gray-500 uppercase tracking-wider mb-2">
                Характер на работите
              </h3>
              <p className="text-lg font-medium text-gray-900">
                Възстановяване на проектните параметри
              </p>
            </div>

            <div className="bg-[var(--color-concrete-grey-light)] p-6 rounded-lg">
              <h3 className="text-sm text-gray-500 uppercase tracking-wider mb-2">
                Възложител
              </h3>
              <p className="text-lg font-medium text-gray-900">
                Национална компания Железопътна инфраструктура
              </p>
            </div>

            <div className="bg-[var(--color-concrete-grey-light)] p-6 rounded-lg">
              <h3 className="text-sm text-gray-500 uppercase tracking-wider mb-2">
                Период на реализация
              </h3>
              <p className="text-lg font-medium text-gray-900">
                май 2023 г. - юли 2025 г.
              </p>
            </div>

            <div className="bg-[var(--color-concrete-grey-light)] p-6 rounded-lg">
              <h3 className="text-sm text-gray-500 uppercase tracking-wider mb-2">
                Роля в проекта
              </h3>
              <p className="text-lg font-medium text-gray-900">
                Главен изпълнител
              </p>
            </div>
          </div>

          {/* Technical Specifications */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-[var(--color-charcoal)]">
              Технически характеристики
            </h2>
            <div className="prose prose-lg max-w-4xl space-y-4 text-base text-gray-700 leading-relaxed">
              <p>
                Ремонтът и реконструкцията на гарата е част от цялостното
                обновление на жп линия Русе - Варна.
              </p>
              <p>
                Целта е повишаване на скоростта на движение на железопътния
                превоз и подобряване на условията в гаровите райони.
              </p>
              <p>
                Изпълнява се цялостна реконструкция на приемното здание на
                гарата. Реновиране на помещения, промяна на предназначението на
                част от тях, подмяна на цялата ВиК, електро и ОВК инсталации.
              </p>
              <p>
                Предприемат се мерки за подобряване на енергоефективността на
                сградата. Подмяна на дограма, топлоизолация, реновация на
                покрива.
              </p>
              <p>
                Релсите, траверсите и стрелките на релсовия път в гаровата зона
                биват подменени. Изграждат се нови стрелкови постове и нова
                дренажна система.
              </p>
            </div>
          </div>

          {/* Характер на работите */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-[var(--color-charcoal)]">
              Характер на работите
            </h2>
            <div className="prose prose-lg max-w-4xl space-y-4 text-base text-gray-700 leading-relaxed">
              <p>
                Възстановяване на проектните параметри на гара Разград. Извършва
                се ремонт на перони и подмяна на контактната мрежа на гаровата
                територия.
              </p>
              <p>
                Цялостната реконструкция ще спомогне за повишаване на скоростта,
                надежността и сигурността на железопътния транспорт.
              </p>
            </div>
          </div>

          {/* Image Gallery */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-[var(--color-charcoal)] mb-6">
              Галерия
            </h2>
            <ImageGallery
              images={[
                { src: project.image, alt: `${project.title} - Снимка 1` },
                { src: project.image, alt: `${project.title} - Снимка 2` },
                { src: project.image, alt: `${project.title} - Снимка 3` },
              ]}
              columns={{ mobile: 1, tablet: 2, desktop: 3 }}
              aspectRatio="landscape"
            />
          </div>

          {/* Related Projects Section */}
          {relatedProjects.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-bold text-[var(--color-charcoal)] mb-6">
                Свързани проекти
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedProjects.map((relatedProject) => (
                  <Link
                    key={relatedProject.id}
                    href={`/projects/${relatedProject.slug}`}
                    className="block group"
                  >
                    <div className="relative aspect-[16/9] rounded-lg overflow-hidden mb-3">
                      <Image
                        src={relatedProject.image}
                        alt={relatedProject.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                    <h4 className="text-base font-medium text-gray-900 group-hover:text-[var(--color-red)] transition-colors">
                      {relatedProject.title}
                    </h4>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
