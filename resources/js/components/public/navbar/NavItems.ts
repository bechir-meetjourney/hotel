// resources/js/components/public/navbar/NavItems.ts
import { useLang } from '@/hooks/useLang'

export function useNavItems() {
  const { __ } = useLang()

  return [
    { href: '/', label: __('messages.nav_links.home') },
    { href: '#templates', label: __('messages.nav_links.templates') },
    { href: '#why-us', label: __('messages.nav_links.why_us') },
    { href: '#how-we-work', label: __('messages.nav_links.how_we_work') },
    { href: '#hotels', label: __('messages.nav_links.hotels') },
    { href: '#pricing', label: __('messages.nav_links.pricing') },
    { href: '#contact', label: __('messages.nav_links.contact') },
  ]
}
