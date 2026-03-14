// resources/js/components/public/templates/SectionTitle.tsx
import { useLang } from '@/hooks/useLang'

export default function SectionTitle() {
  const { __ } = useLang()

  return (
    <h2 className="text-center text-[#DADADA] text-7xl sm:text-9xl md:text-[150px] lg:text-[230px] font-extrabold tracking-tight">
      {__('messages.section_titles.templates.title')}
    </h2>
  )
}
