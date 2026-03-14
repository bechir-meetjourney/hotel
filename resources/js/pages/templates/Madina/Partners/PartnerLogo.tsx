/**
 * Partner Logo Component
 */
interface PartnerLogoProps {
  partner: {
    id: number
    name: string
  }
}

export default function PartnerLogo({ partner }: PartnerLogoProps) {
  return (
    <div className="flex items-center justify-center p-6 bg-white dark:bg-gray-800 rounded-lg hover:shadow-lg transition-shadow">
      <div className="w-full h-20 flex items-center justify-center bg-gradient-to-br from-green-600 to-amber-600 rounded text-white font-bold">
        {partner.name}
      </div>
    </div>
  )
}
