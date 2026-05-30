'use client'

import WidgetCard from '../WidgetCard'
import { FlameIcon } from '../icons'
import { useLocalStorage } from '@/lib/useLocalStorage'

interface Habit {
  id: string
  name: string
  emoji: string
  streak: number
  doneToday: boolean
  color: string
}

const seed: Habit[] = [
  { id: '1', name: 'Drink water', emoji: '💧', streak: 12, doneToday: false, color: '#0a84ff' },
  { id: '2', name: 'Meditate', emoji: '🧘', streak: 5, doneToday: true, color: '#bf5af2' },
  { id: '3', name: 'Read', emoji: '📖', streak: 8, doneToday: false, color: '#ff9f0a' },
  { id: '4', name: 'No sugar', emoji: '🚫🍬', streak: 3, doneToday: false, color: '#fa2d48' },
]

export default function HabitsWidget() {
  const [habits, setHabits] = useLocalStorage<Habit[]>('abtin.habits', seed)

  const toggle = (id: string) =>
    setHabits((prev) =>
      prev.map((h) =>
        h.id === id
          ? { ...h, doneToday: !h.doneToday, streak: h.doneToday ? Math.max(0, h.streak - 1) : h.streak + 1 }
          : h
      )
    )

  return (
    <WidgetCard title="Habits" subtitle="Tap to check in" icon={<FlameIcon />} accent="#ff375f">
      <ul className="flex flex-col gap-2">
        {habits.map((h) => (
          <li key={h.id} className="flex items-center gap-3">
            <button
              onClick={() => toggle(h.id)}
              className={`w-9 h-9 rounded-xl flex items-center justify-center text-[16px] shrink-0 transition-all active:scale-90 ${
                h.doneToday ? 'ring-2' : 'opacity-60'
              }`}
              style={{
                background: h.doneToday ? `${h.color}33` : 'rgba(255,255,255,0.05)',
                boxShadow: h.doneToday ? `0 0 0 2px ${h.color}` : 'none',
              }}
            >
              {h.emoji}
            </button>
            <div className="flex-1 min-w-0">
              <p className={`text-[13px] truncate ${h.doneToday ? 'text-white' : 'text-white/80'}`}>{h.name}</p>
              <p className="text-[11px]" style={{ color: h.color }}>
                🔥 {h.streak} day{h.streak === 1 ? '' : 's'}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </WidgetCard>
  )
}
