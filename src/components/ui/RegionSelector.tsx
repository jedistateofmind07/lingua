import { useState } from 'react'
import { useSettings } from '../../store/settingsStore'
import type { Region } from '../../types/vocab'

const REGIONS: { id: Region; flag: string; label: string }[] = [
  { id: 'mx', flag: '🇲🇽', label: 'Mexican' },
  { id: 'co', flag: '🇨🇴', label: 'Colombian' }
]

export function RegionSelector() {
  const region = useSettings((s) => s.region)
  const setRegion = useSettings((s) => s.setRegion)
  const [open, setOpen] = useState(false)
  const current = REGIONS.find((r) => r.id === region) ?? REGIONS[1]

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Spanish variety"
        className="flex items-center gap-1.5 rounded-full border border-navy-700 bg-navy-800 px-3 py-1.5 text-sm text-slate-200 transition hover:border-navy-600"
      >
        <span>{current.flag}</span>
        <span>{current.label}</span>
        <span className="text-xs text-slate-500">▾</span>
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute right-0 z-20 mt-2 w-44 overflow-hidden rounded-xl border border-navy-700 bg-navy-850 shadow-xl">
            <div className="px-3 py-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
              Spanish variety
            </div>
            {REGIONS.map((r) => (
              <button
                key={r.id}
                onClick={() => {
                  setRegion(r.id)
                  setOpen(false)
                }}
                className={`flex w-full items-center gap-2 px-3 py-2.5 text-left text-sm transition hover:bg-navy-800 ${
                  r.id === region ? 'text-white' : 'text-slate-300'
                }`}
              >
                <span>{r.flag}</span>
                <span className="flex-1">{r.label}</span>
                {r.id === region && <span className="text-accent">✓</span>}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
