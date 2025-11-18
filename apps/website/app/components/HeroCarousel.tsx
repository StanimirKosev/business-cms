"use client";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import ChevronButton from "./ChevronButton";
import { useLanguage } from "@/app/context/LanguageContext";
import { getCloudinaryUrl } from "@/lib/cloudinary";

// Cloudinary image public IDs for hero carousel
const HERO_IMAGE_IDS = ["гара_r9o6sd", "2639-800_ijugrx", "2615-800_g4nfhr"];

const SLIDE_IMAGES = HERO_IMAGE_IDS.map((id) => getCloudinaryUrl(id)!);

const AUTOPLAY_DELAY = 10000;

const HeroCarousel = () => {
  const { t } = useLanguage();
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({
      delay: AUTOPLAY_DELAY,
      playOnInit: false,
      stopOnInteraction: false,
    }),
  ]);

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [showChevron, setShowChevron] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  const progressNodeRef = useRef<number | null>(null);

  useEffect(() => {
    const onScroll = () => setShowChevron(false);
    window.addEventListener("scroll", onScroll, { once: true, passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 50);
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    const autoplayPlugin = emblaApi.plugins()?.autoplay;
    if (!autoplayPlugin) return;

    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());

    const updateProgress = () => {
      const timeLeft = autoplayPlugin.timeUntilNext();
      if (timeLeft === null) return;
      setProgress(((AUTOPLAY_DELAY - timeLeft) / AUTOPLAY_DELAY) * 100);
      progressNodeRef.current = requestAnimationFrame(updateProgress);
    };

    const onTimerSet = () => {
      if (progressNodeRef.current !== null) {
        cancelAnimationFrame(progressNodeRef.current);
      }
      progressNodeRef.current = requestAnimationFrame(updateProgress);
    };

    const onTimerStopped = () => {
      if (progressNodeRef.current !== null) {
        cancelAnimationFrame(progressNodeRef.current);
        progressNodeRef.current = null;
      }
      setProgress(0);
    };

    emblaApi
      .on("select", onSelect)
      .on("autoplay:timerset", onTimerSet)
      .on("autoplay:timerstopped", onTimerStopped);

    onSelect();
    autoplayPlugin.play();

    return () => {
      emblaApi
        .off("select", onSelect)
        .off("autoplay:timerset", onTimerSet)
        .off("autoplay:timerstopped", onTimerStopped);

      if (progressNodeRef.current !== null)
        cancelAnimationFrame(progressNodeRef.current);
    };
  }, [emblaApi]);

  const handleNavigation = (direction: "prev" | "next") => {
    emblaApi?.plugins()?.autoplay?.reset();

    if (direction === "prev") {
      emblaApi?.scrollPrev();
    } else {
      emblaApi?.scrollNext();
    }
  };

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <div className="h-full overflow-hidden" ref={emblaRef}>
        <div className="flex h-full">
          {t.hero.slides.map((slide, index) => (
            <div
              key={index}
              className="flex-[0_0_100%] min-w-0 h-full relative"
            >
              <div className="w-full h-full relative overflow-hidden bg-black">
                <Image
                  src={SLIDE_IMAGES[index]}
                  alt={slide.title}
                  fill
                  className="object-cover animate-ken-burns"
                  priority={index === 0}
                  sizes="100vw"
                  quality={90}
                  draggable={false}
                />
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--overlay-hero)] via-[var(--overlay-hero)] to-transparent z-10" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute inset-0 flex items-center px-6 md:px-40 z-10 pointer-events-none">
        <div className="max-w-3xl">
          <div className="flex gap-4 items-start">
            <div
              className={`w-1 bg-[var(--color-red)] mt-1 transition-all duration-[600ms] ease-out ${
                isVisible ? "h-16 md:h-20" : "h-0"
              }`}
            />
            <div>
              <h1
                key={`title-${selectedIndex}`}
                className="text-4xl md:text-6xl font-bold text-[var(--color-white)] mb-4 animate-slide-up"
              >
                {t.hero.slides[selectedIndex].title}
              </h1>
              <p
                key={`subtitle-${selectedIndex}`}
                className="text-lg md:text-xl text-[var(--color-white)] animate-slide-up-delayed"
              >
                {t.hero.slides[selectedIndex].subtitle}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Chevrons - positioned independently to prevent movement */}
      <div className="absolute bottom-[30vh] left-6 md:left-40 z-10 pointer-events-none">
        <div className="hidden md:flex gap-4 ml-5 pointer-events-auto">
          <ChevronButton
            direction="left"
            onClick={() => handleNavigation("prev")}
            ariaLabel="Previous slide"
          />
          <ChevronButton
            direction="right"
            onClick={() => handleNavigation("next")}
            ariaLabel="Next slide"
          />
        </div>
      </div>

      <div className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 flex flex-col items-center z-10 pointer-events-none">
        <span className="text-2xl md:text-3xl font-bold text-[var(--color-red)]">
          {selectedIndex + 1}
        </span>
        <div className="w-px h-8 bg-[var(--color-white)]/40 my-1" />
        <span className="text-lg md:text-xl font-medium text-[var(--color-white)]">
          {t.hero.slides.length}
        </span>
      </div>

      {showChevron ? (
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20">
          <ChevronButton
            direction="down"
            onClick={() =>
              window.scrollTo({ top: window.innerHeight, behavior: "smooth" })
            }
            ariaLabel="Scroll down"
            className="text-[var(--color-white)]/90 animate-chevron-nudge"
          />
        </div>
      ) : null}

      <div className="absolute bottom-0 left-0 right-0 h-1 bg-[var(--color-white)]/20">
        <div
          className="h-full bg-[var(--color-red)] origin-left transform-gpu"
          style={{
            transform: `scaleX(${progress / 100})`,
            willChange: "transform",
          }}
        />
      </div>
    </div>
  );
};

export default HeroCarousel;
