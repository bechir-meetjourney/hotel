# Implementation Plan - خطة تنفيذ قالب المدينة

- [ ] 1. إعداد الهيكلية الأساسية للقالب
  - إنشاء مجلد المكونات الرئيسي للقالب
  - إنشاء مجلد البيانات المخصص للقالب
  - تحديث أنواع البيانات لتشمل قالب المدينة
  - _Requirements: 1.1, 2.4_

- [ ] 1.1 إنشاء مجلد المكونات
  - إنشاء مجلد `resources/js/pages/templates/Madina/`
  - _Requirements: 1.1_

- [ ] 1.2 إنشاء مجلد البيانات
  - إنشاء مجلد `resources/js/data/templates/madina/`
  - _Requirements: 1.1_

- [ ] 1.3 تحديث أنواع البيانات
  - تحديث `TemplateId` في `template-types.ts` لتشمل 'madina'
  - _Requirements: 1.4_

- [ ] 2. إنشاء ملفات البيانات الأساسية
  - إنشاء ملفات البيانات المنفصلة لكل قسم
  - تطبيق نفس هيكلية البيانات المستخدمة في قالب الرياض
  - _Requirements: 2.3, 3.2_

- [ ] 2.1 إنشاء ملف بيانات Hero
  - إنشاء `hero-data.ts` مع بيانات مؤقتة
  - _Requirements: 2.3_

- [ ] 2.2 إنشاء ملف بيانات الغرف
  - إنشاء `rooms-data.ts` مع بيانات مؤقتة
  - _Requirements: 2.3_

- [ ] 2.3 إنشاء ملف بيانات الخدمات
  - إنشاء `services-data.ts` مع بيانات مؤقتة
  - _Requirements: 2.3_

- [ ] 2.4 إنشاء ملف بيانات الشركاء
  - إنشاء `partners-data.ts` مع بيانات مؤقتة
  - _Requirements: 2.3_

- [ ] 2.5 إنشاء ملف بيانات الشهادات
  - إنشاء `testimonials-data.ts` مع بيانات مؤقتة
  - _Requirements: 2.3_

- [ ] 2.6 إنشاء ملف بيانات المعرض
  - إنشاء `gallery-data.ts` مع بيانات مؤقتة
  - _Requirements: 2.3_

- [ ] 2.7 إنشاء ملف بيانات التواصل
  - إنشاء `contact-data.ts` مع بيانات مؤقتة
  - _Requirements: 2.3_

- [ ] 2.8 إنشاء ملف بيانات الإحصائيات
  - إنشاء `stats-data.ts` مع بيانات مؤقتة
  - _Requirements: 2.3_

- [ ] 2.9 إنشاء ملف البيانات الرئيسي
  - إنشاء `index.ts` لتجميع جميع البيانات
  - تصدير `madinaTemplateData` كاملة
  - _Requirements: 3.2, 3.4_


- [ ] 3. إنشاء مكونات الأقسام الأساسية
  - إنشاء مكون React منفصل لكل قسم مع محتوى مؤقت
  - استخدام CSS classes مخصصة لقالب المدينة
  - _Requirements: 2.1, 2.2, 4.3_

- [ ] 3.1 إنشاء مكون Hero Section
  - إنشاء `HeroSection.tsx` مع محتوى مؤقت "Hero"
  - _Requirements: 2.1, 2.2_

- [ ] 3.2 إنشاء مكون قسم الغرف
  - إنشاء `RoomsSection.tsx` مع محتوى مؤقت "Rooms"
  - _Requirements: 2.1, 2.2_

- [ ] 3.3 إنشاء مكون قسم الخدمات
  - إنشاء `ServicesSection.tsx` مع محتوى مؤقت "Services"
  - _Requirements: 2.1, 2.2_

- [ ] 3.4 إنشاء مكون قسم الشركاء
  - إنشاء `PartnersSection.tsx` مع محتوى مؤقت "Partners"
  - _Requirements: 2.1, 2.2_

- [ ] 3.5 إنشاء مكون قسم الشهادات
  - إنشاء `TestimonialsSection.tsx` مع محتوى مؤقت "Testimonials"
  - _Requirements: 2.1, 2.2_

- [ ] 3.6 إنشاء مكون معرض الصور
  - إنشاء `GallerySection.tsx` مع محتوى مؤقت "Gallery"
  - _Requirements: 2.1, 2.2_

- [ ] 3.7 إنشاء مكون عرض الشرائح
  - إنشاء `GallerySlider.tsx` مع محتوى مؤقت "Gallery Slider"
  - _Requirements: 2.1, 2.2_

- [ ] 3.8 إنشاء مكون قسم التواصل
  - إنشاء `ContactSection.tsx` مع محتوى مؤقت "Contact"
  - _Requirements: 2.1, 2.2_



- [ ] 4. إنشاء الملف الرئيسي للقالب
  - إنشاء `index.tsx` الرئيسي الذي يجمع جميع الأقسام
  - استخدام `TemplateLayout` مع معلومات قالب المدينة
  - _Requirements: 2.4, 4.4_

- [ ] 4.1 إنشاء المكون الرئيسي
  - إنشاء `index.tsx` مع استيراد جميع الأقسام
  - استخدام CSS class "template--madina"
  - _Requirements: 4.4, 4.3_

