# Madina Template Configuration Guide
# دليل إعدادات قالب المدينة

## 📋 نظرة عامة

هذا الدليل يشرح كيفية استخدام وتخصيص المتغيرات والإعدادات الخاصة بقالب المدينة.

---

## 🎨 الألوان (Colors)

### الألوان الأساسية

```typescript
import { useMadinaTheme } from '@/hooks/useMadinaConfig'

const theme = useMadinaTheme()

// استخدام الألوان
const primaryColor = theme.primary    // #2D5F3F (أخضر داكن)
const secondaryColor = theme.secondary // #D4AF37 (ذهبي)
const accentColor = theme.accent       // #48BB78 (أخضر فاتح)
```

### الألوان المتاحة

| الاسم | القيمة | الاستخدام |
|------|---------|----------|
| `primary` | `#2D5F3F` | اللون الأساسي للقالب |
| `secondary` | `#D4AF37` | اللون الثانوي (ذهبي) |
| `accent` | `#48BB78` | لون التمييز |
| `success` | `#38A169` | الرسائل الناجحة |
| `warning` | `#DD6B20` | التحذيرات |
| `error` | `#E53E3E` | رسائل الخطأ |

### استخدام الألوان في CSS

```css
/* استخدام المتغيرات */
.my-element {
  background-color: var(--madina-primary);
  color: var(--madina-text-white);
}

/* أو استخدام الكلاسات الجاهزة */
.madina-btn-primary {
  /* يحتوي على الأنماط الجاهزة */
}
```

---

## 🖼️ الصور (Images)

### الحصول على الصور

```typescript
import { useMadinaImages, useMadinaImage } from '@/hooks/useMadinaConfig'

// الطريقة الأولى - جميع الصور
const images = useMadinaImages()
const logo = images.logo.main

// الطريقة الثانية - صورة محددة
const heroImage = useMadinaImage('hero', 'main')
const roomImage = useMadinaImage('rooms', 'standard')
```

### مسارات الصور

```
/images/templates/madina/
├── logo.png
├── logo-white.png
├── logo-dark.png
├── hero/
│   ├── main.jpg
│   ├── slide-1.jpg
│   ├── slide-2.jpg
│   └── slide-3.jpg
├── rooms/
│   ├── standard.jpg
│   ├── deluxe.jpg
│   ├── suite.jpg
│   └── family.jpg
├── gallery/
│   ├── rooms/
│   ├── dining/
│   ├── facilities/
│   └── exterior/
├── partners/
│   └── placeholder.png
└── testimonials/
    └── default-avatar.png
```

### استخدام الصور في المكونات

```tsx
import { useMadinaImages } from '@/hooks/useMadinaConfig'

export default function MyComponent() {
  const images = useMadinaImages()
  
  return (
    <div>
      <img src={images.logo.main} alt="Logo" />
      <img src={images.hero.main} alt="Hero" />
    </div>
  )
}
```

---

## ✍️ الخطوط (Typography)

### الحصول على الخطوط

```typescript
import { useMadinaTypography } from '@/hooks/useMadinaConfig'

const typography = useMadinaTypography()

const arabicFont = typography.arabic.primary  // 'Tajawal, sans-serif'
const englishFont = typography.english.primary // 'Inter, sans-serif'
```

### أحجام الخطوط

| الحجم | القيمة | الاستخدام |
|------|---------|----------|
| `xs` | `12px` | نصوص صغيرة جداً |
| `sm` | `14px` | نصوص صغيرة |
| `base` | `16px` | النص الأساسي |
| `lg` | `18px` | نصوص كبيرة |
| `xl` | `20px` | عناوين صغيرة |
| `2xl` | `24px` | عناوين متوسطة |
| `3xl` | `30px` | عناوين كبيرة |
| `4xl` | `36px` | عناوين رئيسية |
| `5xl` | `48px` | عناوين ضخمة |

### استخدام في CSS

