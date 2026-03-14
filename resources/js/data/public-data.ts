/**
 * Central data file for public components
 * Contains all shared data used across public components
 */

// ============================================================================
// CONTACT INFORMATION --not
// ============================================================================
export const CONTACT_INFO = {
  address: 'برج الأعمال، شارع الملك فهد، الرياض، المملكة العربية السعودية',
  email: 'contact@hotels-ksa.com',
  phone: '+966 55 123 4567',
  businessNumber: '514569145876914',
} as const

// ============================================================================
// SOCIAL MEDIA LINKS
// ============================================================================
export const SOCIAL_LINKS = [
  { key: 'instagram', nameKey: 'messages.social.instagram', href: '#', ariaLabelKey: 'messages.social.instagram' },
  { key: 'x', nameKey: 'messages.social.x', href: '#', ariaLabelKey: 'messages.social.x' },
  { key: 'youtube', nameKey: 'messages.social.youtube', href: '#', ariaLabelKey: 'messages.social.youtube' },
  { key: 'facebook', nameKey: 'messages.social.facebook', href: '#', ariaLabelKey: 'messages.social.facebook' },
] as const

// Payment method icons
import payApple from '@/assets/images/icons/pay-1.svg'
import payVisa from '@/assets/images/icons/pay-2.svg'
import payMastercard from '@/assets/images/icons/pay-3.svg'
import payGoogle from '@/assets/images/icons/pay-4.svg'
import payPaypal from '@/assets/images/icons/pay-5.svg'
import payMada from '@/assets/images/icons/pay-6.svg'

// ============================================================================
// PAYMENT METHODS
// ============================================================================
export const PAYMENT_METHODS = [
  { name: 'Apple Pay', src: payApple, alt: 'Apple Pay', value: 'apple' },
  { name: 'VISA', src: payVisa, alt: 'VISA', value: 'card' },
  { name: 'Mastercard', src: payMastercard, alt: 'Mastercard', value: 'card' },
  { name: 'Google Pay', src: payGoogle, alt: 'Google Pay', value: 'google' },
  { name: 'PayPal', src: payPaypal, alt: 'PayPal', value: 'paypal' },
  { name: 'mada', src: payMada, alt: 'mada', value: 'mada' },
] as const

// Export a payment method type for other components
// Payment method type (explicit) — keep in sync with PAYMENT_METHODS values
export type PM = 'card' | 'mada' | 'apple' | 'google' | 'paypal' | 'stc'

// ============================================================================
// HOTEL LOGOS --not
// ============================================================================
export const HOTEL_LOGOS = [
  { src: '@/assets/images/hotels-icons/logo1.svg', altKey: 'messages.hotel_logos.0.alt' },
  { src: '@/assets/images/hotels-icons/logo2.svg', altKey: 'messages.hotel_logos.1.alt' },
  { src: '@/assets/images/hotels-icons/logo3.svg', altKey: 'messages.hotel_logos.2.alt' },
  { src: '@/assets/images/hotels-icons/logo4.svg', altKey: 'messages.hotel_logos.3.alt' },
  { src: '@/assets/images/hotels-icons/logo5.svg', altKey: 'messages.hotel_logos.4.alt' },
  { src: '@/assets/images/hotels-icons/logo6.svg', altKey: 'messages.hotel_logos.5.alt' },
  { src: '@/assets/images/hotels-icons/logo7.svg', altKey: 'messages.hotel_logos.6.alt' },
  { src: '@/assets/images/hotels-icons/logo8.svg', altKey: 'messages.hotel_logos.7.alt' },
  { src: '@/assets/images/hotels-icons/logo1.svg', altKey: 'messages.hotel_logos.8.alt' },
  { src: '@/assets/images/hotels-icons/logo2.svg', altKey: 'messages.hotel_logos.9.alt' },
  { src: '@/assets/images/hotels-icons/logo3.svg', altKey: 'messages.hotel_logos.10.alt' },
  { src: '@/assets/images/hotels-icons/logo4.svg', altKey: 'messages.hotel_logos.11.alt' },
  { src: '@/assets/images/hotels-icons/logo5.svg', altKey: 'messages.hotel_logos.12.alt' },
  { src: '@/assets/images/hotels-icons/logo6.svg', altKey: 'messages.hotel_logos.13.alt' },
  { src: '@/assets/images/hotels-icons/logo7.svg', altKey: 'messages.hotel_logos.14.alt' },
  { src: '@/assets/images/hotels-icons/logo8.svg', altKey: 'messages.hotel_logos.15.alt' },
] as const

// ============================================================================
// TESTIMONIALS DATA
// ============================================================================
export const TESTIMONIALS_DATA = [
  {
  id: 1,
  nameKey: 'messages.testimonials.0.name',
  positionKey: 'messages.testimonials.0.position',
  image: '@/assets/images/testimonlis/logo-1.svg',
  rating: 5,
  textKey: 'messages.testimonials.0.text',
  },
  {
  id: 2,
  nameKey: 'messages.testimonials.1.name',
  positionKey: 'messages.testimonials.1.position',
  image: '@/assets/images/testimonlis/logo-1.svg',
  rating: 5,
  textKey: 'messages.testimonials.1.text',
  },
  {
  id: 3,
  nameKey: 'messages.testimonials.2.name',
  positionKey: 'messages.testimonials.2.position',
  image: '@/assets/images/testimonlis/logo-1.svg',
  rating: 5,
  textKey: 'messages.testimonials.2.text',
  },
  {
  id: 4,
  nameKey: 'messages.testimonials.3.name',
  positionKey: 'messages.testimonials.3.position',
  image: '@/assets/images/testimonlis/logo-1.svg',
  rating: 5,
  textKey: 'messages.testimonials.3.text',
  },
  {
  id: 5,
  nameKey: 'messages.testimonials.4.name',
  positionKey: 'messages.testimonials.4.position',
  image: '@/assets/images/testimonlis/logo-1.svg',
  rating: 5,
  textKey: 'messages.testimonials.4.text',
  },
  {
  id: 6,
  nameKey: 'messages.testimonials.5.name',
  positionKey: 'messages.testimonials.5.position',
  image: '@/assets/images/testimonlis/logo-1.svg',
  rating: 5,
  textKey: 'messages.testimonials.5.text',
  },
  {
  id: 7,
  nameKey: 'messages.testimonials.6.name',
  positionKey: 'messages.testimonials.6.position',
  image: '@/assets/images/testimonlis/logo-1.svg',
  rating: 5,
  textKey: 'messages.testimonials.6.text',
  },
  {
  id: 8,
  nameKey: 'messages.testimonials.7.name',
  positionKey: 'messages.testimonials.7.position',
  image: '@/assets/images/testimonlis/logo-1.svg',
  rating: 5,
  textKey: 'messages.testimonials.7.text',
  },
] as const

