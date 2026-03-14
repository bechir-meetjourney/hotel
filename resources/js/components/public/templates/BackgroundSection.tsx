// BackgroundSection.tsx
import bg from '@/assets/images/templates/template-background.png'

export default function BackgroundSection({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="
        relative -mt-6 w-full rounded-2xl overflow-hidden
        bg-top bg-no-repeat
        bg-cover
         2xl:bg-top 2xl:bg-no-repeat
      "
      style={{ backgroundImage: `url(${bg})` }}
    >
      {children}
    </div>
  )
}
