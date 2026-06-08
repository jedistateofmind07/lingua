interface TileProps {
  title: string
  subtitle?: string
  emoji?: string
  badge?: string
  onClick?: () => void
  disabled?: boolean
}

export function Tile({ title, subtitle, emoji, badge, onClick, disabled }: TileProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="flex w-full items-center gap-4 rounded-card border border-navy-700 bg-navy-800 px-5 py-4 text-left transition hover:border-navy-600 hover:bg-navy-700 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-navy-800"
    >
      {emoji && <span className="text-2xl">{emoji}</span>}
      <span className="min-w-0 flex-1">
        <span className="block font-semibold text-slate-100">{title}</span>
        {subtitle && <span className="mt-0.5 block text-sm text-slate-400">{subtitle}</span>}
      </span>
      {badge && (
        <span className="rounded-full bg-navy-700 px-2.5 py-1 text-xs font-medium text-slate-300">
          {badge}
        </span>
      )}
    </button>
  )
}
