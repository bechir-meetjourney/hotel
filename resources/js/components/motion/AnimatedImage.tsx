// resources/js/components/motion/AnimatedImage.tsx
import { ImgHTMLAttributes } from 'react'
import { motion } from 'motion/react'
import { motionTokens } from '@/motion/tokens'
import { dirToInitial } from '@/motion/utils'

// Safe props that don't conflict with motion
type SafeImgProps = Omit<ImgHTMLAttributes<HTMLImageElement>, 
  | 'onDrag' | 'onDragStart' | 'onDragEnd' | 'onDragEnter' | 'onDragLeave' | 'onDragOver' | 'onDrop'
  | 'onAnimationStart' | 'onAnimationEnd' | 'onAnimationIteration'
  | 'onTransitionEnd' | 'onTransitionStart'
>

type Props = SafeImgProps & { dir?: 'up'|'down'|'left'|'right'|'none' }

export default function AnimatedImage({ dir='none', src, alt, className, style, ...htmlProps }: Props) {
  return (
    <motion.img
      src={src}
      alt={alt}
      className={className}
      style={{ willChange: 'transform, opacity', ...style }}
      decoding="async" 
      loading="lazy"
      initial={{ opacity: 0, ...dirToInitial(dir, 28) }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: motionTokens.duration.slow, ease: motionTokens.easing.decel }}
      {...htmlProps}
    />
  )
}
