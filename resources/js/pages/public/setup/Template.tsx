// resources/js/pages/public/setup/Template.tsx
import React, { useMemo, useState } from "react";
import { router, Head } from "@inertiajs/react";
import PublicLayout from "@/layouts/public-layout";
import SetupBanner from "@/components/public/setup/SetupBanner";
import { Eye } from "lucide-react";
import {
  TEMPLATES,
  type TemplateItem,
} from "@/components/public/templates/constants";
import AnimatedHeading from '@/components/motion/AnimatedHeading'
import { useLang } from '@/hooks/useLang'

export default function Template() {
  const { __ } = useLang()
  const [preview, setPreview] = useState<TemplateItem | null>(null);

  // Read plan/template data from the query string (temporary)
  const { plan_name, plan_key } = useMemo(() => {
    if (typeof window === "undefined") return { plan_name: "", plan_key: "" };
    const qs = new URLSearchParams(window.location.search);
    return {
      plan_name: qs.get("plan_name") ?? "",
      plan_key: qs.get("plan_key") ?? "",
    };
  }, []);

  // Navigate to step 3 (/setup/org) when a template is chosen
  const chooseTemplate = (item: TemplateItem) => {
    router.visit("/setup/org", {
      method: "get",
      data: {
        plan_key,
        plan_name,
        template_id: item.id,
        template_title: item.title,
      },
      preserveScroll: true,
    });
  };

  return (
    <PublicLayout>
      <Head title="اختيار قالب | إعداد حساب ضيافة">
        <meta name="description" content="اختر قالب التصميم المناسب لموقع الفندق أو الشقق المفروشة الخاص بك. قوالب متنوعة وتصاميم احترافية تناسب كافة احتياجاتك." />
        <meta name="keywords" content="قوالب فنادق, تصميم مواقع ضيافة, قوالب شقق مفروشة, اختيار قالب, إعداد حساب" />
      </Head>
  {/* Banner */}

      <section className=" p-6 mx-auto max-w-screen-xl">
      <SetupBanner />
        <div className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8 sm:border sm:rounded-2xl sm:shadow">
          {/* Title: selected plan */}
          <AnimatedHeading dir="up" delay={0.30}>
            <h2 className="text-center text-public-primary text-2xl sm:text-4xl font-bold">
              {__("messages.setup.template.selected_plan_label")}
              <span className="text-public-active mx-2">{plan_name || __("messages.setup.template.no_plan_placeholder")}</span>
            </h2>
          </AnimatedHeading>
          {/* Number of templates (demo) */}
          <p className="text-public-sub-title mt-3 text-center text-sm sm:text-base">
            {__("messages.setup.template.templates_count_label")}
            <span className="ms-2 inline-flex items-center justify-center rounded-md bg-public-sub-title px-3 py-1 text-sm font-bold text-white">
              {TEMPLATES.length}
            </span>
          </p>

          {/* Templates grid — no filters */}
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
            {TEMPLATES.map((item) => (
              <article
                key={item.id}
                className="group relative flex flex-col items-center text-center"
              >
                <div className="relative w-full overflow-hidden rounded-xl shadow-md transition-colors duration-300">
                  {/* Image */}
                  <img
                    src={item.src}
                    alt={item.title ?? " قالب"}
                    className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    loading="lazy"
                    decoding="async"
                  />

                  {/* Hover preview overlay */}
                  <div className="pointer-events-none absolute inset-0 z-10 grid place-items-center opacity-0 transition-all duration-300 group-hover:opacity-100 bg-black/55">
                    <button
                      type="button"
                      onClick={() => setPreview(item)}
                      className="pointer-events-auto inline-flex flex-col items-center gap-2 text-white/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 rounded-md px-3 py-2"
                      aria-label={__("messages.templates_page.preview_aria")}
                    >
                      <Eye className="h-10 w-10" aria-hidden="true" />
                      <span className="text-base sm:text-lg tracking-wide">
                        {__("messages.common.preview")}
                      </span>
                    </button>
                  </div>

                  {/* Choose template button — navigates to step 3 */}
                  <button
                    type="button"
                    onClick={() => chooseTemplate(item)}
                    className="absolute bottom-6 text-sm sm:text-md left-1/2 -translate-x-1/2 z-20 w-fit rounded-lg border-2 px-4 py-3 font-bold
                               bg-[#C5C7FC] text-public-sub-title border-public-sub-title
                               hover:opacity-90 duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-public-sub-title"
                  >
                    {__("messages.templates_page.choose_this_template")}
                  </button>
                </div>

                <h3 className="mt-3 text-md sm:text-xl font-semibold text-black">
                  {item.title}
                </h3>
              </article>
            ))}
          </div>
        </div>
      </section>

  {/* Preview modal */}
      {preview && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-4"
          role="dialog"
          aria-modal="true"
          onClick={() => setPreview(null)}
        >
          <div className="relative max-w-5xl w-full">
            <img
              src={preview.src}
              alt={preview.title ?? " معاينة القالب"}
              className="w-full h-auto rounded-xl"
            />
            <button
              type="button"
              onClick={() => setPreview(null)}
              className="absolute top-2 end-2 rounded-md bg-white/90 px-3 py-1 text-sm font-semibold text-black"
            >
              {__("messages.common.close")}
            </button>
          </div>
        </div>
      )}
    </PublicLayout>
  );
}
