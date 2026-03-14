import React, { useMemo, useState } from "react";
import { router } from "@inertiajs/react";
import PublicLayout from "@/layouts/public-layout";
import SetupBanner from "@/components/public/setup/SetupBanner";
import FormInput from "@/components/public/setup/FormInput";

import AnimatedHeading from '@/components/motion/AnimatedHeading'
import { useLang } from '@/hooks/useLang'

export default function Account() {
  const { __ } = useLang()
  // Read and preserve parameters coming from previous setup steps
  const qsParams = useMemo(() => {
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
    };
  }, []);

  // Local form fields
  const [username, setUsername] = useState("");
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors]     = useState<{ username?: string; email?: string; password?: string }>({});

  // Simple validation
  const validate = () => {
    const e: typeof errors = {};
    if (!username.trim()) e.username = __("messages.setup.account_information.required_field");
    if (!email.trim()) e.email = __("messages.setup.account_information.required_field");
    else if (!/^\S+@\S+\.\S+$/.test(email)) e.email = __("messages.setup.account_information.invalid_email");
    if (!password) e.password = __("messages.setup.account_information.required_field");
    else if (password.length < 8) e.password = replacePlaceholders(__("messages.setup.account.password_min"), { min: 8 });
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  function replacePlaceholders(text: string, replaces: Record<string, string | number>) {
    return Object.entries(replaces).reduce((acc, [k, v]) => acc.replaceAll(`{${k}}`, String(v)), text)
  }

  const goPrev = () => {
    router.visit("/setup/org", {
      method: "get",
      data: { ...qsParams },
      preserveScroll: true,
    });
  };

  const submitNext = () => {
    if (!validate()) return;

    router.visit("/setup/review", {
      method: "get",
      data: {
        ...qsParams,
        username,
        email,
  // Temporary: passing password in query for preview only — in production use POST + session/draft
        password,
      },
      preserveScroll: true,
    });
  };

  return (
    <PublicLayout>

      <section className="py-10">
  {/* Reuse main section container */}
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <SetupBanner /> 
          {/* Form card */}
          <div className="mx-auto rounded-3xl border border-public-border bg-white p-6 sm:p-8 shadow-sm">
            <AnimatedHeading dir="up" delay={0.30}>
              <h1 className="mb-6 text-center text-2xl sm:text-3xl font-extrabold text-public-primary">
                  {__("messages.setup.account_information.title")}
                </h1>
            </AnimatedHeading>
            <div className="grid gap-5">
              <FormInput
                id="username"
                  label={__("messages.setup.account_information.username_label")}
                  placeholder={__("messages.setup.account_information.username_placeholder")}
                value={username}
                onChange={setUsername}
                required
                error={errors.username ?? null}
                inputMode="text"
              />

              <FormInput
                id="email"
                type="email"
                label={__("messages.setup.account_information.email_label")}
                placeholder={__("messages.setup.account_information.email_placeholder")}
                value={email}
                onChange={setEmail}
                required
                error={errors.email ?? null}
                inputMode="email"
              />

              <FormInput
                id="password"
                type="password"
                label={__("messages.setup.account_information.password_label")}
                placeholder={__("messages.setup.account_information.password_placeholder")}
                value={password}
                onChange={setPassword}
                required
                error={errors.password ?? null}
                inputMode="text"
              />
            </div>

            {/* Navigation buttons */}
            <div className="mt-8 flex items-center justify-between">
              <button
                type="button"
                onClick={goPrev}
                className="rounded-xl border border-public-primary bg-white px-5 py-2 font-semibold text-public-primary hover:bg-public-primary/5"
              >
                {__("messages.setup.account_information.previous")}
              </button>

              <button
                type="button"
                onClick={submitNext}
                className="rounded-xl bg-public-primary px-6 py-2 font-semibold text-white hover:opacity-90"
              >
                {__("messages.setup.account_information.next")}
              </button>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
