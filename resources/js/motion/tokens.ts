// resources/js/motion/tokens.ts
import type { Easing } from 'motion/react'

// Motion tokens: durations and easing curves used across components.
// Properly typed bezier curve definitions that match motion library expectations.

// Helper to create cubic-bezier easing functions
const bezier = (x1: number, y1: number, x2: number, y2: number): Easing => [x1, y1, x2, y2]

export const motionTokens = {
  duration: {
    fast: 0.2,
    base: 0.3,
    slow: 0.45,
  },
  easing: {
    standard: bezier(0.2, 0.0, 0.0, 1.0), // Material standard
    decel: bezier(0.0, 0.0, 0.2, 1.0), // Deceleration
    accel: bezier(0.3, 0.0, 0.1, 1.0), // Acceleration
  },
} as const
