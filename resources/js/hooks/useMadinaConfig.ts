import { useMemo } from 'react'
import { madinaConfig } from '@/config/templates/madina.config'

/**
 * Hook لاستخدام إعدادات قالب المدينة
 * Madina Template Configuration Hook
 * 
 * يوفر الوصول السهل لجميع إعدادات القالب
 * من ألوان، صور، خطوط، وغيرها
 */

/**
 * Hook للحصول على ثيم قالب المدينة
 */
export function useMadinaTheme() {
  return useMemo(() => madinaConfig.theme, [])
}

/**
 * Hook للحصول على صور قالب المدينة
 */
export function useMadinaImages() {
  return useMemo(() => madinaConfig.images, [])
}

/**
 * Hook للحصول على خطوط قالب المدينة
 */
export function useMadinaTypography() {
  return useMemo(() => madinaConfig.typography, [])
}

/**
 * Hook للحصول على المسافات
 */
export function useMadinaSpacing() {
  return useMemo(() => madinaConfig.spacing, [])
}

/**
 * Hook للحصول على الحركات والتأثيرات
 */
export function useMadinaAnimations() {
  return useMemo(() => madinaConfig.animations, [])
}

/**
 * Hook للحصول على معلومات التواصل الافتراضية
 */
export function useMadinaContact() {
  return useMemo(() => madinaConfig.contact, [])
}

/**
 * Hook للحصول على ميزات القالب المتاحة
 */
export function useMadinaFeatures() {
  return useMemo(() => madinaConfig.features, [])
}

/**
 * Hook للحصول على صورة بناءً على المسار
 * يعيد المسار الكامل للصورة أو placeholder إذا لم تكن متوفرة
 */
export function useMadinaImage(category: keyof typeof madinaConfig.images, key?: string) {
  return useMemo(() => {
    const images = madinaConfig.images[category]
    
    if (!images) {
      return '/images/placeholder.jpg'
    }
    
    if (!key) {
      return typeof images === 'string' ? images : (images as any).main || '/images/placeholder.jpg'
    }
    
    if (typeof images === 'object' && key in images) {
      return (images as any)[key] || '/images/placeholder.jpg'
    }
    
    return '/images/placeholder.jpg'
  }, [category, key])
}

/**
 * Hook للحصول على لون من الثيم
 */
export function useMadinaColor(colorKey: keyof typeof madinaConfig.theme) {
  return useMemo(() => {
    return madinaConfig.theme[colorKey] || '#000000'
  }, [colorKey])
}

/**
 * Hook شامل للحصول على جميع إعدادات القالب
 */
export function useMadinaConfig() {
  return useMemo(() => madinaConfig, [])
}

/**
 * Helper function للحصول على CSS variable name
 */
export function getMadinaCSSVar(varName: string): string {
  return `var(--madina-${varName})`
}

/**
 * Helper function لإنشاء gradient
 */
export function getMadinaGradient(from?: string, to?: string): string {
  const fromColor = from || madinaConfig.theme.primary
  const toColor = to || madinaConfig.theme.secondary
  
  return `linear-gradient(135deg, ${fromColor} 0%, ${toColor} 100%)`
}

/**
 * Helper function للحصول على shadow
 */
export function getMadinaShadow(size: 'sm' | 'md' | 'lg' | 'xl' = 'md'): string {
  const shadows = {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
  }
  
  return shadows[size]
}

/**
 * Default export - Hook رئيسي
 */
export default function useMadina() {
  const theme = useMadinaTheme()
  const images = useMadinaImages()
  const typography = useMadinaTypography()
  const spacing = useMadinaSpacing()
  const animations = useMadinaAnimations()
  const contact = useMadinaContact()
  const features = useMadinaFeatures()
  
  return {
    theme,
    images,
    typography,
    spacing,
    animations,
    contact,
    features,
    // Helper functions
    getColor: (key: keyof typeof theme) => theme[key],
    getImage: (category: string, key?: string) => {
      const cat = images[category as keyof typeof images]
      if (!cat) return '/images/placeholder.jpg'
      if (!key) return typeof cat === 'string' ? cat : (cat as any).main
      return (cat as any)[key] || '/images/placeholder.jpg'
    },
    getCSSVar: getMadinaCSSVar,
    getGradient: getMadinaGradient,
    getShadow: getMadinaShadow,
  }
}
