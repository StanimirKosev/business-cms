import type { Prisma } from "@repo/database/client";

/**
 * Extract localized value from bilingual field
 * @example getLocalizedValue(project, 'title', 'bg') // returns project.titleBg
 */
function getLocalizedValue<T extends Record<string, unknown>>(
  obj: T,
  fieldName: string,
  locale: "bg" | "en"
): string {
  const key = `${fieldName}${locale === "bg" ? "Bg" : "En"}` as keyof T;
  const value = obj[key];
  return (value as string | null | undefined) || "";
}

/**
 * Helper for project localization - returns all fields including optional ones
 */
export function localizeProject(
  project: Prisma.ProjectGetPayload<{
    include: { category: true; client: true };
  }>,
  locale: "bg" | "en"
) {
  const specifications = getLocalizedValue(project, "specifications", locale);

  return {
    title: getLocalizedValue(project, "title", locale),
    description: getLocalizedValue(project, "description", locale),
    location: getLocalizedValue(project, "location", locale),
    categoryName: getLocalizedValue(project.category, "title", locale),
    workNature: getLocalizedValue(project, "workNature", locale),
    // Handle both literal \n strings and actual newlines in specifications
    specifications: specifications.replace(/\\n/g, "\n"),
  };
}
