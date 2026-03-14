/**
 * RoomsCard Component
 * Curved card for Madina template - Rooms section.
 * Part of Madina template module - completely independent.
 */

import React, { CSSProperties, ReactNode } from 'react'

export interface RoomsCardProps {
  /**
   * Card content
   */
  children?: ReactNode
  
  /**
   * Card width in pixels
   * @default 504
   */
  width?: number | string
  
  /**
   * Card height in pixels
   * @default 694
   */
  height?: number | string
  
  /**
   * Background color
   * @default 'white'
   */
  backgroundColor?: string
  
  /**
   * Border color
   * @default 'black'
   */
  borderColor?: string
  
  /**
   * Border width
   * @default '1px'
   */
  borderWidth?: string
  
  /**
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
 * SVG Path للشكل المنحني
 * Curved shape SVG path
 */
const CURVED_CARD_PATH = `M50 8.75586C94.1418 1.10234 130.409 -0.0159638 156.646 0.671875H156.646C182.832 1.31662 197.58 3.65807 212.716 5.79883C227.395 7.87506 242.425 9.76063 268.536 9.71973L271.098 9.70996C301.615 9.53763 320.845 6.95148 339.094 4.57324C357.33 2.19655 374.583 0.027337 401.183 0.671875H401.184C427.322 1.27363 450.463 4.28298 469.763 7.97949H469.764C489.53 11.7262 503.5 27.8915 503.5 46.3916V654.123C503.5 675.602 484.617 693.136 461.164 693.382V693.319L460.683 693.302C441.639 692.613 408.991 691.58 368.37 691.235C296.854 690.568 259.205 692.486 174.989 693.232L166.691 693.301C142.705 693.473 105.148 693.645 58.4141 693.302C55.9769 691.643 52.2366 689.893 48.0156 687.853C43.696 685.765 38.8303 683.352 34.1914 680.373C24.9068 674.412 16.6222 666.242 15.4248 653.989V653.988L15.1289 650.933C9.05104 586.647 10.5857 515.327 11.4053 443.056C12.2247 370.8 12.3293 297.6 3.37988 229.613L2.94727 226.38C-1.21863 195.714 0.487483 165.336 3.94434 135.423C5.67284 120.466 7.83878 105.631 9.9248 90.9346C12.0104 76.2412 14.0167 61.6861 15.4248 47.3008L15.4258 47.2891V47.2783C15.7048 41.9017 17.0999 31.3644 25.1504 22.2793L25.1494 22.2783C31.2636 15.3933 39.8846 10.4585 49.9971 8.75586H50Z`

export default function RoomsCard({
  children,
  width = 504,
  height = 694,
  backgroundColor = 'white',
  borderColor = 'black',
  borderWidth = '1px',
  className = '',
  style = {},
  onClick,
  clickable = false,
}: RoomsCardProps) {
  // Compute aspect ratio to preserve proportion
  const aspectRatio = typeof width === 'number' && typeof height === 'number' 
    ? `${width} / ${height}` 
    : '504 / 694'

  const cardStyle: CSSProperties = {
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
    maxWidth: '100%',
    aspectRatio,
    backgroundColor,
    border: `${borderWidth} solid ${borderColor}`,
    clipPath: `path('${CURVED_CARD_PATH}')`,
    WebkitClipPath: `path('${CURVED_CARD_PATH}')`,
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
      className={`madina-rooms-card ${className}`}
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

