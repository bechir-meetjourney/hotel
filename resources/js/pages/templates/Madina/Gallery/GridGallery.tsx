/**
 * Grid Gallery Section - معرض الصور الشبكي
 * 
 * Features:
 * - Grid layout with category filters
 * - Bilingual support (Arabic/English)
 * - Hover effects with overlay
 * - Uses template's CSS variables for colors
 */
import { useState } from 'react'
import BackgroundTitle from '@/components/templates/BackgroundTitle'
import { useTemplateT, useTemplateLanguage } from '@/hooks/useTemplateTranslations'
import leftLine from '../images/rooms/left-line.svg'
import rightLine from '../images/rooms/right-line.svg'

// Import images from template folder
import image1 from '../images/galary/imag1.png'
import image2 from '../images/galary/imag2.png'
import image3 from '../images/galary/imag3.png'
import image4 from '../images/galary/imag4.png'

// Bilingual gallery image interface
interface BilingualGalleryImage {
  id: number
  src: string
  categoryAr: string
  categoryEn: string
  descriptionAr: string
  descriptionEn: string
}

export default function GridGallery() {
  const t = useTemplateT()
  const { isArabic } = useTemplateLanguage()
  // Default category with translation
  const defaultCategory = t('sections.gallery.filter_all', 'الكل')
  const [activeCategory, setActiveCategory] = useState(defaultCategory)
  
  // Mock bilingual gallery data
  const galleryImages: BilingualGalleryImage[] = [
    {
      id: 1,
      src: image1,
      categoryAr: "الغرف",
      categoryEn: "Rooms",
      descriptionAr: "غرفة ديلوكس مع إطلالة مدينة",
      descriptionEn: "Deluxe room with city view"
    },
    {
      id: 2,
      src: image2,
      categoryAr: "المطاعم",
      categoryEn: "Dining",
      descriptionAr: "مطعم فاخر مع أجواء راقية",
      descriptionEn: "Luxury restaurant with elegant atmosphere"
    },
    {
      id: 3,
      src: image3,
      categoryAr: "المرافق",
      categoryEn: "Facilities",
      descriptionAr: "مسبح داخلي مُدفأ",
      descriptionEn: "Indoor heated swimming pool"
    },
    {
      id: 4,
      src: image4,
      categoryAr: "السبا",
      categoryEn: "Spa",
      descriptionAr: "منتجع صحي فاخر للاسترخاء",
      descriptionEn: "Luxury spa for relaxation"
    },
    {
      id: 5,
      src: image1,
      categoryAr: "المرافق",
      categoryEn: "Facilities",
      descriptionAr: "مرافق حديثة ومتطورة",
      descriptionEn: "Modern and advanced facilities"
    },
    {
      id: 6,
      src: image2,
      categoryAr: "الغرف",
      categoryEn: "Rooms",
      descriptionAr: "غرف فاخرة بتصميم راقي",
      descriptionEn: "Luxury rooms with elegant design"
    },
    {
      id: 7,
      src: image3,
      categoryAr: "المطاعم",
      categoryEn: "Dining",
      descriptionAr: "تجربة طعام استثنائية",
      descriptionEn: "Exceptional dining experience"
    },
    {
      id: 8,
      src: image4,
      categoryAr: "السبا",
      categoryEn: "Spa",
      descriptionAr: "علاجات مميزة للعناية بالجسم",
      descriptionEn: "Premium body care treatments"
    }
  ]

  // Translated categories
  const categories = [
    { key: 'filter_all', labelAr: 'الكل', labelEn: 'All' },
    { key: 'filter_rooms', labelAr: 'الغرف', labelEn: 'Rooms' },
    { key: 'filter_dining', labelAr: 'المطاعم', labelEn: 'Dining' },
    { key: 'filter_facilities', labelAr: 'المرافق', labelEn: 'Facilities' },
    { key: 'filter_spa', labelAr: 'السبا', labelEn: 'Spa' }
  ]

  // Filter images by category
  const filteredImages = activeCategory === defaultCategory
    ? galleryImages 
    : galleryImages.filter(image => {
        const imageCategory = isArabic ? image.categoryAr : image.categoryEn
        return imageCategory === activeCategory
      })

  return (
    <section id="gallery" className="py-20">
      <div className="container mx-auto px-4">
        {/* Title */}
        <div className="relative text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div 
              className="h-6 w-6 hidden md:block"
              aria-label="left line"
              style={{
                maskImage: `url(${isArabic ? leftLine : rightLine})`,
                WebkitMaskImage: `url(${isArabic ? leftLine : rightLine})`,
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
              {t('sections.gallery.title', 'معرض الصور')}
            </h2>
            <div 
              className="h-6 w-6 hidden md:block"
              aria-label="right line"
              style={{
                maskImage: `url(${isArabic ? rightLine : leftLine})`,
                WebkitMaskImage: `url(${isArabic ? rightLine : leftLine})`,
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
            text={t('sections.gallery.background_title', 'المعرض')} 
            colorClass="dark:text-[rgba(237,237,237,0.2)]"
            colorStyle={{ color: 'var(--madina-primary)', opacity: 0.1 }}
          />
          <p className="relative z-10 text-xl madina-text-body max-w-2xl mx-auto">
            {t('sections.gallery.subtitle', 'اكتشف جمال فندقنا من خلال معرض الصور المتنوع الذي يعرض مرافقنا وخدماتنا المميزة')}
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => {
            const categoryLabel = t(`sections.gallery.${category.key}`, isArabic ? category.labelAr : category.labelEn)
            const isActive = activeCategory === categoryLabel
            
            return (
              <button
                key={category.key}
                onClick={() => setActiveCategory(categoryLabel)}
                className={`px-6 py-2 rounded-full border-2 transition-colors duration-300 font-medium ${
                  isActive
                    ? 'text-white border-white'
                    : 'madina-text-body border-gray-300 dark:border-gray-600 hover:text-white'
                }`}
                style={{
                  backgroundColor: isActive ? 'var(--madina-primary)' : 'transparent',
                  borderColor: isActive ? 'white' : undefined
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = 'var(--madina-primary)'
                    e.currentTarget.style.color = 'white'
                    e.currentTarget.style.borderColor = 'white'
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = 'transparent'
                    e.currentTarget.style.color = ''
                    e.currentTarget.style.borderColor = ''
                  }
                }}
              >
                {categoryLabel}
              </button>
            )
          })}
        </div>

        {/* Images Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {filteredImages.map((image) => {
            const category = isArabic ? image.categoryAr : image.categoryEn
            const description = isArabic ? image.descriptionAr : image.descriptionEn
            
            return (
              <div
                key={image.id}
                className="group relative rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-200 dark:border-gray-700 bg-white/60 dark:bg-white/10"
                style={{
                  borderColor: 'rgba(166, 125, 95, 0.3)'
                }}
              >
                {/* Image */}
                <div className="aspect-square overflow-hidden">
                  <img 
                    src={image.src} 
                    alt={description}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                
                {/* Info Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 dark:group-hover:bg-black/80 transition-all duration-300 flex items-end">
                  <div className="p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <h4 className="madina-font-heading font-bold text-lg mb-1">{category}</h4>
                    <p className="madina-text-body text-sm opacity-90">{description}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
