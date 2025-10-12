"use client";

import Image from "next/image";

interface CertificateCardProps {
  title: string;
  image: string;
  onClick: () => void;
}

export function CertificateCard({
  title,
  image,
  onClick,
}: CertificateCardProps) {
  return (
    <button
      onClick={onClick}
      className="group cursor-pointer w-full text-left"
    >
      {/* Image Container - Portrait aspect ratio like a document */}
      <div className="relative w-full mb-4" style={{ paddingBottom: "141.4%" }}>
        <Image
          src={image}
          alt={title}
          fill
          loading="lazy"
          className="object-cover transition-opacity duration-300 group-hover:opacity-80"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
        />
      </div>

      {/* Title left-aligned below image */}
      <p className="text-xs text-[var(--color-charcoal)] leading-tight">
        {title}
      </p>
    </button>
  );
}
