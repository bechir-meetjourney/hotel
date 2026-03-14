# Design Document - قالب المدينة

## Overview

يهدف هذا التصميم إلى إنشاء قالب المدينة (Madina Template) كوحدة مستقلة تماماً تحاكي هيكلية قالب الرياض الموجود. سيتم بناء القالب بنفس الأقسام والبنية المعمارية مع الحفاظ على الاستقلالية الكاملة عن القوالب الأخرى.

## Architecture

### Directory Structure
```
resources/js/
├── pages/templates/Madina/
│   ├── index.tsx                 # الملف الرئيسي للقالب
│   ├── HeroSection.tsx          # قسم البداية مع السلايدر
│   ├── RoomsSection.tsx         # قسم الغرف والأجنحة
│   ├── ServicesSection.tsx      # قسم الخدمات
│   ├── PartnersSection.tsx      # قسم الشركاء
│   ├── TestimonialsSection.tsx  # قسم شهادات العملاء
│   ├── GallerySection.tsx       # معرض الصور
│   ├── GallerySlider.tsx        # عرض شرائح للصور
│   └── ContactSection.tsx       # قسم التواصل
├── data/templates/madina/
│   ├── index.ts                 # تجميع جميع البيانات
│   ├── hero-data.ts            # بيانات قسم البداية
│   ├── rooms-data.ts           # بيانات الغرف
│   ├── services-data.ts        # بيانات الخدمات
│   ├── partners-data.ts        # بيانات الشركاء
│   ├── testimonials-data.ts    # بيانات الشهادات
│   ├── gallery-data.ts         # بيانات المعرض
│   ├── contact-data.ts         # بيانات التواصل
│   └── stats-data.ts           # بيانات الإحصائيات
└── assets/images/madina-template/
    └── [placeholder for future assets]
```

### Template Integration
- تحديث `TemplateId` type لتشمل 'madina'
- إضافة قالب المدينة إلى نظام التوجيه
- تسجيل القالب في قائمة القوالب المتاحة

## Components and Interfaces

### Main Template Component (index.tsx)
```typescript
export default function Madina() {
  const t = useTemplateT()
  
  return (
    <TemplateLayout
      title={t('template.madina.title', 'قالب المدينة')}
      description={t('template.madina.description', 'قالب فندق مستوحى من المدينة المنورة')}
      templateName={t('template.madina.name', 'قالب المدينة')}
    >
      <div className="template--madina">
        <HeroSection />
        <RoomsSection />
        <ServicesSection />
        <PartnersSection />
        <TestimonialsSection />
        <GallerySection />
        <GallerySlider />
        <ContactSection />
      </div>
    </TemplateLayout>
  )
}
```

### Section Components Structure
كل مكون قسم سيحتوي على:
- محتوى مؤقت (placeholder) بسيط
- استيراد البيانات من ملف البيانات المقابل
- هيكلية JSX أساسية
- تعليقات توضيحية باللغة العربية

### Example Section Component
```typescript
export default function HeroSection() {
  return (
    <section className="hero-section">
      <div className="container">
        <h1>Hero</h1>
        {/* محتوى مؤقت - سيتم تخصيصه لاحقاً */}
      </div>
    </section>
  )
}
```

## Data Models

### Template Data Structure
سيتم استخدام نفس interfaces الموجودة في `template-types.ts`:
- `TemplateData`
- `TemplateInfo`
- `TemplateTheme`
- `TemplateRoom`
- `TemplateService`
- `TemplatePartner`
- `TemplateTestimonial`
- `TemplateGalleryImage`
- `TemplateContact`
- `TemplateHero`
- `TemplateStats`

### Madina Template Configuration
```typescript
export const madinaTemplateInfo: TemplateInfo = {
  id: "madina",
  name: "قالب المدينة",
  description: "قالب فندق مستوحى من المدينة المنورة",
  logo: "/images/templates/madina/logo.png",
  language: "ar",
  currency: "SAR",
  timezone: "Asia/Riyadh",
  category: "luxury"
}

export const madinaTheme: TemplateTheme = {
  primary: "#placeholder",
  secondary: "#placeholder", 
  accent: "#placeholder",
  background: "#placeholder",
  text: "#placeholder",
  muted: "#placeholder",
  success: "#placeholder",
  warning: "#placeholder",
  error: "#placeholder"
}
```

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system-essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

**Property 1: Template isolation verification**
*For any* Madina template file, importing or referencing should not include any Riyadh template files
**Validates: Requirements 1.2**

**Property 2: Component rendering consistency**
*For any* Madina template section component, rendering should display content without errors and include placeholder content
**Validates: Requirements 2.2**

**Property 3: Data structure compliance**
*For any* Madina template data file, the exported data should conform to the corresponding TypeScript interface (TemplateRoom[], TemplateService[], etc.)
**Validates: Requirements 3.2**

**Property 4: Template-specific CSS classes**
*For any* Madina template component, the rendered output should include CSS classes prefixed with "template--madina" or "madina-"
**Validates: Requirements 4.3**

## Error Handling

### File Structure Validation
- التحقق من وجود جميع الملفات والمجلدات المطلوبة
- التعامل مع الملفات المفقودة بطريقة مناسبة
- عرض رسائل خطأ واضحة عند فشل تحميل المكونات

### Import Dependencies
- التحقق من صحة جميع الاستيرادات
- منع الاستيرادات الدائرية
- التعامل مع التبعيات المفقودة

### Data Validation
- التحقق من صحة هياكل البيانات
- التعامل مع البيانات المفقودة أو غير الصحيحة
- توفير قيم افتراضية عند الحاجة
