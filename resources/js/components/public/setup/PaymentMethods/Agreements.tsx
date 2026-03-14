import React from "react";
import { useLang } from '@/hooks/useLang'

type Props = {
  savePM: boolean;
  onSavePMChange: (v: boolean) => void;
  agree: boolean;
  onAgreeChange: (v: boolean) => void;
  error?: string | null;
  className?: string; // optional wrapper class
};

export default function Agreements({
  savePM,
  onSavePMChange,
  agree,
  onAgreeChange,
  error,
  className,
}: Props) {
  const { __ } = useLang()
  // stable ids for accessibility
  const saveId = React.useId();
  const agreeId = React.useId();
  const errId = React.useId();

  return (
    <div
      className={[
        "mt-4 space-y-2 rounded-lg bg-white p-3 text-sm", // white box
        className || "",
      ].join(" ")}
      {...(error ? { "aria-describedby": errId } : {})}
    >
      {/* save payment method */}
      <label htmlFor={saveId} className="flex items-center gap-2 cursor-pointer">
        <input
          id={saveId}
          type="checkbox"
          checked={savePM}
          onChange={(e) => onSavePMChange(e.target.checked)}
          className="h-4 w-4"
        />
        <span className="text-start">{__("messages.setup.payment.save_pm_label")}</span>
      </label>

      {/* agree to terms */}
      <label htmlFor={agreeId} className="flex items-start gap-2 cursor-pointer">
        <input
          id={agreeId}
          type="checkbox"
          checked={agree}
          onChange={(e) => onAgreeChange(e.target.checked)}
          className="mt-0.5 h-4 w-4"
        />
        <span className="leading-6 text-start">{__("messages.setup.payment.terms_text")}</span>
      </label>

      {/* inline error */}
      {error ? (
        <div id={errId} className="text-start text-[12px] font-semibold text-red-600">
          {error}
        </div>
      ) : null}
    </div>
  );
}
