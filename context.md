# متطلبات تطوير قالب المدينة - Frontend Development Requirements

## 📋 نظرة عامة

نحن في نظام ضيافة لدينا العديد من القوالب التي يمكن للمستخدمين تصفحها. قمنا بتطوير قالب الرياض (Riyadh Template) وانتهينا من مرحلة الـ Frontend بشكل كامل. الآن انتقلنا لقالب آخر وهو قالب المدينة (Madina Template) ونريد تطوير الجزء الخاص بـ Frontend أيضاً.

### 🧩 مفهوم Module في القوالب

**كل قالب هو Module مستقل تماماً** - هذا يعني:
- **وحدة مغلقة**: كل ما يخص القالب (الكود، الصور، البيانات، الإعدادات) منظم داخل هيكلية واحدة
- **استقلالية تامة**: لا يعتمد على ملفات أو موارد من قوالب أخرى
- **قابل للنقل**: يمكن نسخ/نقل القالب كوحدة واحدة بدون أي تبعيات خارجية
- **قابل للصيانة**: كل شيء متعلق بالقالب في مكان واحد، مما يسهل الصيانة والتطوير
- **لا يؤثر ولا يتأثر**: التعديلات على قالب المدينة لا تؤثر على قالب الرياض والعكس

## 🎯 الهدف من المهمة

بناء واجهة المستخدم (Frontend) لقالب المدينة بنفس الأقسام الموجودة في قالب الرياض، ولكن مع تعديلات على التصميم والواجهة وفقاً لمواصفات قالب المدينة.

## 📐 البنية المعتمدة

### 🧩 القالب كـ Module مستقل

**قالب المدينة هو Module مستقل تماماً** - هذا يعني:
- ✅ **وحدة كاملة**: كل ما يخص القالب موجود داخل مجلد واحد
- ✅ **استقلالية تامة**: لا يعتمد على أي ملفات أو موارد خارجية
- ✅ **قابل للنقل**: يمكن نسخ/نقل القالب كوحدة واحدة
- ✅ **قابل لإعادة الاستخدام**: يمكن استخدامه في مشاريع أخرى بسهولة
- ✅ **مغلق**: لا يؤثر على القوالب الأخرى ولا يتأثر بها

### الهيكلية الحالية لقالب المدينة

تم بالفعل عمل الهيكلية وتقسيم مناسب للمكونات في قالب المدينة. البنية التي سنعتمدها هي الموجودة في قالب المدينة:

```
resources/js/pages/templates/Madina/
├── index.tsx                  # الصفحة الرئيسية - تجميع كل الأقسام
├── MadinaHeader.tsx          # الهيدر المخصص
├── MadinaFooter.tsx          # الفوتر المخصص
│
├── images/                    # 📸 جميع صور القالب (مستقلة تماماً)
│   ├── hero-logo.png
│   ├── slider/                # صور السلايدر
│   ├── rooms/                 # صور الغرف
│   ├── gallery/               # صور المعرض
│   ├── partners/              # صور الشركاء
│   ├── footer/                # صور الفوتر
│   └── ...
│
├── Hero/                     # قسم البطل
│   ├── index.tsx
│   ├── HeroSlide.tsx
│   └── HeroControls.tsx
│
├── Rooms/                    # قسم الغرف
│   ├── index.tsx
│   ├── RoomCard.tsx
│   └── RoomFilters.tsx
│
├── Services/                 # قسم الخدمات
│   ├── index.tsx
│   └── ServiceCard.tsx
│
├── Partners/                 # قسم الشركاء
│   ├── index.tsx
│   └── PartnerLogo.tsx
│
├── Testimonials/             # قسم الشهادات
│   ├── index.tsx
│   └── TestimonialCard.tsx
│
├── Gallery/                  # قسم المعرض
│   ├── index.tsx
│   └── GalleryGrid.tsx
│
└── Contact/                   # قسم التواصل
    ├── index.tsx
    ├── ContactForm.tsx
    └── ContactInfo.tsx
```

## 📦 الأقسام المطلوبة

الأقسام الموجودة في قالب الرياض هي نفسها التي سنضيفها في قالب المدينة:

