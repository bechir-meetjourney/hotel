// resources/js/components/public/navbar/SubscribeButton.tsx
import { Link } from '@inertiajs/react'
import { useLang } from '@/hooks/useLang'

export default function SubscribeButton({ onClick }: { onClick?: () => void }) {
  const { __ } = useLang()

  return (
  <Link
    href="/templates"
    onClick={onClick}
    className="inline-flex items-center justify-center rounded-lg bg-public-primary shadow-sm shadow-public-primary/30
              w-full sm:w-auto
              px-8 py-2 text-sm font-semibold text-white 
              hover:bg-public-secondary transition-colors"
  >
    {__('messages.subscribe')}
  </Link>

  )
}
