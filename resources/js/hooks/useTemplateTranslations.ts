import React from 'react'
import { usePage } from '@inertiajs/react'
import { router } from '@inertiajs/react'

/**
 * Interface for template translation structure
 * Defines the shape of translations for hotel template components
 */
interface TemplateTranslations {
  header: {
    hotel_name: string
    nav: {
      home: string
      about: string
      rooms: string
      massage: string
      reviews: string
      contact: string
    }
    cta_book: string
    language_toggle: string
    current_language: string
    phone: string
  }
  footer: {
    hotel_name: string
    description: string
    quick_links: string
    contact_info: string
    social_media: string
    copyright: string
  }
  sections: {
    hero: {
      title: string
      subtitle: string
    }
    rooms: {
      title: string
      subtitle: string
    }
    services: {
      title: string
      subtitle: string
    }
  }
}

/**
 * Hook for template-specific translations
 * Separate from main interface translations
 */
export function useTemplateTranslations(): TemplateTranslations {
  const { props } = usePage()
  
  // Get template translations from Laravel
  const templateTranslations = (props as Record<string, unknown>).templateTranslations || {}
  
  return templateTranslations as TemplateTranslations
}

/**
 * Helper function to get nested translation values
 */
export function useTemplateT() {
  const translations = useTemplateTranslations()
  
  return (key: string, fallback?: string) => {
    const keys = key.split('.')
    let value: unknown = translations
    
    for (const k of keys) {
      if (typeof value === 'object' && value !== null) {
        value = (value as Record<string, unknown>)[k]
      } else {
        return fallback || key
      }
    }
    
    return (typeof value === 'string' ? value : fallback) || key
  }
}

/**
 * Hook for template language switching with RTL/LTR support
 */
export function useTemplateLanguage() {
  const { props } = usePage()
  // Prefer server-provided locale, fallback to document html lang, then 'ar'
  const pageLocale = (props as Record<string, unknown>).locale as string | undefined
  const htmlLocale = typeof document !== 'undefined' ? document.documentElement.lang : undefined
  const currentLocale = pageLocale || htmlLocale || 'ar'
  
  const toggleLanguage = () => {
    const newLocale = currentLocale === 'ar' ? 'en' : 'ar'
    // Do not preserve state to ensure a clean re-render with fresh props
    router.visit(`/locale/${newLocale}`, {
      preserveState: false,
      preserveScroll: true,
      replace: true,
    })
  }

  // Set document direction based on language
  React.useEffect(() => {
    const direction = currentLocale === 'ar' ? 'rtl' : 'ltr'
    document.documentElement.dir = direction
    document.documentElement.lang = currentLocale
  }, [currentLocale])
  
  return {
    currentLocale,
    toggleLanguage,
    isArabic: currentLocale === 'ar',
    isEnglish: currentLocale === 'en',
    direction: currentLocale === 'ar' ? 'rtl' : 'ltr'
  }
}