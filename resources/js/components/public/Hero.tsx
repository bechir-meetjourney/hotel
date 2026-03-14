import heroBg from '@/assets/images/hero/hero.webp'
import HeroSection from './hero/HeroSection'

/**
 * Hero component - Main landing page hero section
 * Wraps the HeroSection component with background image and padding
 */
export default function Hero() {   
  return (
    <section className="px-4">
      <HeroSection bgImage={heroBg} />
    </section>
  )
}
