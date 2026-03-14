type Props = {
    src: string
    alt: string
  }
  import AnimatedImage from '@/components/motion/AnimatedImage'
  /**
   * HeroLogo component - Displays the logo in the hero section
   * @param src - Source URL of the logo image
   * @param alt - Alt text for the logo image
   */

  export default function HeroLogo({ src, alt }: Props) {
    return (
      <div className="flex  items-center justify-center  ">
        <AnimatedImage dir="up" src={src}  alt={alt} className="h-44 w-44 "     />
      </div>
    )
  }
  