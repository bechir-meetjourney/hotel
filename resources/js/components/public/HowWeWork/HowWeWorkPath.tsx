// components/public/home/HowWeWork/HowWeWorkPath.tsx
import React, { useEffect, useState } from "react"
import { motion } from "motion/react"

/* eslint-disable @typescript-eslint/no-explicit-any */

type StepKey = "one" | "two" | "three"
type StepIcons  = { one?: React.ReactNode; two?: React.ReactNode; three?: React.ReactNode }
type StepLabels = { one?: string;         two?: string;         three?: string }
type StepSizes  = { one?: number;         two?: number;         three?: number }
type StepBodies = { one?: React.ReactNode; two?: React.ReactNode; three?: React.ReactNode }
type Anchor = "above" | "below"
type Pos = { top?: number | string; left?: number | string; anchor?: Anchor; offset?: number }
type StepPos = { one?: Pos; two?: Pos; three?: Pos }

type Props = {
  stroke?: string
  strokeWidth?: number
  dotFill?: string
  dotText?: string
  dashed?: boolean
  dashArray?: string
  icons?: StepIcons
  labels?: StepLabels
  bodies?: StepBodies
  iconSize?: number | StepSizes
  iconSizeMobile?: number | StepSizes
  gap?: number
  labelClassName?: string
  positions?: {
  desktop?: StepPos  // Desktop fallback position
  lg?: StepPos       // Large screens (≥ 1024px)
  xl?: StepPos       // Extra large screens (≥ 1280px)
  "2xl"?: StepPos   // 2xl screens (≥ 1536px)
  }
}

/* Tailwind breakpoints detector */
function useTWBreakpoint(): "base" | "lg" | "xl" | "2xl" {
  const [bp, setBp] = useState<"base" | "lg" | "xl" | "2xl">("base")

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return

    const mqLg  = window.matchMedia("(min-width: 1024px)")
    const mqXl  = window.matchMedia("(min-width: 1280px)")
    const mq2xl = window.matchMedia("(min-width: 1536px)")

    const compute = () =>
      mq2xl.matches ? "2xl" : mqXl.matches ? "xl" : mqLg.matches ? "lg" : "base"

    const update = () => setBp(compute())

    update()
    mqLg.addEventListener?.("change", update)
    mqXl.addEventListener?.("change", update)
    mq2xl.addEventListener?.("change", update)

    return () => {
      mqLg.removeEventListener?.("change", update)
      mqXl.removeEventListener?.("change", update)
      mq2xl.removeEventListener?.("change", update)
    }
  }, [])

  return bp
}

