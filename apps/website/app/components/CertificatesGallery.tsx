"use client";

import { useState } from "react";
import { CertificateCard } from "./CertificateCard";
import { ImageModal } from "./ImageModal";

interface Certificate {
  id: number;
  title: string;
  image: string;
}

interface CertificatesGalleryProps {
  certificates: Certificate[];
  isVisible: boolean;
}

export function CertificatesGallery({
  certificates,
  isVisible,
}: CertificatesGalleryProps) {
  const [selectedCertificate, setSelectedCertificate] = useState<{
    image: string;
    title: string;
  } | null>(null);

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
        {certificates.map((certificate, index) => (
          <div
            key={certificate.id}
            className={`transition-all duration-500 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[20px]"
            }`}
            style={{ transitionDelay: `${index * 50}ms` }}
          >
            <CertificateCard
              title={certificate.title}
              image={certificate.image}
              onClick={() =>
                setSelectedCertificate({
                  image: certificate.image,
                  title: certificate.title,
                })
              }
            />
          </div>
        ))}
      </div>

      <ImageModal
        isOpen={!!selectedCertificate}
        onClose={() => setSelectedCertificate(null)}
        image={selectedCertificate?.image || ""}
        title={selectedCertificate?.title || ""}
      />
    </>
  );
}
