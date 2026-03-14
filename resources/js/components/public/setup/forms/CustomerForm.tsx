import React from "react";
import FormInput from "@/components/public/setup/FormInput";
import { useLang } from '@/hooks/useLang'

type Errors = {
  firstName?: string;
  lastName?: string;
  city?: string;
  phone?: string;
  orgName?: string;
};

type Props = {
  // controlled values
  firstName: string;
  lastName: string;
  city: string;
  phone: string;
  orgName: string;
  // change handlers
  onChange: (field: "firstName"|"lastName"|"city"|"phone"|"orgName", val: string) => void;
  // submit
  onSubmit: () => void;
  // errors
  errors: Errors;
};

export default function CustomerForm({
  firstName, lastName, city, phone, orgName,
  onChange, onSubmit, errors,
}: Props) {
  const { __ } = useLang()
  // form section with light border + shadow
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="grid gap-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormInput
            id="firstName"
            label={__("messages.setup.account.first_name_label")}
            placeholder={__("messages.setup.account.first_name_placeholder")}
            value={firstName}
            onChange={(v) => onChange("firstName", v)}
            required
            error={errors.firstName ?? null}
          />
          <FormInput
            id="lastName"
            label={__("messages.setup.account.last_name_label")}
            placeholder={__("messages.setup.account.last_name_placeholder")}
            value={lastName}
            onChange={(v) => onChange("lastName", v)}
            required
            error={errors.lastName ?? null}
          />
        </div>

        <FormInput
          id="city"
          label={__("messages.setup.account.city_label")}
          placeholder={__("messages.setup.account.city_placeholder")}
          value={city}
          onChange={(v) => onChange("city", v)}
          required
          error={errors.city ?? null}
        />

        <FormInput
          id="phone"
          label={__("messages.setup.account.phone_label")}
          placeholder={__("messages.setup.account.phone_placeholder")}
          value={phone}
          onChange={(v) => onChange("phone", v)}
          required
          error={errors.phone ?? null}
          inputMode="tel"
        />

        <FormInput
          id="orgFinal"
          label={__("messages.setup.org.name_label")}
          placeholder={__("messages.setup.org.name_placeholder")}
          value={orgName}
          onChange={(v) => onChange("orgName", v)}
          required
          error={errors.orgName ?? null}
        />
      </div>

      {/* primary action */}
      <button
        type="button"
        onClick={onSubmit}
        className="mt-6 w-full rounded-xl bg-public-primary px-6 py-3 font-semibold text-white hover:opacity-90"
      >
        {__("messages.setup.account.confirm")}
      </button>
    </div>
  );
}
