import type { TemplateData, TemplateInfo, TemplateTheme } from '@/types/template-types'
import { madinaHeroData } from './hero-data'
import { madinaRoomsData } from './rooms-data'
import { madinaServicesData } from './services-data'
import { madinaPartnersData } from './partners-data'
import { madinaTestimonialsData } from './testimonials-data'
import { madinaGalleryData } from './gallery-data'
import { madinaContactData } from './contact-data'
import { madinaStatsData } from './stats-data'

/**
 * معلومات قالب المدينة
 * Madina Template Information
 */
export const madinaTemplateInfo: TemplateInfo = {
  id: 'madina',
  name: 'قالب المدينة',
  description: 'قالب فندق مستوحى من المدينة المنورة',
  logo: '/images/madina-template/logo.png',
  language: 'ar',
  currency: 'SAR',
  timezone: 'Asia/Riyadh',
  category: 'luxury',
}

/**
 * ثيم قالب المدينة
 * Madina Template Theme
 */
export const madinaTheme: TemplateTheme = {
  primary: '#2D5F3F',     // Dark green inspired by Madina
  secondary: '#8B7355',   // Golden brown
  accent: '#D4AF37',      // Gold
  background: '#FFFFFF',  // White
  text: '#1A1A1A',       // Dark black
  muted: '#F5F5F5',      // Light gray
  success: '#10B981',     // Green
  warning: '#F59E0B',     // Orange
  error: '#EF4444',       // Red
}

/**
 * جميع بيانات قالب المدينة
 * Complete Madina Template Data
 */
export const madinaTemplateData: TemplateData = {
  info: madinaTemplateInfo,
  theme: madinaTheme,
  hero: madinaHeroData,
  rooms: madinaRoomsData,
  services: madinaServicesData,
  partners: madinaPartnersData,
  testimonials: madinaTestimonialsData,
  gallery: madinaGalleryData,
  contact: madinaContactData,
  stats: madinaStatsData,
}