```css
.madina-heading-1 {
  font-size: 3rem;
  font-weight: 700;
  font-family: var(--madina-font-heading);
}
```

---

## 📏 المسافات (Spacing)

### الحصول على المسافات

```typescript
import { useMadinaSpacing } from '@/hooks/useMadinaConfig'

const spacing = useMadinaSpacing()

const sectionPadding = spacing.section.py  // '5rem'
const cardGap = spacing.card.gap           // '1rem'
```

### المسافات المتاحة

```typescript
spacing: {
  xs: '0.25rem',   // 4px
  sm: '0.5rem',    // 8px
  md: '1rem',      // 16px
  lg: '1.5rem',    // 24px
  xl: '2rem',      // 32px
  2xl: '3rem',     // 48px
  3xl: '4rem',     // 64px
}
```

---

## 🎭 الحركات والتأثيرات (Animations)

### السرعة

```typescript
import { useMadinaAnimations } from '@/hooks/useMadinaConfig'

const animations = useMadinaAnimations()

const fastSpeed = animations.duration.fast      // 150ms
const normalSpeed = animations.duration.normal  // 300ms
const slowSpeed = animations.duration.slow      // 500ms
```

### الحركات الجاهزة

```css
/* Fade In */
.madina-animate-fade-in {
  animation: madina-fade-in 500ms ease-out;
}

/* Slide Right */
.madina-animate-slide-right {
  animation: madina-slide-in-right 500ms ease-out;
}

/* Slide Left */
.madina-animate-slide-left {
  animation: madina-slide-in-left 500ms ease-out;
}
```

---

## 📞 معلومات التواصل (Contact)

### الحصول على المعلومات الافتراضية

```typescript
import { useMadinaContact } from '@/hooks/useMadinaConfig'

const contact = useMadinaContact()

const phone = contact.phone.saudi          // '+966 14 XXX XXXX'
const email = contact.email.main           // 'info@madina-hotel.com'
const address = contact.address.city       // 'المدينة المنورة'
const facebook = contact.social.facebook   // URL
```

---

## 🎯 استخدام Hook الرئيسي

### Hook شامل لجميع الإعدادات

```typescript
import useMadina from '@/hooks/useMadinaConfig'

export default function MyComponent() {
  const {
    theme,
    images,
    typography,
    spacing,
    animations,
    contact,
    features,
    getColor,
    getImage,
    getCSSVar,
    getGradient,
    getShadow,
  } = useMadina()
  
  return (
    <div style={{ 
      background: getGradient(),
      boxShadow: getShadow('lg'),
      color: getColor('primary')
    }}>
      <img src={getImage('logo', 'main')} alt="Logo" />
    </div>
  )
}
```

---

## 🛠️ Helper Functions

### الحصول على متغير CSS

```typescript
import { getMadinaCSSVar } from '@/hooks/useMadinaConfig'

const primaryVar = getMadinaCSSVar('primary')
// Returns: 'var(--madina-primary)'
```

### إنشاء Gradient

```typescript
import { getMadinaGradient } from '@/hooks/useMadinaConfig'

const gradient = getMadinaGradient()
// Returns: 'linear-gradient(135deg, #2D5F3F 0%, #D4AF37 100%)'

const customGradient = getMadinaGradient('#FF0000', '#00FF00')
// Returns: 'linear-gradient(135deg, #FF0000 0%, #00FF00 100%)'
```

### الحصول على Shadow

```typescript
import { getMadinaShadow } from '@/hooks/useMadinaConfig'

const shadow = getMadinaShadow('lg')
// Returns: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
```

---

## 📱 الميزات المتاحة (Features)

```typescript
import { useMadinaFeatures } from '@/hooks/useMadinaConfig'

const features = useMadinaFeatures()

if (features.multiLanguage) {
  // تفعيل خيارات اللغات المتعددة
}

if (features.darkMode) {
  // تفعيل الوضع الداكن
}

if (features.onlineBooking) {
  // إظهار زر الحجز أونلاين
}
```

