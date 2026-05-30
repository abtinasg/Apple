'use client'

import { useState, useEffect } from 'react'
import WidgetCard from '../WidgetCard'
import { CalendarIcon } from '../icons'

const events = [
  { time: '10:00', title: 'Design review', color: '#0a84ff' },
  { time: '13:30', title: 'Lunch with Sara', color: '#ff9f0a' },
  { time: '16:00', title: 'Gym session', color: '#a3f73b' },
  { time: '20:00', title: 'Read 30 pages', color: '#bf5af2' },
]

export default function CalendarWidget() {
  const [date, setDate] = useState<Date | null>(null)
  useEffect(() => setDate(new Date()), [])

  return (
    <WidgetCard
      title="Calendar"
      subtitle={date ? date.toLocaleDateString(undefined, { weekday: 'long' }) : ''}
      icon={<CalendarIcon />}
      accent="#ff3b30"
    >
      <div className="flex items-baseline gap-2 mb-2">
        <span className="text-[34px] font-bold text-white leading-none">{date?.getDate() ?? ''}</span>
        <span className="text-[13px] text-apple-gray">
          {date?.toLocaleDateString(undefined, { month: 'long' })}
        </span>
      </div>
      <ul className="flex flex-col gap-2">
        {events.map((e, i) => (
          <li key={i} className="flex items-center gap-2.5">
            <span className="w-1 h-7 rounded-full shrink-0" style={{ background: e.color }} />
            <div className="min-w-0">
              <p className="text-[13px] text-white/90 truncate leading-tight">{e.title}</p>
              <p className="text-[11px] text-apple-gray">{e.time}</p>
            </div>
          </li>
        ))}
      </ul>
    </WidgetCard>
  )
}
