'use client'

import { useState } from 'react'
import WidgetCard from '../WidgetCard'
import { CheckIcon, PlusIcon } from '../icons'
import { useLocalStorage } from '@/lib/useLocalStorage'

interface Task {
  id: string
  text: string
  done: boolean
}

const seed: Task[] = [
  { id: '1', text: 'Finish the Abtin dashboard', done: false },
  { id: '2', text: 'Reply to GitHub PR review', done: false },
  { id: '3', text: 'Plan groceries for the week', done: true },
]

export default function TasksWidget() {
  const [tasks, setTasks] = useLocalStorage<Task[]>('abtin.tasks', seed)
  const [text, setText] = useState('')

  const add = (e: React.FormEvent) => {
    e.preventDefault()
    const t = text.trim()
    if (!t) return
    setTasks((prev) => [{ id: crypto.randomUUID(), text: t, done: false }, ...prev])
    setText('')
  }

  const toggle = (id: string) =>
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)))

  const remaining = tasks.filter((t) => !t.done).length

  return (
    <WidgetCard title="Reminders" subtitle={`${remaining} remaining`} icon={<CheckIcon />} accent="#ff9f0a">
      <form onSubmit={add} className="flex items-center gap-2 mb-3">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a task…"
          className="flex-1 h-9 px-3 rounded-lg bg-white/[0.06] border border-white/10 text-[13px] text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-apple-blue/60"
        />
        <button type="submit" className="w-9 h-9 rounded-lg bg-apple-blue text-white flex items-center justify-center active:scale-95 transition-transform">
          <PlusIcon />
        </button>
      </form>
      <ul className="flex flex-col gap-1.5 max-h-[160px] overflow-y-auto">
        {tasks.map((t) => (
          <li key={t.id} className="flex items-center gap-2.5">
            <button
              onClick={() => toggle(t.id)}
              className={`w-[18px] h-[18px] rounded-full border flex items-center justify-center shrink-0 transition-colors ${
                t.done ? 'bg-apple-blue border-apple-blue text-white' : 'border-white/30 text-transparent'
              }`}
              aria-label="Toggle task"
            >
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
            </button>
            <span className={`text-[13px] ${t.done ? 'text-apple-gray line-through' : 'text-white/90'}`}>
              {t.text}
            </span>
          </li>
        ))}
        {tasks.length === 0 && <p className="text-[12px] text-apple-gray">All clear. 🎉</p>}
      </ul>
    </WidgetCard>
  )
}
