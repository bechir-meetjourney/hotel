import { PropsWithChildren } from 'react'
import { Head, usePage } from '@inertiajs/react'
import { useTemplateLanguage } from '@/hooks/useTemplateTranslations'
import MadinaHeader from '../pages/templates/Madina/MadinaHeader'
import MadinaFooter from '../pages/templates/Madina/MadinaFooter'
import ThemeSwitcher from '@/components/templates/ThemeSwitcher'
import GoogleAnalytics from '@/components/GoogleAnalytics'

interface MadinaLayoutProps extends PropsWithChildren {
  title?: string
  description?: string
}

/**
 * Custom layout for Madina template.
 * Provides unified structure with custom Header and Footer.
 */
export default function MadinaLayout({
  children,
  title = 'قالب المدينة - فندق المدينة المنورة',
  description = 'قالب موقع فندق مستوحى من المدينة المنورة'
}: MadinaLayoutProps) {
  const { direction, isArabic } = useTemplateLanguage()
  const { googleAnalyticsId } = usePage().props as { googleAnalyticsId?: string | null }

  return (
    <>
      <Head title={title}>
        <meta name="description" content={description} />
      </Head>
      
      <div 
        className={`template--madina madina-template min-h-screen ${direction === 'rtl' ? 'font-arabic' : 'font-latin'}`} 
        dir={direction}
      >
        {/* Header */}
        <MadinaHeader />
        
        {/* Main content */}
        <main className={`overflow-hidden bg-[#f5f5f5] dark:bg-[#0F172A] text-foreground dark:text-[#E5E7EB] ${isArabic ? 'text-right' : 'text-left'}`}>
          {children}
        </main>
        
        {/* Footer */}
        <MadinaFooter />
        
        
        {/* Theme switcher */}
        <ThemeSwitcher />
      </div>

      <GoogleAnalytics measurementId={googleAnalyticsId} />
    </>
  )
}
