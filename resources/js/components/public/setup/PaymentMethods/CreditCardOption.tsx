import React from 'react'
import PMOption from '../PMOption'
import { PAYMENT_METHODS } from '@/data/public-data'
type PM = 'card' | 'mada' | 'apple' | 'google' | 'paypal' | 'stc'
import { useLang } from '@/hooks/useLang'

// picks VISA + Mastercard
export default function CreditCardOption({
  value,
  onChange,
  selected,
}: {
  value: PM
  selected: boolean
  onChange: (v: PM) => void
}) {
  const visa = PAYMENT_METHODS.find(p => p.name === 'VISA')!
  const mc   = PAYMENT_METHODS.find(p => p.name === 'Mastercard')!
  const { __ } = useLang()

  return (
    <PMOption
      value={value}
      label={__("messages.payment_methods.card")}
      logos={[{ src: visa.src, alt: visa.alt }, { src: mc.src, alt: mc.alt }]}
      selected={selected}
      onSelect={onChange}
    />
  )
}
