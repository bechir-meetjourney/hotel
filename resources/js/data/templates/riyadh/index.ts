import { TemplateData, TemplateTheme, TemplateInfo } from '@/types/template-types'
import { riyadhRoomsData } from './rooms-data'
import { riyadhServicesData } from './services-data'
import { riyadhTestimonialsData } from './testimonials-data'
import { riyadhGalleryData } from './gallery-data'
import { riyadhPartnersData } from './partners-data'
import { riyadhHeroData } from './hero-data'
import { riyadhContactData } from './contact-data'
import { riyadhStatsData } from './stats-data'

// Riyadh template theme and color settings
export const riyadhTheme: TemplateTheme = {
  primary: "#1a365d", // Royal dark blue
  secondary: "#d4af37", // Luxury gold
  accent: "#2c5282", // Medium blue
  background: "#f7fafc", // Very light gray
  text: "#2d3748", // Dark gray for text
  muted: "#718096", // Medium gray for secondary text
  success: "#38a169", // Green for success
  warning: "#d69e2e", // Yellow for warnings
  error: "#e53e3e" // Red for errors
}

// Basic Riyadh template information
export const riyadhTemplateInfo: TemplateInfo = {
  id: "riyadh",
  name: "قالب الرياض",
  description: "قالب فاخر مصمم خصيصاً للفنادق في العاصمة السعودية الرياض",
  logo: "/images/templates/riyadh/logo.png",
  favicon: "/images/templates/riyadh/favicon.ico",
  language: "ar",
  currency: "SAR",
  timezone: "Asia/Riyadh",
  establishedYear: 2009,
  starRating: 5,
  category: "luxury"
}

// Complete integrated data for Riyadh template
export const riyadhTemplateData: TemplateData = {
  info: riyadhTemplateInfo,
  theme: riyadhTheme,
  hero: riyadhHeroData,
  contact: riyadhContactData,
  rooms: riyadhRoomsData,
  services: riyadhServicesData,
  testimonials: riyadhTestimonialsData,
  gallery: riyadhGalleryData,
  partners: riyadhPartnersData,
  stats: riyadhStatsData
}