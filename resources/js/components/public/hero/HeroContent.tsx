import { useLang } from '@/hooks/useLang'
import { usePage } from '@inertiajs/react'
import HeroLogo from './HeroLogo'
import HeroCTA from './HeroCTA'
import heroLogo from '@/assets/images/hero/hero-logo.png'

import AnimatedHeading from '@/components/motion/AnimatedHeading'
import AnimatedParagraph from '@/components/motion/AnimatedParagraph'
import AnimatedButton from '@/components/motion/AnimatedButton'
/**
 * HeroContent component - Displays the main content of the hero section
 * Uses siteSettings from super-admin if available, falls back to translations
 */
export default function HeroContent() {
  const { __ } = useLang()
  const { siteSettings, locale } = usePage<{ siteSettings?: { hero?: Record<string, string | null> }; locale?: string }>().props
  const isAr = locale === 'ar'
  const heroTitle = (isAr ? siteSettings?.hero?.hero_title_ar : siteSettings?.hero?.hero_title_en) || ''
  const heroSubtitle = (isAr ? siteSettings?.hero?.hero_subtitle_ar : siteSettings?.hero?.hero_subtitle_en) || ''

  return (
    <div className="mx-auto max-w-3xl flex flex-col items-center text-center  ">
      
      <HeroLogo src={heroLogo} alt={__('messages.hero.logo_alt')} />
            <h1 className="font-extrabold leading-tight tracking-tight text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
              <AnimatedHeading dir="up" delay={0.30}>
                {heroTitle || __('messages.hero.title')}
              </AnimatedHeading>
            </h1>
            <h2 className="text-2xl font-bold text-black/70   sm:text-3xl md:text-3xl lg:text-5xl">
              <AnimatedHeading dir="up" delay={0.40}>
                {heroSubtitle || __('messages.hero.tagline')}
              </AnimatedHeading>
            </h2>
            <AnimatedParagraph dir="none" delay={0.50}>  
                  <p className="max-w-2xl text-base sm:text-xl my-6 mt-3 md:mt-6 text-black/70 ">
                    {__('messages.hero.description')}
                  </p>
            </AnimatedParagraph>
            <div >
              <HeroCTA href="/templates">
               <AnimatedButton dir="up" >
                  <p className='text-xl font-normal'>
                  {__('messages.hero.cta')}
                  </p>
                </AnimatedButton>
              </HeroCTA>
            </div>
    </div>
  )
}
