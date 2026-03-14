/**
 * Room Card Component
 * Displays individual room information
 */
import { useMadinaT } from '@/hooks/useMadinaTranslations'

interface RoomCardProps {
  room: {
    id: number
    name: string
    price: number
  }
}

export default function RoomCard({ room }: RoomCardProps) {
  const t = useMadinaT()
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
      {/* Room Image Placeholder */}
      <div className="h-64 bg-gradient-to-br from-green-600 to-amber-600"></div>
      
      {/* Room Info */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          {room.name}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          محتوى مؤقت - وصف الغرفة سيضاف هنا
        </p>
        
        {/* Price and Action */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-green-700 dark:text-green-400">
              {room.price}
            </span>
            <span className="text-gray-600 dark:text-gray-400 mr-1">{t('sections.rooms.sar')} / {t('sections.rooms.per_night')}</span>
          </div>
          <button 
            className="transition-transform duration-300 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
            style={{
              '--focus-ring': 'var(--madina-primary)'
            } as React.CSSProperties & { '--focus-ring': string }}
            onFocus={(e) => {
              e.currentTarget.style.setProperty('--tw-ring-color', 'var(--madina-primary)')
            }}
          >
            <svg width="432" height="62" viewBox="0 0 432 62" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-12 w-auto">
              <defs>
                <linearGradient id={`paint0_linear_roomcard_${room.id}`} x1="0" y1="31" x2="432" y2="31" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#C0987A"/>
                  <stop offset="0.8" stopColor="#DFBC9A"/>
                </linearGradient>
                <linearGradient id={`paint1_linear_roomcard_${room.id}`} x1="0" y1="31" x2="432" y2="31" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#C0987A"/>
                  <stop offset="0.8" stopColor="#DFBC9A"/>
                </linearGradient>
              </defs>
              <rect x="0.5" y="0.5" width="431" height="61" rx="30.5" fill={`url(#paint0_linear_roomcard_${room.id})`}/>
              <rect x="0.5" y="0.5" width="431" height="61" rx="30.5" fill="black" fillOpacity="0.2"/>
              <rect x="0.5" y="0.5" width="431" height="61" rx="30.5" stroke={`url(#paint1_linear_roomcard_${room.id})`}/>
              <rect x="0.5" y="0.5" width="431" height="61" rx="30.5" stroke="black" strokeOpacity="0.2"/>
              <text 
                x="50%" 
                y="50%" 
                dominantBaseline="middle" 
                textAnchor="middle" 
                className="madina-font-heading text-white font-semibold"
                fill="white"
                style={{ fontSize: '18px', fontWeight: '600' }}
              >
                {t('sections.rooms.book_now')}
              </text>
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
