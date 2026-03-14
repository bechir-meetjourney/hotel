# Template Data System

## Overview

A comprehensive system has been created to manage data for different hotel templates. This system provides an organized and scalable structure for managing content for different hotels with full TypeScript support.

## General Structure

```
resources/js/
├── types/
│   └── template-types.ts          # All required data types
├── data/
│   └── templates/
│       ├── index.ts               # Main template registry
│       ├── ExampleUsage.tsx       # Usage example
│       └── riyadh/                # Riyadh template data
│           ├── index.ts           # Main template file
│           ├── rooms-data.ts      # Rooms data
│           ├── services-data.ts   # Services data
│           ├── testimonials-data.ts # Customer testimonials
│           ├── gallery-data.ts    # Photo gallery
│           ├── partners-data.ts   # Partners
│           ├── hero-data.ts       # Hero section
│           ├── contact-data.ts    # Contact information
│           └── stats-data.ts      # Statistics
```

## Available Types

### 1. Room Data (TemplateRoom)
```typescript
interface TemplateRoom {
  id: number
  title: string
  description: string
  price: { current: number; original?: number; currency: string }
  images: string[]
  amenities: string[]
  maxOccupancy: number
  size: number
  bedType: string
  isAvailable: boolean
  category: 'standard' | 'deluxe' | 'suite' | 'premium'
}
```

### 2. Service Data (TemplateService)
```typescript
interface TemplateService {
  id: number
  title: string
  description: string
  icon: string
  image?: string
  isAvailable24h?: boolean
  category: 'dining' | 'wellness' | 'business' | 'entertainment' | 'transport' | 'other'
}
```

### 3. Customer Testimonials (TemplateTestimonial)
```typescript
interface TemplateTestimonial {
  id: number
  name: string
  role: string
  avatar: string
  content: string
  rating: number
  date: string
  isVerified?: boolean
  roomType?: string
}
```

### 4. Photo Gallery (TemplateGalleryImage)
```typescript
interface TemplateGalleryImage {
  id: number
  src: string
  alt: string
  category: 'rooms' | 'dining' | 'facilities' | 'exterior' | 'events'
  title?: string
  description?: string
  photographer?: string
}
```

### 5. Partners (TemplatePartner)
```typescript
interface TemplatePartner {
  id: number
  name: string
  logo: string
  description?: string
  category: 'airlines' | 'banking' | 'corporate' | 'government' | 'tourism' | 'transportation' | 'dining' | 'entertainment' | 'technology' | 'healthcare' | 'other'
  website?: string
  isActive?: boolean
  since?: string
}
```

## How to Use

### 1. Import Data
```typescript
import { getTemplateData } from '@/data/templates'

// Get specific template data
const riyadhData = getTemplateData('riyadh')
```

### 2. Use Data in Components
```typescript
const HotelPage: React.FC = () => {
  const templateData = getTemplateData('riyadh')
  const { hero, rooms, services, theme } = templateData

  return (
    <div style={{ backgroundColor: theme.primary }}>
      <h1>{hero.title}</h1>
      
      {/* Display rooms */}
      {rooms.map(room => (
        <RoomCard key={room.id} room={room} />
      ))}
      
      {/* Display services */}
      {services.map(service => (
        <ServiceCard key={service.id} service={service} />
      ))}
    </div>
  )
}
```

### 3. Add New Template

To add a new template (like Jeddah):

1. Create new folder: `resources/js/data/templates/jeddah/`
2. Create required data files (rooms-data.ts, services-data.ts, etc.)
3. Create index.ts file that combines all data
4. Add template to templateRegistry in `templates/index.ts`

```typescript
// In templates/index.ts
import { jeddahTemplateData } from './jeddah'

export const templateRegistry: Partial<Record<TemplateId, TemplateData>> = {
  riyadh: riyadhTemplateData,
  jeddah: jeddahTemplateData // New template
}
```

## Helper Functions

### getTemplateData(templateId)
Gets complete data for a specific template

### getAvailableTemplates()
Returns list of all available templates

### isTemplateAvailable(templateId)
Checks if template exists

## Features

1. **Type Safety**: Full TypeScript support with type checking
2. **Modular Structure**: Modular structure for easy maintenance and development
3. **Scalable**: Easily expandable to add new templates
4. **Comprehensive Data**: Covers all hotel content needs
5. **Mock Data Ready**: Ready data for testing and development
6. **API Ready**: Structure designed to be compatible with future API

## Included Data in Riyadh Template

- **5 room types** with comprehensive details (prices, amenities, images)
- **12 different services** (restaurant, pool, spa, gym, etc.)
- **10 customer reviews** with ratings and details
- **24 images** in photo gallery categorized by sections
- **20 partners** from various sectors
- **Comprehensive contact data** with additional information
- **Hotel statistics** and awards

## Next Steps

1. Connect data to existing components
2. Create content management system
3. Add new templates (Jeddah, Dammam, Makkah, Madinah)
4. Develop API for dynamic data
5. Add multi-language translation system