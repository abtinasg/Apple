'use client'

import { useState } from 'react'
import WidgetCard from '../WidgetCard'
import { AppleFoodIcon, PlusIcon } from '../icons'
import { useLocalStorage } from '@/lib/useLocalStorage'

interface Food {
  id: string
  name: string
  calories: number
}

const GOAL = 2000
const seed: Food[] = [
  { id: '1', name: 'Oatmeal & berries', calories: 320 },
  { id: '2', name: 'Chicken salad', calories: 540 },
]

export default function DietWidget() {
  const [foods, setFoods] = useLocalStorage<Food[]>('abtin.diet', seed)
  const [name, setName] = useState('')
  const [cal, setCal] = useState('')

  const total = foods.reduce((s, f) => s + f.calories, 0)
  const pct = Math.min(total / GOAL, 1)
  const remaining = Math.max(GOAL - total, 0)

  const c = 2 * Math.PI * 40
  const offset = c * (1 - pct)

  const add = (e: React.FormEvent) => {
    e.preventDefault()
    const n = name.trim()
    const k = parseInt(cal, 10)
    if (!n || isNaN(k)) return
    setFoods((prev) => [{ id: crypto.randomUUID(), name: n, calories: k }, ...prev])
    setName('')
    setCal('')
  }

  return (
    <WidgetCard title="Nutrition" subtitle="Today" icon={<AppleFoodIcon />} accent="#34c759">
      <div className="flex items-center gap-4">
        <svg width="100" height="100" viewBox="0 0 100 100" className="shrink-0">
          <circle cx="50" cy="50" r="40" fill="none" stroke="#34c759" strokeOpacity="0.18" strokeWidth="9" />
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="#34c759"
            strokeWidth="9"
            strokeLinecap="round"
            strokeDasharray={c}
            strokeDashoffset={offset}
            transform="rotate(-90 50 50)"
            style={{ transition: 'stroke-dashoffset 0.8s ease' }}
          />
          <text x="50" y="46" textAnchor="middle" className="fill-white" style={{ fontSize: 18, fontWeight: 700 }}>
            {total}
          </text>
          <text x="50" y="62" textAnchor="middle" className="fill-current text-apple-gray" style={{ fontSize: 9 }}>
            / {GOAL} cal
          </text>
        </svg>
        <div>
          <p className="text-[13px] text-white/90">
            <span className="text-green-400 font-semibold">{remaining}</span> cal left
          </p>
          <p className="text-[11px] text-apple-gray mt-0.5">{foods.length} items logged</p>
        </div>
      </div>

      <form onSubmit={add} className="flex items-center gap-2 mt-3">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Food"
          className="flex-1 h-9 px-3 rounded-lg bg-white/[0.06] border border-white/10 text-[13px] text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-apple-blue/60"
        />
        <input
          value={cal}
          onChange={(e) => setCal(e.target.value)}
          placeholder="cal"
          inputMode="numeric"
          className="w-16 h-9 px-2 rounded-lg bg-white/[0.06] border border-white/10 text-[13px] text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-apple-blue/60"
        />
        <button type="submit" className="w-9 h-9 rounded-lg bg-apple-blue text-white flex items-center justify-center active:scale-95 transition-transform">
          <PlusIcon />
        </button>
      </form>

      <ul className="flex flex-col gap-1 mt-2 max-h-[90px] overflow-y-auto">
        {foods.map((f) => (
          <li key={f.id} className="flex justify-between text-[12px]">
            <span className="text-white/80 truncate">{f.name}</span>
            <span className="text-apple-gray shrink-0 ml-2">{f.calories} cal</span>
          </li>
        ))}
      </ul>
    </WidgetCard>
  )
}
