import { TemplateContact } from '@/types/template-types'

export const riyadhContactData: TemplateContact = {
  name: "فندق قصر الرياض",
  phone: "+966 11 234 5678",
  email: "info@riyadhpalacehotel.com",
  whatsapp: "+966 50 123 4567",
  address: {
    street: "شارع الملك فهد، حي العليا",
    city: "الرياض",
    country: "المملكة العربية السعودية",
    postalCode: "12313"
  },
  coordinates: {
    lat: 24.7136,
    lng: 46.6753
  },
  socialMedia: {
    facebook: "https://www.facebook.com/riyadhpalacehotel",
    instagram: "https://www.instagram.com/riyadhpalacehotel",
    twitter: "https://www.twitter.com/riyadhpalace",
    linkedin: "https://www.linkedin.com/company/riyadhpalacehotel"
  },
  workingHours: {
    reception: "24 ساعة",
    restaurant: "06:00 ص - 12:00 ص",
    spa: "09:00 ص - 10:00 م",
    gym: "24 ساعة",
    pool: "06:00 ص - 10:00 م"
  },
  additionalInfo: {
    checkIn: "15:00",
    checkOut: "12:00",
    cancellationPolicy: "يمكن الإلغاء حتى 24 ساعة قبل الوصول",
    parkingInfo: "مواقف مجانية متاحة",
    petsPolicy: "غير مسموح بالحيوانات الأليفة",
    smokingPolicy: "فندق خالي من التدخين",
    languages: ["العربية", "الإنجليزية", "الفرنسية"],
    paymentMethods: ["نقد", "فيزا", "ماستركارد", "مدى", "أمريكان إكسبريس"],
    nearbyAttractions: [
      {
        name: "برج المملكة",
        distance: "2 كم",
        description: "أشهر معالم الرياض التجارية"
      },
      {
        name: "المتحف الوطني",
        distance: "5 كم",
        description: "متحف يعرض تاريخ المملكة"
      },
      {
        name: "قصر المصمك",
        distance: "7 كم",
        description: "قصر تاريخي مهم في تاريخ السعودية"
      },
      {
        name: "مول الرياض غاليري",
        distance: "1.5 كم",
        description: "مركز تسوق راقي"
      },
      {
        name: "حديقة الملك عبدالله",
        distance: "10 كم",
        description: "أكبر حديقة في الرياض"
      },
      {
        name: "مطار الملك خالد الدولي",
        distance: "35 كم",
        description: "مطار الرياض الرئيسي"
      }
    ]
  }
}