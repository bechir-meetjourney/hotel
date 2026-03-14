import React from "react";

type Props = {
  id: string;
  label: string;
  placeholder?: string;
  value: string;
  onChange: (v: string) => void;
  onBlur?: () => void;
  required?: boolean;
  error?: string | null;
  inputMode?: React.InputHTMLAttributes<HTMLInputElement>["inputMode"];
  type?: "text" | "email" | "password";
};

export default function FormInput({
  id,
  label,
  placeholder,
  value,
  onChange,
  onBlur,
  required,
  error,
  inputMode,
  type = "text",
}: Props) {
  return (
    <div className="flex flex-col">
      <label
        htmlFor={id}
        className="mb-2 text-start text-sm font-semibold text-gray-900"
      >
        {label}
      </label>

      <input
        id={id}
        type={type}
        inputMode={inputMode}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        placeholder={placeholder}
        className="h-12 w-full rounded-xl bg-gray-100 px-4 text-start text-gray-900 
                   placeholder:text-gray-500 outline-none ring-0 
                   focus:bg-white focus:ring-2 focus:ring-public-primary/30
                   placeholder:transition-opacity focus:placeholder:opacity-0"
      />

      {error ? (
        <div className="mt-1 text-[12px] font-semibold text-red-600">{error}</div>
      ) : null}
    </div>
  );
}
