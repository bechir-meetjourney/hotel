import type { TemplateRoom } from '@/types/template-types'

/**
 * بيانات الغرف والأجنحة - قالب المدينة
 * Rooms Data - Madina Template
 */
export const madinaRoomsData: TemplateRoom[] = [
  {
    id: 1,
    name: 'غرفة قياسية',
    description: 'محتوى مؤقت - غرفة مريحة ومجهزة بكل وسائل الراحة',
    price: 300,
    currency: 'SAR',
    features: ['واي فاي مجاني', 'تلفزيون', 'مكيف هواء'],
    image: '/images/madina-template/room-1.jpg',
    maxGuests: 2,
    size: 25,
    bedType: 'سرير مزدوج',
    amenities: ['واي فاي', 'تلفزيون', 'مكيف'],
    isAvailable: true,
  },
  {
    id: 2,
    name: 'جناح عائلي',
    description: 'محتوى مؤقت - جناح واسع مناسب للعائلات',
    price: 500,
    currency: 'SAR',
    features: ['غرفتي نوم', 'صالة معيشة', 'مطبخ صغير'],
    image: '/images/madina-template/room-2.jpg',
    maxGuests: 4,
    size: 45,
    bedType: 'سريرين مزدوجين',
    amenities: ['واي فاي', 'تلفزيون', 'مكيف', 'مطبخ'],
    isAvailable: true,
    popularTag: 'الأكثر طلباً',
  },
  {
    id: 3,
    name: 'جناح ملكي',
    description: 'محتوى مؤقت - جناح فاخر مع إطلالة رائعة',
    price: 800,
    originalPrice: 1000,
    currency: 'SAR',
    features: ['إطلالة بانورامية', 'جاكوزي', 'خدمة غرف 24 ساعة'],
    image: '/images/madina-template/room-3.jpg',
    maxGuests: 2,
    size: 60,
    bedType: 'سرير كينج',
    amenities: ['واي فاي', 'تلفزيون', 'مكيف', 'جاكوزي', 'بلكونة'],
    isAvailable: true,
  },
]
