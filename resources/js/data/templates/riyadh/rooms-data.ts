import { TemplateRoom } from '@/types/template-types'

export const riyadhRoomsData: TemplateRoom[] = [
  {
    id: 1,
    name: "الجناح الملكي",
    description: "جناح فاخر بإطلالة بانورامية على مدينة الرياض مع تصميم عصري وخدمات متميزة",
    price: 1500,
    originalPrice: 1800,
    currency: "ريال",
    features: ["120 متر مربع", "غرفة نوم منفصلة", "حمام رخامي", "شرفة خاصة"],
    image: "/images/templates/riyadh/rooms/royal-suite.jpg",
    gallery: [
      "/images/templates/riyadh/rooms/royal-suite-1.jpg",
      "/images/templates/riyadh/rooms/royal-suite-2.jpg",
      "/images/templates/riyadh/rooms/royal-suite-3.jpg"
    ],
    maxGuests: 4,
    size: 120,
    bedType: "سرير ملكي",
    amenities: [
      "تلفزيون ذكي 75 بوصة",
      "نظام صوتي متطور",
      "مينيبار مجاني",
      "خدمة غرف 24/7",
      "إنترنت فائق السرعة",
      "تكييف ذكي",
      "خزنة إلكترونية",
      "آلة صنع القهوة"
    ],
    isAvailable: true,
    popularTag: "الأكثر طلباً"
  },
  {
    id: 2,
    name: "غرفة ديلوكس",
    description: "غرفة واسعة ومريحة مع جميع وسائل الراحة الحديثة وإطلالة رائعة على المدينة",
    price: 800,
    currency: "ريال",
    features: ["45 متر مربع", "سرير كينغ", "منطقة جلوس", "إطلالة على المدينة"],
    image: "/images/templates/riyadh/rooms/deluxe-room.jpg",
    gallery: [
      "/images/templates/riyadh/rooms/deluxe-1.jpg",
      "/images/templates/riyadh/rooms/deluxe-2.jpg"
    ],
    maxGuests: 2,
    size: 45,
    bedType: "سرير كينغ",
    amenities: [
      "تلفزيون ذكي 55 بوصة",
      "إنترنت مجاني",
      "تكييف مركزي",
      "مينيبار",
      "خدمة غرف",
      "خزنة",
      "مجفف شعر",
      "أدوات استحمام فاخرة"
    ],
    isAvailable: true
  },
  {
    id: 3,
    name: "غرفة عائلية",
    description: "غرفة مثالية للعائلات مع مساحات واسعة وأسرة إضافية ومرافق مناسبة للأطفال",
    price: 600,
    currency: "ريال",
    features: ["60 متر مربع", "سريرين", "غرفة معيشة", "مناسبة للأطفال"],
    image: "/images/templates/riyadh/rooms/family-room.jpg",
    gallery: [
      "/images/templates/riyadh/rooms/family-1.jpg",
      "/images/templates/riyadh/rooms/family-2.jpg"
    ],
    maxGuests: 6,
    size: 60,
    bedType: "سرير كينغ + سريرين مفردين",
    amenities: [
      "تلفزيون ذكي 50 بوصة",
      "ألعاب أطفال",
      "مقاعد أطفال",
      "إنترنت مجاني",
      "ثلاجة صغيرة",
      "مساحة لعب",
      "تكييف",
      "حمام واسع"
    ],
    isAvailable: true,
    popularTag: "مناسب للعائلات"
  },
  {
    id: 4,
    name: "غرفة تنفيذية",
    description: "غرفة مصممة خصيصاً لرجال الأعمال مع مكتب مجهز ومرافق العمل",
    price: 1000,
    currency: "ريال",
    features: ["50 متر مربع", "مكتب عمل", "إنترنت عالي السرعة", "طابعة"],
    image: "/images/templates/riyadh/rooms/executive-room.jpg",
    maxGuests: 2,
    size: 50,
    bedType: "سرير كينغ",
    amenities: [
      "مكتب مجهز بالكامل",
      "كرسي مريح للعمل",
      "إنترنت فائق السرعة",
      "طابعة/ماسح ضوئي",
      "تلفزيون ذكي",
      "آلة صنع القهوة",
      "خدمة الكونسيرج",
      "وصول للصالة التنفيذية"
    ],
    isAvailable: true
  },
  {
    id: 5,
    name: "غرفة اقتصادية",
    description: "غرفة مريحة وعملية بأسعار مناسبة مع جميع المرافق الأساسية",
    price: 350,
    currency: "ريال",
    features: ["30 متر مربع", "سرير مزدوج", "حمام خاص", "تكييف"],
    image: "/images/templates/riyadh/rooms/economy-room.jpg",
    maxGuests: 2,
    size: 30,
    bedType: "سرير مزدوج",
    amenities: [
      "تلفزيون LED",
      "إنترنت مجاني",
      "تكييف",
      "حمام خاص",
      "خزنة صغيرة",
      "مجفف شعر",
      "أدوات استحمام أساسية"
    ],
    isAvailable: true,
    popularTag: "أفضل قيمة"
  }
]