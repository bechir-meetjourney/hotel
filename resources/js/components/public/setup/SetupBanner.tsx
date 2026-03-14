import React from 'react'
import bannerDefault from '@/assets/images/banner.webp'

import AnimatedHeading from '@/components/motion/AnimatedHeading'
import AnimatedParagraph from '@/components/motion/AnimatedParagraph'
import { useLang } from '@/hooks/useLang'

type Props = {
  title?: string
  subtitle?: string
  imageSrc?: string
  subtitleColor?: string
  heightClass?: string
}

export default function SetupBanner({
  title = undefined,
  subtitle = undefined,
  imageSrc = bannerDefault,
  subtitleColor = '#CCD4DC',
  heightClass = 'h-48 sm:h-64',
}: Props) {
  const { __ } = useLang()

  const resolvedTitle = title ?? __("messages.setup_banner.thank_you")
  const resolvedSubtitle = subtitle ?? __("messages.setup_banner.subtitle")
  return (
    <section className="relative py-4">
  {/* Center container with side spacing */}
      <div className="">
  {/* Banner frame */}
        <div className={`relative ${heightClass} overflow-hidden rounded-2xl`}>
          {/* Image fills the frame */}
          <img
            src={imageSrc}
            alt=""
            className="absolute inset-0 h-full w-full "
            loading="eager"
            decoding="async"
          />
          {/* Text centered */}
          <div className="absolute inset-0 grid place-items-center">
            <div className="text-center text-white px-4">
                <AnimatedHeading dir="up" delay={0.30}>
                  <h1 className="text-2xl sm:text-5xl font-extrabold">{resolvedTitle}</h1>
                </AnimatedHeading>
                <AnimatedParagraph dir="none" delay={0.70}>  
                  <p className="mt-3 text-sm sm:text-2xl" style={{ color: subtitleColor }}>
                    {resolvedSubtitle}
                  </p>
                </AnimatedParagraph>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
