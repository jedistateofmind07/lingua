import { ProgressBar } from './ProgressBar'

export function SessionHeader({
  value,
  total,
  onExit
}: {
  value: number
  total: number
  onExit: () => void
}) {
  return (
    <div className="flex items-center gap-3 py-4">
      <button
        onClick={onExit}
        aria-label="Exit"
        className="text-2xl leading-none text-slate-400 transition hover:text-slate-200"
      >
        ×
      </button>
      <div className="flex-1">
        <ProgressBar value={value} total={total} />
      </div>
      <span className="w-6 text-right text-sm tabular-nums text-slate-400">{total}</span>
    </div>
  )
}
