# 🏗️ هيكلية قالب المدينة - Madina Template Structure

## 📋 نظرة عامة

تم تنظيم قالب المدينة بهيكلية محترفة حيث كل قسم له مجلد خاص يحتوي على مكوناته الفرعية، مما يوفر:
- ✅ **مرونة عالية** في التعديل والتطوير
- ✅ **سهولة الصيانة** - كل قسم مستقل
- ✅ **قابلية إعادة الاستخدام** - مكونات modular
- ✅ **تنظيم واضح** - سهل التنقل والفهم

---

## 📁 الهيكلية الكاملة

```
Madina/
├── index.tsx                  # الصفحة الرئيسية - تجميع كل الأقسام
├── MadinaHeader.tsx          # الهيدر المخصص
├── MadinaFooter.tsx          # الفوتر المخصص
├── README.md                 # التوثيق الأساسي
│
├── Hero/                     # 🎯 قسم البطل
│   ├── index.tsx            # المكون الرئيسي
│   ├── HeroSlide.tsx        # شريحة السلايدر
│   └── HeroControls.tsx     # عناصر التحكم
│
├── Rooms/                    # 🛏️ قسم الغرف
│   ├── index.tsx            # المكون الرئيسي
│   ├── RoomCard.tsx         # بطاقة غرفة واحدة
│   └── RoomFilters.tsx      # فلاتر الغرف
│
├── Services/                 # 🌟 قسم الخدمات
│   ├── index.tsx            # المكون الرئيسي
│   └── ServiceCard.tsx      # بطاقة خدمة واحدة
│
├── Partners/                 # 🤝 قسم الشركاء
│   ├── index.tsx            # المكون الرئيسي
│   └── PartnerLogo.tsx      # شعار شريك واحد
│
├── Testimonials/             # 💬 قسم الشهادات
│   ├── index.tsx            # المكون الرئيسي
│   └── TestimonialCard.tsx  # بطاقة شهادة واحدة
│
├── Gallery/                  # 🖼️ قسم المعرض
│   ├── index.tsx            # المكون الرئيسي
│   └── GalleryGrid.tsx      # شبكة الصور
│
└── Contact/                  # 📧 قسم التواصل
    ├── index.tsx            # المكون الرئيسي
    ├── ContactForm.tsx      # نموذج التواصل
    └── ContactInfo.tsx      # معلومات التواصل
```

---

## 🎨 تفاصيل كل قسم

### 1️⃣ Hero Section
**المكونات:**
- `index.tsx` - القسم الرئيسي مع العنوان والوصف والأزرار
- `HeroSlide.tsx` - شريحة واحدة من السلايدر
- `HeroControls.tsx` - أزرار التنقل والمؤشرات

**الميزات:**
- سلايدر كامل الشاشة
- تدرج لوني (أخضر → ذهبي)
- أزرار CTA (احجز الآن، اكتشف المزيد)
- مؤشرات ملاحة

---

### 2️⃣ Rooms Section
**المكونات:**
- `index.tsx` - عرض شبكة الغرف
- `RoomCard.tsx` - بطاقة غرفة فردية مع الصورة، السعر، زر الحجز
- `RoomFilters.tsx` - فلاتر لتصنيف الغرف

**الميزات:**
- عرض 3 أعمدة (responsive)
- Hover effects
- أسعار ديناميكية
- نظام فلترة

---

### 3️⃣ Services Section
**المكونات:**
- `index.tsx` - عرض شبكة الخدمات
- `ServiceCard.tsx` - بطاقة خدمة مع أيقونة

**الميزات:**
- 6 خدمات أساسية
- Hover animations
- أيقونات emoji
- Grid responsive

---

### 4️⃣ Partners Section
**المكونات:**
- `index.tsx` - عرض شعارات الشركاء
- `PartnerLogo.tsx` - شعار واحد

**الميزات:**
- 6 أعمدة على الشاشات الكبيرة
- Hover shadow effects
- تدرج لوني للـ placeholders

---

### 5️⃣ Testimonials Section
**المكونات:**
- `index.tsx` - عرض الشهادات
- `TestimonialCard.tsx` - بطاقة شهادة مع تقييم

**الميزات:**
- 3 أعمدة
- نظام تقييم بالنجوم
- صورة العميل
- علامة "ضيف معتمد"

---

### 6️⃣ Gallery Section
**المكونات:**
- `index.tsx` - القسم الرئيسي
- `GalleryGrid.tsx` - شبكة الصور

**الميزات:**
- Grid masonry layout
- Hover effects
- صور بأحجام مختلفة

---

### 7️⃣ Contact Section
**المكونات:**
- `index.tsx` - القسم الرئيسي
- `ContactForm.tsx` - نموذج الإرسال
- `ContactInfo.tsx` - معلومات الاتصال

**الميزات:**
- نموذج متكامل (اسم، بريد، رسالة)
- معلومات الاتصال مع أيقونات
- Layout من عمودين

---

## 🔧 كيفية التطوير

### إضافة مكون جديد لقسم معين:

```bash
# مثال: إضافة RoomModal للـ Rooms Section
1. انتقل للمجلد: Madina/Rooms/
2. أنشئ ملف: RoomModal.tsx
3. استورد في: Rooms/index.tsx
```

### تعديل قسم موجود:

```bash
# مثال: تعديل HeroSection
1. افتح: Madina/Hero/index.tsx
2. عدل المحتوى
3. التغييرات ستظهر مباشرة (HMR)
```

### إضافة قسم جديد كامل:

```bash
1. أنشئ مجلد: Madina/NewSection/
2. أنشئ index.tsx داخل المجلد
3. أضف المكونات الفرعية
4. استورد في: Madina/index.tsx
```

---

## 📦 البيانات

البيانات منفصلة تماماً في:
```
data/templates/madina/
├── hero-data.ts
├── rooms-data.ts
├── services-data.ts
├── partners-data.ts
├── testimonials-data.ts
├── gallery-data.ts
├── contact-data.ts
├── stats-data.ts
└── index.ts
```

---

## ✅ الحالة الحالية

- ✅ جميع الأقسام منشأة بهيكلية modular
- ✅ كل قسم له مكوناته الفرعية
- ✅ Placeholder content جاهز
- ✅ Responsive design
- ✅ Dark mode support
- ✅ RTL/LTR support
- ⏳ جاهز للتطوير والتخصيص

---

## 🚀 الخطوات القادمة

1. **ربط البيانات**: استخدام البيانات من `data/templates/madina/`
2. **إضافة الصور**: استبدال الـ placeholders بصور حقيقية
3. **الوظائف التفاعلية**: إضافة السلايدر، الفلاتر، Forms
4. **التحسينات**: Animations, Loading states, Error handling

---

**جاهز للتطوير! 🎉**
