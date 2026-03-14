/**
 * TestimonialsCard Component
 * مكون كرت منحني خاص بقالب المدينة - داخل قسم آراء العملاء
 * 
 * Curved card component for Madina Template - inside Testimonials section
 * جزء من Module قالب المدينة - مستقل تماماً
 * Part of Madina Template Module - completely independent
 */

import React, { CSSProperties, ReactNode } from 'react'

export interface TestimonialsCardProps {
  /**
   * محتوى الكرت
   * Card content
   */
  children?: ReactNode
  
  /**
   * عرض الكرت (بالبكسل)
   * Card width in pixels
   * @default 379
   */
  width?: number | string
  
  /**
   * ارتفاع الكرت (بالبكسل)
   * Card height in pixels
   * @default 390
   */
  height?: number | string
  
  /**
   * لون الخلفية
   * Background color
   * @default '#E5DED7'
   */
  backgroundColor?: string
  
  /**
   * لون الحدود
   * Border color
   * @default 'transparent'
   */
  borderColor?: string
  
  /**
   * سماكة الحدود
   * Border width
   * @default '0px'
   */
  borderWidth?: string
  
  /**
   * CSS classes إضافية
   * Additional CSS classes
   */
  className?: string
  
  /**
   * CSS styles إضافية
   * Additional inline styles
   */
  style?: CSSProperties
  
  /**
   * دالة عند النقر على الكرت
   * Click handler
   */
  onClick?: () => void
  
  /**
   * هل الكرت قابل للنقر
   * Is card clickable
   * @default false
   */
  clickable?: boolean
}

/**
 * SVG Path للشكل المنحني - خاص بآراء العملاء
 * Curved shape SVG path - for testimonials
 */
const TESTIMONIALS_CARD_PATH = `M346.412 389.888C332.093 389.501 307.547 388.921 277.005 388.727C221.493 388.34 193.137 389.501 125.352 389.888C107.295 389.985 79.01 390.082 43.8124 389.888C36.6178 386.164 13.0587 381.569 11.2248 367.543C1.56135 294.363 15.9507 204.642 1.84348 127.254C-4.43423 92.7199 6.99263 58.8629 11.2248 26.5536C11.4364 23.5064 12.4944 17.5089 18.631 12.3336C23.2864 8.41584 29.8463 5.61056 37.5347 4.64321C70.7572 0.338528 98.0546 -0.290258 117.805 0.0966797C157.234 0.822188 162.243 5.36872 203.859 5.17525C249.707 4.98178 261.628 -0.628829 301.692 0.0966797C321.372 0.43525 338.794 2.1281 353.325 4.20789C368.349 6.33604 379 15.5258 379 26.0699V367.591C379 379.924 364.399 389.937 346.412 389.937V389.888Z`

export default function TestimonialsCard({
  children,
  width = 379,
  height = 390,
  backgroundColor = '#E5DED7',
  borderColor = 'transparent',
  borderWidth = '0px',
  className = '',
  style = {},
  onClick,
  clickable = false,
}: TestimonialsCardProps) {
  // Compute aspect ratio to preserve proportion
  const aspectRatio = typeof width === 'number' && typeof height === 'number' 
    ? `${width} / ${height}` 
    : '379 / 390'

  const cardStyle: CSSProperties = {
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
    maxWidth: '100%',
    aspectRatio,
    backgroundColor,
    border: `${borderWidth} solid ${borderColor}`,
    clipPath: `path('${TESTIMONIALS_CARD_PATH}')`,
    WebkitClipPath: `path('${TESTIMONIALS_CARD_PATH}')`,
    position: 'relative',
    cursor: clickable || onClick ? 'pointer' : 'default',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    ...style,
  }

  const handleClick = () => {
    if (onClick) {
      onClick()
    }
  }

  return (
    <div
      className={`madina-testimonials-card ${className}`}
      style={cardStyle}
      onClick={handleClick}
      onKeyDown={(e) => {
        if ((e.key === 'Enter' || e.key === ' ') && onClick) {
          e.preventDefault()
          onClick()
        }
      }}
      role={clickable || onClick ? 'button' : undefined}
      tabIndex={clickable || onClick ? 0 : undefined}
    >
      {children}
    </div>
  )
}

