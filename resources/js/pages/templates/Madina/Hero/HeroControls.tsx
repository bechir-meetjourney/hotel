/**
 * Hero Controls Component
 * Navigation controls for the hero slider
 */
import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function HeroControls() {
  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex items-center gap-4">
      {/* Previous Button */}
      <button 
        className="w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm flex items-center justify-center text-white transition-colors"
        aria-label="Previous slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
      
      {/* Slide Indicators */}
      <div className="flex gap-2">
        {[1, 2, 3].map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all ${
              index === 0 
                ? 'bg-white w-8' 
                : 'bg-white/50 hover:bg-white/70'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
      
      {/* Next Button */}
      <button 
        className="w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm flex items-center justify-center text-white transition-colors"
        aria-label="Next slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
    </div>
  )
}
