import { useLang } from '@/hooks/useLang'
import HeroLogo from './HeroLogo'
import HeroCTA from './HeroCTA'
import heroLogo from '@/assets/images/hero/hero-logo.png'

import AnimatedHeading from '@/components/motion/AnimatedHeading'
import AnimatedParagraph from '@/components/motion/AnimatedParagraph'
import AnimatedButton from '@/components/motion/AnimatedButton'
/**
 * HeroContent component - Displays the main content of the hero section
 * Includes logo, title, tagline, description, and call-to-action button
 */
export default function HeroContent() {
  const { __ } = useLang()

  return (
    <div className="mx-auto max-w-3xl flex flex-col items-center text-center  ">
      
      <HeroLogo src={heroLogo} alt={__('messages.hero.logo_alt')} />
            <h1 className="font-extrabold leading-tight tracking-tight text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
              <AnimatedHeading dir="up" delay={0.30}>
                {__('messages.hero.title')}
              </AnimatedHeading>
            </h1>
            <h2 className="text-2xl font-bold text-black/70   sm:text-3xl md:text-3xl lg:text-5xl">
              <AnimatedHeading dir="up" delay={0.40}>
                {__('messages.hero.tagline')}
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
