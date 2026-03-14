// resources/js/pages/public/setup/Plan.tsx
import React, { useMemo } from 'react'
import { router, Head } from '@inertiajs/react'
import PublicLayout from '@/layouts/public-layout'
import SetupBanner from '@/components/public/setup/SetupBanner'
import PlanCard from '@/components/public/Pricing/PlanCard'
import { plans } from '@/components/public/Pricing/plans'


import AnimatedHeading from '@/components/motion/AnimatedHeading'
import AnimatedParagraph from '@/components/motion/AnimatedParagraph'
import { useLang } from '@/hooks/useLang'


export default function Plan() {
  const { __ } = useLang()
  // Read template data from the query string (controller not used here)
  const { template_id, template_title } = useMemo(() => {
    if (typeof window === 'undefined') return { template_id: '', template_title: '' }
    const qs = new URLSearchParams(window.location.search)
    return {
      template_id: qs.get('template_id') ?? '',
      template_title: qs.get('template_title') ?? '',
    }
  }, [])

  const handleSubscribe = (plan: { key: string; name: string }) => {
    router.visit('/setup/org', {
      method: 'get',
      data: {
        plan_key: plan.key,
        plan_name: plan.name,
        template_id,
        template_title,
      },
      preserveScroll: true,
    })
  }

  return (
    <PublicLayout>
      <Head title="اختيار خطة الاشتراك | ضيافة - نظام إدارة الفنادق">
        <meta name="description" content="اختر خطة الاشتراك المناسبة لمنشأتك السياحية. خطط متنوعة لتلبية احتياجات الفنادق والشقق المفروشة من جميع الأحجام." />
        <meta name="keywords" content="خطط اشتراك, أسعار نظام ضيافة, باقات إدارة فنادق, اشتراكات شهرية, باقات سنوية" />
      </Head>

  {/* Subtitles under banner */}
      <section className="bg-white p-6 mx-auto max-w-screen-xl">
      <SetupBanner />
      <div className='sm:border sm:rounded-2xl sm:shadow'>
        <div className=" px-4 sm:p-6 lg:p-8 text-center">
          <AnimatedHeading dir="up" delay={0.30}>
            <h2 className="text-xl sm:text-3xl font-bold text-public-primary">
              {__("messages.setup.plan.selected_template_label")}
              <span className="text-public-active mx-2">
                {template_title || __("messages.setup.plan.no_template_placeholder")}
              </span>
            </h2>
          </AnimatedHeading>
          <AnimatedParagraph dir="none" delay={0.70}>  
            <p className="mt-2 text-lg sm:text-xl text-public-sub-title">
              {__("messages.setup.plan.choose_plan_prompt")}
            </p>
          </AnimatedParagraph>
        </div>
        {/* Plans grid */}

        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 py-10">
          <div className="mx-auto grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {plans.map((p) => (
              <PlanCard key={p.key} plan={p} onSubscribe={handleSubscribe} />
            ))}
          </div>
        </div>
      </div>
      </section>
    </PublicLayout>
  )
}
