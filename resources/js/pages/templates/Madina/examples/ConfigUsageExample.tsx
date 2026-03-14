/**
 * Example component showing how to use Madina Config System.
 */

import useMadina, { 
  useMadinaTheme,
  useMadinaImages,
  useMadinaImage,
  getMadinaGradient,
  getMadinaShadow,
} from '@/hooks/useMadinaConfig'
import { useMadinaT } from '@/hooks/useMadinaTranslations'

export default function ExampleUsage() {
  // 1. Use comprehensive hook
  const {
    theme,
    images,
    getColor,
    getImage,
    getCSSVar,
    getGradient,
    getShadow,
  } = useMadina()

  // 2. Use specialized hooks
  const t = useMadinaT()
  const themeColors = useMadinaTheme()
  const allImages = useMadinaImages()
  
  // 3. Get a specific image
  const heroImage = useMadinaImage('hero', 'main')
  const logo = useMadinaImage('logo', 'main')

  return (
    <div className="madina-section">
      {/* Example 1: use colors */}
      <div 
        style={{ 
          backgroundColor: getColor('primary'),
          color: '#FFFFFF',
          padding: '2rem',
        }}
      >
        <h2>{t('sections.hero.title')}</h2>
      </div>

      {/* Example 2: use gradient */}
      <div
        style={{
          background: getGradient(),
          padding: '3rem',
          boxShadow: getShadow('xl'),
        }}
      >
        <p>{t('sections.hero.subtitle')}</p>
      </div>

      {/* Example 3: use images */}
      <div className="grid grid-cols-2 gap-4">
        <img src={logo} alt="Logo" className="w-full" />
        <img src={heroImage} alt="Hero" className="w-full" />
        <img src={getImage('rooms', 'standard')} alt="Room" className="w-full" />
        <img src={allImages.logo.white} alt="White Logo" className="w-full" />
      </div>

      {/* Example 4: use CSS variables */}
      <div
        style={{
          color: getCSSVar('primary'),
          backgroundColor: getCSSVar('bg-secondary'),
          padding: getCSSVar('spacing-lg'),
          borderRadius: getCSSVar('radius-lg'),
        }}
      >
        استخدام CSS Variables
      </div>

      {/* Example 5: use utility classes */}
      <div className="madina-card">
        <div className="madina-card-header">
          <h3 className="madina-heading-3">عنوان البطاقة</h3>
        </div>
        <div className="madina-card-body">
          <p className="madina-text">محتوى البطاقة</p>
        </div>
        <div className="madina-card-footer">
          <button className="madina-btn madina-btn-primary">
            {t('common.confirm')}
          </button>
          <button className="madina-btn madina-btn-outline">
            {t('common.cancel')}
          </button>
        </div>
      </div>

      {/* Example 6: animations */}
      <div className="madina-animate-fade-in">
        <p>هذا العنصر يظهر تدريجياً</p>
      </div>

      {/* Example 7: gradient text */}
      <h1 className="madina-text-gradient madina-heading-1">
        نص بتدرج لوني رائع
      </h1>

      {/* Example 8: use theme colors directly */}
      <div
        style={{
          backgroundColor: themeColors.primary,
          color: themeColors.text,
          padding: '1rem',
        }}
      >
        استخدام الألوان من Theme
      </div>

      {/* Example 9: helper functions */}
      <div
        style={{
          background: getMadinaGradient('#FF0000', '#00FF00'),
          boxShadow: getMadinaShadow('lg'),
          padding: '2rem',
        }}
      >
        Gradient وShadow مخصصان
      </div>

      {/* Example 10: show all colors */}
      <div className="grid grid-cols-3 gap-4 p-4">
        {Object.entries(theme).map(([name, color]) => (
          <div key={name} className="text-center">
            <div
              style={{
                backgroundColor: color,
                height: '100px',
                borderRadius: '0.5rem',
                marginBottom: '0.5rem',
              }}
            />
            <p className="text-sm font-medium">{name}</p>
            <p className="text-xs text-gray-500">{color}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
