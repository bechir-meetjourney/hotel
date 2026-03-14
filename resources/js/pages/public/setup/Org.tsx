import React, { useMemo, useState } from "react";
import { router } from "@inertiajs/react";
import PublicLayout from "@/layouts/public-layout";
import FormInput from "@/components/public/setup/FormInput";
import SetupBanner from '@/components/public/setup/SetupBanner'

import AnimatedHeading from '@/components/motion/AnimatedHeading'
import { useLang } from '@/hooks/useLang'

export default function Org() {
  const { __ } = useLang()
  // Read plan/template parameters from the query string
  const qsParams = useMemo(() => {
    if (typeof window === "undefined") return {};
    const qs = new URLSearchParams(window.location.search);
    return {
      plan_key: qs.get("plan_key") ?? "",
      plan_name: qs.get("plan_name") ?? "",
      template_id: qs.get("template_id") ?? "",
      template_title: qs.get("template_title") ?? "",
    };
  }, []);

  const [nameAr, setNameAr]   = useState("");
  const [nameEn, setNameEn]   = useState("");
  const [errors, setErrors]   = useState<{ nameAr?: string; nameEn?: string }>({});

  const slug = useMemo(() => {
    const s = nameEn.trim().toLowerCase()
      .replace(/[\s_]+/g, "-")
      .replace(/[^a-z0-9-]/g, "")
      .replace(/-+/g, "-")
      .replace(/^-|-$|_/g, "");
    return s;
  }, [nameEn]);

  const siteUrl = slug ? `www.${slug}.com` : "www.example.com";

  const submitNext = () => {
    const nextErrors: typeof errors = {};
  if (!nameAr.trim()) nextErrors.nameAr = __("messages.setup.org.required_field");
  if (!nameEn.trim()) nextErrors.nameEn = __("messages.setup.org.required_field");
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    router.visit("/setup/account", {
      method: "get",
      data: { ...qsParams, org_name_ar: nameAr, org_name_en: nameEn, site_url: siteUrl },
      preserveScroll: true,
    });
  };

  const goPrev = () => {
    router.visit("/setup/template", { method: "get", data: { ...qsParams }, preserveScroll: true });
  };

  return (
    <PublicLayout>

      <section className="py-10">
  {/* Reuse main section container */}
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
      <SetupBanner />
          {/* Wide heading */}

          {/* Form card with width matching plans/templates */}
          <div className="mx-auto rounded-3xl border border-public-border bg-white p-6 sm:p-8 shadow-sm">
          <AnimatedHeading dir="up" delay={0.30}>
            <h1 className="mb-6 text-center text-2xl sm:text-3xl font-extrabold text-public-primary">
              {__("messages.setup.org.title")}
            </h1>
          </AnimatedHeading>
            <div className="grid gap-5">
              <FormInput
                id="nameAr"
                label={__("messages.setup.org.name_ar_label")}
                placeholder={__("messages.setup.org.name_ar_placeholder")}
                value={nameAr}
                onChange={setNameAr}
                required
                error={errors.nameAr ?? null}
              />

              <FormInput
                id="nameEn"
                label={__("messages.setup.org.name_en_label")}
                placeholder={__("messages.setup.org.name_en_placeholder")}
                value={nameEn}
                onChange={setNameEn}
                required
                error={errors.nameEn ?? null}
                inputMode="text"
              />

              {/* Dynamic site URL preview */}
              <div className="mt-1 flex flex-wrap items-center justify-end gap-2 text-sm">
                <span className="text-slate-700">{__("messages.setup.org.site_url_label")}</span>
                <a
                  href={`https://${siteUrl}`}
                  target="_blank"
                  rel="noreferrer"
                  className="font-bold text-public-primary hover:opacity-90"
                >
                  {siteUrl}
                </a>
              </div>

              <p className="text-[12px] font-semibold text-red-600">
                {__("messages.setup.org.site_url_note")}
              </p>
            </div>

            {/* Navigation buttons */}
            <div className="mt-8 flex items-center justify-between">
              <button
                type="button"
                onClick={goPrev}
                className="rounded-xl border border-public-primary bg-white px-5 py-2 font-semibold text-public-primary hover:bg-public-primary/5"
              >
                {__("messages.setup.org.previous")}
              </button>

              <button
                type="button"
                onClick={submitNext}
                className="rounded-xl bg-public-primary px-6 py-2 font-semibold text-white hover:opacity-90"
              >
                {__("messages.setup.org.next")}
              </button>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
