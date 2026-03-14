// resources/js/components/public/WhyUs/FeatureRow.tsx
import React from 'react'
import IconBullet from './IconBullet'
const MIconBullet = motion.create(IconBullet)

import type { LucideIcon } from 'lucide-react'

// NEW
import AnimatedImage from '@/components/motion/AnimatedImage'
import AnimatedHeading from '@/components/motion/AnimatedHeading'
import AnimatedParagraph from '@/components/motion/AnimatedParagraph'
import { motion } from 'motion/react'

type Bullet = { text: string; icon: LucideIcon }
type Dir = 'left' | 'right' | 'up' | 'down' | 'none'
  
export default function FeatureRow({
  title,
  subtitle,
  bullets,
  image,
  imageSide = 'left',
  imageClassName = '',
  contentClassName = '',
  containerClassName = '',
  // NEW:
  imageDir = 'none',
  contentDir = 'none',
}: {
  title: string
  subtitle: string
  bullets: Bullet[]
  image: { src: string; alt?: string }
  imageSide?: 'left' | 'right'
  imageClassName?: string
  contentClassName?: string
  containerClassName?: string
  // NEW:
  imageDir?: Dir
  contentDir?: Dir
}) {
  const imgFirst = imageSide === 'left'
  const isRTL = typeof document !== 'undefined' && document.documentElement.dir === 'rtl'

  const outerPad =
    isRTL
      ? (imageSide === 'right' ? '' : 'pr-8 lg:pr-20 xl:pr-32')
      : (imageSide === 'right' ? '' : 'pl-8 lg:pl-20 xl:pl-32')

  // small stagger for bullets
const list = { show: { transition: { staggerChildren: 0.06 } } }
const item = { hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } }

  return (
    <div className={['grid items-center py-8 md:py-12 gap-y-8 sm:grid-cols-12 sm:gap-x-10 lg:gap-x-16 xl:gap-x-24', containerClassName].join(' ')}>
      {/* Image */}
      <div className={[imgFirst ? '' : 'sm:order-2','sm:col-span-5', imgFirst ? 'justify-self-start' : 'justify-self-end','w-full'].join(' ')}>
        <div className="overflow-hidden rounded-2xl">
          <AnimatedImage
            dir={imageDir}                // NEW: direction control
            src={image.src}
            alt={image.alt ?? ''}
            className={['block w-full h-auto object-cover', imageClassName].join(' ')}
          />
        </div>
      </div>

      {/* Content */}
      <div
        className={[
          imgFirst ? '' : 'sm:order-1',
          'sm:col-span-7',
          outerPad,
          'max-w-[60ch]',
          contentClassName,
        ].join(' ')}
      >
        <AnimatedHeading dir={contentDir}>
          <h3 className="text-2xl sm:text-3xl  2xl:text-3xl  font-extrabold text-public-title">{title}</h3>
        </AnimatedHeading>

        <AnimatedParagraph dir={contentDir} delay={0.05}>
          <p className="mt-3 text-public-title/70 text-md  2xl:text-xl   leading-relaxed">{subtitle}</p>
        </AnimatedParagraph>

      <motion.ul
        className="mt-5 space-y-3 font-medium text-md 2xl:text-xl "
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '0px 0px -12% 0px' }}
        variants={list}
      >
        {bullets.map((b, i) => (
          <MIconBullet key={i} variants={item} icon={b.icon}>
            {b.text}
          </MIconBullet>
        ))}
      </motion.ul>
      </div>
    </div>
  )
}
