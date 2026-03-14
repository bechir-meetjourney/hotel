// BrandBadge.tsx
import React from 'react'

export default function BrandBadge({ src, alt }: { src: string; alt: string }) {
  // small rounded badge
  return (
      <img src={src} alt={alt} className="h-14 w-auto" loading="lazy" />
  )
}
