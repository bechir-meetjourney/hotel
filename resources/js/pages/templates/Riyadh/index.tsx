import TemplateLayout from '@/layouts/TemplateLayout'
import HeroSection from './HeroSection'
import RoomsSection from './RoomsSection'
import ServicesSection from './ServicesSection'
import PartnersSection from './PartnersSection'
import TestimonialsSection from './TestimonialsSection'
import GallerySection from './GallerySection'
import GallerySlider from './GallerySlider'
import ContactSection from './ContactSection'
import { useTemplateT } from '@/hooks/useTemplateTranslations'
/**
 * قالب الرياض - قالب فندق احترافي مستوحى من العاصمة السعودية
 * يحتوي على جميع أقسام الموقع المطلوبة لفندق متكامل
 * Riyadh Template - Professional hotel template inspired by the Saudi capital
 * Contains all required website sections for a complete hotel
 */
export default function Riyadh() {
  const t = useTemplateT()
  
  return (
    <TemplateLayout
      title={t('template.riyadh.title', 'قالب الرياض - فندق فاخر')}
      description={t('template.riyadh.description', 'قالب موقع فندق فاخر مستوحى من هوية العاصمة الرياض')}
      templateName={t('template.riyadh.name', 'قالب الرياض')}
    >
      <div className="template--riyadh overflow-hidden bg-background dark:bg-black text-foreground dark:text-white">
        {/* Animated gradient orb in center */}
        {/* Hero section / slider */}
        <HeroSection />



        {/* Rooms section */}
        <RoomsSection />
        
        {/* Services section */}
        <ServicesSection />
        
        {/* Partners section */}
        <PartnersSection />
        
        {/* Testimonials section */}
        <TestimonialsSection />
        
        {/* Gallery section */}
        <GallerySection />
        
        {/* Gallery slider */}
        <GallerySlider />
        
        {/* Contact section */}
        <ContactSection />

      </div>
    </TemplateLayout>
  )
}