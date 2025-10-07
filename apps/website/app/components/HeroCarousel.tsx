"use client";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import ChevronButton from "./ChevronButton";

const MOCK_SLIDES = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1920&q=80",
    alt: "Construction site 1",
    title: "Строим вашето бъдеще",
    subtitle: "Професионални строителни услуги от 2011 година",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1759239572496-4ec13e7643d6?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Construction site 2",
    title: "Качество и прецизност",
    subtitle: "Над 200 завършени проекта",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1920&q=80",
    alt: "Construction site 3",
    title: "Вашият надежден партньор",
    subtitle: "Висококвалифицирани инженери и икономисти",
  },
];

const AUTOPLAY_DELAY = 10000;

const HeroCarousel = () => {
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
          {MOCK_SLIDES.map((slide) => (
            <div
              key={slide.id}
              className="flex-[0_0_100%] min-w-0 h-full relative"
            >
              <div className="w-full h-full relative overflow-hidden bg-black">
                <Image
                  src={slide.image}
                  alt={slide.alt}
                  fill
                  className="object-cover animate-ken-burns"
                  priority={slide.id === 1}
                  sizes="100vw"
                  quality={90}
                  draggable={false}
                />
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--overlay)] via-[var(--overlay)] to-transparent z-10" />
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
                {MOCK_SLIDES[selectedIndex].title}
              </h1>
              <p
                key={`subtitle-${selectedIndex}`}
                className="text-lg md:text-xl text-[var(--color-white)] mb-8 animate-slide-up-delayed"
              >
                {MOCK_SLIDES[selectedIndex].subtitle}
              </p>
            </div>
          </div>
          <div className="hidden md:flex gap-4 pointer-events-auto">
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
      </div>

      <div className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 flex flex-col items-center z-10 pointer-events-none">
        <span className="text-2xl md:text-3xl font-bold text-[var(--color-red)]">
          {selectedIndex + 1}
        </span>
        <div className="w-px h-8 bg-[var(--color-white)]/40 my-1" />
        <span className="text-lg md:text-xl font-medium text-[var(--color-white)]">
          {MOCK_SLIDES.length}
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
