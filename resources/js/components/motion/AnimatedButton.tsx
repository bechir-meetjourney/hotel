// resources/js/components/motion/AnimatedButton.tsx
import { ButtonHTMLAttributes } from 'react'
import { motion } from 'motion/react'
import { motionTokens } from '@/motion/tokens'
import { dirToInitial } from '@/motion/utils'

// Safe props that don't conflict with motion
type SafeButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 
  | 'onDrag' | 'onDragStart' | 'onDragEnd' | 'onDragEnter' | 'onDragLeave' | 'onDragOver' | 'onDrop'
  | 'onAnimationStart' | 'onAnimationEnd' | 'onAnimationIteration'
  | 'onTransitionEnd' | 'onTransitionStart'
>

type Props = SafeButtonProps & { dir?: 'up'|'down'|'left'|'right'|'none' }

export default function AnimatedButton({ dir='none', children, className, style, ...htmlProps }: Props) {
  return (
    <motion.button
      className={className}
      style={style}
      initial={{ opacity: 0, ...dirToInitial(dir, 18) }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.98 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: motionTokens.duration.fast, ease: motionTokens.easing.decel }}
      {...htmlProps}
    >
      {children}
    </motion.button>
  )
}
