"use client";

import Image from "next/image";
import { X } from "lucide-react";

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  image: string;
  title: string;
}

export function ImageModal({ isOpen, onClose, image, title }: ImageModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative z-10 w-[90vw] max-w-3xl bg-white rounded-lg shadow-2xl flex flex-col animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <h3 className="text-sm font-medium text-gray-900 line-clamp-1 pr-4">
            {title}
          </h3>
          <button
            onClick={onClose}
            className="flex-shrink-0 p-1 rounded-md hover:bg-gray-100 transition-colors"
            aria-label="Затвори"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Image Container - No scroll, fits viewport */}
        <div className="relative bg-gray-50 p-6">
          <div className="relative w-full" style={{ aspectRatio: "1/1.414", maxHeight: "75vh" }}>
            <Image
              src={image}
              alt={title}
              fill
              className="object-contain"
              sizes="90vw"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
}
