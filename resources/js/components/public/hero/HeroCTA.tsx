import { Link } from '@inertiajs/react'
import { PropsWithChildren } from 'react'

type Props = PropsWithChildren<{ href: string; className?: string }>

export default function HeroCTA({ href, className, children }: Props) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center rounded-xl bg-public-primary px-10 py-4 2xl:py-6 2xl:px-14
                  text-white font-semibold shadow-sm transition-all duration-500 ease-in-out
                  hover:bg-public-secondary hover:shadow-md focus-visible:outline-none ${className ?? ''}`}
    >
      {children}
    </Link>
  )
}
