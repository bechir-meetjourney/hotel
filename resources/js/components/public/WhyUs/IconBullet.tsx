import React from 'react'
import type { LucideIcon } from 'lucide-react'

export default function IconBullet({
  icon: Icon,
  children,
  className = '',
}: { icon: LucideIcon; children: React.ReactNode; className?: string }) {
  return (
    <li className={['flex items-start gap-3', className].join(' ')}>
      <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-white/10">
        <Icon className="h-4 w-4 2xl:w-8 2xl:h-8 text-public-sub-title" />
      </span>
      <span className="text-public-sub-title leading-relaxed">{children}</span>
    </li>
  )
}
