/**
 * Room Filters Component
 * Filter options for rooms
 */
import { useMadinaT } from '@/hooks/useMadinaTranslations'

export default function RoomFilters() {
  const t = useMadinaT()
  
  const filters = [
    { key: 'all', label: t('sections.rooms.filters.all') },
    { key: 'standard', label: t('sections.rooms.filters.standard') },
    { key: 'family', label: t('sections.rooms.filters.family') },
    { key: 'suite', label: t('sections.rooms.filters.suite') },
  ]

  return (
    <div className="flex items-center justify-center gap-3 flex-wrap">
      {filters.map((filter) => (
        <button
          key={filter.key}
          className="px-6 py-2 rounded-full border-2 border-green-700 text-green-700 hover:bg-green-700 hover:text-white transition-colors font-medium"
        >
          {filter.label}
        </button>
      ))}
    </div>
  )
}
