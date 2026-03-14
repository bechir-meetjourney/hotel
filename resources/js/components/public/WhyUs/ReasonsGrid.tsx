// resources/js/components/public/WhyUs/ReasonsGrid.tsx
import React from 'react'
import AnimatedHeading from '@/components/motion/AnimatedHeading'
import { motion } from 'motion/react'
import { motionTokens } from '@/motion/tokens'

type ReasonItem = {
  title: string
  text: string
  iconSrc: string
  iconAlt?: string
}

export default function ReasonsGrid({
  items,
  title,
}: {
  title: string
  items: ReasonItem[]
}) {
  // Container: enable staggered children animation (no initial delay)
  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.07 } },
  }

  // Card: slight angled entrance and subtle rotation
  const card = {
    hidden: (i: number) => {
  // Alternate direction: right/left flip for visual variety
      const fromRight = i % 2 === 0
      // Reduce horizontal offset on small screens to avoid overflow
      const isSmall = typeof window !== 'undefined' && window.innerWidth <= 640
      const offset = isSmall ? 10 : 28
      return {
        opacity: 0,
        x: fromRight ? offset : -offset,
        y: 14,
        rotateZ: fromRight ? 0.6 : -0.6,
      }
    },
    show: {
      opacity: 1,
      x: 0,
      y: 0,
      rotateZ: 0,
      transition: { duration: 0.38, ease: motionTokens.easing.decel }, // decel
    },
  }

  // Icon: pop (scale) and lift slightly on hover
  const icon = {
    hidden: { opacity: 0, scale: 0.9, y: 6 },
    show:   { opacity: 1, scale: 1, y: 0, transition: { duration: 0.3 } },
  }

  return (
  <div className="pb-10 md:py-10 overflow-x-hidden" style={{ touchAction: 'pan-y' }}>
      <AnimatedHeading dir="up" delay={0.30}>
        <h3 className="mb-6 text-2xl sm:text-3xl font-extrabold text-public-title text-center sm:text-right">
          {title}
        </h3>
      </AnimatedHeading>

  {/* Add a subtle 3D perspective so card tilt on hover is visible */}
      <div style={{ perspective: 900 }}>
  <motion.div
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '0px 0px -12% 0px' }}
          variants={container}
        >
          {items.map((it, idx) => (
            <motion.article
              key={idx}
              custom={idx}
              variants={card}
              // Slight tilt on hover with a small lift
              whileHover={{ y: -6, rotateX: 2, rotateY: -2 }}
              transition={{ type: 'tween' }}
              className="
                rounded-2xl bg-white p-3 text-right
                shadow-md ring-1 ring-black/10
                will-change-transform
                overflow-hidden max-w-full min-w-0
              "
              style={{
                transformStyle: 'preserve-3d', // Improve 3D feeling
              }}
            >
              <div className="flex items-center justify-between gap-4 flex-row-reverse">
                <motion.img
                  variants={icon}
                  whileHover={{ y: -2, scale: 1.02 }} // Card hover interaction
                  src={it.iconSrc}
                  alt={it.iconAlt ?? ''}
                  className="h-12 w-12 shrink-0 select-none object-contain max-w-full"
                  loading="lazy"
                  decoding="async"
                />
                <div className="min-w-0">
                  <div className="truncate text-lg font-extrabold text-black">
                    {it.title}
                  </div>
                  <p className="mt-1 text-[12px] text-black/80 leading-relaxed">
                    {it.text}
                  </p>
                </div>
              </div>

              {/* Decorative line that animates from right to left on enter */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.4, delay: 0.15 }}
                className="mt-3 h-[2px] origin-right bg-gradient-to-l from-black/20 to-transparent"
                style={{ transformOrigin: 'right' }}
              />
            </motion.article>
          ))}
  </motion.div>
      </div>
    </div>
  )
}
