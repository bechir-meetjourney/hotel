/**
 * Grid Testimonials Section - معرض آراء العملاء الشبكي
 * 
 * Features:
 * - Grid layout with testimonials cards
 * - Star ratings display
 * - Bilingual support (Arabic/English)
 * - Hover effects
 * - Uses template's CSS variables for colors
 */
import BackgroundTitle from '@/components/templates/BackgroundTitle'
import { useTemplateT, useTemplateLanguage } from '@/hooks/useTemplateTranslations'
import { Star } from 'lucide-react'
import leftLine from '../images/rooms/left-line.svg'
import rightLine from '../images/rooms/right-line.svg'
import avatarImage from '../images/partners/avatar.svg'

// Bilingual testimonial interface
interface BilingualTestimonial {
  id: number
  nameAr: string
  nameEn: string
  roleAr: string
  roleEn: string
  commentAr: string
  commentEn: string
  rating: number
  avatar?: string
}

export default function GridTestimonials() {
  const t = useTemplateT()
  const { isArabic } = useTemplateLanguage()
  
  // Bilingual testimonials data
  const bilingualTestimonialsData: BilingualTestimonial[] = [
    {
      id: 1,
      nameAr: 'أحمد محمد',
      nameEn: 'Ahmed Mohammed',
      roleAr: 'عميل',
      roleEn: 'Guest',
      commentAr: 'تجربة رائعة وخدمة ممتازة. أنصح الجميع بزيارة هذا الفندق. الإقامة كانت مريحة والموظفون محترفون جداً.',
      commentEn: 'Excellent experience and outstanding service. I highly recommend everyone to visit this hotel. The stay was comfortable and the staff were very professional.',
      rating: 5,
      avatar: avatarImage,
    },
    {
      id: 2,
      nameAr: 'فاطمة علي',
      nameEn: 'Fatima Ali',
      roleAr: 'عميلة',
      roleEn: 'Guest',
      commentAr: 'الغرف نظيفة والموظفون متعاونون جداً. سأعود بالتأكيد. الموقع ممتاز والخدمات على أعلى مستوى.',
      commentEn: 'Clean rooms and very cooperative staff. I will definitely return. Excellent location and top-tier services.',
      rating: 5,
      avatar: avatarImage,
    },
    {
      id: 3,
      nameAr: 'خالد عبدالله',
      nameEn: 'Khalid Abdullah',
      roleAr: 'عميل',
      roleEn: 'Guest',
      commentAr: 'فندق جميل وموقع متميز. الإفطار كان لذيذاً والمرافق متطورة. تجربة تستحق التكرار.',
      commentEn: 'Beautiful hotel and excellent location. The breakfast was delicious and the facilities are modern. An experience worth repeating.',
      rating: 4,
      avatar: avatarImage,
    },
    {
      id: 4,
      nameAr: 'سارة أحمد',
      nameEn: 'Sara Ahmed',
      roleAr: 'عميلة',
      roleEn: 'Guest',
      commentAr: 'إقامة ممتازة بكل المقاييس. الفندق نظيف والخدمة سريعة. أنصح به بشدة للعائلات.',
      commentEn: 'Excellent stay by all standards. The hotel is clean and service is fast. I highly recommend it for families.',
      rating: 5,
      avatar: avatarImage,
    },
    {
      id: 5,
      nameAr: 'محمد حسن',
      nameEn: 'Mohammed Hassan',
      roleAr: 'عميل',
      roleEn: 'Guest',
      commentAr: 'تجربة فريدة من نوعها. الغرف واسعة ومريحة والطاقم ودود. سأعود قريباً إن شاء الله.',
      commentEn: 'A unique experience. The rooms are spacious and comfortable, and the staff are friendly. I will return soon, God willing.',
      rating: 5,
      avatar: avatarImage,
    },
    {
      id: 6,
      nameAr: 'نورا السالم',
      nameEn: 'Nora Al-Salem',
      roleAr: 'عميلة',
      roleEn: 'Guest',
      commentAr: 'فندق راقي بمعنى الكلمة. كل التفاصيل منظمة والخدمة ممتازة. المكان هادئ ومريح للغاية.',
      commentEn: 'A truly luxurious hotel. Every detail is organized and the service is excellent. The place is very quiet and comfortable.',
      rating: 5,
      avatar: avatarImage,
    },
  ]

  // Convert bilingual testimonials to current language
  const testimonials = bilingualTestimonialsData.map(testimonial => ({
    id: testimonial.id,
    name: isArabic ? testimonial.nameAr : testimonial.nameEn,
    role: isArabic ? testimonial.roleAr : testimonial.roleEn,
    comment: isArabic ? testimonial.commentAr : testimonial.commentEn,
    rating: testimonial.rating,
    avatar: testimonial.avatar
  }))

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        {/* Section Title */}
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
              {t('sections.testimonials.title', 'آراء عملائنا الكرام')}
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
            text={t('sections.testimonials.background_title', 'التقييمات')} 
            colorClass="dark:text-[rgba(237,237,237,0.2)]"
            colorStyle={{ color: 'var(--madina-primary)', opacity: 0.1 }}
          />
          <p className="madina-font madina-text-body relative z-10 text-xl">
            {t('sections.testimonials.subtitle', 'اكتشف ما يقوله ضيوفنا عن تجربتهم معنا واطلع على تقييماتهم الصادقة')}
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700"
              style={{
                borderColor: 'rgba(166, 125, 95, 0.2)'
              }}
            >
              {/* Header: Avatar, Name, Role */}
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-shrink-0">
                  <img 
                    src={testimonial.avatar || avatarImage} 
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-contain"
                    style={{
                      backgroundColor: 'rgba(166, 125, 95, 0.1)',
                      padding: '4px'
                    }}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="madina-font-heading text-lg font-bold madina-text-primary mb-1">
                    {testimonial.name}
                  </h3>
                  <p className="madina-text-body text-sm opacity-70 mb-2">
                    {testimonial.role}
                  </p>
                  {/* Star Rating */}
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < testimonial.rating
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'fill-gray-300 text-gray-300 dark:fill-gray-600 dark:text-gray-600'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Comment */}
              <p className="madina-text-body text-sm leading-relaxed">
                {testimonial.comment}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
