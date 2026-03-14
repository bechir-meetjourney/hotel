// PaymentMethods.tsx
import React from 'react'
import PMOption from '../PMOption'
import { PAYMENT_METHODS } from '@/data/public-data'
import { useLang } from '@/hooks/useLang'

// helper: pick by name or value
const byName = (n: string) => PAYMENT_METHODS.find(p => p.name === n)!
const byValue = (v: string)      => PAYMENT_METHODS.find(p => p.value === v)!

type Props = {
  value: string
  onChange: (v: string) => void
}

export default function PaymentMethods({ value, onChange }: Props) {
  const visa = byName('VISA')
  const mc   = byName('Mastercard')
  const mada = byValue('mada')
  const apple = byValue('apple')
  const gpay  = byValue('google')
  const paypal = byValue('paypal')
  const { __ } = useLang()

  return (
    <div className="grid gap-2">
      <PMOption
        value="mada"
        label={__("messages.payment_methods.mada")}
        logos={[{ src: mada.src, alt: mada.alt }]}
        selected={value === 'mada'}
        onSelect={onChange}
      />

      <PMOption
        value="card"
        label={__("messages.payment_methods.card")}
        logos={[
          { src: visa.src, alt: visa.alt },
          { src: mc.src,   alt: mc.alt },
        ]}
        selected={value === 'card'}
        onSelect={onChange}
      />

      <PMOption
        value="apple"
        label={__("messages.payment_methods.apple")}
        logos={[{ src: apple.src, alt: apple.alt }]}
        selected={value === 'apple'}
        onSelect={onChange}
      />

      <PMOption
        value="google"
        label={__("messages.payment_methods.google")}
        logos={[{ src: gpay.src, alt: gpay.alt }]}
        selected={value === 'google'}
        onSelect={onChange}
      />

      <PMOption
        value="paypal"
        label={__("messages.payment_methods.paypal")}
        logos={[{ src: paypal.src, alt: paypal.alt }]}
        selected={value === 'paypal'}
        onSelect={onChange}
      />
    </div>
  )
}
