/**
 * Theme switcher component.
 * Lets user choose site color and persist in localStorage.
 * Side modal with primary/secondary color options.
 */
import { useState, useEffect, useCallback } from 'react'
import { Edit3 } from 'lucide-react'
import { useTemplateLanguage } from '@/hooks/useTemplateTranslations'
import FloatingSettingsPanel from '@/components/FloatingSettingsPanel'

interface ColorTheme {
  id: string
  name: string
  nameEn: string
  primary: string
  primaryLight: string
  primaryDark: string
  secondary: string
}

interface TextColorTheme {
  id: string
  name: string
  nameEn: string
  color: string
  darkColor: string
}

interface BackgroundTheme {
  id: string
  name: string
  nameEn: string
  type: 'solid' | 'gradient' | 'pattern'
  value: string // CSS value for background
  darkValue?: string // Optional dark mode value
}

interface FontTheme {
  id: string
  name: string
  nameEn: string
  fontFamily: string
  arabicFont?: string // Optional separate Arabic font
  englishFont?: string // Optional separate English font
  headingFont?: string // Optional separate heading font
}

interface HeaderStyle {
  id: string
  name: string
  nameEn: string
  width: 'container' | 'full'
}

interface HeroSliderStyle {
  id: string
  name: string
  nameEn: string
  type: 'arrows' | 'dots'
  effect?: 'slide' | 'fade' | 'cube' | 'coverflow' | 'flip'
}

interface RoomCardStyle {
  id: string
  name: string
  nameEn: string
  type: 'default' | 'simple'
}

interface TestimonialCardStyle {
  id: string
  name: string
  nameEn: string
  type: 'default' | 'simple'
}

interface PartnersStyle {
  id: string
  name: string
  nameEn: string
  type: 'carousel' | 'grid'
}

interface AdditionalServicesStyle {
  id: string
  name: string
  nameEn: string
  type: 'slider' | 'grid'
}

interface ServiceCardStyle {
  id: string
  name: string
  nameEn: string
  type: 'default' | 'simple'
}

interface GallerySliderStyle {
  id: string
  name: string
  nameEn: string
  type: 'riyadh' | 'madina'
}

interface ContactFormStyle {
  id: string
  name: string
  nameEn: string
  type: 'default' | 'simple'
}

/** Site identity - full color set (primary + light + dark). */
interface IdentityTheme {
  id: string
  name: string
  nameEn: string
  primary: string
  primaryLight: string
  primaryDark: string
  secondary: string
  lightBackground: string
  darkPrimary: string
  darkPrimaryLight?: string
  darkBackground: string
}

const colorThemes: ColorTheme[] = [
  {
    id: 'default',
    name: 'الافتراضي',
    nameEn: 'Default',
    primary: '#A67D5F',
    primaryLight: '#C9A882',
    primaryDark: '#8B6F47',
    secondary: '#C9A882'
  },
  {
    id: 'blue',
    name: 'أزرق',
    nameEn: 'Blue',
    primary: '#3182CE',
    primaryLight: '#63B3ED',
    primaryDark: '#2C5282',
    secondary: '#4299E1'
  },
  {
    id: 'green',
    name: 'أخضر',
    nameEn: 'Green',
    primary: '#38A169',
    primaryLight: '#68D391',
    primaryDark: '#2F855A',
    secondary: '#48BB78'
  },
  {
    id: 'purple',
    name: 'بنفسجي',
    nameEn: 'Purple',
    primary: '#805AD5',
    primaryLight: '#B794F4',
    primaryDark: '#6B46C1',
    secondary: '#9F7AEA'
  },
  {
    id: 'red',
    name: 'أحمر',
    nameEn: 'Red',
    primary: '#E53E3E',
    primaryLight: '#FC8181',
    primaryDark: '#C53030',
    secondary: '#F56565'
  },
  {
    id: 'orange',
    name: 'برتقالي',
    nameEn: 'Orange',
    primary: '#DD6B20',
    primaryLight: '#F6AD55',
    primaryDark: '#C05621',
    secondary: '#ED8936'
  }
]

const textColorThemes: TextColorTheme[] = [
  {
    id: 'default',
    name: 'الافتراضي',
    nameEn: 'Default',
    color: '#4B5563',
    darkColor: '#D1D5DB'
  },
  {
    id: 'dark',
    name: 'داكن',
    nameEn: 'Dark',
    color: '#1F2937',
    darkColor: '#F3F4F6'
  },
  {
    id: 'medium',
    name: 'متوسط',
    nameEn: 'Medium',
    color: '#6B7280',
    darkColor: '#E5E7EB'
  },
  {
    id: 'light',
    name: 'فاتح',
    nameEn: 'Light',
    color: '#9CA3AF',
    darkColor: '#D1D5DB'
  },
  {
    id: 'blue',
    name: 'أزرق',
    nameEn: 'Blue',
    color: '#3B82F6',
    darkColor: '#93C5FD'
  },
  {
    id: 'brown',
    name: 'بني',
    nameEn: 'Brown',
    color: '#92400E',
    darkColor: '#FCD34D'
  }
]

const backgroundThemes: BackgroundTheme[] = [
  {
    id: 'default',
    name: 'افتراضي',
    nameEn: 'Default',
    type: 'solid',
    value: '#f5f5f5',
    darkValue: '#0F172A'
  },
  {
    id: 'white',
    name: 'أبيض',
    nameEn: 'White',
    type: 'solid',
    value: '#FFFFFF',
    darkValue: '#0F172A'
  },
  {
    id: 'cream',
    name: 'كريمي',
    nameEn: 'Cream',
    type: 'solid',
    value: '#F5F1EB',
    darkValue: '#1E293B'
  },
  {
    id: 'beige',
    name: 'بيج',
    nameEn: 'Beige',
    type: 'solid',
    value: '#E5DED7',
    darkValue: '#1E293B'
  },
  {
    id: 'gradient-primary',
    name: 'تدرج اللون الأساسي',
    nameEn: 'Primary Gradient',
    type: 'gradient',
    value: 'linear-gradient(135deg, var(--madina-primary-light) 0%, var(--madina-primary) 100%)',
    darkValue: 'linear-gradient(135deg, var(--madina-primary-dark) 0%, var(--madina-primary) 100%)'
  },
  {
    id: 'gradient-soft',
    name: 'تدرج ناعم',
    nameEn: 'Soft Gradient',
    type: 'gradient',
    value: 'linear-gradient(135deg, #F5F1EB 0%, #E5DED7 100%)',
    darkValue: 'linear-gradient(135deg, #2a2a2a 0%, #3a3a3a 100%)'
  },
  {
    id: 'pattern-dots',
    name: 'نمط النقاط',
    nameEn: 'Dots Pattern',
    type: 'pattern',
    value: `radial-gradient(circle, rgba(166, 125, 95, 0.1) 1px, transparent 1px)`,
    darkValue: `radial-gradient(circle, rgba(255, 255, 255, 0.05) 1px, transparent 1px)`
  },
  {
    id: 'pattern-lines',
    name: 'نمط الخطوط',
    nameEn: 'Lines Pattern',
    type: 'pattern',
    value: `repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(166, 125, 95, 0.05) 10px, rgba(166, 125, 95, 0.05) 20px)`,
    darkValue: `repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255, 255, 255, 0.03) 10px, rgba(255, 255, 255, 0.03) 20px)`
  }
]

// Dark mode background themes - only 3 options
const darkBackgroundThemes: BackgroundTheme[] = [
  {
    id: 'dark-default',
    name: 'افتراضي',
    nameEn: 'Default',
    type: 'solid',
    value: '#0F172A',
    darkValue: '#0F172A'
  },
  {
    id: 'dark-slate',
    name: 'كحلي',
    nameEn: 'Slate',
    type: 'solid',
    value: '#1E293B',
    darkValue: '#1E293B'
  },
  {
    id: 'dark-custom',
    name: 'مخصص',
    nameEn: 'Custom',
    type: 'solid',
    value: '#0F172A',
    darkValue: '#0F172A'
  }
]

const STORAGE_KEY_PRIMARY = 'madina-theme-color'
const STORAGE_KEY_TEXT = 'madina-text-color'
const STORAGE_KEY_HEADER_RADIUS = 'madina-header-radius'
const STORAGE_KEY_BACKGROUND = 'madina-background'
const STORAGE_KEY_BACKGROUND_DARK = 'madina-background-dark'
const STORAGE_KEY_FONT = 'madina-font-family'
const STORAGE_KEY_HEADER_STYLE = 'madina-header-style'
const STORAGE_KEY_HERO_SLIDER_STYLE = 'madina-hero-slider-style'
const STORAGE_KEY_ROOM_CARD_STYLE = 'madina-room-card-style'
const STORAGE_KEY_TESTIMONIAL_CARD_STYLE = 'madina-testimonial-card-style'
const STORAGE_KEY_PARTNERS_STYLE = 'madina-partners-style'
const STORAGE_KEY_ADDITIONAL_SERVICES_STYLE = 'madina-additional-services-style'
const STORAGE_KEY_SERVICE_CARD_STYLE = 'madina-service-card-style'
const STORAGE_KEY_GALLERY_SLIDER_STYLE = 'madina-gallery-slider-style'
const STORAGE_KEY_CONTACT_FORM_STYLE = 'madina-contact-form-style'
const STORAGE_KEY_IDENTITY = 'madina-identity-theme'

const fontThemes: FontTheme[] = [
  {
    id: 'default',
    name: 'الافتراضي',
    nameEn: 'Default',
    fontFamily: "'Almarai', 'Tajawal', 'Inter', sans-serif",
    arabicFont: "'Almarai', sans-serif",
    englishFont: "'Inter', sans-serif",
    headingFont: "'Almarai', sans-serif"
  },
  {
    id: 'tajawal',
    name: 'تاجوال',
    nameEn: 'Tajawal',
    fontFamily: "'Tajawal', 'Almarai', 'Inter', sans-serif",
    arabicFont: "'Tajawal', sans-serif",
    englishFont: "'Inter', sans-serif",
    headingFont: "'Tajawal', sans-serif"
  },
  {
    id: 'cairo',
    name: 'القاهرة',
    nameEn: 'Cairo',
    fontFamily: "'Cairo', 'Almarai', 'Inter', sans-serif",
    arabicFont: "'Cairo', sans-serif",
    englishFont: "'Inter', sans-serif",
    headingFont: "'Cairo', sans-serif"
  },
  {
    id: 'amiri',
    name: 'أميري',
    nameEn: 'Amiri',
    fontFamily: "'Amiri', 'Almarai', 'Inter', sans-serif",
    arabicFont: "'Amiri', sans-serif",
    englishFont: "'Inter', sans-serif",
    headingFont: "'Amiri', sans-serif"
  },
  {
    id: 'noto',
    name: 'نوتو',
    nameEn: 'Noto Sans',
    fontFamily: "'Noto Sans Arabic', 'Noto Sans', 'Inter', sans-serif",
    arabicFont: "'Noto Sans Arabic', sans-serif",
    englishFont: "'Noto Sans', sans-serif",
    headingFont: "'Noto Sans Arabic', sans-serif"
  }
]

const headerStyles: HeaderStyle[] = [
  {
    id: 'default',
    name: 'افتراضي',
    nameEn: 'Default',
    width: 'container'
  },
  {
    id: 'wide',
    name: 'عريض',
    nameEn: 'Wide',
    width: 'full'
  }
]

const heroSliderStyles: HeroSliderStyle[] = [
  {
    id: 'default',
    name: 'افتراضي',
    nameEn: 'Default',
    type: 'arrows',
    effect: 'slide'
  },
  {
    id: 'dots',
    name: 'نقطي',
    nameEn: 'Dots',
    type: 'dots',
    effect: 'fade'
  }
]

const roomCardStyles: RoomCardStyle[] = [
  {
    id: 'default',
    name: 'افتراضي',
    nameEn: 'Default',
    type: 'default'
  },
  {
    id: 'simple',
    name: 'بسيط',
    nameEn: 'Simple',
    type: 'simple'
  }
]

const testimonialCardStyles: TestimonialCardStyle[] = [
  {
    id: 'default',
    name: 'افتراضي',
    nameEn: 'Default',
    type: 'default'
  },
  {
    id: 'simple',
    name: 'بسيط',
    nameEn: 'Simple',
    type: 'simple'
  }
]

const partnersStyles: PartnersStyle[] = [
  {
    id: 'carousel',
    name: 'متداول',
    nameEn: 'Carousel',
    type: 'carousel'
  },
  {
    id: 'grid',
    name: 'شبكي',
    nameEn: 'Grid',
    type: 'grid'
  }
]

