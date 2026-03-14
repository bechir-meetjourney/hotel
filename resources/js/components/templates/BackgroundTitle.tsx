import React from 'react'

interface BackgroundTitleProps {
  text: string
  className?: string
  colorClass?: string // e.g. "text-[#020074]/10"
  colorStyle?: React.CSSProperties // For CSS variables support
}

/**
 * Big translucent background title to render behind section headings.
 * RTL-friendly and non-interactive.
 */
export default function BackgroundTitle({ text, className = '', colorClass = 'text-[#020151]/10 dark:text-[#EDEDED]/20', colorStyle }: BackgroundTitleProps) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none select-none absolute inset-0 -top-20 md:-top-38 flex items-start justify-center mix-blend-normal ${className}`}
      style={{ zIndex: 0 }}
    >
      <span
        className={`font-arabic-poetry leading-none tracking-wider ${colorClass} text-[8rem] sm:text-[8rem] md:text-[15rem] whitespace-nowrap`}
        style={{ 
          transform: 'translateY(-10%)',
          ...(colorStyle || {})
        }}
      >
        {text}
      </span>
    </div>
  )
}
