import React, { useState } from "react";
import { router, Head } from "@inertiajs/react";
import PublicLayout from "@/layouts/public-layout";
import SetupBanner from "@/components/public/setup/SetupBanner";
import { Eye, Clock } from "lucide-react";
import { TEMPLATES, type TemplateItem } from "@/components/public/templates/constants";
import AnimatedHeading from '@/components/motion/AnimatedHeading'
import { useLang } from '@/hooks/useLang'

interface DbTemplate {
  id: number; key: string; name_ar: string; name_en: string;
}

interface Props {
  setup: Record<string, string>
  dbTemplates?: DbTemplate[]
}

export default function Template({ setup, dbTemplates }: Props) {
  const { __ } = useLang()
  const [preview, setPreview] = useState<TemplateItem | null>(null);

  // Filter templates: if dbTemplates provided, hide disabled ones
  const activeKeys = dbTemplates?.map(t => t.key) || [];
  const availableTemplates = activeKeys.length > 0
    ? TEMPLATES.map(t => t.templateSlug && !activeKeys.includes(t.templateSlug) ? { ...t, comingSoon: true } : t)
    : TEMPLATES;

  const chooseTemplate = (item: TemplateItem) => {
    const title = item.titleKey ? __(item.titleKey) : (item.title || `Template ${item.id}`);
    router.post("/setup/template", {
      template_id: item.templateSlug || String(item.id),
      template_title: title,
    });
  };

  return (
    <PublicLayout>
      <Head title="اختيار قالب | ضيافة" />

      <section className="p-6 mx-auto max-w-screen-xl">
        <SetupBanner />
        <div className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8 sm:border sm:rounded-2xl sm:shadow">
          <AnimatedHeading dir="up" delay={0.30}>
            <h2 className="text-center text-public-primary text-2xl sm:text-4xl font-bold">
              {__("messages.setup.template.selected_plan_label")}
              <span className="text-public-active mx-2">{setup?.plan_name || __("messages.setup.template.no_plan_placeholder")}</span>
            </h2>
          </AnimatedHeading>
          <p className="text-public-sub-title mt-3 text-center text-sm sm:text-base">
            {__("messages.setup.template.templates_count_label")}
            <span className="ms-2 inline-flex items-center justify-center rounded-md bg-public-sub-title px-3 py-1 text-sm font-bold text-white">
              {availableTemplates.filter(t => !t.comingSoon).length}
            </span>
            <span className="ms-2 text-xs text-slate-400">
              (+{availableTemplates.filter(t => t.comingSoon).length} قريباً)
            </span>
          </p>

          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
            {availableTemplates.map((item) => {
              const title = item.titleKey ? __(item.titleKey) : (item.title || `Template ${item.id}`);
              return (
              <article key={item.id} className="group relative flex flex-col items-center text-center">
                <div className="relative w-full overflow-hidden rounded-xl shadow-md transition-colors duration-300">
                  <img
                    src={item.src}
                    alt={title}
                    className={`w-full h-auto object-cover transition-transform duration-300 ${item.comingSoon ? 'grayscale opacity-60' : 'group-hover:scale-[1.03]'}`}
                    loading="lazy"
                    decoding="async"
                  />

                  {item.comingSoon ? (
                    <div className="absolute inset-0 z-10 grid place-items-center bg-black/50">
                      <div className="flex flex-col items-center gap-3 text-white">
                        <div className="rounded-full bg-white/20 p-4 backdrop-blur-sm">
                          <Clock className="h-8 w-8" />
                        </div>
                        <span className="text-xl sm:text-2xl font-bold">قريبـــاً</span>
                        <span className="text-sm text-white/70">Coming Soon</span>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="pointer-events-none absolute inset-0 z-10 grid place-items-center opacity-0 transition-all duration-300 group-hover:opacity-100 bg-black/55">
                        <button
                          type="button"
                          onClick={() => setPreview(item)}
                          className="pointer-events-auto inline-flex flex-col items-center gap-2 text-white/90 focus:outline-none rounded-md px-3 py-2"
                        >
                          <Eye className="h-10 w-10" />
                          <span className="text-base sm:text-lg tracking-wide">{__("messages.common.preview")}</span>
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => chooseTemplate(item)}
                        className="absolute bottom-6 text-sm sm:text-md left-1/2 -translate-x-1/2 z-20 w-fit rounded-lg border-2 px-4 py-3 font-bold bg-[#C5C7FC] text-public-sub-title border-public-sub-title hover:opacity-90 duration-300"
                      >
                        {__("messages.templates_page.choose_this_template")}
                      </button>
                    </>
                  )}
                </div>
                <h3 className={`mt-3 text-md sm:text-xl font-semibold ${item.comingSoon ? 'text-gray-400' : 'text-black'}`}>
                  {title}
                  {item.comingSoon && <span className="ms-2 text-xs text-gray-400">(قريباً)</span>}
                </h3>
              </article>
              );
            })}
          </div>
        </div>
      </section>

      {preview && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-4" onClick={() => setPreview(null)}>
          <div className="relative max-w-5xl w-full">
            <img src={preview.src} alt={preview.title ?? "معاينة"} className="w-full h-auto rounded-xl" />
            <button type="button" onClick={() => setPreview(null)} className="absolute top-2 end-2 rounded-md bg-white/90 px-3 py-1 text-sm font-semibold text-black">
              {__("messages.common.close")}
            </button>
          </div>
        </div>
      )}
    </PublicLayout>
  );
}