export default function HowWeWorkPath({
  stroke = "#ffffff",
  strokeWidth = 2,
  dotFill = "#F59E0B",
  dotText = "#ffffff",
  dashed = true,
  dashArray = "8 8",
  icons,
  labels,
  bodies,
  iconSize = 48,
  iconSizeMobile,
  gap = 12,
  labelClassName,
  positions,
}: Props) {
  /* ---------------- Desktop geometry ---------------- */
  const TOP_Y = 100
  const BOT_Y = 500
  const R     = 25
  const VB_PADDING = R + 12
  const VB_W = 1000
  const VB_H = BOT_Y + VB_PADDING
  // detect RTL at runtime (guard for SSR). Prefer explicit dir attribute, fallback to computed style.
  const isRtl = typeof document !== "undefined" && (
    document.documentElement?.dir === "rtl" ||
    (typeof window.getComputedStyle === "function" && window.getComputedStyle(document.documentElement).direction === "rtl")
  )

  // mirror graphic when page is LTR (so English is mirrored, Arabic stays as original)
  const transformX = (x: number) => (!isRtl ? VB_W - x : x)

  // build path using numeric points then transform X coordinates for RTL
  const xA = VB_W
  const xB = 680
  const xC = 348
  const xD = 0
  const txA = transformX(xA)
  const txB = transformX(xB)
  const txC = transformX(xC)
  const txD = transformX(xD)

  const pathD = `M${txA} ${TOP_Y} H${txB} V${BOT_Y} H${txC} V${TOP_Y} H${txD}`

  const dotsDesktop = [
    { cx: transformX((VB_W + xB) / 2), cy: TOP_Y, n: 1 },
    { cx: transformX((xB + xC) / 2),  cy: BOT_Y, n: 2 },
    { cx: transformX((xC + xD) / 2),    cy: TOP_Y, n: 3 },
  ]

  // if graphic is mirrored (we mirror when LTR), map logical steps to visual dot order
  const mirrored = !isRtl
  const stepsForDots: StepKey[] = mirrored ? (['three', 'two', 'one'] as StepKey[]) : (['one', 'two', 'three'] as StepKey[])

  const toCss = (v: number | string | undefined, fallback: string) =>
    v === undefined ? fallback : (typeof v === "number" ? `${v}%` : v)
  // transform left values when mirrored (LTR) so provided positions follow visual flip
  const transformLeftValue = (left: number | string | undefined) => {
    if (left === undefined) return undefined
    // number represents percent value in this component
    if (typeof left === "number") return 100 - left
    const s = String(left).trim()
    if (s.endsWith("%")) {
      const n = parseFloat(s.slice(0, -1))
      if (!Number.isNaN(n)) return `${100 - n}%`
      return left
    }
    if (s.endsWith("px")) {
      const n = parseFloat(s.slice(0, -2))
      if (!Number.isNaN(n)) return `${Math.max(0, VB_W - n)}px`
      return left
    }
    return left
  }
  const getDesktopSize = (step: StepKey) =>
    typeof iconSize === "number" ? iconSize : iconSize?.[step] ?? 48
  const getMobileSize = (step: StepKey) =>
    iconSizeMobile !== undefined
      ? (typeof iconSizeMobile === "number" ? iconSizeMobile : iconSizeMobile?.[step] ?? 48)
      : getDesktopSize(step)
  const defaultAnchor = (step: StepKey): Anchor => (step === "two" ? "above" : "below")
  const anchorToTransform = (anchor: Anchor, extraOffset = 0) =>
    anchor === "above"
      ? `translate(-50%, calc(-100% - ${R + gap + extraOffset}px))`
      : `translate(-50%, ${R + gap + extraOffset}px)`
  const baseLabelCls = `text-white ${labelClassName ?? "text-sm"}`

  /* ---------------- Animation timings ---------------- */
  const DRAW_DURATION = 3.5 // Draw duration in seconds (slower)
  const dotT = [0.09, 0.49, 0.90]
  const dotDelay = (i: number) => DRAW_DURATION * dotT[i] + 0.05
  const stackDelay = (i: number) => dotDelay(i) + 0.12

  /* ---------------- Breakpoint-aware positions ---------------- */
  const bp = useTWBreakpoint()

  function getResponsivePos(step: StepKey): Pos | undefined {
    const order =
      bp === "2xl" ? ["2xl", "xl", "lg", "desktop"] :
      bp === "xl"  ? ["xl", "lg", "desktop"] :
      bp === "lg"  ? ["lg", "desktop"] :
                     ["desktop"]

    for (const k of order) {
      const posGroup = (positions as any)?.[k] as StepPos | undefined
      const pos = posGroup?.[step]
      if (pos) return pos
    }
    return undefined
  }

  /* ---------------- Animated Stack (desktop) ---------------- */
  function StackAnimated({
    icon, label, body, size, inverse = false, labelCls, delay = 0,
  }: {
    icon?: React.ReactNode; label?: string; body?: React.ReactNode; size: number; inverse?: boolean; labelCls: string; delay?: number
  }) {
    return (
      <div className="flex max-w-xs flex-col items-center text-center">
        {inverse && label ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0,0,0.2,1], delay }}
            className={`mb-1 ${labelCls}`}
          >{label}</motion.div>
        ) : null}
        {inverse && body ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0,0,0.2,1], delay: delay + 0.08 }}
            className="mb-2 whitespace-pre-line text-xs 2xl:text-md leading-6 text-start text-white/70"
          >{body}</motion.div>
        ) : null}

        {icon ? (
          <motion.div
            style={{ width: size, height: size }}
            className="flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.9, y: 6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.2,0,0,1], delay }}
          >
            <div style={{ width: size, height: size }} className="flex items-center justify-center">
              {icon}
            </div>
          </motion.div>
        ) : null}

        {!inverse && label ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0,0,0.2,1], delay: delay + 0.06 }}
            className={`mt-1 ${labelCls}`}
          >{label}</motion.div>
        ) : null}
        {!inverse && body ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0,0,0.2,1], delay: delay + 0.12 }}
            className="mt-2 whitespace-pre-line text-xs 2xl:text-lg leading-6 text-white/70"
          >{body}</motion.div>
        ) : null}
      </div>
    )
  }

  const DesktopStep = ({ step, dot, index }: { step: StepKey; dot: { cx: number; cy: number; n: number }, index: number }) => {
  const ovRaw = getResponsivePos(step) // original positions per step
  // if mirrored, flip any provided left value so stacks match visual dots
  const ov = ovRaw ? { ...ovRaw, left: (mirrored ? transformLeftValue(ovRaw.left) : ovRaw.left) } : ovRaw
  const anchor = ov?.anchor ?? defaultAnchor(step)
    const inverse = anchor === "above"
  const left = toCss(ov?.left, `${(dot.cx / VB_W) * 100}%`)
    const top  = toCss(ov?.top,  `${(dot.cy / VB_H) * 100}%`)
    const transform = anchorToTransform(anchor, ov?.offset ?? 0)
    const d = stackDelay(index)
    return (
      <div className="absolute" style={{ left, top, transform }}>
        <StackAnimated
          icon={(icons as any)?.[step]}
          label={(labels as any)?.[step]}
          body={(bodies as any)?.[step]}
          size={getDesktopSize(step)}
          inverse={inverse}
          labelCls={baseLabelCls}
          delay={d}
        />
      </div>
    )
  }

  /* ---------------- Mobile/Tablet animated stacks ---------------- */
  const MobileStack = ({ icon, label, body, size, idx }:{
    icon?: React.ReactNode; label?: string; body?: React.ReactNode; size: number; idx: number
  }) => {
    const baseDelay = idx * 0.3
    return (
      <div className="flex flex-col items-center text-start lg:text-center py-6">
        {icon ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 8 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, ease: [0.2,0,0,1], delay: baseDelay }}
            style={{ width: size, height: size }}
            className="flex items-center justify-center"
          >
            {icon}
          </motion.div>
        ) : null}
        {label ? (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, ease: [0,0,0.2,1], delay: baseDelay + 0.15 }}
            className={`mt-3 ${baseLabelCls} text-xl text-bold md:text-2xl`}
          >
            {label}
          </motion.div>
        ) : null}
        {body ? (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, ease: [0,0,0.2,1], delay: baseDelay + 0.3 }}
            className="mt-2 whitespace-pre-line text-start xl:text-center text-lg leading-7 text-white/80"
          >
            {body}
          </motion.div>
        ) : null}
      </div>
    )
  }

  return (
    <section className="w-full">
    {/* Desktop SVG path: visible from XL breakpoint and up.
      To use LG positioning instead, change the wrapper class to `hidden lg:block`. */}
      <div
        className="relative hidden xl:block mx-auto max-w-screen-2xl 2xl:max-w-[96rem] px-4"
        style={{ height: `${VB_H}px` }}
      >
        <motion.svg
          viewBox={`0 0 ${VB_W} ${VB_H}`}
          className="absolute inset-0 h-full w-full"
          role="img"
          aria-label="How we work path"
          initial={undefined}
        >
          <defs>
            <mask id="hw-reveal" maskUnits="userSpaceOnUse">
              <motion.path
                d={pathD}
                fill="none"
                stroke="white"
                strokeWidth={strokeWidth + 2}
                strokeLinecap="round"
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true, margin: "0px 0px -12% 0px" }}
                transition={{ duration: DRAW_DURATION, ease: [0.2, 0.0, 0.0, 1] }}
              />
            </mask>
          </defs>

          <path
            d={pathD}
            stroke={stroke}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            vectorEffect="non-scaling-stroke"
            mask="url(#hw-reveal)"
            {...(dashed ? { strokeDasharray: dashArray } : {})}
          />

          {/* Dots animation */}
          {dotsDesktop.map(({ cx, cy, n }, i) => (
            <motion.g
              key={n}
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "0px 0px -12% 0px" }}
              transition={{ duration: 0.4, ease: [0.2,0,0,1], delay: dotDelay(i) }}
            >
              <circle cx={cx} cy={cy} r={R} fill={dotFill} />
              <text x={cx} y={cy + 5} textAnchor="middle" fontWeight={700} fontSize={16} fill={dotText}>{n}</text>
            </motion.g>
          ))}
        </motion.svg>

        {/* Desktop stacks (responsive positions) - render in visual dot order so labels/icons follow the dots */}
        {stepsForDots.map((stepKey, i) => {
          const logicalIndex = ['one', 'two', 'three'].indexOf(stepKey as StepKey)
          return ((icons as any)?.[stepKey] || (labels as any)?.[stepKey] || (bodies as any)?.[stepKey]) && (
            <DesktopStep key={stepKey} step={stepKey} dot={dotsDesktop[i]} index={logicalIndex} />
          )
        })}
      </div>

      {/* Mobile/Tablet */}
      <div className="relative mx-auto block w-full xl:hidden lg:px-4">
        <MobileStack
          icon={(icons as any)?.one}
          label={(labels as any)?.one}
          body={(bodies as any)?.one}
          size={getMobileSize("one")}
          idx={0}
        />
        <MobileStack
          icon={(icons as any)?.two}
          label={(labels as any)?.two}
          body={(bodies as any)?.two}
          size={getMobileSize("two")}
          idx={1}
        />
        <MobileStack
          icon={(icons as any)?.three}
          label={(labels as any)?.three}
          body={(bodies as any)?.three}
          size={getMobileSize("three")}
          idx={2}
        />
      </div>
    </section>
  )
}
