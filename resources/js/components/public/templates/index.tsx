// resources/js/components/public/templates/index.tsx
import React, { useMemo, useState } from 'react'
import SectionTitle from './SectionTitle'
import BrowseMoreButton from './BrowseMoreButton'
import BackgroundSection from './BackgroundSection'
import FiltersBar from './FiltersBar'
import TemplatesGrid from './TemplatesGrid'
import { FILTERS, TEMPLATES, type Region } from './constants'
import { useLang } from '@/hooks/useLang'

import AnimatedHeading from '@/components/motion/AnimatedHeading'

/**
 * Templates component - Template showcase section
 * Displays hotel templates with filtering by region and browse more functionality
 */
export default function 
Templates() {
  const { __ } = useLang()

  // Active filter state (use localized "all")
const [active, setActive] = useState<Region>('all')

  // Filter templates based on active region (active is a key)
  const filtered = useMemo(() => {
    if (active === 'all') return TEMPLATES
    return TEMPLATES.filter((t) => t.region === active)
  }, [active])

  return (
    <section id="templates">
        
      {/* Section title */}
      <SectionTitle />

      {/* Main content with background */}
      <BackgroundSection>

        <div className="relative mx-auto w-full 2xl:max-w-full 2xl:px-22 px-4 py-12 sm:py-20">
          {/* Section heading */}
          <AnimatedHeading dir="up" delay={0.25}>
                      <h3 className="text-center py-6 sm:py-0 text-white text-3xl sm:text-5xl  3xl:text-7xl font-bold">
                        <span className='mx-2 text-public-secondary'>
                           {__("messages.section_titles.templates.title")} 
                        </span>
                         {__("messages.section_titles.templates.subtitle")} 
                      </h3>
          </AnimatedHeading>

          {/* Region filter bar */}
          <FiltersBar filters={FILTERS} active={active} onChange={setActive} />

          {/* Templates grid display */}
          <TemplatesGrid items={filtered} />

          {/* Browse more button */}
          
          <BrowseMoreButton href="/templates" label={__("messages.templates_section.browse_more")} />
        </div>
      </BackgroundSection>
    </section>
  )
}
