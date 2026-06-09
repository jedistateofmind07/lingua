import { useEffect } from 'react'
import type { ExerciseOutcome } from '../../types/exercise'
import { Button } from '../ui/Button'

export function ResultsPanel({
  outcome,
  onReplay,
  onDone
}: {
  outcome: ExerciseOutcome
  onReplay: () => void
  onDone: () => void
}) {
  const { correct, total, mistakes } = outcome
  const perfect = total > 0 && correct === total

  // Celebrate on completion — a bigger burst for a perfect score.
  useEffect(() => {
    let cancelled = false
    import('canvas-confetti')
      .then(({ default: confetti }) => {
        if (cancelled) return
        try {
          const base = { spread: 75, startVelocity: 45, ticks: 200, origin: { y: 0.6 } }
          confetti({ ...base, particleCount: perfect ? 160 : 70 })
          if (perfect) {
            window.setTimeout(
              () => confetti({ ...base, particleCount: 120, angle: 60, origin: { x: 0, y: 0.65 } }),
              150
            )
            window.setTimeout(
              () => confetti({ ...base, particleCount: 120, angle: 120, origin: { x: 1, y: 0.65 } }),
              300
            )
          }
        } catch {
          /* confetti is purely decorative — ignore any failure */
        }
      })
      .catch(() => {})
    return () => {
      cancelled = true
    }
  }, [perfect])

  return (
    <div className="flex flex-1 flex-col py-8">
      <div className="flex flex-1 flex-col items-center justify-center text-center">
        <span className="text-5xl font-bold">
          {correct}/{total}
        </span>
        <span className="mt-2 text-slate-400">
          {perfect ? '🎉 ¡Perfecto!' : '¡Buen trabajo! Keep practicing'}
        </span>
      </div>
      {mistakes.length > 0 && (
        <div className="mb-6">
          <h3 className="mb-2 text-sm font-semibold text-slate-300">Review</h3>
          <ul className="flex flex-col gap-1.5">
            {mistakes.map((m, i) => (
              <li
                key={i}
                className="flex justify-between gap-3 rounded-lg bg-navy-800 px-3 py-2 text-sm"
              >
                <span className="text-slate-400">{m.prompt}</span>
                <span className="font-medium text-slate-200">{m.expected}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="flex gap-3 pb-2">
        <Button variant="ghost" onClick={onDone}>
          Done
        </Button>
        <Button onClick={onReplay}>Again</Button>
      </div>
    </div>
  )
}
