/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useMemo, useState } from "react";
import PublicLayout from "@/layouts/public-layout";
import SetupBanner from "@/components/public/setup/SetupBanner";
import FormInput from "@/components/public/setup/FormInput";
import { plans } from "@/components/public/Pricing/plans";
import { CheckCircle2 } from "lucide-react";
import AnimatedHeading from '@/components/motion/AnimatedHeading'
import { useLang } from '@/hooks/useLang'

export default function Pay() {
  const { __ } = useLang()
  type Params = { plan_key?: string; plan_name?: string; email?: string; phone?: string; total?: string }
  const params = useMemo<Params>(() => {
    if (typeof window === "undefined") return {};
    const q = new URLSearchParams(window.location.search);
    return {
      plan_key: q.get("plan_key") ?? "",
      plan_name: q.get("plan_name") ?? "",
      email: q.get("email") ?? "",
      phone: q.get("phone") ?? "",
      total: q.get("total") ?? "",
    };
  }, []);

  const total = useMemo(() => {
    if (params.total) return Number(String(params.total).replace(/,/g, "")) || 0;
  const p = plans.find((x) => x.key === params.plan_key);
    return p ? Number(String(p.price).replace(/,/g, "")) || 0 : 0;
  }, [params]);

  const maskedEmail = useMemo(() => {
  const e = params.email || "";
    const [u, d] = e.split("@");
    if (!u || !d) return e;
    return (u[0] ?? "") + "•••@" + d;
  }, [params]);

  const maskedPhone = useMemo(() => {
  const p = params.phone || "";
    return p.length > 4 ? "•••" + p.slice(-4) : p;
  }, [params]);

  const [isPaying, setIsPaying] = useState(false);
  const [success, setSuccess] = useState(false);

  const [card, setCard] = useState("4242 4242 4242 4242");
  const [exp, setExp]   = useState("12/34");
  const [cvc, setCvc]   = useState("123");
  const [holder, setHolder] = useState("isa alfares");

  const pay = () => {
    setIsPaying(true);
    setTimeout(() => {
      setIsPaying(false);
      setSuccess(true);
    }, 900);
  };

  function replace(text: string, replaces: Record<string, string>) {
    return Object.entries(replaces).reduce((acc, [k, v]) => acc.replaceAll(`{${k}}`, v), text)
  }

  return (
    <PublicLayout>

      <section className="py-10">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <SetupBanner title={__("messages.setup.banner.thanks_title")} subtitle={__("messages.setup.banner.thanks_subtitle")} />
          <div className="mx-auto rounded-3xl border border-public-border bg-white p-6 sm:p-8 shadow-sm">
            <AnimatedHeading dir="up" delay={0.30}>
              <h1 className="mb-6 text-center text-2xl sm:text-3xl font-extrabold text-public-primary">
                {__("messages.setup.pay.title")}
              </h1>
            </AnimatedHeading>
            {!success ? (
              <div className="mx-auto max-w-3xl">
                <div className="grid gap-5">
                  <FormInput
                    id="card"
                    label={__("messages.setup.pay.card_label")}
                    placeholder={__("messages.setup.pay.card_placeholder")}
                    value={card}
                    onChange={setCard}
                    inputMode="numeric"
                  />
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <FormInput
                      id="exp"
                      label={__("messages.setup.pay.exp_label")}
                      placeholder={__("messages.setup.pay.exp_placeholder")}
                      value={exp}
                      onChange={setExp}
                      inputMode="numeric"
                    />
                    <FormInput
                      id="cvc"
                      label={__("messages.setup.pay.cvc_label")}
                      placeholder={__("messages.setup.pay.cvc_placeholder")}
                      value={cvc}
                      onChange={setCvc}
                      inputMode="numeric"
                    />
                    <FormInput
                      id="holder"
                      label={__("messages.setup.pay.holder_label")}
                      placeholder={__("messages.setup.pay.holder_placeholder")}
                      value={holder}
                      onChange={setHolder}
                    />
                  </div>
                </div>

                {/* Short summary */}
                <div className="mt-6 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-slate-700">{__("messages.setup.pay.package_label")}</span>
                    <span className="font-semibold">{(params as any).plan_name || "—"}</span>
                  </div>
                  <div className="mt-2 h-px bg-slate-200" />
                  <div className="mt-2 flex items-center justify-between">
                    <span className="font-bold text-slate-900">{__("messages.setup.pay.will_charge_label")}</span>
                    <span className="font-extrabold">{total.toLocaleString("en-US")} {__("messages.common.currency")}</span>
                  </div>
                </div>

                {/* Pay button */}
                <button
                  type="button"
                  onClick={pay}
                  disabled={isPaying}
                  className="mt-6 w-full rounded-xl bg-public-primary px-6 py-3 font-semibold text-white hover:opacity-90 disabled:opacity-60"
                >
                  {isPaying ? __("messages.setup.pay.processing") : __("messages.setup.pay.pay_now")}
                </button>

                {/* Demo notice */}
                <p className="mt-3 text-center text-xs text-slate-500">
                  {__("messages.setup.pay.demo_note")}
                </p>
              </div>
            ) : (
              // Success screen
              <div className="mx-auto max-w-3xl text-center">
                <div className="mx-auto mb-4 grid size-16 place-items-center rounded-full bg-emerald-50">
                  <CheckCircle2 className="size-8 text-emerald-600" aria-hidden />
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-emerald-700">
                  {__("messages.setup.pay.success_title")}
                </h2>
                <p className="mt-2 text-sm text-slate-600">
                  {replace(__("messages.setup.pay.success_sms"), { phone: maskedPhone })}
                  {params && (params as any).email ? (
                    <>{" "}{replace(__("messages.setup.pay.success_email"), { email: maskedEmail })}</>
                  ) : null}
                </p>

                <div className="mt-6 rounded-xl border border-slate-200 bg-white p-4 shadow-sm text-start">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-700">{__("messages.setup.pay.plan_label")}</span>
                    <span className="font-semibold">{(params as any).plan_name || "—"}</span>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-slate-700">{__("messages.setup.pay.paid_amount_label")}</span>
                    <span className="font-extrabold">{total.toLocaleString("en-US")} {__("messages.common.currency")}</span>
                  </div>
                </div>

                <a
                  href="/"
                  className="mt-6 inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50"
                >
                  {__("messages.setup.pay.back_home")}
                </a>
              </div>
            )}
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
