import * as LucideIcons from "lucide-react";

/**
 * Get a Lucide icon component by name
 * Falls back to Award icon if the name doesn't exist
 */
export function getLucideIcon(iconName: string) {
  const IconComponent = (
    LucideIcons as unknown as Record<string, React.ElementType>
  )[iconName];
  return IconComponent || LucideIcons.Award;
}