1. **Hero Section** - قسم البداية / السلايدر
2. **Rooms Section** - قسم الغرف والأجنحة
3. **Services Section** - قسم الخدمات
4. **Partners Section** - قسم الشركاء
5. **Testimonials Section** - قسم الشهادات وآراء العملاء
6. **Gallery Section** - قسم معرض الصور
7. **Gallery Slider** - عرض شرائح للصور (إن وجد في قالب الرياض)
8. **Contact Section** - قسم التواصل

## 🎨 المتطلبات الأساسية

### 1. الترجمة (Translation)
- يجب أن يكون نظام الترجمة موجوداً في قالب المدينة بنفس الطريقة الموجودة في قالب الرياض
- دعم كامل للعربية والإنجليزية (RTL/LTR)
- استخدام `useTemplateT()` hook للترجمة

### 2. الوضع النهاري والليلي (Dark/Light Mode)
- يجب أن يكون نظام تبديل الوضع (Dark Mode / Light Mode) موجوداً في قالب المدينة
- بنفس الطريقة الموجودة في قالب الرياض
- دعم كامل للوضعين مع انتقالات سلسة

### 3. الألوان والمتغيرات المستقلة

**مهم جداً:** جميع الألوان وجميع متغيرات قالب المدينة يجب أن تكون:
- ✅ **مستقلة تماماً** عن قالب الرياض
- ✅ **قابلة للتحكم** من خلال ملف إعدادات خاص بقالب المدينة
- ✅ **لا تؤثر** على القوالب الأخرى

#### ملف الإعدادات المطلوب

يجب استخدام ملف الإعدادات الموجود:
- `resources/js/config/templates/madina.config.ts` - يحتوي على جميع الإعدادات
- `resources/css/templates/madina.css` - يحتوي على CSS Variables الخاصة بقالب المدينة

#### المتغيرات المطلوبة في ملف الإعدادات

يجب أن يحتوي ملف الإعدادات على:
- **الألوان الأساسية**: primary, secondary, accent, success, warning, error
- **ألوان النص**: text-primary, text-secondary, text-muted, text-white
- **ألوان الخلفية**: bg-primary, bg-secondary, bg-tertiary, bg-dark
- **المسافات**: spacing variables (xs, sm, md, lg, xl, 2xl, 3xl)
- **Border Radius**: radius variables
- **Shadows**: shadow variables
- **Transitions**: transition durations
- **Z-Index**: z-index layers
- **Typography**: خطوط القالب
- **Breakpoints**: نقاط التوقف للتصميم المتجاوب
- **Animations**: إعدادات الحركات

#### استخدام المتغيرات في قالب المدينة

**مهم جداً:** يجب استخدام المتغيرات من ملف الإعدادات فقط، وعدم إضافة الألوان أو الخطوط مباشرة في `style` attributes.

##### 1. الخطوط (Typography)

**الخط المستخدم:** `Almarai` - هو الخط الأساسي لقالب المدينة

**CSS Variables:**
```css
--madina-font-family: 'Almarai', 'Tajawal', 'Inter', sans-serif;
--madina-font-family-arabic: 'Almarai', sans-serif;
--madina-font-family-heading: 'Almarai', sans-serif;
```

**CSS Classes المتاحة:**
- `.madina-font` - للخط الأساسي
- `.madina-font-arabic` - للخط العربي
- `.madina-font-heading` - لعناوين

**مثال على الاستخدام:**
```tsx
// ✅ صحيح - استخدام CSS class
<h2 className="madina-font-heading text-4xl font-bold">
  عنوان القسم
</h2>

// ❌ خطأ - عدم استخدام style مباشرة
<h2 style={{ fontFamily: 'Almarai, sans-serif' }}>
  عنوان القسم
</h2>
```

##### 2. الألوان (Colors)

**CSS Variables المتاحة:**
```css
/* الألوان الأساسية */
--madina-primary: #A67D5F;
--madina-primary-light: #C9A882;
--madina-primary-dark: #8B6F47;

/* ألوان النص */
--madina-text-primary: #1A202C;
--madina-text-secondary: #4A5568;
--madina-text-muted: #718096;
--madina-text-white: #FFFFFF;

/* ألوان الخلفية */
--madina-bg-primary: #FFFFFF;
--madina-bg-secondary: #F7FAFC;
--madina-bg-tertiary: #EDF2F7;
--madina-bg-dark: #1A202C;
```

