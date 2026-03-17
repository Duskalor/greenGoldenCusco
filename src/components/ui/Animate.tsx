'use client'

import { useScrollAnimation } from '../../hooks/useScrollAnimation'

interface AnimateProps {
  children: React.ReactNode
  delay?: number
  className?: string
}

export function Animate({ children, delay = 0, className = '' }: AnimateProps) {
  const { ref, isVisible } = useScrollAnimation()
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(36px)',
        transition: `opacity 0.65s ease ${delay}s, transform 0.65s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  )
}
