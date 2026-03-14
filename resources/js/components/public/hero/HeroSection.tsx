import HeroContent from './HeroContent'

type Props = {
  bgImage: string
  overlayClassName?: string
}

/**
 * HeroSection component - Main hero section with background image
 * Displays hero content with customizable background and overlay
 * @param bgImage - Background image URL
 * @param overlayClassName - Optional custom overlay styling
 */
export default function HeroSection({ bgImage, overlayClassName }: Props) {
  return (
    <div
      className="
      relative w-full min-h-full
      bg-center 
      md:min-h-[100svh] 
       2xl:bg-top 2xl:bg-no-repeat
      md:bg-cover rounded-xl overflow-hidden
      flex pt-6 pb-12 md:pb-0 md:mt-0 md:items-center justify-center
      "
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Background overlay */}
      <div className={`pointer-events-none absolute inset-0 ${overlayClassName ?? 'bg-white/20'}`} />
      <div className="relative z-10">
        <HeroContent />
      </div>
    </div>
  )
}
