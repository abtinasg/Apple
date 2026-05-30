'use client'

import WidgetCard from '../WidgetCard'
import { CloudIcon } from '../icons'

const forecast = [
  { day: 'Now', temp: 21, icon: '☀️' },
  { day: '4PM', temp: 22, icon: '⛅' },
  { day: '6PM', temp: 19, icon: '🌤️' },
  { day: '8PM', temp: 16, icon: '🌙' },
  { day: '10PM', temp: 14, icon: '🌙' },
]

export default function WeatherWidget() {
  return (
    <WidgetCard title="Weather" subtitle="Tehran" icon={<CloudIcon />} accent="#0a84ff">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[44px] font-thin text-white leading-none">21°</p>
          <p className="text-[13px] text-white/80 mt-1">Mostly Sunny</p>
          <p className="text-[12px] text-apple-gray">H:24° L:13°</p>
        </div>
        <span className="text-[40px]">☀️</span>
      </div>
      <div className="flex justify-between mt-4 pt-3 border-t border-white/10">
        {forecast.map((f) => (
          <div key={f.day} className="flex flex-col items-center gap-1">
            <span className="text-[11px] text-apple-gray">{f.day}</span>
            <span className="text-[15px]">{f.icon}</span>
            <span className="text-[12px] text-white/90">{f.temp}°</span>
          </div>
        ))}
      </div>
    </WidgetCard>
  )
}
