// resources/js/components/public/templates/BrowseMoreButton.tsx
import React from 'react'
import { Link } from '@inertiajs/react'
import { ExternalLink } from 'lucide-react'
import AnimatedButton from '@/components/motion/AnimatedButton'

type Props = Omit<React.ComponentProps<typeof Link>, 'href' | 'children'> & {
  href?: string
  label?: string
  className?: string
  containerClassName?: string
  showIcon?: boolean
}

export default function BrowseMoreButton({
  href = '/templates',
  label = 'تصفح المزيد من القوالب',
  className,
  containerClassName,
  showIcon = true,
  ...rest
}: Props) {
  const base =
    'inline-flex items-center gap-2 rounded-xl border border-white px-6 py-3 text-white font-semibold transition-colors duration-300 hover:bg-public-active/40 hover:border-white/10 focus-visible:outline-none'

  return (
    <div className={['mt-10 flex justify-center', containerClassName].filter(Boolean).join(' ')}>
    <AnimatedButton dir="up">
      <Link href={href} className={[base, className].filter(Boolean).join(' ')} aria-label={label} {...rest}>
      <span>{label}</span>
        {showIcon && (
          <span
            aria-hidden="true"
            className="grid place-items-center rounded-md border border-current/60 p-1"
          >
            <ExternalLink className="h-4 w-4  " />
          </span>
        )}
      </Link>
    </AnimatedButton>

    </div>
  )
}
