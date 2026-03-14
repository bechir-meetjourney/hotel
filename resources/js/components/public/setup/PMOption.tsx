import React from 'react'
import type { PM } from '@/data/public-data'
import LogosGroup from './LogosGroup'

type Props = {
  value: PM
  label: string
  logos: Array<{ src: string; alt: string }>
  selected: boolean
  onSelect: (v: PM) => void
  note?: string
}

export default function PMOption({ value, label, logos, selected, onSelect, note }: Props) {
  // single payment method option
  return (
    <label
      onClick={() => onSelect(value)}
      className={[
        'flex flex-wrap items-center gap-3 rounded-2xl border px-4 transition',
        selected ? 'border-public-primary/80 bg-public-primary/5'
                 : 'border-slate-300 bg-white hover:bg-slate-50',
      ].join(' ')}
    >
            {/* radio visual */}
      <span
        aria-hidden
        className={[
          'ms-auto grid size-5 place-items-center rounded-full border transition',
          selected ? 'border-public-primary bg-public-primary' : 'border-slate-300 bg-white',
        ].join(' ')}
      >
        <span className={['size-2 rounded-full bg-white transition', selected ? 'opacity-100' : 'opacity-0'].join(' ')} />
      </span>


      <div className="flex flex-1 items-center gap-3">
        <span className="font-medium">{label}</span>
        <LogosGroup logos={logos} />
      </div>



      {/* real radio */}
      <input type="radio" name="pmethod" className="sr-only" checked={selected} onChange={() => onSelect(value)} aria-label={label} />

      {/* optional note */}
      {note ? <div className="basis-full pt-2 text-center text-xs text-slate-600">{note}</div> : null}
    </label>
  )
}