const additionalServicesStyles: AdditionalServicesStyle[] = [
  {
    id: 'slider',
    name: 'سلايدر',
    nameEn: 'Slider',
    type: 'slider'
  },
  {
    id: 'grid',
    name: 'شبكي',
    nameEn: 'Grid',
    type: 'grid'
  }
]

const serviceCardStyles: ServiceCardStyle[] = [
  {
    id: 'default',
    name: 'افتراضي',
    nameEn: 'Default',
    type: 'default'
  },
  {
    id: 'simple',
    name: 'بسيط',
    nameEn: 'Simple',
    type: 'simple'
  }
]

const gallerySliderStyles: GallerySliderStyle[] = [
  {
    id: 'riyadh',
    name: 'افتراضي',
    nameEn: 'Default',
    type: 'riyadh'
  },
  {
    id: 'madina',
    name: 'مقوس',
    nameEn: 'Arched',
    type: 'madina'
  }
]

const contactFormStyles: ContactFormStyle[] = [
  {
    id: 'default',
    name: 'افتراضي',
    nameEn: 'Default',
    type: 'default'
  },
  {
    id: 'simple',
    name: 'بسيط',
    nameEn: 'Simple',
    type: 'simple'
  }
]

/** Identity theme - primary + light + dark backgrounds at once. */
const identityThemes: IdentityTheme[] = [
  {
    id: 'none',
    name: 'افتراضي',
    nameEn: 'Default',
    primary: '',
    primaryLight: '',
    primaryDark: '',
    secondary: '',
    lightBackground: '',
    darkPrimary: '',
    darkBackground: ''
  },
  {
    id: 'identity-1',
    name: 'الهوية الأولى',
    nameEn: 'Identity 1',
    primary: '#026b3d',
    primaryLight: '#038f52',
    primaryDark: '#01462d',
    secondary: '#038f52',
    lightBackground: '#f9eee1',
    darkPrimary: '#026b3d',
    darkBackground: '#0b1914'
  },
  {
    id: 'identity-2',
    name: 'الهوية الثانية',
    nameEn: 'Identity 2',
    primary: '#3a050f',
    primaryLight: '#5a0818',
    primaryDark: '#2a040b',
    secondary: '#5a0818',
    lightBackground: '#f9eee1',
    darkPrimary: '#3a050f', // Dark mode: same red primary color
    darkBackground: '#1c0707' // Dark mode: darker red background
  },
  {
    id: 'identity-3',
    name: 'الهوية الثالثة',
    nameEn: 'Identity 3',
    primary: '#242625',
    primaryLight: '#3a3d3c',
    primaryDark: '#1a1c1b',
    secondary: '#3a3d3c',
    lightBackground: '#f5f5f5',
    darkPrimary: '#e8eaed',
    darkPrimaryLight: '#242625',
    darkBackground: '#161817'
  },
  {
    id: 'identity-4',
    name: 'الهوية الرابعة',
    nameEn: 'Identity 4',
    primary: '#2c74b9',
    primaryLight: '#4a8fd4',
    primaryDark: '#1e5a8e',
    secondary: '#4a8fd4',
    lightBackground: '#f6f2eb',
    darkPrimary: '#2c74b9',
    darkBackground: '#0f172a'
  }
]

// Helper functions for color manipulation
const lightenColor = (color: string, percent: number): string => {
  const num = parseInt(color.replace('#', ''), 16)
  const r = Math.min(255, (num >> 16) + percent * 2.55)
  const g = Math.min(255, ((num >> 8) & 0x00FF) + percent * 2.55)
  const b = Math.min(255, (num & 0x0000FF) + percent * 2.55)
  return '#' + (0x1000000 + (Math.round(r) * 0x10000) + (Math.round(g) * 0x100) + Math.round(b)).toString(16).slice(1)
}

const darkenColor = (color: string, percent: number): string => {
  const num = parseInt(color.replace('#', ''), 16)
  const r = Math.max(0, (num >> 16) - percent * 2.55)
  const g = Math.max(0, ((num >> 8) & 0x00FF) - percent * 2.55)
  const b = Math.max(0, (num & 0x0000FF) - percent * 2.55)
  return '#' + (0x1000000 + (Math.round(r) * 0x10000) + (Math.round(g) * 0x100) + Math.round(b)).toString(16).slice(1)
}

