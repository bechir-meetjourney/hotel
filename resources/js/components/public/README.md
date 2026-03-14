# Public Components

This directory contains all the public-facing components used in the hotel automation system landing page.

## Structure

```
public/
├── common/                 # Reusable components
│   ├── Button.tsx         # Generic button component
│   ├── SectionTitle.tsx   # Section title component
│   └── index.ts           # Export file
├── Contact.tsx            # Contact form component
├── Footer.tsx             # Site footer component
├── Hero.tsx               # Hero section component
├── Hotels.tsx             # Hotel logos showcase
├── Navbar.tsx             # Navigation component
├── AppearanceToggle.tsx   # Theme toggle component
├── HowWeWork.tsx          # How we work section
├── ContactCTA.tsx         # Contact call-to-action
├── Pricing/               # Pricing section components
├── Testimonials/          # Customer testimonials
├── templates/             # Template showcase
├── WhyUs/                 # Why choose us section
└── hero/                  # Hero section sub-components
```

## Data Management

All component data is centralized in `@/data/public-data.ts` for better maintainability and consistency.

### Key Data Exports:

- `CONTACT_INFO` - Company contact information
- `SOCIAL_LINKS` - Social media links
- `PAYMENT_METHODS` - Accepted payment methods
- `HOTEL_LOGOS` - Partner hotel logos
- `TESTIMONIALS_DATA` - Customer testimonials
- `WHY_US_FEATURES` - Feature descriptions
- `ADDITIONAL_REASONS` - Additional benefits
- `CONTACT_FORM_FIELDS` - Form field configurations
- `SECTION_TITLES` - Section titles and descriptions

## Image Handling

### Important: Image Paths
All images in the data file use `@/assets/images/` paths, but components need to import them directly:

```tsx
// ❌ Wrong - Don't use paths from data directly
<img src={PAYMENT_METHODS[0].src} alt="Payment" />

// ✅ Correct - Import images and map them
import applepay from '@/assets/images/icons/pay-1.svg'
const paymentImages = { 'Apple Pay': applepay }
<img src={paymentImages['Apple Pay']} alt="Payment" />
```

### Image Import Pattern
```tsx
// 1. Import images at the top of your component
import logo1 from '@/assets/images/hotels-icons/logo1.svg'
import logo2 from '@/assets/images/hotels-icons/logo2.svg'

// 2. Create a mapping object
const imageMapping = {
  '@/assets/images/hotels-icons/logo1.svg': logo1,
  '@/assets/images/hotels-icons/logo2.svg': logo2,
}

// 3. Transform data to use actual imported images
const transformedData = HOTEL_LOGOS.map(item => ({
  ...item,
  src: imageMapping[item.src as keyof typeof imageMapping] || item.src
}))
```

## Common Components

### Button Component
```tsx
import { Button } from '@/components/public/common'

<Button 
  variant="primary" 
  size="lg" 
  fullWidth 
  onClick={handleClick}
>
  Click me
</Button>
```

### SectionTitle Component
```tsx
import { SectionTitle } from '@/components/public/common'

<SectionTitle 
  title="Section Title"
  subtitle="Section description"
/>
```

## Best Practices

1. **Data Centralization**: Always use data from `@/data/public-data.ts` instead of hardcoding
2. **Image Imports**: Always import images directly in components, don't use string paths from data
3. **Component Reusability**: Use common components when possible
4. **TypeScript**: Maintain proper typing for all components
5. **Accessibility**: Include proper ARIA labels and semantic HTML
6. **Responsive Design**: Ensure components work on all screen sizes
7. **Performance**: Use lazy loading for images and optimize bundle size

## Usage Examples

### Using Centralized Data with Images
```tsx
import { PAYMENT_METHODS } from '@/data/public-data'
import applepay from '@/assets/images/icons/pay-1.svg'

// Create mapping
const paymentImages = { 'Apple Pay': applepay }

// Use in component
{PAYMENT_METHODS.map(payment => {
  const image = paymentImages[payment.name as keyof typeof paymentImages]
  return <img key={payment.name} src={image} alt={payment.alt} />
})}
```

### Creating New Components
1. Create the component file
2. Add proper TypeScript interfaces
3. Import required images directly
4. Use centralized data when possible
5. Add JSDoc comments for documentation
6. Export from appropriate index files

## Image Directory Structure

```
assets/images/
├── icons/                 # General icons
│   ├── pay-*.svg         # Payment method icons
│   ├── icon-*.svg        # Feature icons
│   └── *.svg             # Other icons
├── hotels-icons/          # Hotel logos
│   └── logo*.svg
├── testimonlis/           # Testimonial images
│   └── logo-1.svg
├── why/                   # Why us section images
│   ├── templates.webp
│   ├── payments.webp
│   ├── customize.webp
│   └── ux.webp
└── templates/             # Template previews
    └── template-*.webp
```

## Maintenance

- Update data in `public-data.ts` for content changes
- Import images directly in components that use them
- Use common components for consistent styling
- Follow the established naming conventions
- Keep components focused and single-purpose
- Always test image loading after changes
