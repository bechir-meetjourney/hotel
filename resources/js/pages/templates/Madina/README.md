# قالب المدينة - Madina Template

## 📋 نظرة عامة

قالب فندق احترافي مستوحى من المدينة المنورة، مستقل تماماً عن قالب الرياض، مع هيدر وفوتر مخصصين وتصميم فريد.

## 🎨 التصميم

### الألوان الرئيسية:
- **الأخضر الداكن** (#2D5F3F): اللون الأساسي
- **البني الذهبي** (#8B7355): اللون الثانوي
- **الذهبي** (#D4AF37): لون التمييز
- **الأخضر** (#10B981): لون النجاح

### الخطوط والأيقونات:
- يستخدم Lucide React للأيقونات
- دعم كامل للعربية والإنجليزية (RTL/LTR)

## 📁 الهيكلية

```
Madina/
├── index.tsx              # الصفحة الرئيسية
├── MadinaHeader.tsx       # الهيدر المخصص
├── MadinaFooter.tsx       # الفوتر المخصص
├── HeroSection.tsx        # قسم البطل
├── RoomsSection.tsx       # قسم الغرف
├── ServicesSection.tsx    # قسم الخدمات
├── PartnersSection.tsx    # قسم الشركاء
├── TestimonialsSection.tsx # قسم الشهادات
├── GallerySection.tsx     # معرض الصور
├── GallerySlider.tsx      # سلايدر الصور
└── ContactSection.tsx     # قسم التواصل
```

## 🎯 المميزات

### MadinaHeader:
- ✅ Navigation مع تفعيل تلقائي للقسم النشط
- ✅ تبديل اللغة (عربي/إنجليزي)
- ✅ تبديل الوضع (فاتح/داكن)
- ✅ رقم هاتف
- ✅ قائمة responsive للموبايل
- ✅ Smooth scroll للأقسام

### MadinaFooter:
- ✅ معلومات الفندق
- ✅ روابط سريعة
- ✅ قائمة الخدمات
- ✅ معلومات التواصل (عنوان، هاتف، بريد)
- ✅ روابط مواقع التواصل الاجتماعي
- ✅ حقوق النشر
- ✅ تصميم مزخرف بحدود ذهبية وخضراء

## 🔗 الوصول للقالب

```
http://localhost:8000/template/madina
```

## 📦 البيانات

جميع البيانات في مجلد منفصل:
```
data/templates/madina/
├── index.ts
├── hero-data.ts
├── rooms-data.ts
├── services-data.ts
├── partners-data.ts
├── testimonials-data.ts
├── gallery-data.ts
├── contact-data.ts
└── stats-data.ts
```

## ✅ العزل الكامل

- ❌ لا يوجد أي استيراد من قالب الرياض
- ✅ مكونات مستقلة تماماً
- ✅ Header و Footer مخصصين
- ✅ CSS classes مخصصة: `madina-*`

## 🚀 الحالة

**جاهز للتطوير والتخصيص!**

جميع الأقسام تحتوي على محتوى placeholder جاهز للتخصيص حسب الحاجة.
