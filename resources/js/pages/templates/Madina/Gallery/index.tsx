/**
 * Gallery Section - Circular Gallery Display
 * 
 * Features:
 * - Interactive circular gallery using OGL (WebGL)
 * - 3D curved layout with smooth scrolling
 * - Touch and mouse drag support
 * - Wheel scrolling support
 * - Supports switching between circular and slider styles
 */
import { useState, useEffect } from 'react'
import BackgroundTitle from '@/components/templates/BackgroundTitle'
import { useTemplateT } from '@/hooks/useTemplateTranslations'
import leftLine from '../images/rooms/left-line.svg'
import rightLine from '../images/rooms/right-line.svg'
import CircularGallery from './CircularGallery'
import SliderGallery from './SliderGallery'

// Import images from template folder
import image1 from '../images/galary/imag1.png'
import image2 from '../images/galary/imag2.png'
import image3 from '../images/galary/imag3.png'
import image4 from '../images/galary/imag4.png'

export default function Gallery() {
  const t = useTemplateT()
  const [galleryStyle, setGalleryStyle] = useState<'riyadh' | 'madina'>('riyadh')

  // Load gallery slider style from localStorage
  useEffect(() => {
    const savedStyle = localStorage.getItem('madina-gallery-slider-style')
    if (savedStyle) {
      if (savedStyle === 'madina') {
        setGalleryStyle('madina')
      } else {
        setGalleryStyle('riyadh')
      }
    }
    
    // Listen for custom event from ThemeSwitcher
    const handleStyleChange = (e: Event) => {
      const customEvent = e as CustomEvent<{ type: 'riyadh' | 'madina'; id: string }>
      if (customEvent.detail && customEvent.detail.type) {
        setGalleryStyle(customEvent.detail.type)
      }
    }
    
    window.addEventListener('madina-gallery-slider-style-changed', handleStyleChange)
    
    return () => {
      window.removeEventListener('madina-gallery-slider-style-changed', handleStyleChange)
    }
  }, [])

  // Image data for circular gallery
  const galleryItems = [
    { image: image1, text: 'غرفة ديلوكس' },
    { image: image2, text: 'مطعم فاخر' },
    { image: image3, text: 'مسبح داخلي' },
    { image: image4, text: 'منتجع صحي' },
  ]
  
  // If style is madina (curved), use SliderGallery with same images
  if (galleryStyle === 'madina') {
    return <SliderGallery galleryItems={galleryItems} />
  }
  
  // Default style (riyadh) - Circular Gallery
  return (
    <section className="pb-10">
      <div className=" mx- px-4">
        {/* Title */}
        <div className="relative text-center ">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div 
              className="h-6 w-6 hidden md:block"
              aria-label="left line"
              style={{
                maskImage: `url(${leftLine})`,
                WebkitMaskImage: `url(${leftLine})`,
                maskSize: 'contain',
                WebkitMaskSize: 'contain',
                maskRepeat: 'no-repeat',
                WebkitMaskRepeat: 'no-repeat',
                maskPosition: 'center',
                WebkitMaskPosition: 'center',
                backgroundColor: 'var(--madina-primary)'
              }}
            />
            <h2 className="madina-font-heading madina-text-primary relative z-10 text-4xl md:text-5xl font-bold mb-4">
              {t('sections.gallery_slider.title', 'جولة افتراضية')}
          </h2>
            <div 
              className="h-6 w-6 hidden md:block"
              aria-label="right line"
              style={{
                maskImage: `url(${rightLine})`,
                WebkitMaskImage: `url(${rightLine})`,
                maskSize: 'contain',
                WebkitMaskSize: 'contain',
                maskRepeat: 'no-repeat',
                WebkitMaskRepeat: 'no-repeat',
                maskPosition: 'center',
                WebkitMaskPosition: 'center',
                backgroundColor: 'var(--madina-primary)'
              }}
            />
          </div>
          <BackgroundTitle 
            text={t('sections.gallery_slider.background_title', 'الجولة')} 
            colorClass="dark:text-[rgba(237,237,237,0.2)]"
            colorStyle={{ color: 'var(--madina-primary)', opacity: 0.1 }}
          />
          <p className="relative z-10 text-xl madina-text-body">
            {t('sections.gallery_slider.subtitle', 'جولة بصرية… صور تحكي قصتنا')}
          </p>
        </div>

        {/* Circular Gallery */}
        <div style={{ height: '600px', position: 'relative', marginTop: '0rem' }}>
          <CircularGallery
            items={galleryItems}
            bend={3}
            textColor="var(--madina-primary)"
            borderRadius={0.05}
            font="bold 30px sans-serif"
            scrollSpeed={2}
            scrollEase={0.05}
          />
        </div>
      </div>
    </section>
  )
}
