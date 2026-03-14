// resources/js/components/ui/FiltersBar.tsx
import React, { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, FreeMode } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";

type Dir = "rtl" | "ltr";

export type FiltersBarProps<T extends string> = {
  filters: readonly T[];
  active: T;
  onChange: (value: T) => void;
  /** UI direction. Pass from parent (e.g. from usePage props) */
  dir?: Dir;
  /** Additional container styles */
  className?: string;
  /** Chip size (filter button) */
  size?: "sm" | "md" | "lg";
  /** Full chip customization if a different appearance is needed */
  renderChip?: (args: {
    label: T;
    isActive: boolean;
    onClick: () => void;
  }) => React.ReactNode;
};

export default function FiltersBar<T extends string>({
  filters,
  active,
  onChange,
  dir = "rtl",
  className = "",
  size = "md",
  renderChip,
}: FiltersBarProps<T>) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const calc = () => {
      const isMobile = window.innerWidth < 640;
      const N = isMobile ? 3 : 5;
      const slides = Array.from(
        el.querySelectorAll<HTMLDivElement>(".filters-swiper .swiper-slide")
      );

      let total = 0;
  const gap = 6; // Matches Swiper's spaceBetween spacing
      for (let i = 0; i < Math.min(N, slides.length); i++) {
        const rect = slides[i].getBoundingClientRect();
        total += rect.width;
        if (i < N - 1) total += gap;
      }

      const viewport = el.querySelector<HTMLElement>(".filters-viewport");
      if (viewport) viewport.style.width = `${Math.ceil(total)}px`;
    };

    calc();
    const ro = new ResizeObserver(() => calc());
    ro.observe(document.documentElement);
    window.addEventListener("resize", calc);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", calc);
    };
  }, [filters]);

  const sizeClasses =
    size === "sm"
      ? "px-3 py-1 text-xs sm:text-sm"
      : size === "lg"
      ? "px-6 py-2 text-base sm:text-xl"
      : "px-4 py-1.5 text-sm sm:text-lg";

  const DefaultChip = ({ label }: { label: T }) => {
    const isActive = active === label;
    return (
      <button
        type="button"
        onClick={() => onChange(label)}
        aria-pressed={isActive}
        className={[
          "whitespace-nowrap rounded-full md:mx-2 md:mt-6 border font-semibold transition backdrop-blur",
          sizeClasses,
          "focus:outline-none focus:ring-1 focus:ring-white/20",
          isActive
            ? "bg-public-active text-white border-white/0 duration-300"
            : "text-white border-white/40 hover:border-white/80 duration-300 hover:bg-white/20",
        ].join(" ")}
      >
        {label}
      </button>
    );
  };

  return (
    <div ref={containerRef} className={`mt-6 relative ${className}`}>
  {/* Navigation buttons (rendered outside the Swiper DOM) */}
      <div className="absolute left-1 top-1/2 -translate-y-1/2 z-10 flex rounded-lg overflow-hidden border border-white/60 bg-white/10 backdrop-blur">
        <button
          ref={prevRef}
          type="button"
          aria-label={dir === "rtl" ? "تمرير يمين" : "Scroll left"}
          className="grid place-items-center p-2 text-white duration-300 hover:bg-public-active"
        >
          {/* In RTL: 'previous' visually means right */}
          <ChevronRight className="h-4 w-4" />
        </button>
        <div className="w-px bg-white/30" />
        <button
          ref={nextRef}
          type="button"
          aria-label={dir === "rtl" ? "تمرير يسار" : "Scroll right"}
          className="grid place-items-center p-2 text-white duration-300 hover:bg-public-active"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
      </div>

  {/* The viewport prevents overflow and sets computed width */}
      <div className="filters-viewport mx-auto overflow-hidden">
        <Swiper
          className="filters-swiper"
          modules={[Navigation, FreeMode]}
          dir={dir}
          slidesPerView="auto"
          spaceBetween={6}
          freeMode={{ enabled: true, sticky: false }}
          watchOverflow
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          onBeforeInit={(swiper) => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            swiper.params.navigation.prevEl = prevRef.current;
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            swiper.params.navigation.nextEl = nextRef.current;
          }}
        >
          {filters.map((label) => (
            <SwiperSlide key={label as string} className="!w-auto inline-flex">
              {renderChip ? (
                renderChip({
                  label,
                  isActive: active === label,
                  onClick: () => onChange(label),
                })
              ) : (
                <DefaultChip label={label} />
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
