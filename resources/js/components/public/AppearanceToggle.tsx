import { Moon, Sun } from 'lucide-react'
import { useAppearance } from '@/hooks/use-appearance'

/**
 * AppearanceToggle component - Theme switcher button
 * Toggles between light and dark themes with appropriate icons
 */
export default function AppearanceToggle() {
  // Get current appearance and update function from hook
  const { appearance, updateAppearance } = useAppearance()

  // Toggle between light and dark themes
  const toggleTheme = () => {
    if (appearance === 'dark') {
      updateAppearance('light')
    } else {
      updateAppearance('dark')
    }
  }

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center rounded-md px-3 py-2 transition-colors
                 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700"
    >
      {/* Show sun icon for dark mode, moon icon for light mode */}
      {appearance === 'dark' ? (
        <Sun className="h-5 w-5 text-yellow-400" />
      ) : (
        <Moon className="h-5 w-5 text-gray-700 dark:text-gray-300" />
      )}
    </button>
  )
}
