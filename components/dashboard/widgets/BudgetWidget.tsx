'use client'

import { useState, useMemo } from 'react'
import WidgetCard from '../WidgetCard'
import { WalletIcon, PlusIcon } from '../icons'
import { useLocalStorage } from '@/lib/useLocalStorage'

interface Tx {
  id: string
  label: string
  amount: number // positive = income, negative = expense
  category: string
}

const seed: Tx[] = [
  { id: '1', label: 'Salary', amount: 3200, category: 'Income' },
  { id: '2', label: 'Rent', amount: -1100, category: 'Housing' },
  { id: '3', label: 'Groceries', amount: -240, category: 'Food' },
  { id: '4', label: 'Subscriptions', amount: -60, category: 'Other' },
]

const catColors: Record<string, string> = {
  Housing: '#0a84ff',
  Food: '#34c759',
  Transport: '#ff9f0a',
  Other: '#bf5af2',
  Income: '#30d158',
}

export default function BudgetWidget() {
  const [txs, setTxs] = useLocalStorage<Tx[]>('abtin.budget', seed)
  const [label, setLabel] = useState('')
  const [amount, setAmount] = useState('')

  const { balance, spending, byCat } = useMemo(() => {
    const balance = txs.reduce((s, t) => s + t.amount, 0)
    const spending = txs.filter((t) => t.amount < 0).reduce((s, t) => s + Math.abs(t.amount), 0)
    const byCat: Record<string, number> = {}
    txs.filter((t) => t.amount < 0).forEach((t) => {
      byCat[t.category] = (byCat[t.category] ?? 0) + Math.abs(t.amount)
    })
    return { balance, spending, byCat }
  }, [txs])

  const add = (e: React.FormEvent) => {
    e.preventDefault()
    const l = label.trim()
    const a = parseFloat(amount)
    if (!l || isNaN(a)) return
    setTxs((prev) => [
      { id: crypto.randomUUID(), label: l, amount: a, category: a > 0 ? 'Income' : 'Other' },
      ...prev,
    ])
    setLabel('')
    setAmount('')
  }

  const cats = Object.entries(byCat).sort((a, b) => b[1] - a[1])

  return (
    <WidgetCard title="Budget" subtitle="This month" icon={<WalletIcon />} accent="#30d158">
      <div className="flex items-end justify-between mb-3">
        <div>
          <p className="text-[11px] text-apple-gray">Balance</p>
          <p className={`text-[26px] font-bold leading-none ${balance >= 0 ? 'text-white' : 'text-red-400'}`}>
            ${balance.toLocaleString()}
          </p>
        </div>
        <p className="text-[12px] text-apple-gray">
          Spent <span className="text-red-400">${spending.toLocaleString()}</span>
        </p>
      </div>

      {/* Stacked spending bar */}
      <div className="h-2.5 rounded-full overflow-hidden flex bg-white/[0.06] mb-2">
        {cats.map(([cat, amt]) => (
          <div
            key={cat}
            style={{ width: `${(amt / spending) * 100}%`, background: catColors[cat] ?? '#8e8e93' }}
            title={`${cat}: $${amt}`}
          />
        ))}
      </div>
      <div className="flex flex-wrap gap-x-3 gap-y-1 mb-3">
        {cats.map(([cat, amt]) => (
          <span key={cat} className="flex items-center gap-1.5 text-[11px] text-apple-gray">
            <span className="w-2 h-2 rounded-full" style={{ background: catColors[cat] ?? '#8e8e93' }} />
            {cat} ${amt}
          </span>
        ))}
      </div>

      <form onSubmit={add} className="flex items-center gap-2">
        <input
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          placeholder="Item"
          className="flex-1 h-9 px-3 rounded-lg bg-white/[0.06] border border-white/10 text-[13px] text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-apple-blue/60"
        />
        <input
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="±$"
          inputMode="decimal"
          className="w-20 h-9 px-2 rounded-lg bg-white/[0.06] border border-white/10 text-[13px] text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-apple-blue/60"
        />
        <button type="submit" className="w-9 h-9 rounded-lg bg-apple-blue text-white flex items-center justify-center active:scale-95 transition-transform">
          <PlusIcon />
        </button>
      </form>

      <ul className="flex flex-col gap-1 mt-2 max-h-[80px] overflow-y-auto">
        {txs.map((t) => (
          <li key={t.id} className="flex justify-between text-[12px]">
            <span className="text-white/80 truncate">{t.label}</span>
            <span className={`shrink-0 ml-2 ${t.amount >= 0 ? 'text-green-400' : 'text-white/60'}`}>
              {t.amount >= 0 ? '+' : '−'}${Math.abs(t.amount).toLocaleString()}
            </span>
          </li>
        ))}
      </ul>
    </WidgetCard>
  )
}
