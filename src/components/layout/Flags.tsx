export function FlagES() {
  return (
    <svg width="22" height="15" viewBox="0 0 24 16" style={{ display: 'block' }}>
      <rect width="24" height="16" rx="2" fill="#AA151B" />
      <rect y="4" width="24" height="8" fill="#F1BF00" />
    </svg>
  )
}

export function FlagEN() {
  return (
    <svg width="22" height="15" viewBox="0 0 24 16" style={{ display: 'block' }}>
      <rect width="24" height="16" rx="2" fill="#012169" />
      <path d="M0 0L24 16M24 0L0 16" stroke="#fff" strokeWidth="2.5" />
      <path d="M0 0L24 16M24 0L0 16" stroke="#C8102E" strokeWidth="1.5" />
      <path d="M12 0V16M0 8H24" stroke="#fff" strokeWidth="4.5" />
      <path d="M12 0V16M0 8H24" stroke="#C8102E" strokeWidth="2.5" />
    </svg>
  )
}

export function FlagPT() {
  return (
    <svg width="22" height="15" viewBox="0 0 24 16" style={{ display: 'block' }}>
      <rect width="24" height="16" rx="2" fill="#009739" />
      <polygon points="12,2 22,8 12,14 2,8" fill="#FEDD00" />
      <circle cx="12" cy="8" r="3" fill="#012169" />
      <circle cx="12" cy="8" r="2.2" fill="#fff" />
    </svg>
  )
}
