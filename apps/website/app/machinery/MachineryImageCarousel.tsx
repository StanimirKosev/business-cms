"use client";

import Image from "next/image";
import type { MachineryImage } from "@repo/database/client";
import { CLOUDINARY_BASE_URL } from "@/lib/cloudinary";
import { useState, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";

interface MachineryImageCarouselProps {
  images: MachineryImage[];
  categoryName: string;
  isEven: boolean;
}

export function MachineryImageCarousel({
  images,
  categoryName,
  isEven,
}: MachineryImageCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
      setCanScrollPrev(emblaApi.canScrollPrev());
      setCanScrollNext(emblaApi.canScrollNext());
    };

    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  // Show empty placeholder if no images
  if (!images || images.length === 0) {
    return (
      <div
        className={`relative h-[350px] md:h-[420px] overflow-hidden rounded-lg shadow-xl bg-gray-200 ${
          isEven ? "" : "md:col-start-2"
        }`}
      />
    );
  }

  // Show single image without carousel controls
  if (images.length === 1) {
    return (
      <div
        className={`relative h-[350px] md:h-[420px] overflow-hidden rounded-lg shadow-xl ${
          isEven ? "" : "md:col-start-2"
        }`}
      >
        <Image
          src={`${CLOUDINARY_BASE_URL}/${images[0].cloudinaryPublicId}`}
          alt={categoryName}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
    );
  }

  // Multiple images - show carousel with arrows
  return (
    <div
      className={`flex flex-col gap-3 ${
        isEven ? "" : "md:col-start-2"
      }`}
    >
      <div className="relative h-[350px] md:h-[420px] overflow-hidden rounded-lg shadow-xl" ref={emblaRef}>
        <div className="flex h-full">
          {images.map((image) => (
            <div
              key={image.id}
              className="flex-[0_0_100%] min-w-0 h-full relative"
            >
              <Image
                src={`${CLOUDINARY_BASE_URL}/${image.cloudinaryPublicId}`}
                alt={`${categoryName} - ${image.order + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation controls - only show if more than 1 image */}
      <div className="flex gap-3 justify-center">
        <button
          onClick={() => emblaApi?.scrollPrev()}
          disabled={!canScrollPrev}
          className="p-2 hover:text-[var(--color-red)] text-[var(--color-charcoal)] disabled:opacity-30 disabled:pointer-events-none transition-colors"
          aria-label="Previous image"
          type="button"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div className="flex items-center gap-2 px-4">
          <span className="text-sm font-medium text-[var(--color-charcoal)]">
            {selectedIndex + 1} / {images.length}
          </span>
        </div>
        <button
          onClick={() => emblaApi?.scrollNext()}
          disabled={!canScrollNext}
          className="p-2 hover:text-[var(--color-red)] text-[var(--color-charcoal)] disabled:opacity-30 disabled:pointer-events-none transition-colors"
          aria-label="Next image"
          type="button"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
