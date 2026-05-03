// PlanCard: renders an individual pricing plan card used in the pricing section
// File: src/components/public/Pricing/PlanCard.tsx
import React from "react";
import { useLang } from '@/hooks/useLang'
import { CheckCircle2, Clock } from "lucide-react";
import type { Plan } from "./types";

// Decorative line images
import line from "@/assets/images/icons/line.svg";
import whiteline from "@/assets/images/icons/white-line.svg";
import price from "@/assets/images/icons/price.svg";
import whiteprice from "@/assets/images/icons/white-price.svg";
import map from "@/assets/images/prices-icons/map.jpg";
import bg from "@/assets/images/prices-icons/bg.svg";

type Props = {
  plan: Plan
  onSubscribe?: (plan: Plan) => void  // Optional callback invoked when the subscribe button is clicked
}

/**
 * Divider component - Decorative divider with line and icon
 * @param variant - Plan variant to determine styling
 */
const Divider: React.FC<{ variant: Plan["variant"] }> = ({ variant }) => {
  const bar = variant === "solid" ? "bg-slate-800" : "bg-slate-200";
  const img = variant === "solid" ? "opacity-80" : "opacity-0";
  const src = variant === "solid" ? whiteline : line;

  return (
    <div className="mx-auto my-4 flex w-full items-center justify-center gap-4">
      <span className={`h-px w-2/5 ${bar}`} aria-hidden />
      <img src={src} alt="خط فاصل" aria-hidden className={`h-3 w-auto ${img}`} />
      <span className={`h-px w-2/5 ${bar}`} aria-hidden />
    </div>
  );
};

/**
 * PlanCard component - Individual pricing plan card
 * Displays plan details including name, price, features, and subscription button
 * @param plan - Plan object containing all plan information
 */
