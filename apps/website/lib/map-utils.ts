import type { Prisma } from "@repo/database/client";

type ProjectWithClient = Prisma.ProjectGetPayload<{
  include: {
    client: true;
  };
}>;

export type ProjectsByRegion = Record<
  string,
  {
    projects: ProjectWithClient[];
    // Store both locales for flexible filtering
    clientNames: {
      bg: Set<string>;
      en: Set<string>;
    };
  }
>;

/**
 * Computes projects grouped by region with unique clients in both locales
 * Shared utility to avoid duplication across components
 */
export function computeProjectsByRegion(
  projects: ProjectWithClient[]
): ProjectsByRegion {
  return projects.reduce((acc, project) => {
    if (!acc[project.region]) {
      acc[project.region] = {
        projects: [],
        clientNames: {
          bg: new Set<string>(),
          en: new Set<string>(),
        },
      };
    }
    acc[project.region].projects.push(project);
    acc[project.region].clientNames.bg.add(project.client.nameBg);
    acc[project.region].clientNames.en.add(project.client.nameEn);
    return acc;
  }, {} as ProjectsByRegion);
}
