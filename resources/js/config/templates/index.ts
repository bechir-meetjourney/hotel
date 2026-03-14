/**
 * Madina Template - Main Export File
 * ملف التصدير الرئيسي لقالب المدينة
 * 
 * يجمع جميع exports في مكان واحد لسهولة الاستيراد
 */

// Configuration
export { default as madinaConfig } from './madina.config'
export type {
  TemplateInfo,
  TemplateTheme,
  TemplateId,
} from '@/types/template-types'

// Re-export specific parts
export {
  madinaTemplateInfo,
  madinaTheme,
  madinaImages,
  madinaTypography,
  madinaSpacing,
  madinaBreakpoints,
  madinaAnimations,
  madinaContactDefaults,
  madinaSEO,
  madinaFeatures,
} from './madina.config'
