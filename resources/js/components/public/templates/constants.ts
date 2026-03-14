// resources/js/components/public/templates/constants.ts
import t1 from '@/assets/images/templates/template-1.webp'
import t2 from '@/assets/images/templates/template-2.webp'
import t3 from '@/assets/images/templates/template-3.webp'

// filter keys (neutral keys used for logic), labels will be provided from lang files
export const FILTERS = [
  'all',
  'madinah',
  'makkah',
  'hijaz',
  'central',
  'sulamani',
] as const

export type Region = typeof FILTERS[number]
export type RegionOption = Exclude<Region, 'all'>

export type TemplateItem = {
  id: number
  src: string
  title?: string
  titleKey?: string
  region: RegionOption
}

// sample templates (region uses keys)
export const TEMPLATES: TemplateItem[] = [
  { id: 1, src: t1, titleKey: 'messages.templates.items.0.title', region: 'madinah' },
  { id: 2, src: t2, titleKey: 'messages.templates.items.1.title', region: 'madinah' },
  { id: 3, src: t3, titleKey: 'messages.templates.items.2.title', region: 'madinah' },
  { id: 4, src: t3, titleKey: 'messages.templates.items.3.title', region: 'makkah' },
  { id: 5, src: t3, titleKey: 'messages.templates.items.4.title', region: 'hijaz' },
  // New Madina template
  { id: 6, src: t1, titleKey: 'messages.templates.items.5.title', region: 'madinah' },
]

