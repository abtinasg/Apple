import type { ReactNode } from 'react'

interface WidgetCardProps {
  title: string
  subtitle?: string
  icon?: ReactNode
  accent?: string // hex used for the icon tile
  className?: string
  children: ReactNode
}

export default function WidgetCard({
  title,
  subtitle,
  icon,
  accent = '#0071e3',
  className = '',
  children,
}: WidgetCardProps) {
  return (
    <section
      className={`glass-card rounded-3xl p-5 flex flex-col gap-3.5 transition-transform duration-300 hover:scale-[1.01] ${className}`}
    >
      <header className="flex items-center gap-2.5">
        {icon && (
          <span
            className="flex items-center justify-center w-8 h-8 rounded-xl text-white shrink-0"
            style={{ background: accent, boxShadow: `0 4px 12px ${accent}55` }}
          >
            {icon}
          </span>
        )}
        <div className="min-w-0">
          <h2 className="text-[14px] font-semibold text-white/95 leading-tight truncate">{title}</h2>
          {subtitle && <p className="text-[11px] text-apple-gray truncate">{subtitle}</p>}
        </div>
      </header>
      <div className="flex-1 min-h-0">{children}</div>
    </section>
  )
}
