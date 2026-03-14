// Pricing types: TypeScript definitions for plan data used by the pricing UI
// File: src/components/public/Pricing/types.ts
 
export type Variant = "solid" | "soft" | "light";

export interface Plan {
  key: string;
  name: string;
  /** Optional language key for the plan name (e.g. messages.pricing.plans.starter.name) */
  nameKey?: string;
  iconSrc: string; 
  iconAlt?: string; 
  price: string;
  period: string;
  /** optional language key for period */
  periodKey?: string;
  vatNote?: string;
  /** optional language key for vat note */
  vatNoteKey?: string;
  features: string[];
  /** optional language keys for features */
  featuresKeys?: string[];
  variant?: Variant;
}
