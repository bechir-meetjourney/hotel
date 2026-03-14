import { TemplateData, TemplateId } from '@/types/template-types'
import { riyadhTemplateData } from './riyadh'

// Available templates registry
export const templateRegistry: Partial<Record<TemplateId, TemplateData>> = {
  riyadh: riyadhTemplateData
  // Additional templates can be added here like:
  // jeddah: jeddahTemplateData,
  // dammam: dammamTemplateData,
  // makkah: makkahTemplateData,
}

// Function to get template data
export const getTemplateData = (templateId: TemplateId): TemplateData => {
  const template = templateRegistry[templateId]
  if (!template) {
    throw new Error(`Template with ID "${templateId}" not found`)
  }
  return template
}

// Function to get list of all available templates
export const getAvailableTemplates = (): Array<{
  id: TemplateId
  name: string
  description: string
  category: string
}> => {
  return Object.entries(templateRegistry).map(([id, data]) => ({
    id: id as TemplateId,
    name: data.info.name,
    description: data.info.description,
    category: data.info.category
  }))
}

// Function to check if template exists
export const isTemplateAvailable = (templateId: string): templateId is TemplateId => {
  return templateId in templateRegistry
}

// Export default template (Riyadh)
export const defaultTemplate: TemplateData = riyadhTemplateData

// System information
export const templateSystemInfo = {
  version: '1.0.0',
  totalTemplates: Object.keys(templateRegistry).length,
  supportedLanguages: ['ar', 'en'],
  supportedCurrencies: ['SAR', 'USD', 'EUR'],
  createdAt: '2024-01-15',
  updatedAt: new Date().toISOString().split('T')[0]
}