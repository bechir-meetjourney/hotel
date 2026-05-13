import { Link, router, usePage } from '@inertiajs/react'
import { Menu, X, LogIn, Home } from 'lucide-react'
import { useState } from 'react'
import LanguageSwitcher from './navbar/LanguageSwitcher'
import { useLang } from '@/hooks/useLang'

export interface HeaderLink {
  label_ar: string
  label_en: string
  url: string
}

export interface HeaderConfig {
  logo_url?: string | null
  background_color?: string | null
  text_color?: string | null
  links?: HeaderLink[]
}

interface Props {
  config: HeaderConfig
}

type LinkKind = 'anchor' | 'external' | 'internal'

function classifyUrl(raw: string): { kind: LinkKind; value: string } {
  const url = raw.trim()
  if (/^https?:\/\//i.test(url) || url.startsWith('mailto:') || url.startsWith('tel:')) {
    return { kind: 'external', value: url }
  }
  // `#section` and `/#section` both resolve to a section on the landing page
  if (url.startsWith('#')) return { kind: 'anchor', value: url.slice(1) }
  if (url.startsWith('/#')) return { kind: 'anchor', value: url.slice(2) }
  return { kind: 'internal', value: url.startsWith('/') ? url : `/${url}` }
}

// Navigate to `/` then scroll to the anchor — custom pages are at /page/{slug},
// never on the landing page, so we always need to visit first.
function goToLandingSection(id: string) {
  const doScroll = () => {
    requestAnimationFrame(() => {
      const el = document.getElementById(id)
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      else window.location.hash = `#${id}`
    })
  }
  router.visit('/', { method: 'get', preserveScroll: true, onSuccess: doScroll })
}

export default function CustomPageHeader({ config }: Props) {
  const [open, setOpen] = useState(false)
  const { __ } = useLang()
  const { locale } = usePage<{ locale: 'ar' | 'en' }>().props
  const isArabic = locale === 'ar'

  const logo = config.logo_url || '/logo.png'
  const links = (config.links ?? []).filter((l) => l.url && (l.label_ar || l.label_en))
  const backToHomeLabel = isArabic ? 'العودة للرئيسية' : 'Back to Diyafah'

  const headerStyle: React.CSSProperties = {}
  if (config.background_color) headerStyle.backgroundColor = config.background_color
  if (config.text_color) headerStyle.color = config.text_color

  const renderLink = (link: HeaderLink, i: number, className: string, onClick?: () => void) => {
    const label = (isArabic ? link.label_ar : link.label_en) || link.label_en || link.label_ar
    const { kind, value } = classifyUrl(link.url)

    if (kind === 'anchor') {
      return (
        <button
          key={i}
          type="button"
          onClick={() => { onClick?.(); goToLandingSection(value) }}
          className={`${className} cursor-pointer text-left`}
        >
          {label}
        </button>
      )
    }
    if (kind === 'external') {
      return (
        <a
          key={i}
          href={value}
          target="_blank"
          rel="noopener noreferrer"
          className={className}
          onClick={onClick}
        >
          {label}
        </a>
      )
    }
    return (
      <Link key={i} href={value} className={className} onClick={onClick}>
        {label}
      </Link>
    )
  }

  return (
    <header
      className="border-b sticky top-0 z-50 bg-background/50 dark:bg-black/50 backdrop-blur-xl border-border dark:border-sidebar-border/80"
      style={headerStyle}
    >
      <div className="container mx-auto flex items-center justify-between px-8 xl:px-18 py-2">
        <Link href="/" aria-label={__('messages.home')} className="flex items-center">
          <img src={logo} alt="Logo" className="h-16 w-auto" />
        </Link>

        <nav className="hidden lg:flex items-center gap-8 text-md font-bold">
          {links.map((link, i) =>
            renderLink(link, i, 'hover:text-public-secondary transition-colors'),
          )}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-public-primary hover:bg-public-primary/10 transition-colors"
            title={backToHomeLabel}
          >
            <Home className="h-4 w-4" />
            {backToHomeLabel}
          </Link>
          <Link
            href="/login"
            className="inline-flex items-center gap-2 rounded-lg border border-public-primary px-4 py-2 text-sm font-semibold text-public-primary transition-colors hover:bg-public-primary hover:text-white"
          >
            <LogIn className="h-4 w-4" />
            {__('messages.nav.login')}
          </Link>
          <LanguageSwitcher />
        </div>

        <button
          type="button"
          className="lg:hidden rounded-lg p-2 hover:bg-gray-100"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t bg-background" style={headerStyle}>
          <nav className="flex flex-col gap-1 p-4">
            {links.map((link, i) =>
              renderLink(
                link,
                i,
                'rounded px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800',
                () => setOpen(false),
              ),
            )}
            <Link
              href="/"
              className="mt-2 inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-public-primary hover:bg-public-primary/10"
              onClick={() => setOpen(false)}
            >
              <Home className="h-4 w-4" />
              {backToHomeLabel}
            </Link>
            <Link
              href="/login"
              className="mt-2 inline-flex items-center gap-2 rounded-lg border border-public-primary px-4 py-2 text-sm font-semibold text-public-primary"
              onClick={() => setOpen(false)}
            >
              <LogIn className="h-4 w-4" />
              {__('messages.nav.login')}
            </Link>
            <div className="mt-2"><LanguageSwitcher /></div>
          </nav>
        </div>
      )}
    </header>
  )
}
