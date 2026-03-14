// components/public/home/HowWeWork/index.tsx
import React from "react";
import HowWeWorkPath from "./HowWeWorkPath";
import SectionBg from "./SectionBg";

import template1 from "@/assets/images/how-work-icons/template-1-icon.svg";
import template2 from "@/assets/images/how-work-icons/template-2-icon.svg";
import template3 from "@/assets/images/how-work-icons/template-3-icon.svg";
import bg from "@/assets/images/how-work-icons/how-we-work-background-3.png";
import bgltr from "@/assets/images/how-work-icons/how-we-work-background-4.png";
import mobilebg from "@/assets/images/how-work-icons/how-we-work-mobile-background.svg";
import AnimatedHeading from '@/components/motion/AnimatedHeading'
import { useLang } from '@/hooks/useLang'
import { usePage } from '@inertiajs/react'
/**
 * HowWeWork component - Section explaining how the service works
 * Utilizes HowWeWorkPath to illustrate the steps with icons and descriptions
 */
export default function HowWeWork() {
  const { __ } = useLang()
  const page = usePage();
  const { locale } = (page.props as unknown) as { locale: string };

  const steps = {
    one: {
      label: __("messages.how_we_work.steps.one.label"),
      body: __("messages.how_we_work.steps.one.body"),
    },
    two: {
      label: __("messages.how_we_work.steps.two.label"),
      body: __("messages.how_we_work.steps.two.body"),
      list: __("messages.how_we_work.steps.two.list").split('|'),
    },
    three: {
      label: __("messages.how_we_work.steps.three.label"),
      body: __("messages.how_we_work.steps.three.body"),
    },
  }

  return (
    
    <section id="how-we-work" className="">
      {/* Mobile/Tablet bg (cover ON) */}
      {/* <SectionBg src={mobilebg} className="xl:hidden" cover /> */}

      {/* Desktop bg (cover OFF) */}
    <div className="relative w-full
        min-h-[500px] 
        [@media(min-width:1100px)]:min-h-[410px]
        [@media(min-width:1300px)]:min-h-[467px]   
        [@media(min-width:1500px)]:min-h-[513px] 
        [@media(min-width:1700px)]:min-h-[571px] 
        [@media(min-width:1800px)]:min-h-[617px] 
        [@media(min-width:2100px)]:min-h-[683px]
        [@media(min-width:2300px)]:min-h-[770px]
        [@media(min-width:2500px)]:min-h-[823px]
        [@media(min-width:2700px)]:min-h-[925px] 
        [@media(min-width:2900px)]:min-h-[1234px] 
        [@media(min-width:4000px)]:min-h-[1852px] 
        [@media(min-width:6000px)]:min-h-[2470px] 

        hidden  xl:block ">
          <SectionBg src={locale === 'en' ? bgltr : bg} className="hidden xl:block" />
    </div>
    
    <div className="bg-public-primary w-full py-8">
        <AnimatedHeading dir="up" delay={0.30}>
          <h2 className="text-center text-3xl  font-extrabold text-white">
            {__("messages.how_we_work.title")}
          </h2>
        </AnimatedHeading>
          <HowWeWorkPath
          labelClassName="my-2 text-lg   sm:text-xl 2xl:text-2xl"
          icons={{
            one:   <img src={template1} alt="رمز القالب الأول" className="pointer-events-none select-none object-contain" />,
            two:   <img src={template2} alt="رمز القالب الثاني" className="pointer-events-none select-none object-contain" />,
            three: <img src={template3} alt="رمز القالب الثالث" className="pointer-events-none select-none object-contain" />,
          }}
          labels={{
            one: steps.one.label,
            two: steps.two.label,
            three: steps.three.label,
          }}
          bodies={{
            one: steps.one.body,
            two: (
              <>
                <div className="px-2">{steps.two.body}</div>
                <ul className="mt-2 list-inside list-disc">
                  {steps.two.list.map((li, i) => (
                    <li key={i}>{li}</li>
                  ))}
                </ul>
              </>
            ),
            three: steps.three.body,
          }}
          iconSize={150}
          iconSizeMobile={120}
          positions={{
            desktop: {
              one:   { top: "22%", left: "73%", anchor: "below" },
              two:   { top: 83,    left: 50,    anchor: "above", offset: 8 },
              three: { top: "20%", left: "29%", anchor: "below" },
            },

            lg: {
              one:   { top: "24%", left: "72%" },            
              two:   { top: 80,    left: 50,  anchor: "above" },
              three: { top: "21%", left: "30%" },
            },

            xl: {
              one:   { top: "22%", left: "78%", anchor: "below" },
              three: { top: "20%", left: "24%", anchor: "below" },
            },

            "2xl": {
              one:   { top: "22%", left: "74%", anchor: "below" },
              three: { top: "20%", left: "28%", anchor: "below" },
            },
          }}
          gap={12}
          dashArray="8 8"
          strokeWidth={2}
        />
    </div>
    </section>
    
  );
}
