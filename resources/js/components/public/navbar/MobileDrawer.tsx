// resources/js/components/public/navbar/MobileDrawer.tsx
import { useEffect } from 'react'
import SubscribeButton from './SubscribeButton'
import LanguageSwitcher from './LanguageSwitcher'
import { router } from '@inertiajs/react'

type Item = { href: string; label: string }

function goToSection(rawHref: string, onClose: () => void) {
  const id = (rawHref.startsWith('#') ? rawHref.slice(1) : rawHref) || ''
  const onHome = window.location.pathname === '/'

  const doScroll = () => {
    requestAnimationFrame(() => {
      const el = document.getElementById(id)
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      else window.location.hash = `#${id}`
      onClose()
    })
  }

  if (onHome) {
    doScroll()
  } else {
    router.visit('/', { method: 'get', preserveScroll: true, onSuccess: doScroll })
  }
}

export default function MobileDrawer({
  open,
  onClose,
  items,
}: {
  open: boolean
  onClose: () => void
  items: Item[]
}) {
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [open, onClose])

  return (
    <div
      className={[
        'lg:hidden overflow-hidden transition-all duration-300 ease-in-out',
        open ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0',
      ].join(' ')}
      id="mobile-drawer"
    >
      <nav className="flex flex-col items-center space-y-3 p-4 text-base font-medium bg-white border-t border-gray-200">
        {items.map(({ href, label }) => (
          <button
            key={href}
            type="button"
            onClick={() => goToSection(href, onClose)}
            className="w-full text-center rounded-md px-3 py-2 hover:bg-gray-100 hover:text-public-secondary transition-colors cursor-pointer"
          >
            {label}
          </button>
        ))}

        <div className="pt-2">
          <SubscribeButton onClick={onClose} />
        </div>

        <div className="pt-2">
          <LanguageSwitcher />
        </div>
      </nav>
    </div>
  )
}
