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

const AUTOPLAY_DELAY = 6000;

const HeroCarousel = () => {
  const autoplay = useRef(
    Autoplay({ delay: AUTOPLAY_DELAY, stopOnInteraction: false })
  );
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    autoplay.current,
  ]);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);
  const [showScroll, setShowScroll] = useState<boolean>(true);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);

    onSelect();

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi]);

  useEffect(() => {
    window.addEventListener("scroll", () => setShowScroll(false), {
      once: true,
    });

    const tick = () => {
      const timeLeft = autoplay.current.timeUntilNext();
      if (timeLeft === null) {
        setProgress(0);
      } else {
        const elapsed = AUTOPLAY_DELAY - timeLeft;
        setProgress((elapsed / AUTOPLAY_DELAY) * 100);
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const handleNavigation = (action: () => void) => {
    setProgress(0);
    autoplay.current.reset();
    action();
  };

  const handleScrollDown = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
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

      <div className="absolute inset-0 flex items-center px-6 md:px-40 z-10">
        <div className="max-w-3xl">
          <div className="flex gap-4 items-start mb-4">
            <div className="w-1 h-16 md:h-20 bg-[var(--color-red)] mt-1" />
            <h1 className="text-4xl md:text-6xl font-bold text-[var(--color-white)]">
              {MOCK_SLIDES[selectedIndex].title}
            </h1>
          </div>
          <p className="text-lg md:text-xl text-[var(--color-white)] mb-8 ml-8">
            {MOCK_SLIDES[selectedIndex].subtitle}
          </p>
          <div className="flex gap-4">
            <ChevronButton
              direction="left"
              onClick={() => handleNavigation(() => emblaApi?.scrollPrev())}
              ariaLabel="Previous slide"
            />
            <ChevronButton
              direction="right"
              onClick={() => handleNavigation(() => emblaApi?.scrollNext())}
              ariaLabel="Next slide"
            />
          </div>
        </div>
      </div>

      <div className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 flex flex-col items-center z-10">
        <span className="text-2xl md:text-3xl font-bold text-[var(--color-red)]">
          {selectedIndex + 1}
        </span>
        <div className="w-px h-8 bg-[var(--color-white)]/40 my-1" />
        <span className="text-lg md:text-xl font-medium text-[var(--color-white)]">
          {MOCK_SLIDES.length}
        </span>
      </div>

      {showScroll ? (
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20">
          <ChevronButton
            direction="down"
            onClick={handleScrollDown}
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
