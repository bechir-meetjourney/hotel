import { router, usePage } from '@inertiajs/react'
import { Globe } from 'lucide-react'

export default function LanguageSwitcher() {
  const { locale } = usePage().props

  const toggleLocale = () => {
    const newLocale = locale === 'ar' ? 'en' : 'ar'
    router.visit(route('locale.switch', { locale: newLocale }), {
      preserveState: false,
      preserveScroll: true,
    })
  }

  return (
    <button
      type="button"
      aria-label={locale === 'ar' ? 'Switch to English' : 'التبديل إلى العربية'}
      onClick={toggleLocale}
      className="group relative flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 
                 text-sm font-medium text-[#7F7F7F] cursor-pointer 
                 transition-all duration-300 ease-in-out 
                 hover:shadow-sm hover:border-gray-100"
    >
      <span
        className="transition-all duration-300 ease-in-out group-hover:opacity-0 group-hover:mx-[2px]  group-hover:translate-y-[-4px]"
      >
        {locale === 'ar' ? 'العربية' : 'English'}
      </span>

      <span
        className="absolute transition-all duration-300 ease-in-out opacity-0 group-hover:opacity-100  group-hover:translate-y-0"
      >
        {locale === 'ar' ? 'English' : 'العربية'}
      </span>

      <Globe className="h-4 w-4 text-[#7F7F7F] transition-transform duration-300 ease-in-out group-hover:rotate-180 group-hover:scale-110 group-hover:text-[#5a5a5a]" />
    </button>
  )
}