export default function ThemeSwitcher() {
  const { isArabic } = useTemplateLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const [selectedPrimaryTheme, setSelectedPrimaryTheme] = useState<ColorTheme>(colorThemes[0])
  const [selectedTextTheme, setSelectedTextTheme] = useState<TextColorTheme>(textColorThemes[0])
  const [headerRadius, setHeaderRadius] = useState(16) // Default: 16px (rounded-2xl)
  const [selectedBackground, setSelectedBackground] = useState<BackgroundTheme>(backgroundThemes[0])
  const [selectedDarkBackground, setSelectedDarkBackground] = useState<BackgroundTheme>(darkBackgroundThemes[0])
  const [selectedFont, setSelectedFont] = useState<FontTheme>(fontThemes[0])
  const [selectedHeaderStyle, setSelectedHeaderStyle] = useState<HeaderStyle>(headerStyles[0])
  const [selectedHeroSliderStyle, setSelectedHeroSliderStyle] = useState<HeroSliderStyle>(heroSliderStyles[0])
  const [selectedRoomCardStyle, setSelectedRoomCardStyle] = useState<RoomCardStyle>(roomCardStyles[0])
  const [selectedTestimonialCardStyle, setSelectedTestimonialCardStyle] = useState<TestimonialCardStyle>(testimonialCardStyles[0])
  const [selectedPartnersStyle, setSelectedPartnersStyle] = useState<PartnersStyle>(partnersStyles[0])
  const [selectedAdditionalServicesStyle, setSelectedAdditionalServicesStyle] = useState<AdditionalServicesStyle>(additionalServicesStyles[0])
  const [selectedServiceCardStyle, setSelectedServiceCardStyle] = useState<ServiceCardStyle>(serviceCardStyles[0])
  const [selectedGallerySliderStyle, setSelectedGallerySliderStyle] = useState<GallerySliderStyle>(gallerySliderStyles[0])
  const [selectedContactFormStyle, setSelectedContactFormStyle] = useState<ContactFormStyle>(contactFormStyles[0])
  const [selectedIdentityTheme, setSelectedIdentityTheme] = useState<IdentityTheme>(identityThemes[0])
  const [showCustomPrimaryPicker, setShowCustomPrimaryPicker] = useState(false)
  const [showCustomTextPicker, setShowCustomTextPicker] = useState(false)
  const [showCustomBackgroundPicker, setShowCustomBackgroundPicker] = useState(false)
  const [showCustomDarkBackgroundPicker, setShowCustomDarkBackgroundPicker] = useState(false)
  const [customPrimaryColor, setCustomPrimaryColor] = useState('#A67D5F')
  const [customTextColor, setCustomTextColor] = useState('#4B5563')
  const [customBackgroundColor, setCustomBackgroundColor] = useState('#f5f5f5')
  const [customDarkBackgroundColor, setCustomDarkBackgroundColor] = useState('#0F172A')

  // Update pattern SVG colors
  const updatePatternColors = useCallback((color: string, darkColor?: string) => {
    const isDark = document.documentElement.classList.contains('dark')
    // In dark mode, use dark background color if provided, otherwise use the color
    const patternColor = isDark ? (darkColor || color) : color
    
    // Services section pattern (above Services, below Rooms)
    const servicesPattern = document.querySelector('.madina-services-top-wave path')
    if (servicesPattern) {
      servicesPattern.setAttribute('fill', patternColor)
    }
    
    // Partners section pattern (below Partners, above Testimonials)
    const partnersPattern = document.querySelector('.madina-partners-bottom-wave path')
    if (partnersPattern) {
      partnersPattern.setAttribute('fill', patternColor)
    }
    
    // Footer pattern (above Footer)
    const footerPattern = document.querySelector('.madina-footer-top-wave path')
    if (footerPattern) {
      footerPattern.setAttribute('fill', patternColor)
    }
  }, [])
  
  // Apply background to main element
  const applyBackground = useCallback((bg: BackgroundTheme, darkBg?: BackgroundTheme) => {
    const mainElement = document.querySelector('.template--madina main') as HTMLElement
    if (mainElement) {
      const isDark = document.documentElement.classList.contains('dark')
      // Use dark background if provided and in dark mode, otherwise use light background
      const bgValue = isDark 
        ? (darkBg ? (darkBg.darkValue || darkBg.value) : (bg.darkValue || bg.value))
        : bg.value
      
      // Determine background type based on current mode
      const currentBgType = isDark && darkBg ? darkBg.type : bg.type
      
      if (currentBgType === 'pattern') {
        mainElement.style.background = bgValue
        mainElement.style.backgroundSize = '20px 20px'
      } else {
        mainElement.style.background = bgValue
        mainElement.style.backgroundSize = 'auto'
      }
      
      // Extract solid color from background for patterns
      let solidColor = '#f5f5f5'
      let darkSolidColor = '#0F172A'
      
      if (bg.type === 'solid') {
        solidColor = bg.value
      } else if (bg.type === 'gradient') {
        // Extract first color from gradient
        const match = bg.value.match(/#[0-9A-Fa-f]{6}/)
        if (match) solidColor = match[0]
      }
      
      // Extract dark background color for patterns
      if (darkBg) {
        if (darkBg.type === 'solid') {
          darkSolidColor = darkBg.darkValue || darkBg.value
        } else if (darkBg.type === 'gradient') {
          // Extract first color from gradient
          const match = (darkBg.darkValue || darkBg.value).match(/#[0-9A-Fa-f]{6}/)
          if (match) darkSolidColor = match[0]
        }
      } else if (bg.darkValue) {
        // Fallback to bg's darkValue
        if (bg.type === 'solid') {
          darkSolidColor = bg.darkValue
        } else {
          const match = bg.darkValue.match(/#[0-9A-Fa-f]{6}/)
          if (match) darkSolidColor = match[0]
        }
      }
      
      // Update CSS variable for pattern colors
      const root = document.documentElement
      const patternColor = isDark ? darkSolidColor : solidColor
      root.style.setProperty('--madina-background-color', patternColor)
      
      // Update all pattern SVGs
      updatePatternColors(solidColor, darkSolidColor)
    }
  }, [updatePatternColors])

  // Apply dark identity colors for clear text/icons in dark mode
  const applyIdentityDarkPrimaryStyle = useCallback((theme: IdentityTheme) => {
    let styleEl = document.getElementById('madina-dark-identity-primary') as HTMLStyleElement | null
    if (!styleEl) {
      styleEl = document.createElement('style')
      styleEl.id = 'madina-dark-identity-primary'
      document.head.appendChild(styleEl)
    }
    // If theme is 'none' (default) we still want white identity text/icons in dark mode.
    if (theme.id === 'none') {
      styleEl.textContent = `
        .dark {
          --madina-identity-text-color: #FFFFFF !important;
          --madina-identity-icon-color: #FFFFFF !important;
          --madina-partners-logo-filter: brightness(0) invert(1) !important;
          --madina-room-button-primary: var(--madina-background-color) !important;
          --madina-room-button-light: var(--madina-background-color) !important;
          --madina-booking-modal-bg: #0F172A !important;
          --madina-bg-primary: #0F172A !important;
          --madina-background-color: #0F172A !important;
        }
      `
      return
    }
    if (!theme.darkPrimary) {
      styleEl.textContent = ''
      return
    }
    const darkPrimary = theme.darkPrimary
    const darkPrimaryLight = 
      theme.id === 'identity-3'
        ? '#242625' // Identity 3: use #242625 for room buttons
        : lightenColor(darkPrimary, 8)
    const darkPrimaryDark = darkenColor(darkPrimary, 6)
    const sectionBg =
      theme.id === 'identity-2'
        ? `--madina-primary-section-bg: ${darkPrimary} !important;` // Identity 2: use primary for footer
        : theme.id === 'identity-3'
          ? `--madina-primary-section-bg: #242625 !important;` // Identity 3: use same as contact form
          : ''
    
    // Use darkBackground as primary3 for identity-2,
    // #242625 for identity-3, and custom dark bg for identity-1
    const primary3Value = 
      theme.id === 'identity-2'
        ? theme.darkBackground
        : theme.id === 'identity-3'
          ? '#242625'
          : theme.id === 'identity-1'
            ? '#0b1914'
            : '#1e293bf2'
    
    // Contact form background and button colors in dark mode
    const contactFormBg = 
      theme.id === 'identity-3'
        ? `--madina-contact-form-bg: #242625 !important;
           --madina-contact-button-text: #242625 !important;
           --madina-contact-button-bg: ${theme.lightBackground} !important;
           --madina-contact-icon-color: #242625 !important;`
        : theme.id === 'identity-2'
          ? `--madina-contact-button-text: ${theme.primary} !important;
             --madina-contact-button-bg: ${theme.lightBackground} !important;`
          : ''
    
    // Partners section background: identity-3 uses #242625 in dark mode with higher opacity and white logos
    const partnersBg = 
      theme.id === 'identity-3'
        ? `--madina-partners-bg: #242625 !important;
           --madina-partners-opacity: 0.85 !important;
           --madina-partners-logo-filter: brightness(0) invert(1) !important;`
        : theme.id === 'identity-2'
          ? `--madina-partners-bg: ${theme.primaryLight} !important;
             --madina-partners-opacity: 1 !important;
             --madina-partners-logo-filter: brightness(0) invert(1) !important;`
          : (theme.id === 'identity-1' || theme.id === 'identity-4')
            ? `--madina-partners-logo-filter: brightness(0) invert(1) !important;`
            : ''
    
    // Room buttons: use a gradient in dark mode based on the identity dark background
    const roomButtonColors = (() => {
      if (!(theme.id === 'identity-1' || theme.id === 'identity-2' || theme.id === 'identity-3' || theme.id === 'identity-4' || theme.id === 'none')) return ''
      // Use explicit values for identity-3 to keep previous look
      if (theme.id === 'identity-3') {
        return `--madina-room-button-primary: #242625 !important;
                --madina-room-button-light: #3a3d3c !important;`
      }
      // Prefer darkBackground, then customDarkBackgroundColor (user-picked), then primary, then fallback
      const primaryColor = theme.darkBackground || customDarkBackgroundColor || theme.primary || '#0F172A'
      const lightColor = lightenColor(primaryColor, 12)
      return `--madina-room-button-primary: ${primaryColor} !important;
              --madina-room-button-light: ${lightColor} !important;`
    })()
    
    // Settings button: identity-3 uses #242625 in dark mode
    const settingsButtonColor = 
      theme.id === 'identity-3'
        ? '--madina-settings-button-bg: #242625 !important;'
        : ''
    
    // Footer wave color: use darkBackground for identity-1, identity-2 and identity-3
    const footerWaveColor = 
      (theme.id === 'identity-1' || theme.id === 'identity-2' || theme.id === 'identity-3')
        ? `--madina-footer-wave-color: ${theme.darkBackground} !important;`
        : ''
    
    // Room card background in dark mode: identity-3 uses #242625
    const roomCardBg = theme.id === 'identity-3'
      ? `--madina-room-card-bg: #242625 !important;`
      : ''
    
    // Logo color: identity-1 and identity-2 use white in dark mode (logo after scroll)
    const logoColor = 
      (theme.id === 'identity-2' || theme.id === 'identity-1')
        ? '--madina-logo-color: #FFFFFF !important;'
        : ''
    
    // Header text color: empty for now (handled by other variables)
    const headerTextColor = ''
    
    // Identity 2, 3, 1, 4 and default: White text/icons in dark mode for rooms and titles
    const identityTextColor = 
      (theme.id === 'identity-2' || theme.id === 'identity-3' || theme.id === 'identity-1' || theme.id === 'identity-4' || theme.id === 'none')
        ? `--madina-identity-text-color: #FFFFFF !important;
           --madina-identity-icon-color: #FFFFFF !important;`
        : ''
    
    // Identity 3: Same testimonial card color for all (footer color)
    const testimonialColors = 
      theme.id === 'identity-3'
        ? `--madina-testimonial-odd-bg: #242625 !important;
           --madina-testimonial-even-bg: #242625 !important;`
        : ''
    
    // Identity 2: ensure testimonial text and name are white in dark mode
    // also set testimonial navigation/button background to white in dark
    const identity2TestimonialText = 
      theme.id === 'identity-2'
        ? `--madina-testimonial-text-color: #FFFFFF !important;
           --madina-testimonial-name-color: #FFFFFF !important;
           --madina-testimonial-nav-bg: #FFFFFF !important;
           --madina-nav-color: #FFFFFF !important;
           --madina-nav-hover-color: #FFFFFF !important;`
        : ''
    
    // Header border color: identity-2 uses white for active links
    const headerBorderColor = 
      theme.id === 'identity-2'
        ? '--madina-header-border-color: #FFFFFF !important;'
        : ''

    // Navigation buttons color for services/testimonials: identity-1 and identity-4 use white in dark mode
    const navColor =
      (theme.id === 'identity-1' || theme.id === 'identity-4')
        ? '--madina-nav-color: #FFFFFF !important; --madina-nav-hover-color: #FFFFFF !important;'
        : ''
    
    // Booking modal background for dark mode: prefer darkBackground, then darkPrimary, then primary
    const bookingModalBg = theme.darkBackground || theme.darkPrimary || theme.primary || 'var(--madina-bg-primary)'
    const darkBgForTemplate = theme.darkBackground || darkPrimary || '#0F172A'
    
    styleEl.textContent = `
      .dark {
        --madina-primary: ${darkPrimary} !important;
        --madina-primary-light: ${darkPrimaryLight} !important;
        --madina-primary-dark: ${darkPrimaryDark} !important;
        --madina-secondary: ${darkPrimary} !important;
        --madina-primary3: ${primary3Value} !important;
        --madina-booking-modal-bg: ${bookingModalBg} !important;
        --madina-bg-primary: ${darkBgForTemplate} !important;
        --madina-background-color: ${darkBgForTemplate} !important;
        ${sectionBg}
        ${contactFormBg}
        ${partnersBg}
        ${roomButtonColors}
        ${settingsButtonColor}
        ${headerTextColor}
        ${identityTextColor}
        ${footerWaveColor}
        ${roomCardBg}
        ${logoColor}
        ${headerBorderColor}
        ${navColor}
        ${testimonialColors}
        ${identity2TestimonialText}
      }
    `
  }, [customDarkBackgroundColor])

  // Load saved themes from localStorage on mount
  useEffect(() => {
    const savedPrimaryId = localStorage.getItem(STORAGE_KEY_PRIMARY)
    const savedTextId = localStorage.getItem(STORAGE_KEY_TEXT)
    const savedRadius = localStorage.getItem(STORAGE_KEY_HEADER_RADIUS)
    const savedBackgroundId = localStorage.getItem(STORAGE_KEY_BACKGROUND)
    const savedFontId = localStorage.getItem(STORAGE_KEY_FONT)
    const savedHeaderStyleId = localStorage.getItem(STORAGE_KEY_HEADER_STYLE)
    const savedHeroSliderStyleId = localStorage.getItem(STORAGE_KEY_HERO_SLIDER_STYLE)
    const savedRoomCardStyleId = localStorage.getItem(STORAGE_KEY_ROOM_CARD_STYLE)
    const savedTestimonialCardStyleId = localStorage.getItem(STORAGE_KEY_TESTIMONIAL_CARD_STYLE)
    const savedPartnersStyleId = localStorage.getItem(STORAGE_KEY_PARTNERS_STYLE)
    const savedAdditionalServicesStyleId = localStorage.getItem(STORAGE_KEY_ADDITIONAL_SERVICES_STYLE)
    const savedServiceCardStyleId = localStorage.getItem(STORAGE_KEY_SERVICE_CARD_STYLE)
    const savedGallerySliderStyleId = localStorage.getItem(STORAGE_KEY_GALLERY_SLIDER_STYLE)
    const savedContactFormStyleId = localStorage.getItem(STORAGE_KEY_CONTACT_FORM_STYLE)
    
    if (savedPrimaryId) {
      if (savedPrimaryId === 'custom') {
        const customColor = localStorage.getItem('madina-custom-primary') || '#A67D5F'
        setCustomPrimaryColor(customColor)
        const root = document.documentElement
        root.style.setProperty('--madina-primary', customColor)
        const light = lightenColor(customColor, 20)
        const dark = darkenColor(customColor, 20)
        root.style.setProperty('--madina-primary-light', light)
        root.style.setProperty('--madina-primary-dark', dark)
      } else {
        const theme = colorThemes.find(t => t.id === savedPrimaryId)
        if (theme) {
          setSelectedPrimaryTheme(theme)
          applyPrimaryTheme(theme)
        }
      }
    } else {
      applyPrimaryTheme(colorThemes[0])
    }

    if (savedTextId) {
      if (savedTextId === 'custom') {
        const customColor = localStorage.getItem('madina-custom-text') || '#4B5563'
        setCustomTextColor(customColor)
        const root = document.documentElement
        root.style.setProperty('--madina-text-body', customColor)
      } else {
        const theme = textColorThemes.find(t => t.id === savedTextId)
        if (theme) {
          setSelectedTextTheme(theme)
          applyTextTheme(theme)
        }
      }
    } else {
      applyTextTheme(textColorThemes[0])
    }

    if (savedRadius) {
      const radius = parseInt(savedRadius, 10)
      setHeaderRadius(radius)
      applyHeaderRadius(radius)
    } else {
      applyHeaderRadius(16)
    }

    if (savedBackgroundId) {
      if (savedBackgroundId === 'custom') {
        const customBg = localStorage.getItem('madina-custom-background') || '#f5f5f5'
        setCustomBackgroundColor(customBg)
        const mainElement = document.querySelector('.template--madina main') as HTMLElement
        if (mainElement) {
          mainElement.style.background = customBg
          mainElement.style.backgroundSize = 'auto'
          const root = document.documentElement
          const isDark = document.documentElement.classList.contains('dark')
          const patternColor = isDark ? '#0F172A' : customBg
          root.style.setProperty('--madina-background-color', patternColor)
          // Wait for DOM to be ready
          setTimeout(() => updatePatternColors(customBg, customDarkBackgroundColor), 100)
        }
      } else {
        const bg = backgroundThemes.find(b => b.id === savedBackgroundId)
        if (bg) {
          setSelectedBackground(bg)
          // Will be applied with dark background below
        }
      }
    }

    // Load dark background
    const savedDarkBackgroundId = localStorage.getItem(STORAGE_KEY_BACKGROUND_DARK)
    if (savedDarkBackgroundId) {
      if (savedDarkBackgroundId === 'custom' || savedDarkBackgroundId === 'dark-custom') {
        const customDarkBg = localStorage.getItem('madina-custom-dark-background') || '#0F172A'
        setCustomDarkBackgroundColor(customDarkBg)
        setSelectedDarkBackground(darkBackgroundThemes[2]) // Set to custom option
      } else {
        const darkBg = darkBackgroundThemes.find(b => b.id === savedDarkBackgroundId)
        if (darkBg) {
          setSelectedDarkBackground(darkBg)
        }
      }
    }

    // Apply backgrounds after loading
    const lightBg = savedBackgroundId && savedBackgroundId !== 'custom'
      ? backgroundThemes.find(b => b.id === savedBackgroundId) || backgroundThemes[0]
      : backgroundThemes[0]
    
    let darkBg: BackgroundTheme = darkBackgroundThemes[0]
    if (savedDarkBackgroundId) {
      if (savedDarkBackgroundId === 'custom' || savedDarkBackgroundId === 'dark-custom') {
        const customDarkBg = localStorage.getItem('madina-custom-dark-background') || '#0F172A'
        darkBg = {
          id: 'dark-custom',
          name: 'مخصص',
          nameEn: 'Custom',
          type: 'solid',
          value: customDarkBg,
          darkValue: customDarkBg
        }
      } else {
        darkBg = darkBackgroundThemes.find(b => b.id === savedDarkBackgroundId) || darkBackgroundThemes[0]
      }
    }
    applyBackground(lightBg, darkBg)

    // Load saved font
    if (savedFontId) {
      const font = fontThemes.find(f => f.id === savedFontId)
      if (font) {
        setSelectedFont(font)
        applyFontTheme(font)
      }
    } else {
      applyFontTheme(fontThemes[0])
    }

    // Load saved header style
    if (savedHeaderStyleId) {
      const style = headerStyles.find(s => s.id === savedHeaderStyleId)
      if (style) {
        setSelectedHeaderStyle(style)
        applyHeaderStyle(style)
      }
    } else {
      applyHeaderStyle(headerStyles[0])
    }

    // Load saved hero slider style
    if (savedHeroSliderStyleId) {
      const style = heroSliderStyles.find(s => s.id === savedHeroSliderStyleId)
      if (style) {
        setSelectedHeroSliderStyle(style)
        applyHeroSliderStyle(style)
      }
    } else {
      applyHeroSliderStyle(heroSliderStyles[0])
    }

    // Load saved room card style
    if (savedRoomCardStyleId) {
      const style = roomCardStyles.find(s => s.id === savedRoomCardStyleId)
      if (style) {
        setSelectedRoomCardStyle(style)
        applyRoomCardStyle(style)
      }
    } else {
      applyRoomCardStyle(roomCardStyles[0])
    }

    // Load saved testimonial card style
    if (savedTestimonialCardStyleId) {
      const style = testimonialCardStyles.find(s => s.id === savedTestimonialCardStyleId)
      if (style) {
        setSelectedTestimonialCardStyle(style)
        applyTestimonialCardStyle(style)
      }
    } else {
      applyTestimonialCardStyle(testimonialCardStyles[0])
    }

    // Load saved partners style
    if (savedPartnersStyleId) {
      const style = partnersStyles.find(s => s.id === savedPartnersStyleId)
      if (style) {
        setSelectedPartnersStyle(style)
        applyPartnersStyle(style)
      }
    } else {
      applyPartnersStyle(partnersStyles[0])
    }

    // Load saved additional services style
    if (savedAdditionalServicesStyleId) {
      const style = additionalServicesStyles.find(s => s.id === savedAdditionalServicesStyleId)
      if (style) {
        setSelectedAdditionalServicesStyle(style)
        applyAdditionalServicesStyle(style)
      }
    } else {
      applyAdditionalServicesStyle(additionalServicesStyles[0])
    }

    // Load saved service card style
    if (savedServiceCardStyleId) {
      const style = serviceCardStyles.find(s => s.id === savedServiceCardStyleId)
      if (style) {
        setSelectedServiceCardStyle(style)
        applyServiceCardStyle(style)
      }
    } else {
      applyServiceCardStyle(serviceCardStyles[0])
    }

    // Load saved gallery slider style
    if (savedGallerySliderStyleId) {
      const style = gallerySliderStyles.find(s => s.id === savedGallerySliderStyleId)
      if (style) {
        setSelectedGallerySliderStyle(style)
        applyGallerySliderStyle(style)
      }
    } else {
      applyGallerySliderStyle(gallerySliderStyles[0])
    }

    // Load saved contact form style
    if (savedContactFormStyleId) {
      const style = contactFormStyles.find(s => s.id === savedContactFormStyleId)
      if (style) {
        setSelectedContactFormStyle(style)
        applyContactFormStyle(style)
      }
    } else {
      applyContactFormStyle(contactFormStyles[0])
    }

    // Load saved identity theme after colors/background
    const savedIdentityId = localStorage.getItem(STORAGE_KEY_IDENTITY)
    if (savedIdentityId) {
      const identity = identityThemes.find(t => t.id === savedIdentityId)
      if (identity) {
        setSelectedIdentityTheme(identity)
        applyIdentityDarkPrimaryStyle(identity)
        if (identity.id !== 'none') {
          const root = document.documentElement
          root.style.setProperty('--madina-primary', identity.primary)
          root.style.setProperty('--madina-primary-light', identity.primaryLight)
          root.style.setProperty('--madina-primary-dark', identity.primaryDark)
          root.style.setProperty('--madina-secondary', identity.secondary)
          const identityBg: BackgroundTheme = {
            id: 'identity',
            name: '',
            nameEn: '',
            type: 'solid',
            value: identity.lightBackground,
            darkValue: identity.darkBackground
          }
          applyBackground(identityBg, identityBg)
          updatePatternColors(identity.lightBackground, identity.darkBackground)
          
          // Contact button colors for identity-2 and identity-3
          if (identity.id === 'identity-2' || identity.id === 'identity-3') {
            root.style.setProperty('--madina-contact-button-text', identity.primary)
            root.style.setProperty('--madina-contact-button-bg', identity.lightBackground)
          }
        }
      }
     } else {
      // Apply default identity dark styles (white text/icons in dark mode)
      applyIdentityDarkPrimaryStyle(identityThemes[0])
    }
  }, [applyBackground, updatePatternColors, customDarkBackgroundColor, applyIdentityDarkPrimaryStyle])

  // Apply primary theme to CSS variables
  const applyPrimaryTheme = (theme: ColorTheme) => {
    const root = document.documentElement
    root.style.setProperty('--madina-primary', theme.primary)
    root.style.setProperty('--madina-primary-light', theme.primaryLight)
    root.style.setProperty('--madina-primary-dark', theme.primaryDark)
    root.style.setProperty('--madina-secondary', theme.secondary)
  }

  // Apply identity theme (primary + light + dark at once)
  const applyIdentityTheme = useCallback((theme: IdentityTheme) => {
    if (theme.id === 'none') {
      applyIdentityDarkPrimaryStyle(theme)
      applyPrimaryTheme(selectedPrimaryTheme)
      applyBackground(selectedBackground, selectedDarkBackground)
      return
    }
    const root = document.documentElement
    root.style.setProperty('--madina-primary', theme.primary)
    root.style.setProperty('--madina-primary-light', theme.primaryLight)
    root.style.setProperty('--madina-primary-dark', theme.primaryDark)
    root.style.setProperty('--madina-secondary', theme.secondary)
    
    // Set primary3 for light mode (header after scroll)
    // All identities use white in light mode
    const lightPrimary3 = '#FFFFFF'
    root.style.setProperty('--madina-primary3', lightPrimary3)
    
    applyIdentityDarkPrimaryStyle(theme)
    const identityBg: BackgroundTheme = {
      id: 'identity',
      name: '',
      nameEn: '',
      type: 'solid',
      value: theme.lightBackground,
      darkValue: theme.darkBackground
    }
    applyBackground(identityBg, identityBg)
    updatePatternColors(theme.lightBackground, theme.darkBackground)
    
    // Contact form submit: light bg + dark text for identity-2 and identity-3
    if (theme.id === 'identity-3' || theme.id === 'identity-2') {
      root.style.setProperty('--madina-contact-button-text', theme.primary)
      root.style.setProperty('--madina-contact-button-bg', theme.lightBackground)
    } else {
      root.style.removeProperty('--madina-contact-button-text')
      root.style.removeProperty('--madina-contact-button-bg')
    }
  }, [selectedPrimaryTheme, selectedBackground, selectedDarkBackground, applyBackground, updatePatternColors, applyIdentityDarkPrimaryStyle])

  // Apply text theme to CSS variables
  const applyTextTheme = (theme: TextColorTheme) => {
    const root = document.documentElement
    root.style.setProperty('--madina-text-body', theme.color)
    
    // Update dark mode color using style tag
    let darkModeStyle = document.getElementById('madina-dark-text-color')
    if (!darkModeStyle) {
      darkModeStyle = document.createElement('style')
      darkModeStyle.id = 'madina-dark-text-color'
      document.head.appendChild(darkModeStyle)
    }
    darkModeStyle.textContent = `
      .dark {
        --madina-text-body: ${theme.darkColor} !important;
      }
    `
  }

  // Apply font theme to CSS variables
  const applyFontTheme = (theme: FontTheme) => {
    const root = document.documentElement
    root.style.setProperty('--madina-font-family', theme.fontFamily)
    if (theme.arabicFont) {
      root.style.setProperty('--madina-font-family-arabic', theme.arabicFont)
    }
    if (theme.englishFont) {
      root.style.setProperty('--madina-font-family-english', theme.englishFont)
    }
    if (theme.headingFont) {
      root.style.setProperty('--madina-font-family-heading', theme.headingFont)
    }
  }

  // Handle primary theme selection
  const handlePrimaryThemeSelect = (theme: ColorTheme) => {
    setSelectedPrimaryTheme(theme)
    applyPrimaryTheme(theme)
    localStorage.setItem(STORAGE_KEY_PRIMARY, theme.id)
  }

  // Handle text theme selection
  const handleTextThemeSelect = (theme: TextColorTheme) => {
    setSelectedTextTheme(theme)
    applyTextTheme(theme)
    localStorage.setItem(STORAGE_KEY_TEXT, theme.id)
  }

  // Apply header border radius to CSS variable
  const applyHeaderRadius = (radius: number) => {
    const root = document.documentElement
    root.style.setProperty('--madina-header-radius', `${radius}px`)
  }

  // Handle header radius change
  const handleHeaderRadiusChange = (radius: number) => {
    setHeaderRadius(radius)
    applyHeaderRadius(radius)
    localStorage.setItem(STORAGE_KEY_HEADER_RADIUS, radius.toString())
  }

  // Handle identity theme selection
  const handleIdentitySelect = (theme: IdentityTheme) => {
    setSelectedIdentityTheme(theme)
    applyIdentityTheme(theme)
    localStorage.setItem(STORAGE_KEY_IDENTITY, theme.id)
  }

  // Handle background theme selection
  const handleBackgroundSelect = (bg: BackgroundTheme) => {
    setSelectedBackground(bg)
    applyBackground(bg, selectedDarkBackground)
    localStorage.setItem(STORAGE_KEY_BACKGROUND, bg.id)
  }

  // Handle dark background theme selection
  const handleDarkBackgroundSelect = (bg: BackgroundTheme) => {
    setSelectedDarkBackground(bg)
    
    // If custom option is selected, use the custom color
    if (bg.id === 'dark-custom') {
      const customColor = customDarkBackgroundColor
      const customDarkBg: BackgroundTheme = {
        id: 'dark-custom',
        name: 'مخصص',
        nameEn: 'Custom',
        type: 'solid',
        value: customColor,
        darkValue: customColor
      }
      applyBackground(selectedBackground, customDarkBg)
      localStorage.setItem(STORAGE_KEY_BACKGROUND_DARK, 'dark-custom')
    } else {
      // Apply background immediately - applyBackground will check the current mode
      applyBackground(selectedBackground, bg)
      localStorage.setItem(STORAGE_KEY_BACKGROUND_DARK, bg.id)
    }
  }

  // Handle font theme selection
  const handleFontSelect = (font: FontTheme) => {
    setSelectedFont(font)
    applyFontTheme(font)
    localStorage.setItem(STORAGE_KEY_FONT, font.id)
  }

  // Apply header style to CSS variable
  const applyHeaderStyle = (style: HeaderStyle) => {
    const root = document.documentElement
    root.style.setProperty('--madina-header-width', style.width === 'full' ? '100%' : 'container')
    // Dispatch custom event to notify Header component
    window.dispatchEvent(new CustomEvent('madina-header-style-changed', { detail: style }))
  }

  // Handle header style selection
  const handleHeaderStyleSelect = (style: HeaderStyle) => {
    setSelectedHeaderStyle(style)
    applyHeaderStyle(style)
    localStorage.setItem(STORAGE_KEY_HEADER_STYLE, style.id)
    // Dispatch custom event to notify Header component
    window.dispatchEvent(new CustomEvent('madina-header-style-changed', { detail: style }))
  }

  // Apply hero slider style
  const applyHeroSliderStyle = (style: HeroSliderStyle) => {
    const root = document.documentElement
    root.style.setProperty('--madina-hero-slider-type', style.type)
    root.style.setProperty('--madina-hero-slider-effect', style.effect || 'slide')
    // Dispatch custom event to notify Hero component
    window.dispatchEvent(new CustomEvent('madina-hero-slider-style-changed', { detail: style }))
  }

  // Handle hero slider style selection
  const handleHeroSliderStyleSelect = (style: HeroSliderStyle) => {
    setSelectedHeroSliderStyle(style)
    applyHeroSliderStyle(style)
    localStorage.setItem(STORAGE_KEY_HERO_SLIDER_STYLE, style.id)
    // Dispatch custom event to notify Hero component
    window.dispatchEvent(new CustomEvent('madina-hero-slider-style-changed', { detail: style }))
  }

  // Apply room card style
  const applyRoomCardStyle = (style: RoomCardStyle) => {
    const root = document.documentElement
    root.style.setProperty('--madina-room-card-type', style.type)
    // Dispatch custom event to notify Rooms component
    window.dispatchEvent(new CustomEvent('madina-room-card-style-changed', { detail: style }))
  }

  // Handle room card style selection
  const handleRoomCardStyleSelect = (style: RoomCardStyle) => {
    setSelectedRoomCardStyle(style)
    applyRoomCardStyle(style)
    localStorage.setItem(STORAGE_KEY_ROOM_CARD_STYLE, style.id)
    // Dispatch custom event to notify Rooms component
    window.dispatchEvent(new CustomEvent('madina-room-card-style-changed', { detail: style }))
  }

  // Apply testimonial card style
  const applyTestimonialCardStyle = (style: TestimonialCardStyle) => {
    const root = document.documentElement
    root.style.setProperty('--madina-testimonial-card-type', style.type)
    // Dispatch custom event to notify Testimonials component
    window.dispatchEvent(new CustomEvent('madina-testimonial-card-style-changed', { detail: style }))
  }

  // Handle testimonial card style selection
  const handleTestimonialCardStyleSelect = (style: TestimonialCardStyle) => {
    setSelectedTestimonialCardStyle(style)
    applyTestimonialCardStyle(style)
    localStorage.setItem(STORAGE_KEY_TESTIMONIAL_CARD_STYLE, style.id)
    // Dispatch custom event to notify Testimonials component
    window.dispatchEvent(new CustomEvent('madina-testimonial-card-style-changed', { detail: style }))
  }

  // Apply partners style
  const applyPartnersStyle = (style: PartnersStyle) => {
    const root = document.documentElement
    root.style.setProperty('--madina-partners-type', style.type)
    // Dispatch custom event to notify Partners component
    window.dispatchEvent(new CustomEvent('madina-partners-style-changed', { detail: style }))
  }

  // Handle partners style selection
  const handlePartnersStyleSelect = (style: PartnersStyle) => {
    setSelectedPartnersStyle(style)
    applyPartnersStyle(style)
    localStorage.setItem(STORAGE_KEY_PARTNERS_STYLE, style.id)
    // Dispatch custom event to notify Partners component
    window.dispatchEvent(new CustomEvent('madina-partners-style-changed', { detail: style }))
  }

  // Apply additional services style
  const applyAdditionalServicesStyle = (style: AdditionalServicesStyle) => {
    const root = document.documentElement
    root.style.setProperty('--madina-additional-services-type', style.type)
    // Dispatch custom event to notify AdditionalServices component
    window.dispatchEvent(new CustomEvent('madina-additional-services-style-changed', { detail: style }))
  }

  // Handle additional services style selection
  const handleAdditionalServicesStyleSelect = (style: AdditionalServicesStyle) => {
    setSelectedAdditionalServicesStyle(style)
    applyAdditionalServicesStyle(style)
    localStorage.setItem(STORAGE_KEY_ADDITIONAL_SERVICES_STYLE, style.id)
    // Dispatch custom event to notify AdditionalServices component
    window.dispatchEvent(new CustomEvent('madina-additional-services-style-changed', { detail: style }))
  }

  // Apply service card style
  const applyServiceCardStyle = (style: ServiceCardStyle) => {
    const root = document.documentElement
    root.style.setProperty('--madina-service-card-type', style.type)
    // Dispatch custom event to notify Services component
    window.dispatchEvent(new CustomEvent('madina-service-card-style-changed', { detail: style }))
  }

  // Handle service card style selection
  const handleServiceCardStyleSelect = (style: ServiceCardStyle) => {
    setSelectedServiceCardStyle(style)
    applyServiceCardStyle(style)
    localStorage.setItem(STORAGE_KEY_SERVICE_CARD_STYLE, style.id)
    // Dispatch custom event to notify Services component
    window.dispatchEvent(new CustomEvent('madina-service-card-style-changed', { detail: style }))
  }

  // Apply gallery slider style
  const applyGallerySliderStyle = (style: GallerySliderStyle) => {
    const root = document.documentElement
    root.style.setProperty('--madina-gallery-slider-type', style.type)
    // Dispatch custom event to notify GallerySlider component
    window.dispatchEvent(new CustomEvent('madina-gallery-slider-style-changed', { detail: style }))
  }

  // Handle gallery slider style selection
  const handleGallerySliderStyleSelect = (style: GallerySliderStyle) => {
    setSelectedGallerySliderStyle(style)
    applyGallerySliderStyle(style)
    localStorage.setItem(STORAGE_KEY_GALLERY_SLIDER_STYLE, style.id)
    // Dispatch custom event to notify GallerySlider component
    window.dispatchEvent(new CustomEvent('madina-gallery-slider-style-changed', { detail: style }))
  }

  // Apply contact form style
  const applyContactFormStyle = (style: ContactFormStyle) => {
    const root = document.documentElement
    root.style.setProperty('--madina-contact-form-type', style.type)
    // Dispatch custom event to notify Contact component
    window.dispatchEvent(new CustomEvent('madina-contact-form-style-changed', { detail: style }))
  }

  // Handle contact form style selection
  const handleContactFormStyleSelect = (style: ContactFormStyle) => {
    setSelectedContactFormStyle(style)
    applyContactFormStyle(style)
    localStorage.setItem(STORAGE_KEY_CONTACT_FORM_STYLE, style.id)
    // Dispatch custom event to notify Contact component
    window.dispatchEvent(new CustomEvent('madina-contact-form-style-changed', { detail: style }))
  }

  // Watch for dark mode changes to update background and patterns
  useEffect(() => {
    const observer = new MutationObserver(() => {
      applyBackground(selectedBackground, selectedDarkBackground)
      // Update patterns when dark mode changes
      const lightPatternColor = selectedBackground.type === 'solid' ? selectedBackground.value : '#f5f5f5'
      let darkPatternColor = '#0F172A'
      
      if (selectedDarkBackground) {
        if (selectedDarkBackground.type === 'solid') {
          darkPatternColor = selectedDarkBackground.darkValue || selectedDarkBackground.value
        } else if (selectedDarkBackground.darkValue) {
          const match = selectedDarkBackground.darkValue.match(/#[0-9A-Fa-f]{6}/)
          if (match) darkPatternColor = match[0]
        }
      }
      
      updatePatternColors(lightPatternColor, darkPatternColor)
    })
    
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    })
    
    return () => observer.disconnect()
  }, [selectedBackground, selectedDarkBackground, applyBackground, updatePatternColors])

  return (
    <FloatingSettingsPanel
      title={isArabic ? 'إعدادات تجربة الاستخدام' : 'UX Settings'}
      open={isOpen}
      onClose={() => setIsOpen(false)}
      onToggle={() => setIsOpen(!isOpen)}
      primaryColor="var(--madina-primary)"
      primaryColorEnd="var(--madina-primary-dark)"
      position={isArabic ? 'left' : 'right'}
      dir={isArabic ? 'rtl' : 'ltr'}
      ariaLabel={isArabic ? 'إعدادات الألوان' : 'Color Settings'}
    >
      <div className="space-y-5">
                {/* Identity Theme Section */}
                <div className="rounded-xl bg-gray-50 dark:bg-gray-800/70 p-4 border border-gray-200/80 dark:border-gray-700/80">
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-1">
                    {isArabic ? 'هوية الموقع' : 'Site Identity'}
                  </h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                    {isArabic ? 'تغيير اللون الأساسي والخلفية (فاتح + دارك) دفعة واحدة' : 'Primary + light/dark backgrounds at once'}
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {identityThemes.map((theme) => {
                      const isSelected = selectedIdentityTheme.id === theme.id
                      return (
                        <button
                          key={theme.id}
                          onClick={() => handleIdentitySelect(theme)}
                          className={`flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all duration-200 hover:scale-[1.02] ${
                            isSelected
                              ? 'border-[var(--madina-primary)] ring-2 ring-[var(--madina-primary)]/30 ring-offset-2 bg-[var(--madina-primary)]/10 dark:bg-[var(--madina-primary)]/20'
                              : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700'
                          }`}
                        >
                          {theme.id === 'none' ? (
                            <>
                              <div className="w-full h-10 rounded border border-gray-300 dark:border-gray-500 flex items-center justify-center text-xs text-gray-600 dark:text-gray-400">
                                {isArabic ? 'افتراضي' : 'Default'}
                              </div>
                              <span className="text-sm font-medium text-gray-700 dark:text-gray-300 text-center">
                                {isArabic ? theme.name : theme.nameEn}
                              </span>
                            </>
                          ) : (
                            <>
                              <div className="w-full h-10 rounded flex gap-0.5 overflow-hidden">
                                <div className="flex-1" style={{ backgroundColor: theme.primary }} title={theme.primary} />
                                <div className="flex-1" style={{ backgroundColor: theme.lightBackground }} title="Light BG" />
                                <div className="flex-1" style={{ backgroundColor: theme.darkBackground }} title="Dark BG" />
                              </div>
                              <span className="text-sm font-medium text-gray-700 dark:text-gray-300 text-center">
                                {isArabic ? theme.name : theme.nameEn}
                              </span>
                            </>
                          )}
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Font Family Section */}
                <div className="rounded-xl bg-gray-50 dark:bg-gray-800/70 p-4 border border-gray-200/80 dark:border-gray-700/80">
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3">
                    {isArabic ? 'الخط' : 'Font Family'}
                  </h4>
                  <div className="grid grid-cols-5 gap-2">
                    {fontThemes.map((font) => {
                      const isSelected = selectedFont.id === font.id
                      return (
                        <button
                          key={font.id}
                          onClick={() => handleFontSelect(font)}
                          className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all duration-200 hover:scale-105 ${
                            isSelected
                              ? 'border-2 border-[var(--madina-primary)] ring-2 ring-[var(--madina-primary)]/30 ring-offset-1 bg-[var(--madina-primary)]/10 dark:bg-[var(--madina-primary)]/20'
                              : 'bg-white dark:bg-gray-800 border-2 border-transparent hover:bg-gray-100 dark:hover:bg-gray-700'
                          }`}
                        >
                          {/* Font Preview */}
                          <div
                            className="w-full h-12 rounded border border-gray-200 dark:border-gray-600 flex items-center justify-center text-xs"
                            style={{ fontFamily: font.fontFamily }}
                          >
                            <span className={isArabic ? 'text-center' : 'text-center'}>
                              {isArabic ? 'أبجد' : 'Aa'}
                            </span>
                          </div>
                          {/* Font Name */}
                          <span className="text-[10px] font-medium text-gray-700 dark:text-gray-300 text-center leading-tight">
                            {isArabic ? font.name : font.nameEn}
                          </span>
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Header Style Section */}
                <div className="rounded-xl bg-gray-50 dark:bg-gray-800/70 p-4 border border-gray-200/80 dark:border-gray-700/80">
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3">
                    {isArabic ? 'شكل الهيدر' : 'Header Style'}
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {headerStyles.map((style) => {
                      const isSelected = selectedHeaderStyle.id === style.id
                      return (
                        <button
                          key={style.id}
                          onClick={() => handleHeaderStyleSelect(style)}
                          className={`flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all duration-200 hover:scale-[1.02] ${
                            isSelected
                              ? 'border-[var(--madina-primary)] ring-2 ring-[var(--madina-primary)]/30 ring-offset-2 bg-[var(--madina-primary)]/10 dark:bg-[var(--madina-primary)]/20'
                              : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700'
                          }`}
                        >
                          {/* Style Preview */}
                          <div className="w-full h-16 rounded border border-gray-300 dark:border-gray-500 flex items-center justify-center relative overflow-hidden">
                            {style.width === 'full' ? (
                              <div className="w-full h-full bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 flex items-center justify-center">
                                <div className="w-full h-8 bg-white dark:bg-gray-800 rounded"></div>
                              </div>
                            ) : (
                              <div className="w-full h-full bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 flex items-center justify-center">
                                <div className="w-3/4 max-w-md h-8 bg-white dark:bg-gray-800 rounded"></div>
                              </div>
                            )}
                          </div>
                          {/* Style Name */}
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300 text-center">
                            {isArabic ? style.name : style.nameEn}
                          </span>
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Hero Slider Style Section */}
                <div className="rounded-xl bg-gray-50 dark:bg-gray-800/70 p-4 border border-gray-200/80 dark:border-gray-700/80">
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3">
                    {isArabic ? 'شكل السلايدر' : 'Hero Slider Style'}
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {heroSliderStyles.map((style) => {
                      const isSelected = selectedHeroSliderStyle.id === style.id
                      return (
                        <button
                          key={style.id}
                          onClick={() => handleHeroSliderStyleSelect(style)}
                          className={`flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all duration-200 hover:scale-[1.02] ${
                            isSelected
                              ? 'border-[var(--madina-primary)] ring-2 ring-[var(--madina-primary)]/30 ring-offset-2 bg-[var(--madina-primary)]/10 dark:bg-[var(--madina-primary)]/20'
                              : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700'
                          }`}
                        >
                          {/* Style Preview */}
                          <div className="w-full h-20 rounded border border-gray-300 dark:border-gray-500 flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800">
                            {style.type === 'dots' ? (
                              <div className="flex items-center justify-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                                <div className="w-3 h-3 rounded-full bg-gray-600 dark:bg-gray-300"></div>
                                <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                              </div>
                            ) : (
                              <div className="flex items-center justify-center gap-8 w-full">
                                <div className="w-8 h-8 rounded-full border-2 border-gray-400 flex items-center justify-center">
                                  <div className="w-0 h-0 border-l-[6px] border-l-gray-600 border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent"></div>
                                </div>
                                <div className="w-8 h-8 rounded-full border-2 border-gray-400 flex items-center justify-center">
                                  <div className="w-0 h-0 border-r-[6px] border-r-gray-600 border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent"></div>
                                </div>
                              </div>
                            )}
                          </div>
                          {/* Style Name */}
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300 text-center">
                            {isArabic ? style.name : style.nameEn}
                          </span>
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Room Card Style Section */}
                <div className="rounded-xl bg-gray-50 dark:bg-gray-800/70 p-4 border border-gray-200/80 dark:border-gray-700/80">
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3">
                    {isArabic ? 'شكل كروت الغرف' : 'Room Cards Style'}
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {roomCardStyles.map((style) => {
                      const isSelected = selectedRoomCardStyle.id === style.id
                      return (
                        <button
                          key={style.id}
                          onClick={() => handleRoomCardStyleSelect(style)}
                          className={`flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all duration-200 hover:scale-[1.02] ${
                            isSelected
                              ? 'border-[var(--madina-primary)] ring-2 ring-[var(--madina-primary)]/30 ring-offset-2 bg-[var(--madina-primary)]/10 dark:bg-[var(--madina-primary)]/20'
                              : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700'
                          }`}
                        >
                          {/* Style Preview */}
                          <div className="w-full h-24 rounded border border-gray-300 dark:border-gray-500 flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800">
                            {style.type === 'simple' ? (
                              <div className="w-full h-full bg-white dark:bg-gray-800 rounded-lg shadow-md flex flex-col items-center justify-center p-2">
                                <div className="w-full h-12 bg-gray-200 dark:bg-gray-600 rounded mb-2"></div>
                                <div className="w-3/4 h-2 bg-gray-300 dark:bg-gray-500 rounded mb-1"></div>
                                <div className="w-1/2 h-2 bg-gray-300 dark:bg-gray-500 rounded"></div>
                              </div>
                            ) : (
                              <div className="w-full h-full bg-white dark:bg-gray-800 rounded-lg shadow-md flex flex-col items-center justify-center p-2 relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-12 bg-gray-200 dark:bg-gray-600"></div>
                                <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-r from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-700 rounded-b-lg"></div>
                                <div className="relative z-10 w-3/4 h-2 bg-gray-300 dark:bg-gray-500 rounded mb-1 mt-14"></div>
                                <div className="relative z-10 w-1/2 h-2 bg-gray-300 dark:bg-gray-500 rounded"></div>
                              </div>
                            )}
                          </div>
                          {/* Style Name */}
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300 text-center">
                            {isArabic ? style.name : style.nameEn}
                          </span>
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Service Card Style Section */}
                <div className="rounded-xl bg-gray-50 dark:bg-gray-800/70 p-4 border border-gray-200/80 dark:border-gray-700/80">
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3">
                    {isArabic ? 'شكل كروت الخدمات' : 'Service Cards Style'}
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {serviceCardStyles.map((style) => {
                      const isSelected = selectedServiceCardStyle.id === style.id
                      return (
                        <button
                          key={style.id}
                          onClick={() => handleServiceCardStyleSelect(style)}
                          className={`flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all duration-200 hover:scale-[1.02] ${
                            isSelected
                              ? 'border-[var(--madina-primary)] ring-2 ring-[var(--madina-primary)]/30 ring-offset-2 bg-[var(--madina-primary)]/10 dark:bg-[var(--madina-primary)]/20'
                              : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700'
                          }`}
                        >
                          {/* Style Preview */}
                          <div className="w-full h-24 rounded border border-gray-300 dark:border-gray-500 flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800">
                            {style.type === 'simple' ? (
                              <div className="w-full h-full bg-white dark:bg-gray-800 rounded-lg shadow-md flex flex-col items-center justify-center p-2">
                                <div className="w-full h-12 bg-gray-200 dark:bg-gray-600 rounded mb-2"></div>
                                <div className="w-3/4 h-2 bg-gray-300 dark:bg-gray-500 rounded mb-1"></div>
                                <div className="w-1/2 h-2 bg-gray-300 dark:bg-gray-500 rounded"></div>
                              </div>
                            ) : (
                              <div className="w-full h-full bg-white dark:bg-gray-800 rounded-lg shadow-md flex flex-col items-center justify-center p-2 relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-12 bg-gray-200 dark:bg-gray-600 rounded-t-lg" style={{ borderRadius: '50% 50% 0 0' }}></div>
                                <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-r from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-700 rounded-b-lg"></div>
                                <div className="relative z-10 w-3/4 h-2 bg-gray-300 dark:bg-gray-500 rounded mb-1 mt-14"></div>
                                <div className="relative z-10 w-1/2 h-2 bg-gray-300 dark:bg-gray-500 rounded"></div>
                              </div>
                            )}
                          </div>
                          {/* Style Name */}
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300 text-center">
                            {isArabic ? style.name : style.nameEn}
                          </span>
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Partners Style Section */}
                <div className="rounded-xl bg-gray-50 dark:bg-gray-800/70 p-4 border border-gray-200/80 dark:border-gray-700/80">
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3">
                    {isArabic ? 'شكل لوغوهات الشركاء' : 'Partners Logos Style'}
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {partnersStyles.map((style) => {
                      const isSelected = selectedPartnersStyle.id === style.id
                      return (
                        <button
                          key={style.id}
                          onClick={() => handlePartnersStyleSelect(style)}
                          className={`flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all duration-200 hover:scale-[1.02] ${
                            isSelected
                              ? 'border-[var(--madina-primary)] ring-2 ring-[var(--madina-primary)]/30 ring-offset-2 bg-[var(--madina-primary)]/10 dark:bg-[var(--madina-primary)]/20'
                              : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700'
                          }`}
                        >
                          {/* Style Preview */}
                          <div className="w-full h-24 rounded border border-gray-300 dark:border-gray-500 flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800">
                            {style.type === 'grid' ? (
                              <div className="w-full h-full bg-white dark:bg-gray-800 rounded-lg shadow-md p-2">
                                <div className="grid grid-cols-3 gap-2 h-full">
                                  {[1, 2, 3, 4, 5, 6].map((i) => (
                                    <div key={i} className="bg-gray-200 dark:bg-gray-600 rounded flex items-center justify-center">
                                      <div className="w-8 h-8 bg-gray-300 dark:bg-gray-500 rounded"></div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            ) : (
                              <div className="w-full h-full bg-white dark:bg-gray-800 rounded-lg shadow-md p-2 flex items-center gap-2 overflow-hidden">
                                <div className="flex-shrink-0 flex gap-2 animate-pulse">
                                  {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="w-12 h-12 bg-gray-200 dark:bg-gray-600 rounded"></div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                          {/* Style Name */}
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300 text-center">
                            {isArabic ? style.name : style.nameEn}
                          </span>
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Additional Services Style Section */}
                <div className="rounded-xl bg-gray-50 dark:bg-gray-800/70 p-4 border border-gray-200/80 dark:border-gray-700/80">
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3">
                    {isArabic ? 'شكل الخدمات الأخرى' : 'Additional Services Style'}
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {additionalServicesStyles.map((style) => {
                      const isSelected = selectedAdditionalServicesStyle.id === style.id
                      return (
                        <button
                          key={style.id}
                          onClick={() => handleAdditionalServicesStyleSelect(style)}
                          className={`flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all duration-200 hover:scale-[1.02] ${
                            isSelected
                              ? 'border-[var(--madina-primary)] ring-2 ring-[var(--madina-primary)]/30 ring-offset-2 bg-[var(--madina-primary)]/10 dark:bg-[var(--madina-primary)]/20'
                              : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700'
                          }`}
                        >
                          {/* Style Preview */}
                          <div className="w-full h-24 rounded border border-gray-300 dark:border-gray-500 flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800">
                            {style.type === 'grid' ? (
                              <div className="w-full h-full bg-white dark:bg-gray-800 rounded-lg shadow-md p-2">
                                <div className="grid grid-cols-2 gap-1 h-full">
                                  {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="bg-gray-200 dark:bg-gray-600 rounded flex flex-col items-center justify-center p-1">
                                      <div className="w-6 h-4 bg-gray-300 dark:bg-gray-500 rounded mb-1"></div>
                                      <div className="w-4 h-1 bg-gray-300 dark:bg-gray-500 rounded"></div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            ) : (
                              <div className="w-full h-full bg-white dark:bg-gray-800 rounded-lg shadow-md p-2 flex items-center gap-2 overflow-hidden">
                                <div className="w-16 h-10 bg-gray-200 dark:bg-gray-600 rounded"></div>
                                <div className="flex-1 flex flex-col gap-1">
                                  <div className="w-3/4 h-2 bg-gray-200 dark:bg-gray-600 rounded"></div>
                                  <div className="w-full h-1 bg-gray-200 dark:bg-gray-600 rounded"></div>
                                  <div className="w-2/3 h-1 bg-gray-200 dark:bg-gray-600 rounded"></div>
                                </div>
                              </div>
                            )}
                          </div>
                          {/* Style Name */}
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300 text-center">
                            {isArabic ? style.name : style.nameEn}
                          </span>
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Testimonial Card Style Section */}
                <div className="rounded-xl bg-gray-50 dark:bg-gray-800/70 p-4 border border-gray-200/80 dark:border-gray-700/80">
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3">
                    {isArabic ? 'شكل كروت آراء العملاء' : 'Testimonial Cards Style'}
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {testimonialCardStyles.map((style) => {
                      const isSelected = selectedTestimonialCardStyle.id === style.id
                      return (
                        <button
                          key={style.id}
                          onClick={() => handleTestimonialCardStyleSelect(style)}
                          className={`flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all duration-200 hover:scale-[1.02] ${
                            isSelected
                              ? 'border-[var(--madina-primary)] ring-2 ring-[var(--madina-primary)]/30 ring-offset-2 bg-[var(--madina-primary)]/10 dark:bg-[var(--madina-primary)]/20'
                              : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700'
                          }`}
                        >
                          {/* Style Preview */}
                          <div className="w-full h-24 rounded border border-gray-300 dark:border-gray-500 flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800">
                            {style.type === 'simple' ? (
                              <div className="w-full h-full bg-white dark:bg-gray-800 rounded-lg shadow-md flex flex-col items-center justify-center p-2">
                                <div className="w-12 h-12 bg-gray-200 dark:bg-gray-600 rounded-full mb-2"></div>
                                <div className="w-3/4 h-2 bg-gray-300 dark:bg-gray-500 rounded mb-1"></div>
                                <div className="w-1/2 h-2 bg-gray-300 dark:bg-gray-500 rounded"></div>
                              </div>
                            ) : (
                              <div className="w-full h-full bg-white dark:bg-gray-800 rounded-lg shadow-md flex flex-col items-center justify-center p-2 relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-12 bg-gray-200 dark:bg-gray-600 rounded-t-lg"></div>
                                <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-r from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-700 rounded-b-lg"></div>
                                <div className="relative z-10 w-12 h-12 bg-gray-300 dark:bg-gray-500 rounded-full mb-2 mt-14"></div>
                                <div className="relative z-10 w-3/4 h-2 bg-gray-300 dark:bg-gray-500 rounded mb-1"></div>
                                <div className="relative z-10 w-1/2 h-2 bg-gray-300 dark:bg-gray-500 rounded"></div>
                              </div>
                            )}
                          </div>
                          {/* Style Name */}
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300 text-center">
                            {isArabic ? style.name : style.nameEn}
                          </span>
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Gallery Slider Style Section */}
                <div className="rounded-xl bg-gray-50 dark:bg-gray-800/70 p-4 border border-gray-200/80 dark:border-gray-700/80">
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3">
                    {isArabic ? 'شكل معرض الصور' : 'Gallery Slider Style'}
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {gallerySliderStyles.map((style) => {
                      const isSelected = selectedGallerySliderStyle.id === style.id
                      return (
                        <button
                          key={style.id}
                          onClick={() => handleGallerySliderStyleSelect(style)}
                          className={`flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all duration-200 hover:scale-[1.02] ${
                            isSelected
                              ? 'border-[var(--madina-primary)] ring-2 ring-[var(--madina-primary)]/30 ring-offset-2 bg-[var(--madina-primary)]/10 dark:bg-[var(--madina-primary)]/20'
                              : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700'
                          }`}
                        >
                          {/* Style Preview */}
                          <div className="w-full h-24 rounded border border-gray-300 dark:border-gray-500 flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800">
                            <div className="w-full h-full bg-white dark:bg-gray-800 rounded-lg shadow-md p-2 flex items-center gap-1 overflow-hidden">
                              {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="flex-1 h-full bg-gray-200 dark:bg-gray-600 rounded"></div>
                              ))}
                            </div>
                          </div>
                          {/* Style Name */}
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300 text-center">
                            {isArabic ? style.name : style.nameEn}
                          </span>
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Contact Form Style Section */}
                <div className="rounded-xl bg-gray-50 dark:bg-gray-800/70 p-4 border border-gray-200/80 dark:border-gray-700/80">
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3">
                    {isArabic ? 'شكل فورم التواصل' : 'Contact Form Style'}
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {contactFormStyles.map((style) => {
                      const isSelected = selectedContactFormStyle.id === style.id
                      return (
                        <button
                          key={style.id}
                          onClick={() => handleContactFormStyleSelect(style)}
                          className={`flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all duration-200 hover:scale-[1.02] ${
                            isSelected
                              ? 'border-[var(--madina-primary)] ring-2 ring-[var(--madina-primary)]/30 ring-offset-2 bg-[var(--madina-primary)]/10 dark:bg-[var(--madina-primary)]/20'
                              : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700'
                          }`}
                        >
                          {/* Style Preview */}
                          <div className="w-full h-24 rounded border border-gray-300 dark:border-gray-500 flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800">
                            {style.type === 'simple' ? (
                              <div className="w-full h-full bg-white dark:bg-gray-800 rounded-lg shadow-md p-2 flex flex-col gap-1">
                                <div className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded"></div>
                                <div className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded"></div>
                                <div className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded"></div>
                                <div className="w-3/4 h-6 bg-gray-300 dark:bg-gray-500 rounded mt-1"></div>
                              </div>
                            ) : (
                              <div className="w-full h-full bg-white dark:bg-gray-800 rounded-lg shadow-md p-2 flex flex-col gap-1 relative overflow-hidden">
                                <div className="absolute inset-0 bg-gray-200 dark:bg-gray-600 rounded-lg opacity-30" style={{ clipPath: 'path("M628.273 725.792C602.469 725.072 558.234 723.991 503.193 723.631C403.155 722.911 352.055 725.072 229.898 725.792C197.357 725.972 146.385 726.152 82.9548 725.792C69.9892 718.859 27.5332 710.306 24.2283 684.195C6.81368 547.968 32.7449 380.949 7.32211 236.889C-3.99103 172.602 16.6014 109.576 24.2283 49.4308C24.6096 43.7584 26.5162 32.5938 37.5751 22.9597C45.9646 15.6667 57.7863 10.4446 71.6417 8.64383C131.512 0.630493 180.705 -0.540016 216.297 0.180283C287.354 1.53085 296.379 9.99439 371.376 9.63424C454 9.27409 475.482 -1.17028 547.683 0.180283C583.148 0.810546 614.545 3.96184 640.731 7.83345C667.806 11.7951 687 28.9023 687 48.5304V684.285C687 707.244 660.687 725.882 628.273 725.882V725.792Z")' }}></div>
                                <div className="relative z-10 w-full h-2 bg-gray-300 dark:bg-gray-500 rounded"></div>
                                <div className="relative z-10 w-full h-2 bg-gray-300 dark:bg-gray-500 rounded"></div>
                                <div className="relative z-10 w-full h-2 bg-gray-300 dark:bg-gray-500 rounded"></div>
                                <div className="relative z-10 w-3/4 h-6 bg-gray-300 dark:bg-gray-500 rounded mt-1"></div>
                              </div>
                            )}
                          </div>
                          {/* Style Name */}
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300 text-center">
                            {isArabic ? style.name : style.nameEn}
                          </span>
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Primary Color Section */}
                <div className="rounded-xl bg-gray-50 dark:bg-gray-800/70 p-4 border border-gray-200/80 dark:border-gray-700/80">
                  <h4 
                    className="text-sm font-semibold mb-3"
                    style={{ color: selectedPrimaryTheme.primary }}
                  >
                    {isArabic ? 'اللون الرئيسي' : 'Primary Color'}
                  </h4>
                  <div className="grid grid-cols-6 gap-2">
                    {colorThemes.slice(0, 5).map((theme) => {
                      const isSelected = selectedPrimaryTheme.id === theme.id
                      return (
                        <button
                          key={theme.id}
                          onClick={() => handlePrimaryThemeSelect(theme)}
                          className={`flex flex-col items-center gap-1 transition-all duration-200 hover:scale-110 ${
                            isSelected ? 'scale-110' : ''
                          }`}
                        >
                          {/* Color Preview - Circular */}
                          <div
                            className={`w-8 h-8 rounded-full border-2 transition-all ${
                              isSelected
                                ? 'border-[var(--madina-primary)] shadow-lg ring-2 ring-offset-1 ring-[var(--madina-primary)]/30'
                                : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                            }`}
                            style={{ backgroundColor: theme.primary }}
                          />
                          {/* Theme Name */}
                          <span className="text-[10px] font-medium text-gray-700 dark:text-gray-300 text-center leading-tight">
                            {isArabic ? theme.name : theme.nameEn}
                          </span>
                        </button>
                      )
                    })}
                    {/* Custom Primary Color Picker Button */}
                    <button
                      onClick={() => setShowCustomPrimaryPicker(!showCustomPrimaryPicker)}
                      className={`flex flex-col items-center gap-1 transition-all duration-200 hover:scale-110 ${
                        showCustomPrimaryPicker ? 'scale-110' : ''
                      }`}
                    >
                      <div
                        className={`w-8 h-8 rounded-full border-2 transition-all flex items-center justify-center ${
                          showCustomPrimaryPicker
                            ? 'border-[var(--madina-primary)] shadow-lg ring-2 ring-offset-1 ring-[var(--madina-primary)]/30'
                            : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                        }`}
                        style={{ backgroundColor: customPrimaryColor }}
                      >
                        <Edit3 className="w-3 h-3 text-white" style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.5))' }} />
                      </div>
                      <span className="text-[10px] font-medium text-gray-700 dark:text-gray-300 text-center leading-tight">
                        {isArabic ? 'مخصص' : 'Custom'}
                      </span>
                    </button>
                  </div>
                  {/* Custom Primary Color Picker */}
                  {showCustomPrimaryPicker && (
                    <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          {isArabic ? 'اللون الرئيسي' : 'Primary Color'}
                        </label>
                        <div className="flex items-center gap-2">
                          <input
                            type="color"
                            value={customPrimaryColor}
                            onChange={(e) => {
                              setCustomPrimaryColor(e.target.value)
                              const root = document.documentElement
                              root.style.setProperty('--madina-primary', e.target.value)
                              // Calculate light and dark variants
                              const light = lightenColor(e.target.value, 20)
                              const dark = darkenColor(e.target.value, 20)
                              root.style.setProperty('--madina-primary-light', light)
                              root.style.setProperty('--madina-primary-dark', dark)
                              localStorage.setItem(STORAGE_KEY_PRIMARY, 'custom')
                              localStorage.setItem('madina-custom-primary', e.target.value)
                            }}
                            className="w-12 h-12 rounded-lg border-2 border-gray-300 dark:border-gray-600 cursor-pointer"
                          />
                          <input
                            type="text"
                            value={customPrimaryColor}
                            onChange={(e) => {
                              if (/^#[0-9A-F]{6}$/i.test(e.target.value)) {
                                setCustomPrimaryColor(e.target.value)
                                const root = document.documentElement
                                root.style.setProperty('--madina-primary', e.target.value)
                                const light = lightenColor(e.target.value, 20)
                                const dark = darkenColor(e.target.value, 20)
                                root.style.setProperty('--madina-primary-light', light)
                                root.style.setProperty('--madina-primary-dark', dark)
                                localStorage.setItem(STORAGE_KEY_PRIMARY, 'custom')
                                localStorage.setItem('madina-custom-primary', e.target.value)
                              }
                            }}
                            className="flex-1 px-3 py-2 rounded-lg border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-offset-2"
                            placeholder="#A67D5F"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Text Color Section */}
                <div className="rounded-xl bg-gray-50 dark:bg-gray-800/70 p-4 border border-gray-200/80 dark:border-gray-700/80">
                  <h4 
                    className="text-sm font-semibold mb-3"
                    style={{ color: selectedTextTheme.color }}
                  >
                    {isArabic ? 'اللون الثانوي' : 'Secondary Color'}
                  </h4>
                  <div className="grid grid-cols-6 gap-2">
                    {textColorThemes.slice(0, 5).map((theme) => {
                      const isSelected = selectedTextTheme.id === theme.id
                      return (
                        <button
                          key={theme.id}
                          onClick={() => handleTextThemeSelect(theme)}
                          className={`flex flex-col items-center gap-1 transition-all duration-200 hover:scale-110 ${
                            isSelected ? 'scale-110' : ''
                          }`}
                        >
                          {/* Color Preview - Circular */}
                          <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${
                            isSelected
                              ? 'border-[var(--madina-primary)] shadow-lg ring-2 ring-offset-1 ring-[var(--madina-primary)]/30'
                              : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                          }`} style={{ backgroundColor: theme.color }}>
                            <span className="text-[8px] font-medium" style={{ color: '#FFFFFF' }}>
                              Aa
                            </span>
                          </div>
                          {/* Theme Name */}
                          <span className="text-[10px] font-medium text-gray-700 dark:text-gray-300 text-center leading-tight">
                            {isArabic ? theme.name : theme.nameEn}
                          </span>
                        </button>
                      )
                    })}
                    {/* Custom Text Color Picker Button */}
                    <button
                      onClick={() => setShowCustomTextPicker(!showCustomTextPicker)}
                      className={`flex flex-col items-center gap-1 transition-all duration-200 hover:scale-110 ${
                        showCustomTextPicker ? 'scale-110' : ''
                      }`}
                    >
                      <div
                        className={`w-8 h-8 rounded-full border-2 transition-all flex items-center justify-center ${
                          showCustomTextPicker
                            ? 'border-[var(--madina-primary)] shadow-lg ring-2 ring-offset-1 ring-[var(--madina-primary)]/30'
                            : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                        }`}
                        style={{ backgroundColor: customTextColor }}
                      >
                        <Edit3 className="w-3 h-3 text-white" style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.5))' }} />
                      </div>
                      <span className="text-[10px] font-medium text-gray-700 dark:text-gray-300 text-center leading-tight">
                        {isArabic ? 'مخصص' : 'Custom'}
                      </span>
                    </button>
                  </div>
                  {/* Custom Text Color Picker */}
                  {showCustomTextPicker && (
                    <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          {isArabic ? 'لون النص' : 'Text Color'}
                        </label>
                        <div className="flex items-center gap-2">
                          <input
                            type="color"
                            value={customTextColor}
                            onChange={(e) => {
                              setCustomTextColor(e.target.value)
                              const root = document.documentElement
                              root.style.setProperty('--madina-text-body', e.target.value)
                              localStorage.setItem(STORAGE_KEY_TEXT, 'custom')
                              localStorage.setItem('madina-custom-text', e.target.value)
                            }}
                            className="w-12 h-12 rounded-lg border-2 border-gray-300 dark:border-gray-600 cursor-pointer"
                          />
                          <input
                            type="text"
                            value={customTextColor}
                            onChange={(e) => {
                              if (/^#[0-9A-F]{6}$/i.test(e.target.value)) {
                                setCustomTextColor(e.target.value)
                                const root = document.documentElement
                                root.style.setProperty('--madina-text-body', e.target.value)
                                localStorage.setItem(STORAGE_KEY_TEXT, 'custom')
                                localStorage.setItem('madina-custom-text', e.target.value)
                              }
                            }}
                            className="flex-1 px-3 py-2 rounded-lg border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-offset-2"
                            placeholder="#4B5563"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Header Border Radius Section */}
                <div className="rounded-xl bg-gray-50 dark:bg-gray-800/70 p-4 border border-gray-200/80 dark:border-gray-700/80">
                  <h4 
                    className="text-sm font-semibold mb-3"
                    style={{ color: selectedPrimaryTheme.primary }}
                  >
                    {isArabic ? 'انحناء الهيدر' : 'Header Border Radius'}
                  </h4>
                  <div className="space-y-4">
                    {/* Number Input with +/- Buttons */}
                    <div className="flex items-center gap-3">
                      {/* Decrease Button */}
                      <button
                        onClick={() => {
                          const newValue = Math.max(0, headerRadius - 2)
                          handleHeaderRadiusChange(newValue)
                        }}
                        disabled={headerRadius <= 0}
                        className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                        style={{
                          backgroundColor: headerRadius <= 0 
                            ? 'rgba(156, 163, 175, 0.3)' 
                            : 'var(--madina-primary)',
                          color: '#FFFFFF'
                        }}
                        aria-label={isArabic ? 'تقليل الانحناء' : 'Decrease radius'}
                      >
                        <span className="text-xl font-bold">−</span>
                      </button>

                      {/* Number Input */}
                      <div className="flex-1">
                        <input
                          type="number"
                          min="0"
                          max="32"
                          step="2"
                          value={headerRadius}
                          onChange={(e) => {
                            const value = parseInt(e.target.value, 10)
                            if (!isNaN(value) && value >= 0 && value <= 32) {
                              handleHeaderRadiusChange(value)
                            }
                          }}
                          className="w-full px-4 py-2 text-center text-lg font-semibold rounded-lg border-2 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 dark:bg-gray-800 dark:text-white"
                          style={{
                            borderColor: 'var(--madina-primary)',
                            color: 'var(--madina-primary)'
                          }}
                          onFocus={(e) => {
                            e.target.style.setProperty('--tw-ring-color', 'var(--madina-primary)')
                          }}
                        />
                        <div className="text-xs text-center mt-1 text-gray-500 dark:text-gray-400">
                          {isArabic ? 'بكسل' : 'px'}
                        </div>
                      </div>

                      {/* Increase Button */}
                      <button
                        onClick={() => {
                          const newValue = Math.min(32, headerRadius + 2)
                          handleHeaderRadiusChange(newValue)
                        }}
                        disabled={headerRadius >= 32}
                        className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                        style={{
                          backgroundColor: headerRadius >= 32 
                            ? 'rgba(156, 163, 175, 0.3)' 
                            : 'var(--madina-primary)',
                          color: '#FFFFFF'
                        }}
                        aria-label={isArabic ? 'زيادة الانحناء' : 'Increase radius'}
                      >
                        <span className="text-xl font-bold">+</span>
                      </button>
                    </div>
                    {/* Preview */}
                    <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                      <div className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                        {isArabic ? 'معاينة:' : 'Preview:'}
                      </div>
                      <div 
                        className="w-full h-12 bg-white dark:bg-gray-700 flex items-center justify-center"
                        style={{ borderRadius: `${headerRadius}px` }}
                      >
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {isArabic ? 'هيدر' : 'Header'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Background Section */}
                <div className="rounded-xl bg-gray-50 dark:bg-gray-800/70 p-4 border border-gray-200/80 dark:border-gray-700/80">
                  <h4 
                    className="text-sm font-semibold mb-3"
                    style={{ color: selectedPrimaryTheme.primary }}
                  >
                    {isArabic ? 'خلفية الموقع' : 'Site Background'}
                  </h4>
                  <div className="grid grid-cols-3 gap-2">
                    {backgroundThemes.slice(0, 2).map((bg) => {
                      const isSelected = selectedBackground.id === bg.id
                      return (
                        <button
                          key={bg.id}
                          onClick={() => handleBackgroundSelect(bg)}
                          className={`relative p-2 rounded-lg border-2 transition-all duration-200 hover:scale-105 overflow-hidden ${
                            isSelected
                              ? 'border-[var(--madina-primary)] shadow-lg ring-2 ring-offset-1 ring-[var(--madina-primary)]/30'
                              : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                          }`}
                        >
                          {/* Background Preview */}
                          <div 
                            className="w-full h-12 rounded mb-1"
                            style={{ 
                              background: bg.type === 'pattern' 
                                ? `${bg.value}, #f5f5f5`
                                : bg.value,
                              backgroundSize: bg.type === 'pattern' ? '20px 20px, auto' : 'auto'
                            }}
                          />
                          {/* Theme Name */}
                          <span className="text-[10px] font-medium text-gray-700 dark:text-gray-300 block text-center leading-tight">
                            {isArabic ? bg.name : bg.nameEn}
                          </span>
                          {/* Selected Indicator */}
                          {isSelected && (
                            <div className="absolute top-1 right-1 w-3 h-3 rounded-full bg-gray-900 dark:bg-gray-100 flex items-center justify-center">
                              <span className="text-white dark:text-gray-900 text-[8px]">✓</span>
                            </div>
                          )}
                        </button>
                      )
                    })}
                    {/* Custom Background Picker Button */}
                    <button
                      onClick={() => setShowCustomBackgroundPicker(!showCustomBackgroundPicker)}
                      className={`relative p-2 rounded-lg border-2 transition-all duration-200 hover:scale-105 overflow-hidden ${
                        showCustomBackgroundPicker
                          ? 'border-[var(--madina-primary)] shadow-lg ring-2 ring-offset-1 ring-[var(--madina-primary)]/30'
                          : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                      }`}
                    >
                      {/* Background Preview */}
                      <div 
                        className="w-full h-12 rounded mb-1 flex items-center justify-center"
                        style={{ backgroundColor: customBackgroundColor }}
                      >
                        <Edit3 className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                      </div>
                      {/* Theme Name */}
                      <span className="text-[10px] font-medium text-gray-700 dark:text-gray-300 block text-center leading-tight">
                        {isArabic ? 'مخصص' : 'Custom'}
                      </span>
                    </button>
                  </div>
                  {/* Custom Background Picker */}
                  {showCustomBackgroundPicker && (
                    <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          {isArabic ? 'لون الخلفية' : 'Background Color'}
                        </label>
                        <div className="flex items-center gap-2">
                          <input
                            type="color"
                            value={customBackgroundColor}
                            onChange={(e) => {
                              setCustomBackgroundColor(e.target.value)
                              const mainElement = document.querySelector('.template--madina main') as HTMLElement
                              if (mainElement) {
                                mainElement.style.background = e.target.value
                                mainElement.style.backgroundSize = 'auto'
                                const root = document.documentElement
                                const isDark = document.documentElement.classList.contains('dark')
                                const patternColor = isDark ? customDarkBackgroundColor : e.target.value
                                root.style.setProperty('--madina-background-color', patternColor)
                                updatePatternColors(e.target.value, customDarkBackgroundColor)
                                localStorage.setItem(STORAGE_KEY_BACKGROUND, 'custom')
                                localStorage.setItem('madina-custom-background', e.target.value)
                              }
                            }}
                            className="w-12 h-12 rounded-lg border-2 border-gray-300 dark:border-gray-600 cursor-pointer"
                          />
                          <input
                            type="text"
                            value={customBackgroundColor}
                            onChange={(e) => {
                              if (/^#[0-9A-F]{6}$/i.test(e.target.value)) {
                                setCustomBackgroundColor(e.target.value)
                                const mainElement = document.querySelector('.template--madina main') as HTMLElement
                                if (mainElement) {
                                  mainElement.style.background = e.target.value
                                  mainElement.style.backgroundSize = 'auto'
                                  const root = document.documentElement
                                  const isDark = document.documentElement.classList.contains('dark')
                                  const patternColor = isDark ? customDarkBackgroundColor : e.target.value
                                  root.style.setProperty('--madina-background-color', patternColor)
                                  updatePatternColors(e.target.value, customDarkBackgroundColor)
                                  localStorage.setItem(STORAGE_KEY_BACKGROUND, 'custom')
                                  localStorage.setItem('madina-custom-background', e.target.value)
                                }
                              }
                            }}
                            className="flex-1 px-3 py-2 rounded-lg border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-offset-2"
                            placeholder="#f5f5f5"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Dark Mode Background Section */}
                <div className="rounded-xl bg-gray-50 dark:bg-gray-800/70 p-4 border border-gray-200/80 dark:border-gray-700/80">
                  <h4 
                    className="text-sm font-semibold mb-3"
                    style={{ color: selectedPrimaryTheme.primary }}
                  >
                    {isArabic ? 'خلفية الموقع (الوضع الداكن)' : 'Site Background (Dark Mode)'}
                  </h4>
                  <div className="grid grid-cols-3 gap-2">
                    {darkBackgroundThemes.map((bg) => {
                      const isSelected = selectedDarkBackground.id === bg.id || (bg.id === 'dark-custom' && (selectedDarkBackground.id === 'dark-custom' || selectedDarkBackground.id === 'custom'))
                      const isCustom = bg.id === 'dark-custom'
                      
                      return (
                        <button
                          key={bg.id}
                          onClick={() => {
                            if (isCustom) {
                              setShowCustomDarkBackgroundPicker(!showCustomDarkBackgroundPicker)
                              handleDarkBackgroundSelect(bg)
                            } else {
                              handleDarkBackgroundSelect(bg)
                            }
                          }}
                          className={`relative p-2 rounded-lg border-2 transition-all duration-200 hover:scale-105 overflow-hidden ${
                            isSelected
                              ? 'border-[var(--madina-primary)] shadow-lg ring-2 ring-offset-1 ring-[var(--madina-primary)]/30'
                              : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                          }`}
                        >
                          {/* Background Preview - Dark Mode */}
                          <div 
                            className="w-full h-12 rounded mb-1 flex items-center justify-center"
                            style={{ 
                              backgroundColor: isCustom ? customDarkBackgroundColor : (bg.darkValue || bg.value)
                            }}
                          >
                            {isCustom && <Edit3 className="w-4 h-4 text-gray-600 dark:text-gray-400" />}
                          </div>
                          {/* Theme Name */}
                          <span className="text-[10px] font-medium text-gray-700 dark:text-gray-300 block text-center leading-tight">
                            {isArabic ? bg.name : bg.nameEn}
                          </span>
                          {/* Selected Indicator */}
                          {isSelected && (
                            <div className="absolute top-1 right-1 w-3 h-3 rounded-full bg-gray-900 dark:bg-gray-100 flex items-center justify-center">
                              <span className="text-white dark:text-gray-900 text-[8px]">✓</span>
                            </div>
                          )}
                        </button>
                      )
                    })}
                  </div>
                  {/* Custom Dark Background Picker */}
                  {showCustomDarkBackgroundPicker && (
                    <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          {isArabic ? 'لون الخلفية الداكنة' : 'Dark Background Color'}
                        </label>
                        <div className="flex items-center gap-2">
                          <input
                            type="color"
                            value={customDarkBackgroundColor}
                            onChange={(e) => {
                              const newColor = e.target.value
                              setCustomDarkBackgroundColor(newColor)
                              // Always save the custom dark background color
                              localStorage.setItem(STORAGE_KEY_BACKGROUND_DARK, 'dark-custom')
                              localStorage.setItem('madina-custom-dark-background', newColor)
                              
                              // Create a custom dark background theme object
                              const customDarkBg: BackgroundTheme = {
                                id: 'dark-custom',
                                name: 'مخصص',
                                nameEn: 'Custom',
                                type: 'solid',
                                value: newColor,
                                darkValue: newColor
                              }
                              
                              // Update selected background
                              setSelectedDarkBackground(customDarkBg)
                              
                              // Apply the background using applyBackground function
                              applyBackground(selectedBackground, customDarkBg)
                            }}
                            className="w-12 h-12 rounded-lg border-2 border-gray-300 dark:border-gray-600 cursor-pointer"
                          />
                          <input
                            type="text"
                            value={customDarkBackgroundColor}
                            onChange={(e) => {
                              if (/^#[0-9A-F]{6}$/i.test(e.target.value)) {
                                const newColor = e.target.value
                                setCustomDarkBackgroundColor(newColor)
                                // Always save the custom dark background color
                                localStorage.setItem(STORAGE_KEY_BACKGROUND_DARK, 'dark-custom')
                                localStorage.setItem('madina-custom-dark-background', newColor)
                                
                                // Create a custom dark background theme object
                                const customDarkBg: BackgroundTheme = {
                                  id: 'dark-custom',
                                  name: 'مخصص',
                                  nameEn: 'Custom',
                                  type: 'solid',
                                  value: newColor,
                                  darkValue: newColor
                                }
                                
                                // Update selected background
                                setSelectedDarkBackground(customDarkBg)
                                
                                // Apply the background using applyBackground function
                                applyBackground(selectedBackground, customDarkBg)
                              }
                            }}
                            className="flex-1 px-3 py-2 rounded-lg border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-offset-2"
                            placeholder="#0F172A"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

      <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex-shrink-0">
        <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
          {isArabic
            ? 'سيتم حفظ اختياراتك تلقائياً'
            : 'Your preferences will be saved automatically'}
        </p>
      </div>
    </FloatingSettingsPanel>
  )
}
