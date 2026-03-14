import React, { useMemo, useState } from "react";
import { router } from "@inertiajs/react";
import PublicLayout from "@/layouts/public-layout";
import SetupBanner from "@/components/public/setup/SetupBanner";
import { plans } from "@/components/public/Pricing/plans";
import PaymentMethods from "@/components/public/setup/PaymentMethods/PaymentMethods";
import CustomerForm from "@/components/public/setup/forms/CustomerForm";
import OrderSummary from "@/components/public/setup/OrderSummary";
import Agreements from "@/components/public/setup/PaymentMethods/Agreements";

import { Trash2 } from "lucide-react";
import AnimatedHeading from '@/components/motion/AnimatedHeading'

type PM = "card" | "mada" | "apple" | "google" | "paypal" | "stc";

import { useLang } from '@/hooks/useLang'

export default function PaymentMethod() {
  const { __ } = useLang()
  // query params (typed)
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
    };
  }, []);

  // derived
  const plan = useMemo(() => plans.find(p => p.key === qsParams.plan_key), [qsParams]);
  const price = useMemo(
    () => Number(String(plan?.price ?? "0").replace(/,/g, "")) || 0,
    [plan]
  );

  // form state
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [orgName, setOrgName] = useState(qsParams.org_name_ar || "");

  // checkout state
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [pmethod, setPmethod] = useState<PM>("card");
  const [savePM, setSavePM] = useState(false);
  const [agree, setAgree] = useState(false);

  const [errors, setErrors] = useState<{
    firstName?: string; lastName?: string; city?: string; phone?: string; orgName?: string; agree?: string;
  }>({});

  // pricing
  const vatNoteValue = 115;
  const setupFees = 0;
  const subtotal = price + setupFees - discount;
  const total = subtotal;

  // coupon
  const applyCoupon = () => {
    if (coupon.trim().toUpperCase() === "SALE10") setDiscount(Math.round(price * 0.1));
    else setDiscount(0);
  };

  // validation
  const validate = () => {
    const e: typeof errors = {};
  if (!firstName.trim()) e.firstName = __("messages.setup.account.required_field");
  if (!lastName.trim())  e.lastName  = __("messages.setup.account.required_field");
  if (!city.trim())      e.city      = __("messages.setup.account.required_field");
  if (!phone.trim())     e.phone     = __("messages.setup.account.required_field");
  if (!orgName.trim())   e.orgName   = __("messages.setup.org.required_field" ) ;
  if (!agree)            e.agree     = __("messages.setup.payment.must_agree");
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const clearOrder = () => { setCoupon(""); setDiscount(0); };
  const confirm = () => {
    if (!validate()) return;
    router.visit("/setup/pay", {
      method: "get",
      data: {
        ...qsParams,
        first_name: firstName,
        last_name: lastName,
        city, phone,
        org_name_final: orgName,
        coupon, discount,
        payment_method: pmethod,
        save_payment_method: savePM ? 1 : 0,
        total,
      },
      preserveScroll: true,
    });
  };

  return (
    <PublicLayout>

      <section className="py-10">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <SetupBanner title={__("messages.setup.banner.thanks_title")} subtitle={__("messages.setup.banner.thanks_subtitle")} />
          <div className="mx-auto rounded-3xl border border-public-border bg-white p-6 shadow-sm sm:p-8">
            <AnimatedHeading dir="up" delay={0.30}>
              <h1 className="mb-8 text-center text-2xl font-extrabold text-public-primary sm:text-3xl">
                {__("messages.setup.payment.title")}
              </h1>
            </AnimatedHeading>
            {/* reset order */}
            <div className="my-2 flex justify-end">
              <button
                type="button"
                onClick={clearOrder}
                className="inline-flex items-center gap-2 rounded-md border border-black/70 px-3 py-1.5 text-sm font-semibold text-black/70 hover:bg-slate-50"
                title={__("messages.setup.payment.clear_title")}
              >
                <Trash2 className="h-4 w-4" />
                {__("messages.setup.payment.clear_button")}
              </button>
            </div>
            <div className="grid gap-8 lg:grid-cols-2">
              {/* right on desktop, last on mobile */}
              <div className="order-2 lg:order-1">
                <CustomerForm
                  firstName={firstName}
                  lastName={lastName}
                  city={city}
                  phone={phone}
                  orgName={orgName}
                  onChange={(f, v) => {
                    if (f === "firstName") setFirstName(v);
                    else if (f === "lastName") setLastName(v);
                    else if (f === "city") setCity(v);
                    else if (f === "phone") setPhone(v);
                    else if (f === "orgName") setOrgName(v);
                  }}
                  onSubmit={confirm}
                  errors={{
                    firstName: errors.firstName,
                    lastName: errors.lastName,
                    city: errors.city,
                    phone: errors.phone,
                    orgName: errors.orgName,
                  }}
                />
              </div>

              {/* left on desktop, first on mobile */}
              <aside className="order-1 lg:order-2 space-y-6">
                <OrderSummary
                  planName={plan?.name}
                  price={price}
                  coupon={coupon}
                  onCouponChange={setCoupon}
                  onApplyCoupon={applyCoupon}
                  discount={discount}
                  total={total}
                  vatNoteValue={vatNoteValue}
                />

                <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow sm:p-5">
                  <h3 className="mb-3 text-start text-sm font-bold text-slate-900">{__("messages.setup.payment.methods_title")}</h3>
                    <PaymentMethods value={pmethod} onChange={(v: string) => setPmethod(v as PM)} />
                  <Agreements
                    savePM={savePM}
                    onSavePMChange={setSavePM}
                    agree={agree}
                    onAgreeChange={setAgree}
                    error={errors.agree}
                  />
                </div>
              </aside>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
