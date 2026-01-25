import { ReactNode } from 'react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

type AnimationType = 'fadeIn' | 'slideUp' | 'slideLeft' | 'slideRight' | 'scale' | 'blur'

interface AnimatedSectionProps {
  children: ReactNode
  animation?: AnimationType
  delay?: number
  duration?: number
  className?: string
  threshold?: number
}

const animationClasses: Record<AnimationType, { initial: string; animate: string }> = {
  fadeIn: {
    initial: 'opacity-0',
    animate: 'opacity-100',
  },
  slideUp: {
    initial: 'opacity-0 translate-y-12',
    animate: 'opacity-100 translate-y-0',
  },
  slideLeft: {
    initial: 'opacity-0 translate-x-12',
    animate: 'opacity-100 translate-x-0',
  },
  slideRight: {
    initial: 'opacity-0 -translate-x-12',
    animate: 'opacity-100 translate-x-0',
  },
  scale: {
    initial: 'opacity-0 scale-90',
    animate: 'opacity-100 scale-100',
  },
  blur: {
    initial: 'opacity-0 blur-sm',
    animate: 'opacity-100 blur-0',
  },
}

const AnimatedSection = ({
  children,
  animation = 'slideUp',
  delay = 0,
  duration = 600,
  className = '',
  threshold = 0.1,
}: AnimatedSectionProps) => {
  const { ref, isVisible } = useScrollAnimation({ threshold })
  const { initial, animate } = animationClasses[animation]

  return (
    <div
      ref={ref}
      className={`transition-all ${className} ${isVisible ? animate : initial}`}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {children}
    </div>
  )
}

export default AnimatedSection
