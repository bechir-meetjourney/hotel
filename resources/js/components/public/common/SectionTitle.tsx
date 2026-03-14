import React from 'react'

interface SectionTitleProps {
  title: string
  subtitle?: string
  className?: string
  titleClassName?: string
  subtitleClassName?: string
}

/**
 * SectionTitle component - Reusable section title component
 * Provides consistent styling for section titles across the application
 */
export default function SectionTitle({
  title,
  subtitle,
  className = '',
  titleClassName = 'text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight',
  subtitleClassName = 'text-base sm:text-2xl text-black/70'
}: SectionTitleProps) {
  return (
    <div className={`text-center ${className}`}>
      <h2 className={titleClassName}>
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-2 md:mt-4 max-w-4xl mx-auto ${subtitleClassName}`}>
          {subtitle}
        </p>
      )}
    </div>
  )
}
