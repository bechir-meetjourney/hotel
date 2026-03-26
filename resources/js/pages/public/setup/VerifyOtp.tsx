import React, { useState, useRef, useEffect } from "react";
import { router, usePage, Head } from "@inertiajs/react";
import PublicLayout from "@/layouts/public-layout";
import SetupBanner from "@/components/public/setup/SetupBanner";
import AnimatedHeading from '@/components/motion/AnimatedHeading'
import { useLang } from '@/hooks/useLang'
import { MailCheck, RefreshCw } from "lucide-react";

interface Props {
  email: string;
  debugOtp?: string | null;
}

export default function VerifyOtp({ email, debugOtp }: Props) {
  const { __ } = useLang()
  const serverErrors = usePage().props.errors as Record<string, string>;
  const flash = usePage().props.flash as { success?: string };

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [processing, setProcessing] = useState(false);
  const [resending, setResending] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Masked email
  const maskedEmail = (() => {
    const [u, d] = (email || "").split("@");
    if (!u || !d) return email;
    return u[0] + "•••@" + d;
  })();

  // Countdown timer
  useEffect(() => {
    if (countdown <= 0) return;
    const t = setTimeout(() => setCountdown(countdown - 1), 1000);
    return () => clearTimeout(t);
  }, [countdown]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const text = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    const newOtp = [...otp];
    for (let i = 0; i < text.length; i++) {
      newOtp[i] = text[i];
    }
    setOtp(newOtp);
    const focusIndex = Math.min(text.length, 5);
    inputRefs.current[focusIndex]?.focus();
  };

  const submitOtp = () => {
    const code = otp.join("");
    if (code.length !== 6) return;

    setProcessing(true);
    router.post("/setup/verify-otp", { otp: code }, {
      onFinish: () => setProcessing(false),
    });
  };

  const resendOtp = () => {
    setResending(true);
    router.post("/setup/resend-otp", {}, {
      onFinish: () => {
        setResending(false);
        setCountdown(60);
      },
    });
  };

  return (
    <PublicLayout>
      <Head title="تأكيد البريد الإلكتروني | ضيافة" />

      <section className="py-10">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <SetupBanner />
          <div className="mx-auto max-w-lg rounded-3xl border border-public-border bg-white p-6 sm:p-8 shadow-sm">
            <div className="text-center mb-6">
              <div className="mx-auto mb-4 grid size-16 place-items-center rounded-full bg-blue-50">
                <MailCheck className="size-8 text-blue-600" />
              </div>
              <AnimatedHeading dir="up" delay={0.30}>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-public-primary">
                  تأكيد البريد الإلكتروني
                </h1>
              </AnimatedHeading>
              <p className="mt-3 text-sm text-slate-600">
                تم إرسال رمز التحقق المكون من 6 أرقام إلى
              </p>
              <p className="mt-1 font-semibold text-public-primary">{maskedEmail}</p>
            </div>

            {/* Success flash */}
            {flash?.success && (
              <div className="mb-4 rounded-lg bg-green-50 p-3 text-center text-sm font-medium text-green-600">
                {flash.success}
              </div>
            )}

            {/* Error */}
            {serverErrors?.otp && (
              <div className="mb-4 rounded-lg bg-red-50 p-3 text-center text-sm font-medium text-red-600">
                {serverErrors.otp}
              </div>
            )}

            {/* OTP Inputs */}
            <div className="flex justify-center gap-3 my-8" dir="ltr" onPaste={handlePaste}>
              {otp.map((digit, i) => (
                <input
                  key={i}
                  ref={(el) => { inputRefs.current[i] = el; }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(i, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(i, e)}
                  className="h-14 w-12 rounded-xl border-2 border-slate-200 bg-slate-50 text-center text-2xl font-bold text-public-primary
                             focus:border-public-active focus:bg-white focus:outline-none focus:ring-2 focus:ring-public-active/20
                             transition-all"
                  autoFocus={i === 0}
                />
              ))}
            </div>

            {/* Submit */}
            <button
              type="button"
              onClick={submitOtp}
              disabled={processing || otp.join("").length !== 6}
              className="w-full rounded-xl bg-public-primary px-6 py-3 font-semibold text-white hover:opacity-90 disabled:opacity-50 transition-all"
            >
              {processing ? "جاري التحقق..." : "تأكيد الرمز"}
            </button>

            {/* Resend */}
            <div className="mt-4 text-center">
              <p className="text-sm text-slate-500 mb-2">لم يصلك الرمز؟</p>
              <button
                type="button"
                onClick={resendOtp}
                disabled={resending || countdown > 0}
                className="inline-flex items-center gap-2 text-sm font-semibold text-public-active hover:underline disabled:opacity-50 disabled:no-underline"
              >
                <RefreshCw className={`h-4 w-4 ${resending ? 'animate-spin' : ''}`} />
                {countdown > 0 ? `إعادة الإرسال بعد ${countdown} ثانية` : "إعادة إرسال الرمز"}
              </button>
            </div>

            {/* Timer note */}
            <p className="mt-4 text-center text-xs text-slate-400">
              الرمز صالح لمدة 10 دقائق
            </p>

            {/* Debug: show OTP in development */}
            {debugOtp && (
              <div className="mt-4 rounded-lg border border-amber-300 bg-amber-50 p-3 text-center">
                <p className="text-xs text-amber-600 mb-1">وضع التطوير — رمز التحقق:</p>
                <p className="text-2xl font-bold text-amber-800 tracking-widest" dir="ltr">{debugOtp}</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