// ============================================================================
// WHY US FEATURES
// ============================================================================
export const WHY_US_FEATURES = {
  templates: {
    // texts are stored in language files under messages.why_us_features.templates
    titleKey: 'messages.why_us_features.templates.title',
    subtitleKey: 'messages.why_us_features.templates.subtitle',
    image: { src: '@/assets/images/why/templates.webp', alt: 'why.templates.alt' },
    bullets: [
      { icon: 'LayoutTemplate', textKey: 'messages.why_us_features.templates.bullets.0' },
      { icon: 'Smartphone', textKey: 'messages.why_us_features.templates.bullets.1' },
      { icon: 'MapPin', textKey: 'messages.why_us_features.templates.bullets.2' },
    ],
  },
  payments: {
    titleKey: 'messages.why_us_features.payments.title',
    subtitleKey: 'messages.why_us_features.payments.subtitle',
    image: { src: '@/assets/images/why/payments.webp', alt: 'why.payments.alt' },
    bullets: [
      { icon: 'CreditCard', textKey: 'messages.why_us_features.payments.bullets.0' },
      { icon: 'Shield', textKey: 'messages.why_us_features.payments.bullets.1' },
      { icon: 'Timer', textKey: 'messages.why_us_features.payments.bullets.2' },
    ],
  },
  customization: {
    titleKey: 'messages.why_us_features.customization.title',
    subtitleKey: 'messages.why_us_features.customization.subtitle',
    image: { src: '@/assets/images/why/customize.webp', alt: 'why.customization.alt' },
    bullets: [
      { icon: 'SlidersHorizontal', textKey: 'messages.why_us_features.customization.bullets.0' },
      { icon: 'Palette', textKey: 'messages.why_us_features.customization.bullets.1' },
      { icon: 'FileText', textKey: 'messages.why_us_features.customization.bullets.2' },
    ],
  },
  ux: {
    titleKey: 'messages.why_us_features.ux.title',
    subtitleKey: 'messages.why_us_features.ux.subtitle',
    image: { src: '@/assets/images/why/ux.webp', alt: 'why.ux.alt' },
    bullets: [
      { icon: 'SlidersHorizontal', textKey: 'messages.why_us_features.ux.bullets.0' },
      { icon: 'Palette', textKey: 'messages.why_us_features.ux.bullets.1' },
      { icon: 'FileText', textKey: 'messages.why_us_features.ux.bullets.2' },
      { icon: 'Infinity', textKey: 'messages.why_us_features.ux.bullets.3' },
    ],
  },
} as const

// ============================================================================
// ADDITIONAL REASONS
// ============================================================================
export const ADDITIONAL_REASONS = [
  {
    titleKey: 'messages.additional_reasons.0.title',
    textKey: 'messages.additional_reasons.0.text',
    iconSrc: '@/assets/images/icons/icon-1.svg',
    iconAlt: 'support',
  },
  {
    titleKey: 'messages.additional_reasons.1.title',
    textKey: 'messages.additional_reasons.1.text',
    iconSrc: '@/assets/images/icons/icon-2.svg',
    iconAlt: 'analytics',
  },
  {
    titleKey: 'messages.additional_reasons.2.title',
    textKey: 'messages.additional_reasons.2.text',
    iconSrc: '@/assets/images/icons/icon-3.svg',
    iconAlt: 'seo',
  },
  {
    titleKey: 'messages.additional_reasons.3.title',
    textKey: 'messages.additional_reasons.3.text',
    iconSrc: '@/assets/images/icons/icon-4.svg',
    iconAlt: 'staff',
  },
] as const

// ============================================================================
// FORM FIELD CONFIGURATIONS
// ============================================================================
export const CONTACT_FORM_FIELDS = [
  { name: 'fullName', type: 'text', labelKey: 'messages.contact_form.fullName.label', placeholderKey: 'messages.contact_form.fullName.placeholder', autoComplete: 'name' },
  { name: 'email', type: 'email', labelKey: 'messages.contact_form.email.label', placeholderKey: 'messages.contact_form.email.placeholder', autoComplete: 'email' },
  { name: 'phone', type: 'tel', labelKey: 'messages.contact_form.phone.label', placeholderKey: 'messages.contact_form.phone.placeholder', autoComplete: 'tel' },
  { name: 'hotelName', type: 'text', labelKey: 'messages.contact_form.hotelName.label', placeholderKey: 'messages.contact_form.hotelName.placeholder', autoComplete: undefined },
  { name: 'location', type: 'text', labelKey: 'messages.contact_form.location.label', placeholderKey: 'messages.contact_form.location.placeholder', autoComplete: undefined },
] as const

