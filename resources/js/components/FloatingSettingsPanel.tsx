/**
 * Reusable floating settings panel: FAB button + slide-out panel modal.
 * Use with any template by passing title and children.
 *
 * @example
 * const [open, setOpen] = useState(false)
 * <FloatingSettingsPanel
 *   title="Settings"
 *   open={open}
 *   onClose={() => setOpen(false)}
 *   onToggle={() => setOpen(o => !o)}
 *   primaryColor="var(--my-primary)"
 *   position="right"
 *   dir="ltr"
 * >
 *   <div>Your settings form or options</div>
 * </FloatingSettingsPanel>
 */
import { ReactNode, useState, useEffect, useCallback } from 'react'
import { Palette, X } from 'lucide-react'

const PANEL_DURATION_MS = 500

export interface FloatingSettingsPanelProps {
  /** Panel content (form, options, etc.) */
  children: ReactNode
  /** Panel title (e.g. "UX Settings") */
  title: string
  /** Open state */
  open: boolean
  /** Close handler */
  onClose: () => void
  /** Toggle open (for FAB click) */
  onToggle: () => void
  /** FAB and header start color (CSS value) */
  primaryColor?: string
  /** Header gradient end (optional; default same as primaryColor) */
  primaryColorEnd?: string
  /** FAB position: right for LTR, left for RTL typically */
  position?: 'left' | 'right'
  /** Content direction */
  dir?: 'rtl' | 'ltr'
  /** FAB icon (default: Palette) */
  icon?: ReactNode
  /** FAB aria-label */
  ariaLabel?: string
}

const defaultPrimary = 'var(--madina-primary, #A67D5F)'

export default function FloatingSettingsPanel({
  children,
  title,
  open,
  onClose,
  onToggle,
  primaryColor = defaultPrimary,
  position = 'right',
  dir = 'ltr',
  icon,
  ariaLabel = 'Settings',
}: FloatingSettingsPanelProps) {
  const isRight = position === 'right'
  const panelFromRight = !isRight

  const [isClosing, setIsClosing] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (open) {
      const id = requestAnimationFrame(() => setIsVisible(true))
      return () => cancelAnimationFrame(id)
    } else {
      setIsVisible(false)
    }
  }, [open])

  const handleCloseRequest = useCallback(() => {
    if (isClosing) return
    setIsClosing(true)
    setTimeout(() => {
      onClose()
      setIsClosing(false)
    }, PANEL_DURATION_MS)
  }, [isClosing, onClose])

  const showPanel = open || isClosing
  const panelSlideIn = open && !isClosing && isVisible
  const offScreenX = panelFromRight ? 'translateX(100%)' : 'translateX(-100%)'
  const panelTransform = panelSlideIn ? 'translateX(0)' : offScreenX

  return (
    <>
      <button
        type="button"
        onClick={onToggle}
        className={`fixed bottom-6 z-50 w-14 h-14 rounded-full shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-offset-2 ${
          isRight ? 'right-6' : 'left-6'
        }`}
        style={{ backgroundColor: 'var(--madina-settings-button-bg, var(--madina-primary))', color: '#FFFFFF' }}
        aria-label={ariaLabel}
      >
        {icon ?? <Palette className="w-6 h-6" />}
      </button>

      {showPanel && (
        <>
          <div
            className={`fixed inset-0 z-40 transition-opacity duration-500 ease-out ${
              isClosing ? 'opacity-0' : 'opacity-100 bg-black/20'
            }`}
            onClick={handleCloseRequest}
            aria-hidden
          />
          <div
            className={`fixed top-0 ${panelFromRight ? 'right-0' : 'left-0'} h-full w-96 max-w-[90vw] bg-white/85 dark:bg-gray-900/85 backdrop-blur-md shadow-2xl z-50 transition-transform duration-500 ease-out ${
              panelFromRight ? 'rounded-l-2xl' : 'rounded-r-2xl'
            } border-gray-200 dark:border-gray-700 ${panelFromRight ? 'border-l' : 'border-r'}`}
            dir={dir}
            style={{
              transform: panelTransform,
              fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
            }}
            role="dialog"
            aria-modal="true"
            aria-label={title}
          >
            <div className="h-full flex flex-col overflow-y-auto">
              <div className="flex items-center justify-between px-6 py-5 flex-shrink-0 text-white bg-slate-600 dark:bg-slate-800">
                <h3 className="text-lg font-bold tracking-tight">{title}</h3>
                <button
                  type="button"
                  onClick={handleCloseRequest}
                  className="p-2 rounded-xl hover:bg-white/20 transition-colors"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="flex-1 p-5 pb-8 overflow-y-auto">{children}</div>
            </div>
          </div>
        </>
      )}
    </>
  )
}
