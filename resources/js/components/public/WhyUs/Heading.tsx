// resources/js/components/public/WhyUs/Heading.tsx
import React, { useEffect, useState } from 'react'

type Dir = 'rtl' | 'ltr'

type Props = {
  children: React.ReactNode
  leftIcon: string          // Left arrow icon path/name
  rightIcon: string         // Right arrow icon path/name
  as?: React.ElementType    // Use proper typing for HTML elements
  className?: string
  wrapperClassName?: string
  iconClassName?: string
  center?: boolean
  dirOverride?: Dir         // Optional manual override for text direction
}

function getDir(): Dir {
  if (typeof document === 'undefined') return 'rtl'
  return (document.documentElement.getAttribute('dir') as Dir) || 'rtl'
}

export default function Heading({
  children,
  leftIcon,
  rightIcon,
  as = 'h2',
  className = '',
  wrapperClassName = '',
  iconClassName = 'w-16  md:w-28 lg:w-auto',
  center = true,
  dirOverride,
}: Props) {
  const [dir, setDir] = useState<Dir>(dirOverride ?? getDir())

  useEffect(() => {
    if (dirOverride) {
      setDir(dirOverride)
      return
    }
    const update = () => setDir(getDir())
    update() 

    const mo = new MutationObserver(update)
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['dir'] })
    return () => mo.disconnect()
  }, [dirOverride])

  const firstSrc  = dir === 'rtl' ? rightIcon : leftIcon
  const secondSrc = dir === 'rtl' ? leftIcon  : rightIcon

  const Wrapper = 'div'
  const HeadingTag = as as React.ElementType

  return (
    <Wrapper
      key={dir}
      className={[
        'mb-6 flex items-center gap-2 sm:gap-8',
        center ? 'justify-center' : '',
        wrapperClassName,
      ].filter(Boolean).join(' ')}
    >
      <img
        src={firstSrc}
        alt="السهم الأيسر"
        aria-hidden="true"
        className={['shrink-0 select-none', iconClassName].join(' ')}
        loading="lazy"
        decoding="async"
      />

      <HeadingTag className={['text-center text-3xl sm:text-5xl font-extrabold text-public-title', className].join(' ')}>
        {children}
      </HeadingTag>

      <img
        src={secondSrc}
        alt=" السهم الأيمن"
        aria-hidden="true"
        className={['shrink-0 select-none', iconClassName].join(' ')}
        loading="lazy"
        decoding="async"
      />
    </Wrapper>
  )
}
