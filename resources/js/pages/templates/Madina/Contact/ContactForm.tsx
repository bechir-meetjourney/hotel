/**
 * Contact Form Component
 */
import { useMadinaT } from '@/hooks/useMadinaTranslations'

export default function ContactForm() {
  const t = useMadinaT()
  
  return (
    <form className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {t('sections.contact.form.name')}
        </label>
        <input 
          type="text"
          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-600 focus:border-transparent"
          placeholder="أدخل اسمك"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {t('sections.contact.form.email')}
        </label>
        <input 
          type="email"
          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-600 focus:border-transparent"
          placeholder="example@email.com"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {t('sections.contact.form.message')}
        </label>
        <textarea 
          rows={5}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-600 focus:border-transparent"
          placeholder="اكتب رسالتك هنا..."
        />
      </div>

      <button 
        type="submit"
        className="w-full px-8 py-3 bg-green-700 hover:bg-green-800 rounded-lg font-semibold transition-colors"
        style={{ color: 'var(--madina-contact-button-text, white)' }}
      >
        {t('sections.contact.form.send')}
      </button>
    </form>
  )
}
