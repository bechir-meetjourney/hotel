import { usePage } from '@inertiajs/react'

/**
 * Hook خاص بترجمات قالب المدينة
 * Madina Template Translations Hook
 * 
 * يوفر ترجمات مستقلة تماماً لقالب المدينة
 * منفصلة عن قالب الرياض وباقي القوالب
 */

interface MadinaTranslations {
  template: {
    name: string
    title: string
    description: string
  }
  header: {
    hotel_name: string
    nav: {
      home: string
      rooms: string
      services: string
      gallery: string
      testimonials: string
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
    sections: string
    contact: string
    contact_info: string
    social_media: string
    copyright: string
    google_maps: string
    links: {
      home: string
      rooms: string
      services: string
      gallery: string
      testimonials: string
      contact: string
      privacy: string
      terms: string
    }
    contact_location: string
    contact_phone: string
    contact_email: string
  }
  sections: {
    hero: {
      title: string
      subtitle: string
      cta_primary: string
      cta_secondary: string
      scroll_down: string
    }
    rooms: {
      title: string
      subtitle: string
      view_all: string
      book_now: string
      per_night: string
      sar: string
      filters: {
        all: string
        standard: string
        deluxe: string
        suite: string
        family: string
      }
      amenities: {
        wifi: string
        tv: string
        ac: string
        minibar: string
        safe: string
        view: string
      }
    }
    services: {
      title: string
      subtitle: string
      view_all: string
      items: {
        restaurant: { title: string; description: string }
        pool: { title: string; description: string }
        gym: { title: string; description: string }
        parking: { title: string; description: string }
        meeting: { title: string; description: string }
        wifi: { title: string; description: string }
      }
    }
    partners: {
      title: string
      subtitle: string
    }
    testimonials: {
      title: string
      subtitle: string
      view_all: string
      verified: string
      stars: string
    }
    gallery: {
      title: string
      subtitle: string
      view_image: string
      close: string
      next: string
      previous: string
    }
    contact: {
      title: string
      subtitle: string
      form: {
        name: string
        email: string
        phone: string
        message: string
        send: string
        sending: string
        success: string
        error: string
      }
      info: {
        address: string
        phone: string
        email: string
        working_hours: string
        reception: string
        restaurant: string
      }
    }
    stats: {
      rooms: string
      guests: string
      years: string
      awards: string
    }
  }
  booking: {
    title: string
    subtitle: string
    form: {
      room: string
      check_in: string
      check_out: string
      guests: string
      adults: string
      children: string
      name: string
      email: string
      phone: string
      special_requests: string
      submit: string
      submitting: string
      cancel: string
    }
    success: string
    error: string
  }
  common: {
    loading: string
    error: string
    success: string
    close: string
    cancel: string
    confirm: string
    save: string
    read_more: string
    view_more: string
    back: string
    next: string
    previous: string
  }
}

/**
 * Hook للحصول على ترجمات قالب المدينة
 */
export function useMadinaTranslations(): MadinaTranslations {
  const { props } = usePage()
  
  // Get madina translations from Laravel
  const madinaTranslations = (props as Record<string, unknown>).madinaTranslations || {}
  
  return madinaTranslations as MadinaTranslations
}

/**
 * Helper function للحصول على قيمة ترجمة محددة
 * 
 * @example
 * const t = useMadinaT()
 * t('sections.hero.title') // => e.g. 'Welcome to Madina Hotel'
 */
export function useMadinaT() {
  const translations = useMadinaTranslations()
  
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