**CSS Classes المتاحة:**
- `.madina-text-primary` - للون النص الأساسي
- `.madina-text-secondary` - للون النص الثانوي
- `.madina-text-muted` - للون النص الخافت
- `.madina-bg-primary` - لخلفية اللون الأساسي

**مثال على الاستخدام:**
```tsx
// ✅ صحيح - استخدام CSS class
<h2 className="madina-text-primary text-4xl font-bold">
  عنوان القسم
</h2>
<button className="madina-bg-primary text-white px-4 py-2">
  زر الحجز
</button>

// ✅ صحيح - استخدام CSS variable في style (للحالات الخاصة فقط)
<div style={{ backgroundColor: 'var(--madina-primary)' }}>
  محتوى
</div>

// ❌ خطأ - عدم استخدام الألوان مباشرة
<h2 style={{ color: '#A67D5F' }}>
  عنوان القسم
</h2>
```

##### 3. قواعد الاستخدام

1. **استخدام CSS Classes أولاً**: يجب استخدام CSS classes المتاحة قبل استخدام CSS variables مباشرة
2. **عدم استخدام style مباشرة**: لا يجب إضافة الألوان أو الخطوط في `style={{ color: '...' }}` أو `style={{ fontFamily: '...' }}`
3. **استخدام CSS Variables للحالات الخاصة**: يمكن استخدام `var(--madina-primary)` في `style` فقط للحالات التي لا يمكن تغطيتها بـ CSS classes
4. **الخط Almarai**: يجب استخدام `.madina-font-heading` للعناوين و `.madina-font` للنصوص العادية

### 4. التصميم والواجهة

- يجب بناء نفس الأقسام الموجودة في قالب الرياض
- **لكن** مع تعديلات على التصميم والواجهة لتناسب هوية قالب المدينة
- استخدام الألوان والمتغيرات من ملف إعدادات قالب المدينة
- الحفاظ على نفس الوظائف والتفاعلات الموجودة في قالب الرياض

## 🔧 الملفات المرجعية

### قالب الرياض (Reference)
- الملف الرئيسي: `resources/js/pages/templates/Riyadh/index.tsx`
- الأقسام:
  - `HeroSection.tsx`
  - `RoomsSection.tsx`
  - `ServicesSection.tsx`
  - `PartnersSection.tsx`
  - `TestimonialsSection.tsx`
  - `GallerySlider.tsx`
  - `ContactSection.tsx`

### قالب المدينة (Target)
- الملف الرئيسي: `resources/js/pages/templates/Madina/index.tsx`
- الهيكلية موجودة بالفعل في المجلدات المذكورة أعلاه

### ملفات الإعدادات
- `resources/js/config/templates/madina.config.ts` - إعدادات TypeScript/JavaScript
- `resources/css/templates/madina.css` - CSS Variables والأنماط

### البيانات
- البيانات موجودة في: `resources/js/data/templates/madina/`
- يجب استخدام هذه البيانات في المكونات

### الصور
- **الصور موجودة داخل مجلد القالب**: `resources/js/pages/templates/Madina/images/`
- هذا يضمن الاستقلالية الكاملة للقالب
- يمكن استخدام الصور مباشرة من داخل المكونات:
  ```typescript
  import slider1 from './images/slider/slider.jpg'
  import room1 from '../images/rooms/room-1.png'
  ```

## ✅ المعايير والمتطلبات التقنية

### 1. الاستقلالية (Module Independence)

**قالب المدينة هو Module مستقل تماماً**، لذلك:
- ✅ كل مكون في قالب المدينة يجب أن يكون مستقلاً
- ✅ استخدام CSS Variables من `madina.css` فقط
- ✅ استخدام الإعدادات من `madina.config.ts` فقط
- ✅ **الصور داخل مجلد القالب** (`Madina/images/`) - لا تعتمد على مجلدات خارجية
- ✅ **البيانات من مجلد القالب** (`data/templates/madina/`) - منفصلة تماماً
- ✅ عدم الاعتماد على متغيرات أو أنماط من قالب الرياض
- ✅ عدم الاعتماد على صور من مجلدات خارجية
- ✅ **Module مغلق**: لا يؤثر على القوالب الأخرى ولا يتأثر بها

