import type { TemplateContact } from '@/types/template-types'

/**
 * بيانات التواصل - قالب المدينة
 * Contact Data - Madina Template
 */
export const madinaContactData: TemplateContact = {
  name: 'فندق قالب المدينة',
  phone: '+966 XX XXX XXXX',
  email: 'info@madina-template.com',
  whatsapp: '+966 XX XXX XXXX',
  address: {
    street: 'محتوى مؤقت - شارع الملك فهد',
    city: 'المدينة المنورة',
    country: 'المملكة العربية السعودية',
    postalCode: '12345',
  },
  coordinates: {
    lat: 24.4672,
    lng: 39.6111,
  },
  socialMedia: {
    facebook: 'https://facebook.com/madina-template',
    instagram: 'https://instagram.com/madina-template',
    twitter: 'https://twitter.com/madina-template',
  },
  workingHours: {
    reception: '24 ساعة',
    restaurant: '6:00 صباحاً - 11:00 مساءً',
  },
}
