/**
 * Simple Contact Form Component - فورم تواصل بسيط
 * 
 * Features:
 * - Simple form design without SVG background
 * - Clean white card with shadow
 * - Modern input styling
 */
import React from 'react'
import { useTemplateT, useTemplateLanguage } from '@/hooks/useTemplateTranslations'

interface BilingualFormField {
  name: string
  type: string
  labelAr: string
  labelEn: string
  placeholderAr: string
  placeholderEn: string
  autoComplete?: string
  pattern?: string
  inputMode?: 'numeric'
}

interface SimpleContactFormProps {
  formData: Record<string, string> & { message: string }
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  handleSubmit: (e: React.FormEvent) => void
  fields: BilingualFormField[]
}

export default function SimpleContactForm({ formData, handleChange, handleSubmit, fields }: SimpleContactFormProps) {
  const t = useTemplateT()
  const { isArabic } = useTemplateLanguage()

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 sm:p-8"
      style={{
        border: '1px solid rgba(166, 125, 95, 0.2)'
      }}
    >
      {/* Form fields */}
      <div className="space-y-4">
        {fields.map((field) => {
          const label = isArabic ? field.labelAr : field.labelEn
          const placeholder = isArabic ? field.placeholderAr : field.placeholderEn
          
          return (
            <div key={field.name} className="flex flex-col">
              <label 
                htmlFor={field.name} 
                className="mb-2 text-sm font-semibold madina-text-primary"
              >
                {label}
              </label>
              <input
                id={field.name}
                name={field.name}
                type={field.type}
                value={formData[field.name] || ''}
                onChange={handleChange}
                placeholder={placeholder}
                autoComplete={field.autoComplete}
                {...(field.pattern && { pattern: field.pattern })}
                {...(field.inputMode && { inputMode: field.inputMode })}
                {...(field.name === 'phone' ? { dir: 'ltr' } : {})}
                className="h-12 rounded-lg border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white px-4 text-gray-800 placeholder:text-gray-500
                        outline-none transition-all focus:border-[var(--madina-primary)] focus:ring-2 focus:ring-[var(--madina-primary)]/20"
              />
            </div>
          )
        })}

        {/* Message textarea */}
        <div className="flex flex-col">
          <label 
            htmlFor="message" 
            className="mb-2 text-sm font-semibold madina-text-primary"
          >
            {t('sections.contact.form.message', 'الرسالة')}
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder={isArabic ? 'مرحبا انني اريد ان استفسر عن ....' : 'Hello, I would like to inquire about....'}
            className="min-h-40 rounded-lg border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white px-4 py-3 text-gray-800 placeholder:text-gray-500
                      outline-none resize-y transition-all focus:border-[var(--madina-primary)] focus:ring-2 focus:ring-[var(--madina-primary)]/20"
            onFocus={(e) => {
              e.target.style.borderColor = 'var(--madina-primary)'
            }}
            onBlur={(e) => {
              e.target.style.borderColor = ''
            }}
          />
        </div>
      </div>

      {/* Submit button */}
      <div className="mt-6">
        <button
          type="submit"
          className="w-full py-3 rounded-lg text-white font-semibold transition-all duration-300 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
          style={{
            backgroundColor: 'var(--madina-primary)',
            '--focus-ring': 'var(--madina-primary)'
          } as React.CSSProperties & { '--focus-ring': string }}
          onFocus={(e) => {
            e.currentTarget.style.setProperty('--tw-ring-color', 'var(--madina-primary)')
          }}
          aria-label={t('sections.contact.form.form_submit', 'إرسال')}
        >
          {t('sections.contact.form.form_submit', 'إرسال')}
        </button>
      </div>
    </form>
  )
}
