// resources/js/components/public/templates/TemplatesGrid.tsx
import ImageCarousel from '@/components/public/templates/ImageCarousel'
import TemplateCard from './TemplateCard'
import type { TemplateItem } from './constants'

export default function TemplatesGrid({ items }: { items: TemplateItem[] }) {
  const needCarousel = items.length > 1

  if (needCarousel) {
    return (
      <div className="mt-12 sm:mt-12">
        <ImageCarousel items={items} ariaLabel="قوالب المناطق" />
      </div>
    )
  }

  return (
    <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 ">
      {items.map((it) => (
        <TemplateCard key={it.id} item={it} />
      ))}
    </div>
  )
}
