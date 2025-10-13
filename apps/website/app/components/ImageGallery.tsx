"use client";

import { useState } from "react";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import Captions from "yet-another-react-lightbox/plugins/captions";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";

interface ImageGalleryProps {
  images: Array<{
    src: string;
    alt: string;
    title?: string;
  }>;
  columns?: {
    mobile: number;
    tablet: number;
    desktop: number;
  };
  aspectRatio?: "square" | "portrait" | "landscape";
  animationDelay?: number;
  isVisible?: boolean;
  showTitles?: boolean;
}

export function ImageGallery({
  images,
  columns = { mobile: 2, tablet: 3, desktop: 4 },
  aspectRatio = "portrait",
  animationDelay = 50,
  isVisible = true,
  showTitles = false,
}: ImageGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState(-1);

  const aspectRatioClass = {
    square: "aspect-square",
    portrait: "aspect-[3/4]",
    landscape: "aspect-[4/3]",
  }[aspectRatio];

  const gridColsClass = {
    mobile: {
      1: "grid-cols-1",
      2: "grid-cols-2",
      3: "grid-cols-3",
      4: "grid-cols-4",
    }[columns.mobile],
    tablet: {
      1: "md:grid-cols-1",
      2: "md:grid-cols-2",
      3: "md:grid-cols-3",
      4: "md:grid-cols-4",
      5: "md:grid-cols-5",
    }[columns.tablet],
    desktop: {
      1: "lg:grid-cols-1",
      2: "lg:grid-cols-2",
      3: "lg:grid-cols-3",
      4: "lg:grid-cols-4",
      5: "lg:grid-cols-5",
    }[columns.desktop],
  };

  return (
    <>
      <div className={`grid ${gridColsClass.mobile} ${gridColsClass.tablet} ${gridColsClass.desktop} gap-6`}>
        {images.map((image, index) => (
          <div
            key={index}
            className={`transition-all duration-500 cursor-pointer ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-[20px]"
            }`}
            style={{ transitionDelay: `${index * animationDelay}ms` }}
          >
            <div
              className={`relative ${aspectRatioClass} rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 group cursor-pointer`}
              onClick={() => setLightboxIndex(index)}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes={`(max-width: 768px) ${100 / columns.mobile}vw, (max-width: 1024px) ${100 / columns.tablet}vw, ${100 / columns.desktop}vw`}
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <svg
                    className="w-12 h-12 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7"
                    />
                  </svg>
                </div>
              </div>
            </div>
            {showTitles && image.title && (
              <p className="mt-3 text-sm text-gray-700 leading-relaxed">
                {image.title}
              </p>
            )}
          </div>
        ))}
      </div>

      <Lightbox
        open={lightboxIndex >= 0}
        index={lightboxIndex}
        close={() => setLightboxIndex(-1)}
        slides={images.map((img) => ({
          src: img.src,
          alt: img.alt,
          description: showTitles && img.title ? img.title : undefined,
        }))}
        plugins={showTitles ? [Captions] : []}
        captions={{ descriptionTextAlign: "center" }}
      />
    </>
  );
}
