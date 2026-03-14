import type { TemplateHero } from '@/types/template-types'

/**
 * بيانات قسم البطل - قالب المدينة
 * Hero Section Data - Madina Template
 */
export const madinaHeroData: TemplateHero = {
  title: 'قالب المدينة',
  subtitle: 'فندق مستوحى من المدينة المنورة',
  description: 'محتوى مؤقت - سيتم تخصيصه لاحقاً',
  backgroundImage: '/images/madina-template/hero-bg.jpg',
  ctaButtons: {
    primary: {
      text: 'احجز الآن',
      action: '#booking',
    },
    secondary: {
      text: 'استكشف المزيد',
      action: '#rooms',
    },
  },
  features: [
    {
      icon: '🏨',
      title: 'غرف فاخرة',
      description: 'غرف مجهزة بأعلى المعايير',
    },
    {
      icon: '⭐',
      title: 'خدمة متميزة',
      description: 'نخدمك على مدار الساعة',
    },
    {
      icon: '📍',
      title: 'موقع مميز',
      description: 'بالقرب من المعالم المهمة',
    },
  ],
}
