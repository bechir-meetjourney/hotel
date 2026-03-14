/**
 * Service Card Component
 */
interface ServiceCardProps {
  service: {
    id: number
    icon: string
    title: string
    description: string
  }
}

export default function ServiceCard({ service }: ServiceCardProps) {
  return (
    <div className="group p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
      <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">
        {service.icon}
      </div>
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
        {service.title}
      </h3>
      <p className="text-gray-600 dark:text-gray-400">
        {service.description}
      </p>
    </div>
  )
}
