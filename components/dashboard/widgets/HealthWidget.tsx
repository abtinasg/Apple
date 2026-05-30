'use client'

import WidgetCard from '../WidgetCard'
import { HeartIcon } from '../icons'

interface Ring {
  label: string
  value: number
  goal: number
  unit: string
  color: string
}

const rings: Ring[] = [
  { label: 'Move', value: 540, goal: 650, unit: 'CAL', color: '#fa2d48' },
  { label: 'Exercise', value: 38, goal: 45, unit: 'MIN', color: '#a3f73b' },
  { label: 'Stand', value: 10, goal: 12, unit: 'HRS', color: '#2bd5e8' },
]

function ArcRing({ pct, color, radius, stroke }: { pct: number; color: string; radius: number; stroke: number }) {
  const c = 2 * Math.PI * radius
  const offset = c * (1 - Math.min(pct, 1))
  return (
    <>
      <circle cx="60" cy="60" r={radius} fill="none" stroke={color} strokeOpacity="0.18" strokeWidth={stroke} />
      <circle
        cx="60"
        cy="60"
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={c}
        strokeDashoffset={offset}
        transform="rotate(-90 60 60)"
        style={{ transition: 'stroke-dashoffset 1s ease' }}
      />
    </>
  )
}

export default function HealthWidget() {
  return (
    <WidgetCard title="Activity" subtitle="Today" icon={<HeartIcon />} accent="#fa2d48">
      <div className="flex items-center gap-4">
        <svg width="120" height="120" viewBox="0 0 120 120" className="shrink-0">
          <ArcRing pct={rings[0].value / rings[0].goal} color={rings[0].color} radius={48} stroke={11} />
          <ArcRing pct={rings[1].value / rings[1].goal} color={rings[1].color} radius={35} stroke={11} />
          <ArcRing pct={rings[2].value / rings[2].goal} color={rings[2].color} radius={22} stroke={11} />
        </svg>
        <div className="flex flex-col gap-2">
          {rings.map((r) => (
            <div key={r.label}>
              <p className="text-[11px] uppercase tracking-wide" style={{ color: r.color }}>
                {r.label}
              </p>
              <p className="text-[15px] font-semibold text-white/95 leading-none">
                {r.value}
                <span className="text-[11px] text-apple-gray font-normal">/{r.goal} {r.unit}</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </WidgetCard>
  )
}
