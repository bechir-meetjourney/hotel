/**
 * Contact Info Component
 */
import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import { madinaContactData } from '@/data/templates/madina/contact-data'
import { useMadinaT } from '@/hooks/useMadinaTranslations'

export default function ContactInfo() {
  const contact = madinaContactData
  const t = useMadinaT()
  
  const info = [
    { icon: MapPin, title: t('sections.contact.info.address'), value: `${contact.address.street}, ${contact.address.city}` },
    { icon: Phone, title: t('sections.contact.info.phone'), value: contact.phone },
    { icon: Mail, title: t('sections.contact.info.email'), value: contact.email },
    { icon: Clock, title: t('sections.contact.info.working_hours'), value: contact.workingHours?.reception || t('sections.contact.info.reception') },
  ]

  return (
    <div className="space-y-6">
      {info.map((item, index) => (
        <div key={index} className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div 
            className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{
              backgroundColor: 'var(--madina-primary-light, #C9A882)'
            }}
          >
            <item.icon 
              className="w-6 h-6"
              style={{
                color: 'var(--madina-primary, #A67D5F)'
              }}
            />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
              {item.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {item.value}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}
