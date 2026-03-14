import React from 'react'
import TemplateLayout from '@/layouts/TemplateLayout'
import { useTemplateT, useTemplateLanguage } from '@/hooks/useTemplateTranslations'

export default function TemplateTest() {
  const t = useTemplateT()
  const { direction, isArabic, currentLocale } = useTemplateLanguage()

  return (
    <TemplateLayout title="Template Test">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">
          {t('header.hotel_name')} - Template Test
        </h1>
        
        {/* Direction and Language Info */}
        <div className="bg-blue-100 p-4 rounded-lg mb-8">
          <h2 className="text-lg font-semibold mb-2">Direction & Language Status:</h2>
          <p><strong>Current Language:</strong> {currentLocale}</p>
          <p><strong>Text Direction:</strong> {direction}</p>
          <p><strong>Is Arabic:</strong> {isArabic ? 'Yes' : 'No'}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">{t('header.nav.rooms')}</h2>
            <p className="text-gray-600">
              {isArabic 
                ? 'هذا اختبار لقسم الغرف مع النص العربي والاتجاه من اليمين لليسار'
                : 'This is a test of the rooms section with English text and left-to-right direction.'
              }
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">{t('header.nav.services')}</h2>
            <p className="text-gray-600">
              {isArabic 
                ? 'هذا اختبار لقسم الخدمات مع النص العربي والاتجاه من اليمين لليسار'
                : 'This is a test of the services section with English text and left-to-right direction.'
              }
            </p>
          </div>
        </div>
        
        {/* Test List for RTL/LTR */}
        <div className="mt-8 bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-4">
            {isArabic ? 'قائمة تجريبية' : 'Test List'}
          </h3>
          <ul className="list-disc list-inside space-y-2">
            <li>{isArabic ? 'العنصر الأول' : 'First item'}</li>
            <li>{isArabic ? 'العنصر الثاني' : 'Second item'}</li>
            <li>{isArabic ? 'العنصر الثالث' : 'Third item'}</li>
          </ul>
        </div>
      </div>
    </TemplateLayout>
  )
}