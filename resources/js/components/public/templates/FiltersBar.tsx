// resources/js/components/public/templates/FiltersBar.tsx
import React, { useEffect, useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, FreeMode } from 'swiper/modules'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import 'swiper/css'
import 'swiper/css/navigation'
import type { Region } from './constants'
import { useLang } from '@/hooks/useLang'

export default function FiltersBar({
  filters,
  active,
  onChange,
}: {
  filters: readonly Region[]
  active: Region
  onChange: (r: Region) => void
}) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const prevRef = useRef<HTMLButtonElement | null>(null)
  const nextRef = useRef<HTMLButtonElement | null>(null)

  // Determine page direction once (RTL/LTR)
  const [isRTL, setIsRTL] = useState(false)
  useEffect(() => {
    if (typeof document !== 'undefined') {
      setIsRTL(document.documentElement.dir === 'rtl')
    }
  }, [])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const calc = () => {
      const isMobile = window.innerWidth < 640
      const N = isMobile ? 3 : 5
      const slides = Array.from(
        el.querySelectorAll<HTMLDivElement>('.filters-swiper .swiper-slide')
      )

      let total = 0
      const gap = 6
      for (let i = 0; i < Math.min(N, slides.length); i++) {
        const rect = slides[i].getBoundingClientRect()
        total += rect.width
        if (i < N - 1) total += gap
      }

      const viewport = el.querySelector<HTMLElement>('.filters-viewport')
      if (viewport) viewport.style.width = `${Math.ceil(total)}px`
    }

    calc()
    const ro = new ResizeObserver(() => calc())
    ro.observe(document.documentElement)
    window.addEventListener('resize', calc)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', calc)
    }
  }, [filters])

  const { __ } = useLang()

  const Chip = ({ label }: { label: Region }) => {
    const isActive = active === label
    return (
      <button
        type="button"
        onClick={() => onChange(label)}
        aria-pressed={isActive}
        className={[
          'whitespace-nowrap rounded-full md:mx-2 md:mt-6 border px-4 md:px-6 py-1 text-sm sm:text-2xl font-semibold transition backdrop-blur',
          'focus:outline-none focus:ring-1 focus:ring-white/20 cursor-pointer',
          isActive
            ? 'bg-public-active text-white border-white/0 duration-300'
            : 'text-white border-white/40 hover:border-white/80 duration-300 hover:bg-white/20 ',
        ].join(' ')}
      >
        {__(`messages.templates_section.filters.${label}`) || label}
      </button>
    )
  }

  // Simplified ARIA labels adjusted per direction
  const prevLabel = isRTL ? 'السابق' : 'Prev'
  const nextLabel = isRTL ? 'التالي' : 'Next'

  return (
    <div ref={containerRef} className="mt-6 relative">
  {/* Navigation buttons: icons switch based on direction */}
      <div className="absolute end-2 -top-12 sm:end-1 sm:top-1/2 sm:-translate-y-1/2 z-10 flex rounded-lg overflow-hidden border border-white/60 bg-white/10 backdrop-blur">
        <button
          ref={prevRef}
          type="button"
          aria-label={prevLabel}
          className="grid place-items-center p-2 2xl:p-4   text-white duration-300 hover:bg-public-active cursor-pointer"
        >
          {/* LTR: left | RTL: right */}
          {isRTL ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
        <div className="w-px bg-white/30" />
        <button
          ref={nextRef}
          type="button"
          aria-label={nextLabel}
          className="grid place-items-center p-2 2xl:p-4     text-white duration-300 hover:bg-public-active cursor-pointer"
        >
          {/* LTR: right | RTL: left */}
          {isRTL ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        </button>
      </div>

      <div className="filters-viewport mx-auto overflow-hidden">
        <Swiper
          className="filters-swiper"
          modules={[Navigation, FreeMode]}
          slidesPerView="auto"
          spaceBetween={6}
          freeMode={{ enabled: true, sticky: false }}
          watchOverflow
          // Swiper prev/next elements remain constant — only icons visually swap
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          onBeforeInit={(swiper) => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            swiper.params.navigation.prevEl = prevRef.current
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            swiper.params.navigation.nextEl = nextRef.current
          }}
        >
          {filters.map((label) => (
            <SwiperSlide key={label} className="!w-auto inline-flex">
              <Chip label={label} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}
