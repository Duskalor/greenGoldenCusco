import { cn } from '../../lib/utils'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'gold' | 'outline' | 'dark'
  className?: string
}

export function Badge({ children, variant = 'gold', className }: BadgeProps) {
  const variants = {
    gold: 'bg-gold/12 text-gold border border-gold/20',
    outline: 'bg-transparent text-white/60 border border-white/15',
    dark: 'bg-white/5 text-white/50 border border-white/10',
  }
  return (
    <span className={cn('inline-flex items-center rounded-full px-3 py-1 text-[11px] font-sans font-semibold tracking-wider uppercase', variants[variant], className)}>
      {children}
    </span>
  )
}
