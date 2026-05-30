'use client'

import { useState, useEffect } from 'react'
import WidgetCard from '../WidgetCard'
import { MusicIcon, PlayIcon, PauseIcon } from '../icons'

export default function MusicWidget() {
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(38)

  useEffect(() => {
    if (!playing) return
    const t = setInterval(() => setProgress((p) => (p >= 100 ? 0 : p + 1)), 800)
    return () => clearInterval(t)
  }, [playing])

  return (
    <WidgetCard title="Now Playing" icon={<MusicIcon />} accent="#fa233b">
      <div className="flex items-center gap-3">
        <div
          className="w-14 h-14 rounded-xl shrink-0 flex items-center justify-center text-2xl"
          style={{ background: 'linear-gradient(145deg, #ff2d55, #af52de)' }}
        >
          🎵
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[14px] font-semibold text-white/95 truncate">Midnight City</p>
          <p className="text-[12px] text-apple-gray truncate">M83 · Hurry Up, We&apos;re Dreaming</p>
        </div>
        <button
          onClick={() => setPlaying((p) => !p)}
          className="w-10 h-10 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/15 text-white transition-colors active:scale-95"
          aria-label={playing ? 'Pause' : 'Play'}
        >
          {playing ? <PauseIcon /> : <PlayIcon />}
        </button>
      </div>
      <div className="mt-3">
        <div className="h-1 rounded-full bg-white/10 overflow-hidden">
          <div className="h-full bg-white/70 rounded-full" style={{ width: `${progress}%`, transition: 'width 0.8s linear' }} />
        </div>
      </div>
    </WidgetCard>
  )
}
