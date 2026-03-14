import { useTemplateTranslations } from '@/hooks/useTemplateTranslations'

/**
 * Debug component to show current template translations
 * Remove this in production
 */
export function TemplateTranslationDebug() {
  const translations = useTemplateTranslations()
  
  if (process.env.NODE_ENV === 'production') {
    return null
  }
  
  return (
    <div className="fixed bottom-4 right-4 bg-black bg-opacity-75 text-white p-4 rounded-lg text-xs max-w-sm">
      <h4 className="font-bold mb-2">Template Translations Debug:</h4>
      <pre className="text-xs overflow-auto max-h-32">
        {JSON.stringify(translations, null, 2)}
      </pre>
    </div>
  )
}