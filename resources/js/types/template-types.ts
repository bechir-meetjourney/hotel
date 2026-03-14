/**
 * Core data types for templates
 * Used for all templates with customization capabilities
 */

// Template identifier
export type TemplateId = 'riyadh' | 'madina' | 'jeddah' | 'dammam' | 'makkah' | 'madinah'

// Room type interface
export interface TemplateRoom {
  id: number
  name: string
  description: string
  price: number
  originalPrice?: number // for discounts
  currency: string
  features: string[]
  image: string
  gallery?: string[]
  maxGuests: number
  size: number // in square meters
  bedType: string
  amenities: string[]
  isAvailable: boolean
  popularTag?: string // "Most Popular", "Special Offer", etc.
}

// Service type interface
export interface TemplateService {
  id: number
  icon: string
  title: string
  description: string
  category: 'dining' | 'wellness' | 'business' | 'recreation' | 'transport' | 'general'
  isAvailable: boolean
  workingHours?: string
  additionalInfo?: string
}

// Partner type interface
export interface TemplatePartner {
  id: number
  name: string
  logo: string
  description?: string
  category: 'airlines' | 'banking' | 'corporate' | 'government' | 'tourism' | 'transportation' | 'dining' | 'entertainment' | 'technology' | 'healthcare' | 'other'
  website?: string
  isActive?: boolean
  since?: string
}

// Testimonial type interface
export interface TemplateTestimonial {
  id: number
  name: string
  role: string
  avatar: string
  rating: number
  comment: string
  date: string
  verifiedGuest: boolean
  stayDuration?: number // number of nights
  roomType?: string
}

// Gallery image type interface
export interface TemplateGalleryImage {
  id: number
  src: string
  alt: string
  category: 'rooms' | 'dining' | 'facilities' | 'exterior' | 'events' | 'spa' | 'other'
  title?: string
  description?: string
  photographer?: string
}

// Contact information interface
export interface TemplateContact {
  name: string
  phone: string
  email: string
  whatsapp?: string
  address: {
    street: string
    city: string
    country: string
    postalCode?: string
  }
  coordinates?: {
    lat: number
    lng: number
  }
  socialMedia?: {
    facebook?: string
    instagram?: string
    twitter?: string
    linkedin?: string
  }
  workingHours?: {
    reception: string
    restaurant: string
    spa?: string
    gym?: string
    pool?: string
  }
  additionalInfo?: {
    checkIn: string
    checkOut: string
    cancellationPolicy?: string
    parkingInfo?: string
    petsPolicy?: string
    smokingPolicy?: string
    languages?: string[]
    paymentMethods?: string[]
    nearbyAttractions?: Array<{
      name: string
      distance: string
      description: string
    }>
  }
}

// Hero Section information interface
export interface TemplateHero {
  title: string
  subtitle: string
  description: string
  backgroundImage: string
  ctaButtons: {
    primary: {
      text: string
      action: string
    }
    secondary?: {
      text: string
      action: string
    }
  }
  features: {
    icon: string
    title: string
    description: string
  }[]
}

// Color and theme settings interface
export interface TemplateTheme {
  primary: string
  secondary: string
  accent: string
  background: string
  text: string
  muted: string
  success: string
  warning: string
  error: string
}

// Basic template information interface
export interface TemplateInfo {
  id: TemplateId
  name: string
  description: string
  logo: string
  favicon?: string
  language: 'ar' | 'en' | 'both'
  currency: string
  timezone: string
  establishedYear?: number
  starRating?: number
  category: 'luxury' | 'business' | 'resort' | 'boutique' | 'budget'
}

// Template statistics interface
export interface TemplateStats {
  totalRooms: number
  totalReviews: number
  averageRating: number
  yearsOfExperience: number
  satisfiedGuests: number
  awards?: string[]
}

// Complete data for each template
export interface TemplateData {
  info: TemplateInfo
  theme: TemplateTheme
  hero: TemplateHero
  rooms: TemplateRoom[]
  services: TemplateService[]
  partners: TemplatePartner[]
  testimonials: TemplateTestimonial[]
  gallery: TemplateGalleryImage[]
  contact: TemplateContact
  stats: TemplateStats
}

// Context Provider type interface
export interface TemplateContextType {
  currentTemplate: TemplateId
  templateData: TemplateData
  setTemplate: (templateId: TemplateId) => void
  isLoading: boolean
  error?: string
}

// API response type interface (for future use)
export interface TemplateApiResponse {
  success: boolean
  data: TemplateData
  message?: string
  errors?: Record<string, string[]>
}

// Search and filtering type interface
export interface TemplateFilters {
  priceRange?: {
    min: number
    max: number
  }
  roomType?: string[]
  amenities?: string[]
  rating?: number
  availability?: {
    checkIn: string
    checkOut: string
    guests: number
  }
}

// General templates configuration type interface
export interface TemplatesConfig {
  available: TemplateId[]
  default: TemplateId
  features: {
    multiLanguage: boolean
    darkMode: boolean
    animations: boolean
    analytics: boolean
  }
}