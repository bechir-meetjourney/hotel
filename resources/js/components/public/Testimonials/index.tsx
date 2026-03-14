import React from 'react'
import TestimonialSlider from './TestimonialSlider'
import AnimatedHeading from '@/components/motion/AnimatedHeading'
import { useLang } from '@/hooks/useLang'

/**
 * Testimonials component - Customer testimonials section
 * Displays hotel owner testimonials in a slider format
 */
const Testimonials = () => {
  const { __ } = useLang()
  return (
    <section className="text-center pb-16">
        {/* Section title */}
      <AnimatedHeading dir="up" delay={0.30}>
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight pb-16">
          <span className="text-public-primary">{__("messages.section_titles.testimonials.title")}</span>
          <span className="text-public-active">{__("messages.section_titles.testimonials.subtitle")}</span>
        </h2>
      </AnimatedHeading>
      <div className="mx-auto px-4 sm:px-18">

        {/* Testimonial slider container */}
        <div className="relative max-w-7xl mx-auto px-4 overflow-hidden">
          <TestimonialSlider />
        </div>
      </div>
    </section>
  )
}

export default Testimonials
