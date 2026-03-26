import React from "react";
import { Head, Link } from "@inertiajs/react";
import PublicLayout from "@/layouts/public-layout";
import SetupBanner from "@/components/public/setup/SetupBanner";
import AnimatedHeading from '@/components/motion/AnimatedHeading'
import { Clock, Mail, CheckCircle2, ArrowLeft } from "lucide-react";

export default function Pending() {
  return (
    <PublicLayout>
      <Head title="في انتظار التفعيل | ضيافة" />

      <section className="py-10">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <SetupBanner title="شكراً لتسجيلك في ضيافة" subtitle="حسابك قيد المراجعة" />

          <div className="mx-auto max-w-2xl rounded-3xl border border-public-border bg-white p-8 sm:p-12 shadow-sm text-center">
            {/* Success icon */}
            <div className="mx-auto mb-6 grid size-20 place-items-center rounded-full bg-amber-50">
              <Clock className="size-10 text-amber-500" />
            </div>

            <AnimatedHeading dir="up" delay={0.30}>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-public-primary mb-4">
                تم استلام طلبك بنجاح!
              </h1>
            </AnimatedHeading>

            <p className="text-slate-600 text-lg mb-8 leading-relaxed">
              شكراً لتسجيلك في منصة ضيافة. تم استلام إيصال التحويل البنكي
              وسيتم مراجعته من قبل فريقنا.
            </p>

            {/* Steps */}
            <div className="mx-auto max-w-md text-start space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 grid size-8 place-items-center rounded-full bg-green-100 shrink-0">
                  <CheckCircle2 className="size-4 text-green-600" />
                </div>
                <div>
                  <p className="font-semibold text-slate-800">تم إنشاء حسابك</p>
                  <p className="text-sm text-slate-500">معلومات المنشأة والحساب محفوظة</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-0.5 grid size-8 place-items-center rounded-full bg-green-100 shrink-0">
                  <CheckCircle2 className="size-4 text-green-600" />
                </div>
                <div>
                  <p className="font-semibold text-slate-800">تم استلام إيصال التحويل</p>
                  <p className="text-sm text-slate-500">الإيصال قيد المراجعة</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-0.5 grid size-8 place-items-center rounded-full bg-amber-100 shrink-0">
                  <Clock className="size-4 text-amber-600" />
                </div>
                <div>
                  <p className="font-semibold text-slate-800">في انتظار موافقة الإدارة</p>
                  <p className="text-sm text-slate-500">عادة خلال 24 ساعة عمل</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-0.5 grid size-8 place-items-center rounded-full bg-slate-100 shrink-0">
                  <Mail className="size-4 text-slate-400" />
                </div>
                <div>
                  <p className="font-semibold text-slate-800">إشعار بالبريد الإلكتروني</p>
                  <p className="text-sm text-slate-500">ستصلك رسالة عند تفعيل حسابك</p>
                </div>
              </div>
            </div>

            {/* Back to home */}
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50 transition-colors"
            >
              <ArrowLeft className="size-4" />
              العودة للصفحة الرئيسية
            </Link>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
