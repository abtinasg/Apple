'use client'

import WidgetCard from '../WidgetCard'
import { MailIcon } from '../icons'

const emails = [
  { from: 'Apple', subject: 'Your receipt from the App Store', time: '9:41', unread: true },
  { from: 'GitHub', subject: '[abtin/apple] CI passed on main', time: '8:12', unread: true },
  { from: 'Linear', subject: 'You were assigned “Dashboard polish”', time: 'Yesterday', unread: false },
  { from: 'Figma', subject: 'Abtin shared a file with you', time: 'Mon', unread: false },
]

export default function MailWidget() {
  const unread = emails.filter((e) => e.unread).length
  return (
    <WidgetCard title="Mail" subtitle={`${unread} unread`} icon={<MailIcon />} accent="#0a84ff">
      <ul className="flex flex-col -mx-1">
        {emails.map((e, i) => (
          <li
            key={i}
            className="flex items-start gap-2.5 px-1 py-2 rounded-lg hover:bg-white/[0.04] transition-colors cursor-default"
          >
            <span
              className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 ${e.unread ? 'bg-apple-blue' : 'bg-transparent'}`}
            />
            <div className="min-w-0 flex-1">
              <div className="flex justify-between gap-2">
                <p className={`text-[13px] truncate ${e.unread ? 'text-white font-medium' : 'text-white/70'}`}>
                  {e.from}
                </p>
                <span className="text-[11px] text-apple-gray shrink-0">{e.time}</span>
              </div>
              <p className="text-[12px] text-apple-gray truncate">{e.subject}</p>
            </div>
          </li>
        ))}
      </ul>
    </WidgetCard>
  )
}
