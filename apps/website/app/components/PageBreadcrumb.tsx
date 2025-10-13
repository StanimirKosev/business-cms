import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
} from "@repo/ui/components/breadcrumb";

interface BreadcrumbItemType {
  label: string;
  href?: string;
}

interface PageBreadcrumbProps {
  items: BreadcrumbItemType[];
}

export function PageBreadcrumb({ items }: PageBreadcrumbProps) {
  return (
    <Breadcrumb>
      <BreadcrumbList className="flex-nowrap">
        {/* Always show first item (Home) */}
        <BreadcrumbItem className="shrink-0">
          <BreadcrumbLink asChild>
            <Link href={items[0].href || "/"}>{items[0].label}</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator className="shrink-0" />

        {items.length > 2 && (
          <>
            {/* Show ellipsis on mobile and small tablets */}
            <BreadcrumbItem className="lg:hidden shrink-0">
              <BreadcrumbEllipsis />
            </BreadcrumbItem>
            <BreadcrumbSeparator className="lg:hidden shrink-0" />

            {/* Show all middle items on desktop */}
            {items.slice(1, -1).map((item, index) => (
              <div key={index} className="hidden lg:contents">
                <BreadcrumbItem className="shrink-0">
                  <BreadcrumbLink asChild>
                    <Link href={item.href || "#"}>{item.label}</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="shrink-0" />
              </div>
            ))}
          </>
        )}

        {/* Always show last item (current page) */}
        <BreadcrumbItem className="min-w-0">
          <BreadcrumbPage className="truncate">{items[items.length - 1].label}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
