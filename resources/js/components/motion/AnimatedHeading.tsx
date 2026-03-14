// resources/js/components/motion/AnimatedHeading.tsx
// Generic motion wrapper for heading elements - uses div container to avoid HTML nesting issues
import { PropsWithChildren } from 'react'
import { motion } from 'motion/react'
import { motionTokens } from '@/motion/tokens'
import { dirToInitial } from '@/motion/utils'

type Props = PropsWithChildren<{ dir?: 'up'|'down'|'left'|'right'|'none', delay?: number }>

export default function AnimatedHeading({ children, dir='none', delay=0 }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, ...dirToInitial(dir, 20) }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -15% 0px' }}
      transition={{ duration: motionTokens.duration.base, ease: motionTokens.easing.standard, delay }}
    >
      {children}
    </motion.div>
  )
}
