import React from 'react'
type PM = 'card' | 'mada' | 'apple' | 'google' | 'paypal' | 'stc'
import SimpleOption from './SimpleOption'
import CreditCardOption from './CreditCardOption'

export default function PaymentMethods({
  value,
  onChange,
}: {
  value: PM
  onChange: (v: PM) => void
}) {
  // list of options
  return (
    <div className="grid gap-2">
  <SimpleOption pm="mada"   selected={value === 'mada'}   onChange={onChange} />
  <CreditCardOption          value="card"       selected={value === 'card'}   onChange={onChange} />
  <SimpleOption pm="apple"  selected={value === 'apple'}  onChange={onChange} />
  <SimpleOption pm="google" selected={value === 'google'} onChange={onChange} />
  <SimpleOption pm="paypal" selected={value === 'paypal'} onChange={onChange} />
    </div>
  )
}
