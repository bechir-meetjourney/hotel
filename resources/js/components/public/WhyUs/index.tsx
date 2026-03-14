// resources/js/components/public/WhyUs/index.tsx
import React from 'react'
import FeatureRow from './FeatureRow'     
import ReasonsGrid from './ReasonsGrid'
import { WhyIcons } from './icons'        
import { WHY_US_FEATURES, ADDITIONAL_REASONS } from '@/data/public-data'
import { useLang } from '@/hooks/useLang'
import decoLeft  from '@/assets/images/icons/line-left.svg'
import decoRight from '@/assets/images/icons/line-right.svg'
import Heading from './Heading'
import type { LucideIcon } from 'lucide-react'

// Import why us images
import imgTemplates from '@/assets/images/why/templates.webp'
import imgPayments from '@/assets/images/why/payments.webp'
import imgCustomize from '@/assets/images/why/customize.webp'
import imgUx from '@/assets/images/why/ux.webp'

// Import additional reasons icons
import icoSupport from '@/assets/images/icons/icon-1.svg'
import icoAnalytics from '@/assets/images/icons/icon-2.svg'
import icoSEO from '@/assets/images/icons/icon-3.svg'
import icoStaff from '@/assets/images/icons/icon-4.svg'

import AnimatedHeading from '@/components/motion/AnimatedHeading'

// Type definitions based on the data structures
type FeatureBullet = {
  readonly icon: string
  readonly textKey: string
  text?: string
}

type WhyFeature = {
  readonly titleKey: string
  readonly subtitleKey: string
  title?: string
  subtitle?: string
  readonly image: {
    readonly src: string
    readonly alt: string
  }
  readonly bullets: readonly FeatureBullet[]
}

type AdditionalReason = {
  readonly titleKey: string
  readonly textKey: string
  readonly iconSrc: string
  readonly iconAlt: string
  title?: string
  text?: string
}

/**
 * WhyUs component - Why choose us section
 * Showcases the main features and benefits of the platform with visual content
 */
export default function WhyUs() {
  // Map icon names to actual icon components
  const getIconComponent = (iconName: string): LucideIcon => {
    return WhyIcons[iconName as keyof typeof WhyIcons] || WhyIcons.LayoutTemplate
  }

  // Why us images mapping
  const whyUsImages = {
    '@/assets/images/why/templates.webp': imgTemplates,
    '@/assets/images/why/payments.webp': imgPayments,
    '@/assets/images/why/customize.webp': imgCustomize,
    '@/assets/images/why/ux.webp': imgUx,
  }

  // Additional reasons icons mapping
  const additionalReasonsIcons = {
    '@/assets/images/icons/icon-1.svg': icoSupport,
    '@/assets/images/icons/icon-2.svg': icoAnalytics,
    '@/assets/images/icons/icon-3.svg': icoSEO,
    '@/assets/images/icons/icon-4.svg': icoStaff,
  }

  const { __ } = useLang()

  // Transform features data to include icon components and actual images
  const transformFeatureData = (feature: WhyFeature) => {
    const title = feature.title || __(feature.titleKey || '')
    const subtitle = feature.subtitle || __(feature.subtitleKey || '')

    return {
      ...feature,
      title,
      subtitle,
      image: {
        ...feature.image,
        src: whyUsImages[feature.image.src as keyof typeof whyUsImages] || feature.image.src,
        alt: (feature.image.alt && __(feature.image.alt)) || feature.image.alt || '',
      },
      bullets: feature.bullets.map((bullet: FeatureBullet) => ({
        ...bullet,
        icon: getIconComponent(bullet.icon),
        text: bullet.text || __(bullet.textKey || ''),
      })),
    }
  }

  // Transform additional reasons to use actual imported images and localized text
  const transformedAdditionalReasons = ADDITIONAL_REASONS.map((reason: AdditionalReason) => {
    return {
      ...reason,
      iconSrc: additionalReasonsIcons[reason.iconSrc as keyof typeof additionalReasonsIcons] || reason.iconSrc,
      title: reason.title || __(reason.titleKey || ''),
      text: reason.text || __(reason.textKey || ''),
    }
  })


  return (
    <section id="why-us" className="relative overflow-x-hidden">
      <div className="mx-auto max-w-7xl px-4 pt-12">
        <Heading leftIcon={decoRight} rightIcon={decoLeft}>
          <AnimatedHeading dir="up">
            {__("messages.why_us.title")}
          </AnimatedHeading>
        </Heading>

        {/* 1) Templates: image from RIGHT, content from LEFT */}
        <FeatureRow
          {...transformFeatureData(WHY_US_FEATURES.templates)}
          imageSide="right"
          imageDir="right"       
          contentDir="left"      
        />

        {/* 2) Payments: image from LEFT, content from RIGHT */}
        <FeatureRow
          {...transformFeatureData(WHY_US_FEATURES.payments)}
          imageSide="left"
          imageDir="left"
          contentDir="right"
        />

        {/* 3) Customization: image from RIGHT, content from LEFT */}
        <FeatureRow
          {...transformFeatureData(WHY_US_FEATURES.customization)}
          imageSide="right"
          imageDir="right"
          contentDir="left"
        />

        {/* 4) UX: image from LEFT, content from RIGHT */}
        <FeatureRow
          {...transformFeatureData(WHY_US_FEATURES.ux)}
          imageSide="left"
          imageDir="left"
          contentDir="right"
        />

        <ReasonsGrid
          title={__("messages.additional_reasons_title")}
          items={transformedAdditionalReasons as any}
        />
      </div>
    </section>
  )
}