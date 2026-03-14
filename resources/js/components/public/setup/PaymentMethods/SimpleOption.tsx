import React from 'react'
import PMOption from '../PMOption'
import { PAYMENT_METHODS } from '@/data/public-data'
import { useLang } from '@/hooks/useLang'

type PM = 'card' | 'mada' | 'apple' | 'google' | 'paypal' | 'stc'

// generic option by value (e.g., mada, apple, google, paypal)
export default function SimpleOption({
  pm,
  label,
  selected,
  onChange,
}: {
  pm: PM
  label?: string
  selected: boolean
  onChange: (v: PM) => void
}) {
  const item = PAYMENT_METHODS.find(p => p.value === pm)!
  const { __ } = useLang()
  const translatedLabel = (() => {
    // try to map common values to messages
    if (pm === 'mada') return __("messages.payment_methods.mada")
    if (pm === 'card') return __("messages.payment_methods.card")
    if (pm === 'apple') return __("messages.payment_methods.apple")
    if (pm === 'google') return __("messages.payment_methods.google")
    if (pm === 'paypal') return __("messages.payment_methods.paypal")
  return label ?? __("messages.payment_methods." + pm) ?? pm
  })()
  return (
    <PMOption
      value={pm}
      label={translatedLabel}
      logos={[{ src: item.src, alt: item.alt }]}
      selected={selected}
      onSelect={onChange}
    />
  )
}
