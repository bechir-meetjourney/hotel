import type { TemplateService } from '@/types/template-types'

/**
 * بيانات الخدمات - قالب المدينة
 * Services Data - Madina Template
 */
export const madinaServicesData: TemplateService[] = [
  {
    id: 1,
    icon: '🍽️',
    title: 'مطعم',
    description: 'محتوى مؤقت - مطعم يقدم أشهى المأكولات المحلية والعالمية',
    category: 'dining',
    isAvailable: true,
    workingHours: '6:00 صباحاً - 11:00 مساءً',
  },
  {
    id: 2,
    icon: '🏊',
    title: 'مسبح',
    description: 'محتوى مؤقت - مسبح داخلي مجهز بأحدث المعايير',
    category: 'recreation',
    isAvailable: true,
    workingHours: '6:00 صباحاً - 10:00 مساءً',
  },
  {
    id: 3,
    icon: '🏋️',
    title: 'نادي رياضي',
    description: 'محتوى مؤقت - نادي رياضي متكامل مع أحدث الأجهزة',
    category: 'wellness',
    isAvailable: true,
    workingHours: '24 ساعة',
  },
  {
    id: 4,
    icon: '🚗',
    title: 'مواقف سيارات',
    description: 'محتوى مؤقت - مواقف سيارات آمنة ومجانية',
    category: 'transport',
    isAvailable: true,
  },
  {
    id: 5,
    icon: '💼',
    title: 'قاعات اجتماعات',
    description: 'محتوى مؤقت - قاعات مجهزة للاجتماعات والمؤتمرات',
    category: 'business',
    isAvailable: true,
  },
  {
    id: 6,
    icon: '📶',
    title: 'واي فاي مجاني',
    description: 'محتوى مؤقت - إنترنت عالي السرعة في جميع الغرف والمرافق',
    category: 'general',
    isAvailable: true,
  },
]
