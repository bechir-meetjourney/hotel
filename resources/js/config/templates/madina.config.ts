/**
 * Madina template configuration.
 * All template variables and settings. Independent from other templates.
 */

import type { TemplateInfo, TemplateTheme } from '@/types/template-types'

/**
 * Template information
 */
export const madinaTemplateInfo: TemplateInfo = {
  id: 'madina',
  name: 'قالب المدينة',
  description: 'قالب فندق مستوحى من المدينة المنورة',
  logo: '/images/templates/madina/logo.png',
  favicon: '/images/templates/madina/favicon.ico',
  language: 'both', // Supports Arabic and English
  currency: 'SAR',
  timezone: 'Asia/Riyadh',
  establishedYear: 2020,
  starRating: 5,
  category: 'luxury',
}

/**
 * Template theme colors - inspired by Madina (green: nature; gold: luxury).
 */
export const madinaTheme: TemplateTheme = {
  // Primary - brown-gold
  primary: '#A67D5F', // Brown-Gold
  
  // Secondary - light brown
  secondary: '#C9A882', // Light Brown
  
  // Accent - dark brown
  accent: '#8B6F47', // Dark Brown
  
  // Background
  background: '#FFFFFF',
  
  // Text color
  text: '#1A202C',
  
  // Muted text
  muted: '#718096',
  
  // Success color
  success: '#38A169',
  
  // Warning color
  warning: '#DD6B20',
  
  // Error color
  error: '#E53E3E',
}

/**
 * Template images configuration
 */
export const madinaImages = {
  // Logo and Branding
  logo: {
    main: '/images/templates/madina/logo.png',
    white: '/images/templates/madina/logo-white.png',
    dark: '/images/templates/madina/logo-dark.png',
    icon: '/images/templates/madina/icon.png',
  },
  
  // Hero Section
  hero: {
    main: '/images/templates/madina/hero/main.jpg',
    slides: [
      '/images/templates/madina/hero/slide-1.jpg',
      '/images/templates/madina/hero/slide-2.jpg',
      '/images/templates/madina/hero/slide-3.jpg',
    ],
    overlay: 'linear-gradient(rgba(45, 95, 63, 0.7), rgba(212, 175, 55, 0.5))',
  },
  
  // Rooms
  rooms: {
    placeholder: '/images/templates/madina/rooms/placeholder.jpg',
    standard: '/images/templates/madina/rooms/standard.jpg',
    deluxe: '/images/templates/madina/rooms/deluxe.jpg',
    suite: '/images/templates/madina/rooms/suite.jpg',
    family: '/images/templates/madina/rooms/family.jpg',
  },
  
  // Gallery
  gallery: {
    categories: {
      rooms: '/images/templates/madina/gallery/rooms/',
      dining: '/images/templates/madina/gallery/dining/',
      facilities: '/images/templates/madina/gallery/facilities/',
      exterior: '/images/templates/madina/gallery/exterior/',
      spa: '/images/templates/madina/gallery/spa/',
      events: '/images/templates/madina/gallery/events/',
    },
  },
  
  // Partners
  partners: {
    placeholder: '/images/templates/madina/partners/placeholder.png',
  },
  
  // Testimonials
  testimonials: {
    defaultAvatar: '/images/templates/madina/testimonials/default-avatar.png',
  },
  
  // Backgrounds
  backgrounds: {
    pattern: '/images/templates/madina/patterns/islamic-pattern.svg',
    texture: '/images/templates/madina/textures/paper.jpg',
  },
}

/**
 * Template Typography
 * خطوط القالب
 */
export const madinaTypography = {
  // Arabic Fonts
  arabic: {
    primary: 'Almarai, sans-serif',
    secondary: 'Tajawal, sans-serif',
    heading: 'Almarai, sans-serif',
  },
  
  // English Fonts
  english: {
    primary: 'Inter, sans-serif',
    secondary: 'Roboto, sans-serif',
    heading: 'Poppins, sans-serif',
  },
  
  // Font Sizes
  sizes: {
    xs: '0.75rem',   // 12px
    sm: '0.875rem',  // 14px
    base: '1rem',    // 16px
    lg: '1.125rem',  // 18px
    xl: '1.25rem',   // 20px
    '2xl': '1.5rem', // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem',  // 36px
    '5xl': '3rem',     // 48px
    '6xl': '3.75rem',  // 60px
  },
}

