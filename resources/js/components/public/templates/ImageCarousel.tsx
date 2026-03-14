// resources/js/components/public/templates/ImageCarousel.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, A11y } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'
import 'swiper/css'
import TemplateCard from './TemplateCard'
import type { TemplateItem } from './constants'

export default function ImageCarousel({
  items,
  ariaLabel = 'قوالب المناطق',
}: {
  items: TemplateItem[]     
  ariaLabel?: string
}) {
  const swiperRef = useRef<SwiperType | null>(null)

  useEffect(() => {
    const updateDelay = () => {
      const w = window.innerWidth
      const delay = w < 640 ? 2000 : 3000
      const s = swiperRef.current
      if (!s) return
      s.params.autoplay = {
        ...(s.params.autoplay as any),
        delay,
        pauseOnMouseEnter: true,
        disableOnInteraction: false,
      }
      s.autoplay.stop()
      s.autoplay.start()
    }
    updateDelay()
    window.addEventListener('resize', updateDelay)
    return () => window.removeEventListener('resize', updateDelay)
  }, [])

  return (
    <section aria-label={ariaLabel} aria-roledescription="carousel" aria-live="polite">
      <Swiper
        modules={[Autoplay, A11y]}
        breakpoints={{ 0:{ slidesPerView:1, spaceBetween:12 }, 640:{ slidesPerView:3, spaceBetween:16 } }}
        direction="horizontal"
        grabCursor
        autoplay={{ delay:3000, pauseOnMouseEnter:true, disableOnInteraction:false }}
        a11y={{ enabled:true }}
        onSwiper={(s) => (swiperRef.current = s)}
        className="rounded-xl"
      >
        {items.map((it, idx) => (
          <SwiperSlide key={it.id} role="group" aria-roledescription="slide" aria-label={`${idx + 1} / ${items.length}`}>
            <div className="p-2">
              <TemplateCard item={it} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}
