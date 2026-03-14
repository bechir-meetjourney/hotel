/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useMemo } from "react";
import { router } from "@inertiajs/react";
import PublicLayout from "@/layouts/public-layout";
import SetupBanner from "@/components/public/setup/SetupBanner";
import { plans } from "@/components/public/Pricing/plans";
import AnimatedHeading from '@/components/motion/AnimatedHeading'
import { useLang } from '@/hooks/useLang'

export default function Review() {
  const { __ } = useLang()
  // Collect all parameters passed from previous steps (typed)
  type QsParams = {
    plan_key?: string
    plan_name?: string
    template_id?: string
    template_title?: string
    org_name_ar?: string
    org_name_en?: string
    site_url?: string
    username?: string
    email?: string
    password?: string
  }

  const qsParams = useMemo<QsParams>(() => {
    if (typeof window === "undefined") return {};
    const qs = new URLSearchParams(window.location.search);
    return {
      plan_key: qs.get("plan_key") ?? "",
      plan_name: qs.get("plan_name") ?? "",
      template_id: qs.get("template_id") ?? "",
      template_title: qs.get("template_title") ?? "",
      org_name_ar: qs.get("org_name_ar") ?? "",
      org_name_en: qs.get("org_name_en") ?? "",
      site_url: qs.get("site_url") ?? "",
      username: qs.get("username") ?? "",
      email: qs.get("email") ?? "",
      // Password is passed temporarily in the preview only (will be removed and replaced with POST)
      password: qs.get("password") ?? "",
    };
  }, []);

  // Selected plan details
  const plan = useMemo(() => {
    const found = plans.find((p) => p.key === qsParams.plan_key);
    return found ?? {
      key: "",
      name: qsParams.plan_name || "—",
      price: "0",
      period: "",
      vatNote: "",
    };
  }, [qsParams]);

  // Convert price to number and format
  const priceNumber = useMemo(
    () => Number(String((plan as any).price).replace(/,/g, "")) || 0,
  [plan]
  );

  const priceFormatted = useMemo(
    () => priceNumber.toLocaleString("en-US"),
    [priceNumber]
  );

  // Setup fees (demo: 0)
  const setupFees = 0;
  const total = priceNumber + setupFees;

  // Next due date: one year from today
  const nextDue = useMemo(() => {
    const d = new Date();
    d.setFullYear(d.getFullYear() + 1);
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}/${m}/${day}`;
  }, []);

  const goPrev = () => {
    router.visit("/setup/account", {
      method: "get",
      data: { ...(qsParams as any) },
      preserveScroll: true,
    });
  };

  function replace(text: string, replaces: Record<string, string | number>) {
    return Object.entries(replaces).reduce((acc, [k, v]) => acc.replaceAll(`{${k}}`, String(v)), text)
  }

  const goNext = () => {
  // Next here = "Create site" → proceed to payment step
    router.visit("/setup/payment-method", {
      method: "get",
      data: { ...(qsParams as any) },
      preserveScroll: true,
    });
  };

  return (
    <PublicLayout>

      <section className="py-10">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <SetupBanner />
          {/* Card */}
          <div className="mx-auto rounded-3xl border border-public-border bg-white p-6 sm:p-8 shadow-sm">
            <AnimatedHeading dir="up" delay={0.30}>
              <h1 className="mb-6 text-center text-2xl sm:text-3xl font-extrabold text-public-primary">
                {__("messages.setup.review.title")}
              </h1>
            </AnimatedHeading>
            {/* Simple table: description / total */}
            <div className="mx-auto max-w-4xl">
              <div className="grid grid-cols-2 border-b pb-4 text-sm sm:text-base font-bold text-slate-900">
                <div className="text-right">{__("messages.setup.review.table.description")}</div>
                <div className="text-left">{__("messages.setup.review.table.total")}</div>
              </div>

              {/* Row: plan */}
              <div className="grid grid-cols-2 py-4 border-b">
                <div className="text-right text-slate-700">
                  {__("messages.setup.review.plan_label")} {plan.name} {plan.period ? ` / ${plan.period}` : ""}
                </div>
                <div className="text-left font-semibold">
                  {priceFormatted} {__("messages.common.currency")}
                  {plan.period ? ` / ${plan.period}` : ""}
                </div>
              </div>

              {/* Row: setup fees */}
              <div className="grid grid-cols-2 py-4 border-b">
                <div className="text-right text-slate-700">{__("messages.setup.review.setup_fees")}</div>
                <div className="text-left font-semibold">
                  {setupFees.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                  {" "}{__("messages.common.currency")}
                </div>
              </div>

              {/* Row: grand total */}
              <div className="grid grid-cols-2 py-4">
                <div className="text-right font-bold text-slate-900">{__("messages.setup.review.total_label")}</div>
                <div className="text-left font-extrabold">
                  {total.toLocaleString("en-US")} {__("messages.common.currency")}
                </div>
              </div>

              {/* Next due line */}
              <div className="mt-3 text-xs sm:text-sm text-slate-600">
                {replace(__("messages.setup.review.next_due_template"), {
                  period: plan.period ? __("messages.setup.review.period_after_year") : "",
                  price: priceFormatted + ' ' + __("messages.common.currency"),
                  date: nextDue,
                })}
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-8 flex items-center justify-between">
              <button
                type="button"
                onClick={goPrev}
                className="rounded-xl border border-public-primary bg-white px-5 py-2 font-semibold text-public-primary hover:bg-public-primary/5"
              >
                {__("messages.setup.review.previous")}
              </button>

              <button
                type="button"
                onClick={goNext}
                className="rounded-xl bg-public-primary px-6 py-2 font-semibold text-white hover:opacity-90"
              >
                {__("messages.setup.review.create_site")}
              </button>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
