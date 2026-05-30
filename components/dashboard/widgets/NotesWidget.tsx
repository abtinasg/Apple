'use client'

import { useState } from 'react'
import WidgetCard from '../WidgetCard'
import { NoteIcon, PlusIcon } from '../icons'
import { useLocalStorage } from '@/lib/useLocalStorage'

interface Note {
  id: string
  text: string
  createdAt: number
}

const seed: Note[] = [
  { id: '1', text: 'Idea: add a focus timer widget next', createdAt: Date.now() - 86400000 },
  { id: '2', text: 'Wi-Fi password is in the drawer', createdAt: Date.now() - 3600000 },
]

export default function NotesWidget() {
  const [notes, setNotes] = useLocalStorage<Note[]>('abtin.notes', seed)
  const [text, setText] = useState('')

  const add = (e: React.FormEvent) => {
    e.preventDefault()
    const t = text.trim()
    if (!t) return
    setNotes((prev) => [{ id: crypto.randomUUID(), text: t, createdAt: Date.now() }, ...prev])
    setText('')
  }

  const remove = (id: string) => setNotes((prev) => prev.filter((n) => n.id !== id))

  return (
    <WidgetCard title="Notes" subtitle={`${notes.length} notes`} icon={<NoteIcon />} accent="#ffd60a">
      <form onSubmit={add} className="flex items-center gap-2 mb-3">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Quick note…"
          className="flex-1 h-9 px-3 rounded-lg bg-white/[0.06] border border-white/10 text-[13px] text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-apple-blue/60"
        />
        <button type="submit" className="w-9 h-9 rounded-lg bg-apple-blue text-white flex items-center justify-center active:scale-95 transition-transform">
          <PlusIcon />
        </button>
      </form>
      <ul className="flex flex-col gap-2 max-h-[150px] overflow-y-auto">
        {notes.map((n) => (
          <li key={n.id} className="group flex items-start gap-2 rounded-lg bg-white/[0.04] px-3 py-2">
            <p className="flex-1 text-[13px] text-white/85 leading-snug">{n.text}</p>
            <button
              onClick={() => remove(n.id)}
              className="text-apple-gray hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity text-[15px] leading-none"
              aria-label="Delete note"
            >
              ×
            </button>
          </li>
        ))}
        {notes.length === 0 && <p className="text-[12px] text-apple-gray">No notes yet.</p>}
      </ul>
    </WidgetCard>
  )
}
