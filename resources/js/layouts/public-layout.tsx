// resources/js/layouts/PublicLayout.tsx
import { PropsWithChildren, useLayoutEffect } from 'react'
import { usePage } from '@inertiajs/react'
import Navbar from '@/components/public/Navbar'
import Footer from '@/components/public/Footer'
import { PreviewOverridesProvider, useSiteSettings } from '@/hooks/use-preview-overrides'

// NEW: Motion for React
import { MotionConfig, AnimatePresence, motion } from 'motion/react'

type Locale = 'ar' | 'en'
const RTL_LOCALES: Locale[] = ['ar']

type PublicLayoutProps = PropsWithChildren<{
  showHeader?: boolean
  showFooter?: boolean
}>

// Layout: PublicLayout wraps public pages with header and footer used by marketing pages.
export default function PublicLayout(props: PublicLayoutProps) {
  return (
    <PreviewOverridesProvider>
      <PublicLayoutInner {...props} />
    </PreviewOverridesProvider>
  )
}

function PublicLayoutInner({ children, showHeader = true, showFooter = true }: PublicLayoutProps) {
  const page = usePage()
  const { locale, dir } = (page.props as unknown) as {
    locale: Locale
    dir?: 'rtl' | 'ltr'
  }
  const siteSettings = useSiteSettings()
  const { url } = page // URL changes on each Inertia navigation

  const effectiveDir = dir ?? (RTL_LOCALES.includes(locale) ? 'rtl' : 'ltr')

  useLayoutEffect(() => {
    const html = document.documentElement
    html.lang = locale
    html.dir = effectiveDir
    document.body.classList.toggle('rtl', effectiveDir === 'rtl')

    // Apply super-admin branding colors as CSS variables (also reacts to live preview overrides).
    if (siteSettings?.colors?.primary_color) {
      html.style.setProperty('--public-primary', siteSettings.colors.primary_color)
      html.style.setProperty('--public-active', siteSettings.colors.primary_color)
    }
    if (siteSettings?.colors?.secondary_color) {
      html.style.setProperty('--public-secondary', siteSettings.colors.secondary_color)
    }
  }, [locale, effectiveDir, siteSettings])

  return (
    <MotionConfig
      reducedMotion="user"
      transition={{ duration: 0.25, ease: 'easeOut' }}
    >
      <div key={locale} dir={effectiveDir} className="flex min-h-screen flex-col">
        {showHeader && <Navbar key={`nav-${locale}`} />}

        <main className="flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={url}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>

        {showFooter && <Footer />}
      </div>
    </MotionConfig>
  )
}
