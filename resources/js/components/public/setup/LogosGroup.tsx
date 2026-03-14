import React from 'react'
import BrandBadge from './BrandBadge'

type Logo = { src: string; alt: string }

export default function LogosGroup({ logos }: { logos: Logo[] }) {
  // horizontal row of badges
  return (
    <div className="flex items-center gap-2">
      {logos.map((l, i) => <BrandBadge key={i} src={l.src} alt={l.alt} />)}
    </div>
  )
}