/**
 * Template spacing
 */
export const madinaSpacing = {
  section: {
    py: '5rem',      // Section vertical padding
    gap: '3rem',     // Gap between elements
  },
  container: {
    maxWidth: '1280px',
    padding: '1rem',
  },
  card: {
    padding: '1.5rem',
    gap: '1rem',
  },
}

/**
 * Template Breakpoints
 * نقاط التوقف للتصميم المتجاوب
 */
export const madinaBreakpoints = {
  mobile: '640px',    // sm
  tablet: '768px',    // md
  laptop: '1024px',   // lg
  desktop: '1280px',  // xl
  wide: '1536px',     // 2xl
}

/**
 * Template Animations
 * الحركات والتأثيرات
 */
export const madinaAnimations = {
  duration: {
    fast: '150ms',
    normal: '300ms',
    slow: '500ms',
  },
  easing: {
    default: 'cubic-bezier(0.4, 0, 0.2, 1)',
    in: 'cubic-bezier(0.4, 0, 1, 1)',
    out: 'cubic-bezier(0, 0, 0.2, 1)',
    inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
}

/**
 * Template Contact Information
 * معلومات التواصل الافتراضية
 */
export const madinaContactDefaults = {
  phone: {
    saudi: '+966 14 XXX XXXX',
    international: '+966 14 XXX XXXX',
    whatsapp: '+966 5X XXX XXXX',
  },
  email: {
    main: 'info@madina-hotel.com',
    reservations: 'reservations@madina-hotel.com',
    support: 'support@madina-hotel.com',
  },
  address: {
    street: 'شارع الملك فهد',
    city: 'المدينة المنورة',
    country: 'المملكة العربية السعودية',
    postalCode: '42311',
  },
  social: {
    facebook: 'https://facebook.com/madina-hotel',
    instagram: 'https://instagram.com/madina-hotel',
    twitter: 'https://twitter.com/madina-hotel',
    linkedin: 'https://linkedin.com/company/madina-hotel',
  },
  workingHours: {
    reception: '24/7',
    restaurant: '6:00 AM - 12:00 AM',
    spa: '9:00 AM - 10:00 PM',
    gym: '24/7',
    pool: '6:00 AM - 11:00 PM',
  },
}

/**
 * Template SEO Configuration
 * إعدادات تحسين محركات البحث
 */
export const madinaSEO = {
  title: 'فندق المدينة - تجربة فندقية استثنائية',
  description: 'فندق فاخر في المدينة المنورة يوفر تجربة إقامة فريدة مع خدمات متميزة وموقع استراتيجي',
  keywords: [
    'فندق المدينة المنورة',
    'فنادق فاخرة',
    'حجز فنادق المدينة',
    'أفضل فنادق المدينة',
    'Madinah Hotel',
    'Luxury Hotels',
  ],
  ogImage: '/images/templates/madina/og-image.jpg',
  twitterCard: 'summary_large_image',
}

/**
 * Template Features Flags
 * مميزات القالب المتاحة
 */
export const madinaFeatures = {
  multiLanguage: true,
  darkMode: true,
  onlineBooking: true,
  liveChatSupport: false,
  virtualTour: false,
  roomComparison: true,
  guestReviews: true,
  loyaltyProgram: false,
  mobileApp: false,
  newsletter: true,
}

/**
 * Export all configuration
 */
export const madinaConfig = {
  info: madinaTemplateInfo,
  theme: madinaTheme,
  images: madinaImages,
  typography: madinaTypography,
  spacing: madinaSpacing,
  breakpoints: madinaBreakpoints,
  animations: madinaAnimations,
  contact: madinaContactDefaults,
  seo: madinaSEO,
  features: madinaFeatures,
}

export default madinaConfig
