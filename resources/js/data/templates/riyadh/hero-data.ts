import { TemplateHero } from '@/types/template-types'

export const riyadhHeroData: TemplateHero = {
  title: "فندق  الرياض",
  subtitle: "تجربة فندقية فاخرة في قلب العاصمة",
  description: "استمتع بالضيافة السعودية الأصيلة وأرقى الخدمات الفندقية في أجواء تمزج بين التراث العربي والحداثة العصرية. يقع فندق قصر الرياض في موقع استراتيجي في قلب العاصمة السعودية، ويوفر إطلالات خلابة على أهم معالم المدينة.",
  backgroundImage: "/images/templates/riyadh/hero/main-bg.jpg",
  ctaButtons: {
    primary: {
      text: "احجز الآن",
      action: "booking"
    },
    secondary: {
      text: "استكشف المزيد",
      action: "explore"
    }
  },
  features: [
    {
      icon: "🏨",
      title: "فندق 5 نجوم",
      description: "فندق فاخر بمعايير عالمية"
    },
    {
      icon: "📍",
      title: "موقع متميز",
      description: "في قلب مدينة الرياض"
    },
    {
      icon: "🍽️",
      title: "مطاعم راقية",
      description: "تشكيلة واسعة من المأكولات"
    },
    {
      icon: "🏊‍♂️",
      title: "مرافق حديثة",
      description: "مسبح ونادي صحي متكامل"
    },
    {
      icon: "🚗",
      title: "مواقف مجانية",
      description: "مواقف آمنة ومجانية للضيوف"
    },
    {
      icon: "🌐",
      title: "واي فاي مجاني",
      description: "إنترنت عالي السرعة في جميع أنحاء الفندق"
    }
  ]
}