import React from 'react'
import { useLang } from '@/hooks/useLang'

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
          <div className="w-24 h-24 rounded-full overflow-hidden ">
            <img src={testimonial.image} alt="مستخدم" className="w-full h-full object-cover" />
          </div>
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
            <div className="w-28 h-28 rounded-full overflow-hidden m-2 ">
              <img src={testimonial.image} alt="مستخدم" className="w-full h-full object-cover" />
            </div>
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
