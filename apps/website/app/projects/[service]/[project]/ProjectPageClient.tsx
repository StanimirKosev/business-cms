"use client";

import { Card } from "@/app/components/Card";
import { ImageGallery } from "@/app/components/ImageGallery";
import { PageBreadcrumb } from "@/app/components/PageBreadcrumb";
import { useScrollAnimation } from "@/app/hooks/useScrollAnimation";
import { useLanguage } from "@/app/context/LanguageContext";
import { getCloudinaryUrl } from "@/lib/cloudinary";
import { localizeProject } from "@/lib/i18n-utils";
import type { Prisma } from "@repo/database/client";

type ProjectWithRelations = Prisma.ProjectGetPayload<{
  include: {
    category: true;
    client: true;
    images: true;
  };
}>;

interface ProjectPageClientProps {
  project: ProjectWithRelations;
  relatedProjects: Omit<ProjectWithRelations, "images">[];
}

export function ProjectPageClient({
  project,
  relatedProjects,
}: ProjectPageClientProps) {
  const { locale } = useLanguage();
  const { ref: infoRef, isVisible: infoVisible } = useScrollAnimation(0.3);
  const { ref: galleryRef, isVisible: galleryVisible } =
    useScrollAnimation(0.05);
  const { ref: relatedRef, isVisible: relatedVisible } =
    useScrollAnimation(0.3);

  // Localize all project fields using helper
  const {
    title,
    description,
    location,
    categoryName,
    workNature,
    specifications,
  } = localizeProject(project, locale);
  const heroImageUrl = project.heroImageUrl
    ? getCloudinaryUrl(project.heroImageUrl)!
    : undefined;

  return (
    <main>
      {/* Hero Section - Full Width using Card */}
      <section className="w-full h-[400px] md:h-[500px] mb-20 md:mb-24">
        <div className="h-full pointer-events-none">
          <Card
            title={title}
            description={description}
            image={heroImageUrl}
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
              { label: locale === "bg" ? "Начало" : "Home", href: "/" },
              {
                label: locale === "bg" ? "Проекти" : "Projects",
                href: "/projects",
              },
              {
                label: categoryName,
                href: `/projects?category=${project.category.slug}`,
              },
              { label: title },
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
                  {locale === "bg" ? "Категория" : "Category"}
                </h3>
                <p className="text-lg font-medium text-gray-900">
                  {categoryName}
                </p>
              </div>

              {location && (
                <div
                  className={`bg-[var(--color-concrete-grey-light)] p-6 rounded-lg transition-all duration-500 ${infoVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
                  style={{ transitionDelay: "60ms" }}
                >
                  <h3 className="text-sm text-gray-500 uppercase tracking-wider mb-2">
                    {locale === "bg" ? "Локация" : "Location"}
                  </h3>
                  <p className="text-lg font-medium text-gray-900">
                    {location}
                  </p>
                </div>
              )}

              {workNature && (
                <div
                  className={`bg-[var(--color-concrete-grey-light)] p-6 rounded-lg transition-all duration-500 ${infoVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
                  style={{ transitionDelay: "120ms" }}
                >
                  <h3 className="text-sm text-gray-500 uppercase tracking-wider mb-2">
                    {locale === "bg"
                      ? "Характер на дейностите"
                      : "Nature of Activities"}
                  </h3>
                  <p className="text-lg font-medium text-gray-900">
                    {workNature}
                  </p>
                </div>
              )}
            </div>
          </section>

          {/* Technical Specifications */}
          {specifications && (
            <div className="space-y-6">
              <div className="flex gap-6">
                <div className="hidden md:block w-1 h-12 bg-[var(--color-red)]" />
                <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-charcoal)]">
                  {locale === "bg"
                    ? "Технически характеристики"
                    : "Technical Specifications"}
                </h2>
              </div>
              <p className="space-y-6 leading-relaxed text-[var(--color-charcoal)] max-w-4xl text-lg whitespace-pre-wrap">
                {specifications}
              </p>
            </div>
          )}

          {/* Image Gallery */}
          {project.images && project.images.length > 0 && (
            <section ref={galleryRef} className="space-y-6">
              <div className="flex gap-6">
                <div className="hidden md:block w-1 h-12 bg-[var(--color-red)]" />
                <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-charcoal)]">
                  {locale === "bg" ? "Галерия" : "Gallery"}
                </h2>
              </div>
              <ImageGallery
                images={project.images.map((img, index) => ({
                  id: img.id,
                  src: getCloudinaryUrl(img.cloudinaryPublicId)!,
                  alt: `${title} - ${locale === "bg" ? "Снимка" : "Image"} ${index + 1}`,
                }))}
                columns={{ mobile: 1, tablet: 2, desktop: 3 }}
                aspectRatio="landscape"
                isVisible={galleryVisible}
              />
            </section>
          )}

          {/* Related Projects Section */}
          {relatedProjects.length > 0 && (
            <section ref={relatedRef} className="mt-16 pt-12 space-y-6">
              <div className="flex gap-6">
                <div className="hidden md:block w-1 h-12 bg-[var(--color-red)]" />
                <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-charcoal)]">
                  {locale === "bg" ? "Свързани проекти" : "Related Projects"}
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedProjects.map((relatedProject, index) => {
                  const localized = localizeProject(relatedProject, locale);
                  const relatedImageUrl = getCloudinaryUrl(
                    relatedProject.heroImageUrl
                  ) ?? undefined;

                  return (
                    <div
                      key={relatedProject.id}
                      className={`transition-all duration-500 ${relatedVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
                      style={{ transitionDelay: `${index * 100}ms` }}
                    >
                      <Card
                        title={localized.title}
                        description={localized.description}
                        image={relatedImageUrl}
                        slug={`/projects/${project.category.slug}/${relatedProject.slug}`}
                        location={localized.location}
                        variant="compact"
                      />
                    </div>
                  );
                })}
              </div>
            </section>
          )}
        </div>
      </section>
    </main>
  );
}