const PlanCard: React.FC<Props> = ({ plan, onSubscribe }) => {
  // Base styling classes
  const base =
    "relative flex h-full flex-col items-center  rounded-2xl border p-6 text-center shadow-sm transition-shadow";
  
  // Color palette based on plan variant
  const palette =
    plan.variant === "solid"
      ? "bg-radial-[at_10%_100%] from-[#01004C] via-[#006c70] to-[#01004C] to-100% text-[#CCD4DC] border-[#027F84] scale-105 shadow-xl relative"
      : plan.variant === "soft"
      ? "bg-gradient-to-r from-indigo-50 from-10% via-public-primary/10 via-50% to-emerald-50 to-90% text-public-primary border-slate-200"
      : "bg-white text-slate-900 border-slate-200";

  // Price icon based on variant
  const priceIcon = plan.variant === "solid" ? whiteprice : price;
  const { __ } = useLang()

  return (
    <div className={`${base} ${palette} ${plan.comingSoon ? 'opacity-70 grayscale' : ''}`}>
      {plan.comingSoon && (
        <div className="absolute top-3 end-3 z-20 inline-flex items-center gap-1 rounded-full bg-amber-500 px-3 py-1 text-xs font-bold text-white shadow">
          <Clock className="h-3.5 w-3.5" />
          قريباً
        </div>
      )}
      {/* Background SVG for solid variant */}
      {plan.variant === "solid" && (
        <div className="absolute inset-0 -z-1 overflow-hidden rounded-2xl">
          <img src={bg} alt="خلفية البطاقة" className="w-[7000px] h-[610px] object-cover rotate-12 opacity-20" />
        </div>
      )}
      
      {/* Plan header with icon and name */}
  <div className="flex flex-col items-center gap-3" aria-label={plan.nameKey ? __(plan.nameKey) : plan.name}>
        <div
          className={
            plan.variant === "solid"
              ? "grid h-12 w-12 place-items-center rounded-xl bg-[#005D61]"
              : "grid h-12 w-12 place-items-center rounded-xl bg-white shadow"
          }
        >
          <img src={plan.iconSrc} alt={plan.iconAlt ?? `أيقونة خطة ${plan.name}`} className="h-7 w-7" />
        </div>
  <h3 className="text-2xl font-bold tracking-tight">{plan.nameKey ? __(plan.nameKey) : plan.name}</h3>
      </div>

      {/* Plan description placeholder */}
      <p
        className={`mt-4 max-w-xs text-sm ${
          plan.variant === "solid" ? "text-[#CCD4DC]/80" : "text-slate-500"
        }`}
      >
        {/* Plan description can be added here if needed */}
      </p>

      {/* Decorative dividers */}
      <div className="mx-auto my-2 h-px w-2/3 bg-slate-200" />
      <div className="mx-auto mb-4 h-px w-2/5 bg-slate-200" />

      {/* Price section */}
  <div className="mt-2" aria-label={__("messages.pricing.price_label_aria")}>
        <div className="flex items-baseline justify-center gap-3">
          <span
            className={`text-sm md:text-base ${
              plan.variant === "solid" ? "text-[#CCD4DC]/80" : "text-slate-500"
            }`}
          >
            {plan.periodKey ? __(plan.periodKey) : (plan.period ?? __("messages.pricing.period_yearly"))}
          </span>

          <span
            className="text-3xl md:text-5xl font-extrabold leading-none tracking-tight"
          >
            {plan.price}
          </span>

          <span className="inline-flex items-baseline">
            <img
              src={priceIcon}
              alt="ريال سعودي"
              aria-hidden
              className="h-6 w-auto md:h-7"
            />
            <span className="sr-only">{__("messages.pricing.currency_sr")}</span>
          </span>
        </div>

        {/* VAT note if provided */}
    {(plan.vatNoteKey || plan.vatNote) && (
          <div
            className={`mt-2 text-[11px] ${
              plan.variant === "solid" ? "text-[#E7EDF3]" : "text-slate-600"
            }`}
          >
      {plan.vatNoteKey ? __(plan.vatNoteKey) : plan.vatNote}
          </div>
        )}
      </div>

      {/* Decorative divider */}
      <Divider variant={plan.variant} />

      {/* Features list */}
  <ul className="mt-6 w-full space-y-3 text-right" aria-label={__("messages.pricing.features_list_aria")}>
  {plan.features.map((f, i) => (
          <li key={i} className="flex items-start gap-2">
            <CheckCircle2
              className={`mt-0.5 h-4 w-4 flex-none ${
                plan.variant === "solid" ? "text-emerald-300" : "text-emerald-500"
              }`}
              aria-hidden
            />
            <span
              className={`text-sm ${
                plan.variant === "solid" ? "text-[#E7EDF3]" : "text-slate-700 dark:text-slate-200"
              }`}
            >
              {plan.featuresKeys && plan.featuresKeys[i] ? __(plan.featuresKeys[i]) : f}
            </span>
          </li>
        ))}
      </ul>

      {/* Subscribe button */}
      <div className="mt-auto pt-6">
  <button
          type="button"
          disabled={plan.comingSoon}
          onClick={() => onSubscribe?.(plan)}  // Invoke callback and pass the selected plan
          className={`${
            plan.variant === "solid"
              ? "w-full rounded-lg bg-public-button   border-gray-100/50 border hover:bg-public-primary duration-300 px-6 sm:px-12 py-2 text-white shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/60 cursor-pointer"
              : "w-full rounded-lg bg-public-primary hover:border-gray-700  hover:bg-public-button duration-300 px-6 sm:px-12 py-2 text-white shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-slate-900/60 cursor-pointer"
          } ${plan.comingSoon ? 'opacity-60 cursor-not-allowed' : ''}`}
          aria-label={__("messages.pricing.subscribe_button_aria", { plan: plan.name })}
        >
          {plan.comingSoon ? 'قريباً' : __("messages.pricing.subscribe_button")}
        </button>
      </div>
    </div>
  );
};

export default PlanCard;
