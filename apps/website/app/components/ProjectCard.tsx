"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Building2 } from "lucide-react";

interface ProjectCardProps {
  title: string;
  location: string;
  description: string;
  image: string;
  slug: string;
  category: string;
}

export function ProjectCard({
  title,
  location,
  description,
  image,
  slug,
  category,
}: ProjectCardProps) {
  return (
    <Link
      href={`/projects/${slug}`}
      className="relative block w-full h-[450px] rounded-xl overflow-hidden group"
    >
      {/* Background Image */}
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 450px"
      />
      <div className="absolute inset-0 bg-[var(--overlay)] transition-all duration-300 group-hover:bg-[var(--overlay-dark)]"></div>

      {/* Category Tag - Glassy */}
      <div className="absolute top-4 left-4 z-20 flex items-center gap-2 bg-[var(--color-brand)] text-white text-sm font-semibold px-4 py-2 rounded-lg shadow-lg backdrop-blur-sm">
        <Building2 className="w-4 h-4" />
        <span>{category}</span>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-6 z-10 transition-all duration-600 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:-translate-y-6">
        {/* Location Tag */}
        <div className="mb-2">
          <span className="inline-block  text-white  py-1 rounded text-xs font-bold tracking-wider uppercase">
            {location}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-2xl md:text-3xl font-bold text-white drop-shadow-lg mb-3 pr-16">
          {title}
        </h3>

        {/* Description - Appears on Hover */}
        <div className="max-h-0 overflow-hidden transition-all duration-600 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:max-h-24 group-hover:opacity-100 opacity-0 translate-y-2 group-hover:translate-y-0 pr-16">
          <p className="text-sm text-white/90 line-clamp-2">{description}</p>
        </div>
      </div>

      {/* Arrow Button - Bottom Right */}
      <div className="absolute bottom-6 right-6 z-20">
        <div className="w-12 h-12 bg-[var(--color-red)] rounded-full flex items-center justify-center shadow-xl">
          <ArrowUpRight className="w-6 h-6 text-white" />
        </div>
      </div>
    </Link>
  );
}