### الميزات المتاحة:

- ✅ `multiLanguage` - دعم لغات متعددة
- ✅ `darkMode` - الوضع الداكن
- ✅ `onlineBooking` - الحجز أونلاين
- ✅ `roomComparison` - مقارنة الغرف
- ✅ `guestReviews` - آراء النزلاء
- ✅ `newsletter` - النشرة البريدية
- ❌ `liveChatSupport` - الدعم الفوري
- ❌ `virtualTour` - جولة افتراضية
- ❌ `loyaltyProgram` - برنامج الولاء
- ❌ `mobileApp` - تطبيق الجوال

---

## 🎨 الكلاسات الجاهزة (CSS Classes)

### الأزرار

```html
<button class="madina-btn madina-btn-primary">احجز الآن</button>
<button class="madina-btn madina-btn-secondary">المزيد</button>
<button class="madina-btn madina-btn-outline">تفاصيل</button>
```

### البطاقات

```html
<div class="madina-card">
  <div class="madina-card-header">عنوان</div>
  <div class="madina-card-body">محتوى</div>
  <div class="madina-card-footer">تذييل</div>
</div>
```

### الأقسام

```html
<section class="madina-section">
  <div class="madina-section-header">
    <h2 class="madina-section-title">عنوان القسم</h2>
    <p class="madina-section-subtitle">وصف القسم</p>
  </div>
</section>
```

### العناصر الزخرفية

```html
<div class="madina-divider"></div>
<div class="madina-pattern"></div>
<span class="madina-text-gradient">نص بتدرج لوني</span>
```

---

## 📦 تحديث الإعدادات

### تعديل الألوان

```typescript
// في ملف madina.config.ts
export const madinaTheme: TemplateTheme = {
  primary: '#YOUR_COLOR',
  secondary: '#YOUR_COLOR',
  // ...
}
```

### إضافة صور جديدة

```typescript
// في ملف madina.config.ts
export const madinaImages = {
  // ...
  myNewCategory: {
    image1: '/path/to/image1.jpg',
    image2: '/path/to/image2.jpg',
  }
}
```

---

## 🔧 Best Practices

1. **استخدم Hooks بدلاً من استيراد الإعدادات مباشرة**
   ```typescript
   // ✅ صحيح
   const theme = useMadinaTheme()
   
   // ❌ خطأ
   import { madinaTheme } from '@/config/templates/madina.config'
   ```

2. **استخدم CSS Variables للألوان**
   ```css
   /* ✅ صحيح */
   color: var(--madina-primary);
   
   /* ❌ خطأ */
   color: #2D5F3F;
   ```

3. **استخدم الكلاسات الجاهزة قدر الإمكان**
   ```html
   <!-- ✅ صحيح -->
   <button class="madina-btn madina-btn-primary">زر</button>
   
   <!-- ❌ خطأ -->
   <button style="background: #2D5F3F; padding: 0.75rem;">زر</button>
   ```

---

## 📝 ملاحظات مهمة

- جميع المتغيرات والإعدادات مستقلة تماماً عن القوالب الأخرى
- يمكن تخصيص جميع القيم في ملف `madina.config.ts`
- يجب استخدام Hooks للوصول للإعدادات في المكونات
- جميع الصور يجب أن تكون في مجلد `/public/images/templates/madina/`

---

## 🔗 ملفات ذات صلة

- [madina.config.ts](../config/templates/madina.config.ts) - ملف الإعدادات الرئيسي
- [madina.css](../../../css/templates/madina.css) - ملف CSS الخاص بالقالب
- [useMadinaConfig.ts](../hooks/useMadinaConfig.ts) - Hooks للوصول للإعدادات
- [useMadinaTranslations.ts](../hooks/useMadinaTranslations.ts) - ترجمات القالب
