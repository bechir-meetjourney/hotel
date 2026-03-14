import React from 'react'
import { router } from '@inertiajs/react'

type Props = {
  prevHref?: string
  nextHref?: string
}

export default function NextPrev({ prevHref, nextHref }: Props) {
  return (
    <div className="mt-6 flex items-center justify-between">
      <button
        type="button"
        className="rounded-xl border px-4 py-2 text-gray-700 hover:bg-gray-50 disabled:opacity-50"
        onClick={() => prevHref && router.visit(prevHref)}
        disabled={!prevHref}
      >
        السابق
      </button>

      <button
        type="button"
        className="rounded-xl bg-indigo-600 px-4 py-2 font-semibold text-white hover:opacity-90 disabled:opacity-50"
        onClick={() => nextHref && router.visit(nextHref)}
        disabled={!nextHref}
      >
        التالي
      </button>
    </div>
  )
}
