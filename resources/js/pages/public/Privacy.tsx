// pages/privacy.tsx
// Privacy page: only main title centered; section headings right-aligned (no icons).

import PublicLayout from '@/layouts/public-layout'
import { CheckCircle2, MapPin, Mail, Phone } from 'lucide-react' // keep for bullets/contact
import { useLang } from '@/hooks/useLang'
import { Head } from '@inertiajs/react'

export default function Privacy() {
  const { __ } = useLang()

  const splitList = (value?: string) => (value ? value.split('|') : [])

  return (
    <PublicLayout>
      <Head title="سياسة الخصوصية | ضيافة - نظام إدارة الفنادق">
        <meta name="description" content="تعرف على سياسة الخصوصية لنظام ضيافة لإدارة الفنادق والشقق المفروشة. نلتزم بحماية بياناتك الشخصية وخصوصيتك عند استخدام خدماتنا." />
        <meta name="keywords" content="سياسة الخصوصية, حماية البيانات, خصوصية العملاء, شروط الاستخدام, أمان البيانات" />
      </Head>
      <section className="py-10 px-2" >
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          {/* Main title (centered) */}
          <h1 className="text-center text-3xl sm:text-4xl font-bold text-public-primary">
            <span className='text-public-active'>{__("messages.privacy.heading.active")} </span>
             {__("messages.privacy.heading.suffix")}
          </h1>

          {/* Lead */}
          <p className="mt-4 leading-8 text-slate-700">
            {__("messages.privacy.lead.p1")}
            {" "}
            {__("messages.privacy.lead.p2")}
          </p>

          {/* Section: Collection & Use (right-aligned, no icon) */}
          <h2 className="mt-10 text-2xl sm:text-3xl font-bold text-slate-900 text-start">
            {__("messages.privacy.collection.title")}
          </h2>
          <p className="mt-2 text-slate-700 leading-8 text-justify">
            {__("messages.privacy.collection.p1")}
            {" "}
            {__("messages.privacy.collection.p2")}
          </p>
          <p className="mt-2 text-slate-700 leading-8 text-justify">
            {__("messages.privacy.collection.p3")}
          </p>

          {/* Section: Security (right-aligned, no icon) */}
          <h2 className="mt-10 text-2xl sm:text-3xl font-bold text-slate-900 text-start">
            {__("messages.privacy.security.title")}
          </h2>
          <p className="mt-2 text-slate-700 leading-8 text-justify">
            {__("messages.privacy.security.p")}
          </p>
          <ul className="mt-3 space-y-2 text-slate-800">
            {splitList(__("messages.privacy.security.bullets")).map((b, i) => (
              <Bullet key={i}>{b}</Bullet>
            ))}
          </ul>

          {/* Section: Cookies (right-aligned, no icon) */}
          <h2 className="mt-10 text-2xl sm:text-3xl font-bold text-slate-900 text-start">
            {__("messages.privacy.cookies.title")}
          </h2>
          <p className="mt-2 text-slate-700 leading-8 text-justify">
            {__("messages.privacy.cookies.p")}
          </p>
          <ul className="mt-3 space-y-2 text-start text-slate-700">
            {splitList(__("messages.privacy.cookies.list")).map((item, i) => (
              <li key={i}>🔹 {item}</li>
            ))}
          </ul>
          <p className="mt-2 text-slate-700 leading-8 text-justify">
            {__("messages.privacy.cookies.note")}
          </p>

          {/* Section: Protect your privacy (right-aligned, no icon) */}
          <h2 className="mt-10 text-2xl sm:text-3xl font-bold text-slate-900 text-start">
            {__("messages.privacy.protect.title")}
          </h2>
            <ul className="mt-3 space-y-2 text-start text-slate-700">
              {splitList(__("messages.privacy.protect.list")).map((item, i) => (
                <li key={i}>🔹 {item}</li>
              ))}
            </ul>

          {/* Section: Contact (right-aligned, keep small icons for details if desired) */}
          <h2 className="mt-10 text-2xl sm:text-3xl font-bold text-slate-900 text-start">
            {__("messages.privacy.contact.title")}
          </h2>
          <div className="mt-2 space-y-2 text-slate-800">
          <p className="mt-2 text-slate-700 leading-8 text-justify">
            {__("messages.privacy.contact.lead")}
          </p>
            <p className="flex items-center gap-2 justify-start">
              <MapPin className="h-4 w-4 text-public-primary" />
              <span>{__("messages.privacy.contact.address")} </span>
            </p>
            <p className="flex items-center gap-2 justify-start">
              <Mail className="h-4 w-4 text-public-primary" />
                            <span>{__("messages.privacy.contact.email")}</span>
              <a href={`mailto:${__("messages.privacy.contact.email")}`} className="hover:underline">{__("messages.privacy.contact.email")}</a>
            </p>
            <p className="flex items-center gap-2 justify-start">
              <Phone className="h-4 w-4 text-public-primary" />
              <span>{__("messages.privacy.contact.phone")}</span>
            </p>
          </div>

          {/* Closing note */}
          <p className="mt-4 font-bold text-slate-900">
            {__("messages.privacy.closing")}
          </p>
        </div>
      </section>
    </PublicLayout>
  )
}

/* -- helpers -- */
function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2">
      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" aria-hidden />
      <span className="leading-7">{children}</span>
    </li>
  )
}
