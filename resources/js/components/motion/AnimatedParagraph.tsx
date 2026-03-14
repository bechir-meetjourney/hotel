// resources/js/components/motion/AnimatedParagraph.tsx
import { PropsWithChildren } from 'react'
import { motion } from 'motion/react'
import { motionTokens } from '@/motion/tokens'
import { dirToInitial } from '@/motion/utils'

type Props = PropsWithChildren<{ dir?: 'up'|'down'|'left'|'right'|'none', delay?: number }>

export default function AnimatedParagraph({ children, dir='none', delay=0 }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, ...dirToInitial(dir, 16) }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: motionTokens.duration.base, ease: motionTokens.easing.standard, delay }}
    >
      {children}
    </motion.div>
  )
}
