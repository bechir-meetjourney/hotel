import React from 'react'
import { useLang } from '@/hooks/useLang'

// Stable colors per name so each guest gets a consistent avatar tint.
const AVATAR_GRADIENTS = [
  'linear-gradient(135deg, var(--public-primary, #01004C), var(--public-active, #5A5ECD))',
  'linear-gradient(135deg, var(--public-active, #5A5ECD), var(--public-secondary, #8689E3))',
  'linear-gradient(135deg, var(--public-button, #027F84), var(--public-active, #5A5ECD))',
  'linear-gradient(135deg, var(--public-secondary, #8689E3), var(--public-primary, #01004C))',
]

function getInitials(name) {
  if (!name) return '?'
  const parts = String(name).trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return '?'
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[1][0]).toUpperCase()
}

function gradientFor(name) {
  let hash = 0
  for (let i = 0; i < (name?.length ?? 0); i++) hash = (hash * 31 + name.charCodeAt(i)) | 0
  return AVATAR_GRADIENTS[Math.abs(hash) % AVATAR_GRADIENTS.length]
}

function InitialsAvatar({ name, className }) {
  return (
    <div
      className={`flex items-center justify-center font-bold text-white select-none ${className ?? ''}`}
      style={{ background: gradientFor(name) }}
      aria-hidden
    >
      <span className="text-2xl">{getInitials(name)}</span>
    </div>
  )
}

/**
 * TestimonialCard component - Individual testimonial display card
 * Shows testimonial content with different layouts for active and inactive states
 * @param testimonial - Testimonial object containing customer details and text
 * @param isActive - Boolean indicating if this card is currently active in the slider
 */
const TestimonialCard = ({ testimonial, isActive }) => {
  const { __ } = useLang()

  const name = testimonial.nameKey ? __(testimonial.nameKey) : testimonial.name
  const position = testimonial.positionKey ? __(testimonial.positionKey) : testimonial.position
  const text = testimonial.textKey ? __(testimonial.textKey) : testimonial.text
  return (
    <div
      className={`bg-white shadow-lg h-full md:h-62 py-8 px-2  rounded-2xl transition-all duration-300 hover:shadow-xl border border-gray-200 
      ${isActive ? ' md:w-[630px]' : 'md:w-[500px] md:mr-16'}`}
    >
      {/* Inactive state - compact layout */}
      {!isActive ? (
        <div className="h-full w-full flex flex-col md:flex-row items-center justify-center text-center">
          {/* Customer avatar */}
          {testimonial.image ? (
            <div className="w-24 h-24 rounded-full overflow-hidden">
              <img src={testimonial.image} alt={name} className="w-full h-full object-cover" />
            </div>
          ) : (
            <InitialsAvatar name={name} className="w-24 h-24 rounded-full" />
          )}
          {/* Testimonial text (mobile only) */}
          <div className="mb-6 block md:hidden">
                <p className="text-base leading-relaxed text-gray-700 italic">"{text}"</p>
            </div>
          {/* Customer details */}
          <div className='text-center md:text-start mx-6'>
              <h3 className="mt-4 font-bold text-gray-800 text-base">{name}</h3>
            <p className="text-gray-600 text-xs">{position}</p>
          </div>
        </div>
      ) : (
        /* Active state - expanded layout */
        <div className="h-full flex flex-col md:flex-row items-center gap-6">
          {/* Customer avatar */}
          <div className="flex items-center justify-center">
            {testimonial.image ? (
              <div className="w-28 h-28 rounded-full overflow-hidden m-2">
                <img src={testimonial.image} alt={name} className="w-full h-full object-cover" />
              </div>
            ) : (
              <InitialsAvatar name={name} className="w-28 h-28 rounded-full m-2" />
            )}
          </div>
          {/* Testimonial content */}
          <div className="flex-1 flex flex-col justify-center text-center md:text-start ">
            {/* Testimonial text */}
            <div className="mb-6 px-2 sm:px-0">
              <p className="text-base leading-relaxed text-gray-700 italic">"{text}"</p>
            </div>
            {/* Customer details */}
            <div>
              <h3 className="font-bold text-gray-800 text-xl mb-2">{name}</h3>
              <p className="text-gray-600 text-sm">{position}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default TestimonialCard
