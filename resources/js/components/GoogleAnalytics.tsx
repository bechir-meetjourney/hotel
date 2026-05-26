import { useEffect } from 'react'

interface Props {
  measurementId?: string | null
}

// Injects the GA4 gtag.js loader + config when a measurement ID is provided.
// Uses a client-side effect so Inertia's <Head> doesn't have to deal with
// inline scripts (which it does not render reliably).
export default function GoogleAnalytics({ measurementId }: Props) {
  useEffect(() => {
    if (!measurementId) return
    const safeId = measurementId.replace(/[^A-Z0-9-]/gi, '')
    if (!safeId) return

    const loader = document.createElement('script')
    loader.async = true
    loader.src = `https://www.googletagmanager.com/gtag/js?id=${safeId}`
    loader.dataset.gaLoader = safeId
    document.head.appendChild(loader)

    const inline = document.createElement('script')
    inline.dataset.gaConfig = safeId
    inline.text = `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${safeId}');`
    document.head.appendChild(inline)

    return () => {
      loader.remove()
      inline.remove()
    }
  }, [measurementId])

  return null
}
