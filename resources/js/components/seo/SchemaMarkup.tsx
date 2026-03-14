// JSON-LD schema builder for SEO. Used across site pages.

export interface SchemaMarkupProps {
  type: 'Organization' | 'WebSite' | 'Hotel' | 'SoftwareApplication' | 'Product' | 'Service' | 'FAQPage';
  name?: string;
  description?: string;
  url?: string;
  logo?: string;
  images?: string[];
  offers?: any;
  applicationCategory?: string;
  operatingSystem?: string;
  faqItems?: { question: string; answer: string }[];
  hotelStars?: number;
  address?: {
    streetAddress?: string;
    addressLocality?: string;
    addressRegion?: string;
    postalCode?: string;
    addressCountry?: string;
  };
}

export const generateSchemaMarkup = (props: SchemaMarkupProps): string => {
  const {
    type,
    name = 'ضيافة - نظام إدارة الفنادق والشقق المفروشة',
    description = 'نظام متكامل لإدارة الفنادق والشقق المفروشة وأماكن الإقامة السياحية. يساعد في تسهيل عمليات الحجز وخدمة النزلاء وإدارة الإيرادات.',
    url = 'https://diyafah.com',
    logo = 'https://diyafah.com/logo.png',
    images = ['https://diyafah.com/logo.png'],
    offers,
    applicationCategory,
    operatingSystem,
    faqItems,
    hotelStars,
    address
  } = props;

  // Base shared schema
  const baseSchema: any = {
    '@context': 'https://schema.org',
    '@type': type,
    name,
    description,
    url
  };

  // Add elements by schema type
  switch (type) {
    case 'Organization':
      baseSchema.logo = logo;
      if (address) {
        baseSchema.address = {
          '@type': 'PostalAddress',
          ...address
        };
      }
      break;

    case 'WebSite':
      baseSchema.potentialAction = {
        '@type': 'SearchAction',
        'target': {
          '@type': 'EntryPoint',
          'urlTemplate': `${url}/search?q={search_term_string}`
        },
        'query-input': 'required name=search_term_string'
      };
      break;

    case 'SoftwareApplication':
      baseSchema.applicationCategory = applicationCategory || 'HotelManagementApplication';
      baseSchema.operatingSystem = operatingSystem || 'Web';
      if (offers) {
        baseSchema.offers = {
          '@type': 'Offer',
          ...offers
        };
      }
      break;

    case 'Product':
    case 'Service':
      baseSchema.image = images;
      if (offers) {
        baseSchema.offers = {
          '@type': 'Offer',
          ...offers
        };
      }
      break;

    case 'Hotel':
      baseSchema.image = images;
      if (hotelStars) {
        baseSchema.starRating = {
          '@type': 'Rating',
          'ratingValue': hotelStars
        };
      }
      if (address) {
        baseSchema.address = {
          '@type': 'PostalAddress',
          ...address
        };
      }
      break;

    case 'FAQPage':
      if (faqItems && faqItems.length > 0) {
        baseSchema.mainEntity = faqItems.map(item => ({
          '@type': 'Question',
          'name': item.question,
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': item.answer
          }
        }));
      }
      break;
  }

  return JSON.stringify(baseSchema);
};

export default generateSchemaMarkup;
