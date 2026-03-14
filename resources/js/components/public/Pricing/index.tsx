// Pricing section: main component that renders pricing plans and handles subscribe actions
// File: src/components/public/Pricing/index.tsx
import React, { useMemo } from "react";
import { router } from "@inertiajs/react";
import PlanCard from "./PlanCard";
import { plans } from "./plans";
import { useLang } from '@/hooks/useLang'
import type { Plan } from "./types";


import AnimatedHeading from '@/components/motion/AnimatedHeading'

/**
 * Pricing component - Main pricing section
 * Displays all pricing plans in a responsive grid layout
 */
const Pricing: React.FC = () => {
  const { __ } = useLang()
  const { template_id, template_title } = useMemo(() => {
    if (typeof window === "undefined") return { template_id: "", template_title: "" };
    const qs = new URLSearchParams(window.location.search);
    return {
      template_id: qs.get("template_id") ?? "",
      template_title: qs.get("template_title") ?? "",
    };
  }, []);

  const handleSubscribe = (plan: Plan) => {
    router.visit("/setup/template", {
      method: "get",
      data: {
        plan_key: plan.key,
        plan_name: plan.name,
        template_id,
        template_title,
      },
      preserveScroll: true,
    });
  };

  return (
    <section id="pricing"  className="bg-white ">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <header className="mx-auto mb-10 max-w-2xl text-center">
          {/* Section title */}
        <AnimatedHeading dir="up" delay={0.30}>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 mx-2 mb-4 md:mb-14">
              {__("messages.section_titles.pricing.title")}
              <span className="text-public-active mx-2">
                {__("messages.section_titles.pricing.subtitle")}
              </span>
            </h2>
        </AnimatedHeading>
        </header>

        {/* Plans grid */}
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {plans.map((p) => (
            <PlanCard key={p.key} plan={p} onSubscribe={handleSubscribe} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
