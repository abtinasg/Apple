interface AbtinLogoProps {
  size?: number
  withWordmark?: boolean
}

/** The Abtin ID monogram — a glassy gradient tile with an "a" mark. */
export default function AbtinLogo({ size = 44, withWordmark = false }: AbtinLogoProps) {
  return (
    <div className="flex items-center gap-2.5">
      <div
        className="relative flex items-center justify-center rounded-[22%] shadow-lg"
        style={{
          width: size,
          height: size,
          background: 'linear-gradient(145deg, #2997ff 0%, #0071e3 45%, #5e5ce6 100%)',
          boxShadow: '0 6px 20px rgba(0,113,227,0.35), inset 0 1px 0 rgba(255,255,255,0.4)',
        }}
        aria-label="Abtin"
      >
        <svg width={size * 0.6} height={size * 0.6} viewBox="0 0 40 40" fill="none">
          <path
            d="M11 30 L18.5 11 C19 9.8 20.9 9.8 21.4 11 L29 30"
            stroke="white"
            strokeWidth="3.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M14.6 24 L25.4 24" stroke="white" strokeWidth="3.4" strokeLinecap="round" />
        </svg>
      </div>
      {withWordmark && (
        <span className="text-[19px] font-semibold tracking-tight text-white/95">abtin</span>
      )}
    </div>
  )
}
