// Small inline icons (currentColor) used across dashboard widgets.
const base = { width: 16, height: 16, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }

export const HeartIcon = () => (
  <svg {...base}><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z" /></svg>
)
export const MailIcon = () => (
  <svg {...base}><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-10 6L2 7" /></svg>
)
export const CalendarIcon = () => (
  <svg {...base}><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>
)
export const CheckIcon = () => (
  <svg {...base}><path d="M20 6 9 17l-5-5" /></svg>
)
export const FlameIcon = () => (
  <svg {...base}><path d="M12 2c1 4 5 5 5 9a5 5 0 0 1-10 0c0-2 1-3 2-4 0 2 1 3 2 3 .5-3-1-5-1-8z" /></svg>
)
export const AppleFoodIcon = () => (
  <svg {...base}><path d="M12 7c0-2-1.5-4-4-4 0 2 1.5 4 4 4z" /><path d="M12 7c2.5-2 5-1.5 6.5 0C21 9.5 20 16 16.5 19c-1.5 1.3-3 1-4.5 0-1.5 1-3 1.3-4.5 0C4 16 3 9.5 5.5 7 7 5.5 9.5 5 12 7z" /></svg>
)
export const WalletIcon = () => (
  <svg {...base}><rect x="2" y="5" width="20" height="14" rx="2" /><path d="M16 12h.01M2 9h20" /></svg>
)
export const NoteIcon = () => (
  <svg {...base}><path d="M4 4h16v12l-4 4H4z" /><path d="M16 20v-4h4" /></svg>
)
export const CloudIcon = () => (
  <svg {...base}><path d="M17.5 19a4.5 4.5 0 0 0 0-9 6 6 0 0 0-11.6 2A3.5 3.5 0 0 0 6.5 19z" /></svg>
)
export const MusicIcon = () => (
  <svg {...base}><path d="M9 18V5l12-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" /></svg>
)
export const PlusIcon = () => (
  <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg>
)
export const PlayIcon = () => (
  <svg width={18} height={18} viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
)
export const PauseIcon = () => (
  <svg width={18} height={18} viewBox="0 0 24 24" fill="currentColor"><path d="M6 5h4v14H6zM14 5h4v14h-4z" /></svg>
)
