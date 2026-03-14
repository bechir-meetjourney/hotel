import { PropsWithChildren } from 'react'
import { Head } from '@inertiajs/react'
import { useTemplateLanguage } from '@/hooks/useTemplateTranslations'
import TemplateHeader from '@/components/templates/TemplateHeader'
import TemplateFooter from '@/components/templates/TemplateFooter'

interface TemplateLayoutProps extends PropsWithChildren {
  title?: string
  description?: string
  templateName?: string
}

/**
 * Base layout for hotel templates
 * Provides a common structure for all templates with Header and Footer
 * Supports RTL/LTR direction switching based on language
 */
export default function TemplateLayout({ children, title = 'Hotel Template' }: TemplateLayoutProps) {
  const { direction, isArabic } = useTemplateLanguage()

  return (
    <>
      <Head title={title} />
      
      <div className={`min-h-screen  ${direction === 'rtl' ? 'font-arabic' : 'font-latin'}`} dir={direction}>
        <TemplateHeader />
        
        <main className={isArabic ? 'text-right' : 'text-left'}>
          {children}
        </main>
        
        <TemplateFooter />
      </div>
    </>
  )
}