### 2. التصميم المتجاوب (Responsive)
- يجب أن يكون التصميم متجاوباً بالكامل
- دعم جميع أحجام الشاشات (Mobile, Tablet, Desktop)
- استخدام Breakpoints من ملف الإعدادات

### 3. الأداء
- استخدام React Hooks بشكل صحيح
- تجنب Re-renders غير ضرورية
- تحسين الصور والموارد

### 4. إمكانية الوصول (Accessibility)
- استخدام Semantic HTML
- دعم Screen Readers
- Keyboard Navigation

### 5. التوافق
- التوافق مع المتصفحات الحديثة
- دعم RTL/LTR بشكل كامل
- دعم Dark Mode بشكل كامل

## 📝 ملاحظات مهمة

### Module Structure:
1. **القالب = Module مستقل** - كل ما يخص القالب في مكان واحد
2. **البنية موجودة** - الهيكلية موجودة بالفعل في قالب المدينة
3. **البيانات موجودة** - البيانات موجودة في `data/templates/madina/` (منفصلة)
4. **ملفات الإعدادات موجودة** - `madina.config.ts` و `madina.css` موجودان (منفصلان)
5. **الصور موجودة** - جميع صور القالب موجودة في `Madina/images/` (157 ملف - داخل القالب)

### Development Guidelines:
6. **المرجع هو قالب الرياض** - يجب النظر إلى قالب الرياض كمرجع للأقسام والوظائف
7. **التصميم مختلف** - التصميم والواجهة ستكون مختلفة عن قالب الرياض
8. **الألوان مستقلة** - جميع الألوان من ملف إعدادات قالب المدينة فقط
9. **Module مغلق** - لا يؤثر على القوالب الأخرى ولا يتأثر بها
10. **استخدام المتغيرات** - يجب استخدام CSS Variables و CSS Classes من `madina.css` فقط، وعدم إضافة الألوان أو الخطوط مباشرة في `style` attributes
11. **الخط Almarai** - هو الخط الأساسي لقالب المدينة، يجب استخدام `.madina-font-heading` للعناوين و `.madina-font` للنصوص

### Important:
10. **لا تنفيذ أي شيء الآن** - هذا الملف للتوثيق فقط

## 🎯  خلاصة

الهدف هو بناء Frontend لقالب المدينة **كـ Module مستقل تماماً** بنفس الأقسام الموجودة في قالب الرياض، ولكن:

### مبادئ Module الاستقلالية:
- ✅ **Module مغلق**: كل ما يخص القالب داخل مجلد واحد (`Madina/`)
- ✅ **استقلالية تامة**: الكود، الصور، البيانات، الإعدادات - كلها منفصلة
- ✅ **قابل للنقل**: يمكن نسخ/نقل القالب كوحدة واحدة بدون أي تبعيات
- ✅ **لا يؤثر ولا يتأثر**: لا يعتمد على قوالب أخرى ولا يؤثر عليها

### التفاصيل التقنية:
- ✅ استخدام البنية الموجودة في قالب المدينة
- ✅ استخدام الألوان والمتغيرات من ملف إعدادات قالب المدينة (مستقلة تماماً)
- ✅ استخدام CSS Variables و CSS Classes من `madina.css` فقط
- ✅ استخدام الخط `Almarai` كخط أساسي للقالب
- ✅ عدم إضافة الألوان أو الخطوط مباشرة في `style` attributes
- ✅ استخدام الصور من داخل مجلد القالب (`Madina/images/`) - 157 ملف
- ✅ استخدام البيانات من `data/templates/madina/` - منفصلة تماماً
- ✅ نفس نظام الترجمة والوضع النهاري/الليلي (مشترك بين القوالب)
- ✅ تعديلات على التصميم والواجهة لتناسب هوية قالب المدينة
- ✅ الحفاظ على نفس الوظائف والتفاعلات

---

**ملاحظة:** هذا الملف للتوثيق فقط. لا يتم تنفيذ أي كود في هذه المرحلة.

