import { useState } from 'react'
import type { ExerciseItem, ExerciseOutcome, Mistake } from '../../types/exercise'
import { Button } from '../ui/Button'

export function Flashcard({
  items,
  onProgress,
  onComplete
}: {
  items: ExerciseItem[]
  onProgress?: (current: number, total: number) => void
  onComplete: (outcome: ExerciseOutcome) => void
}) {
  const [idx, setIdx] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [correct, setCorrect] = useState(0)
  const [mistakes, setMistakes] = useState<Mistake[]>([])
  const item = items[idx]

  function grade(knew: boolean) {
    const nextCorrect = correct + (knew ? 1 : 0)
    const nextMistakes = knew
      ? mistakes
      : [...mistakes, { prompt: item.prompt, expected: item.answer }]
    if (idx + 1 >= items.length) {
      onComplete({ correct: nextCorrect, total: items.length, mistakes: nextMistakes })
      return
    }
    setCorrect(nextCorrect)
    setMistakes(nextMistakes)
    setIdx(idx + 1)
    setFlipped(false)
    onProgress?.(idx + 1, items.length)
  }

  return (
    <div className="flex flex-1 flex-col">
      <button
        onClick={() => setFlipped((f) => !f)}
        className="my-6 flex min-h-[220px] flex-1 flex-col items-center justify-center rounded-card border border-navy-700 bg-navy-800 p-6 text-center"
      >
        <span className="text-sm text-slate-400">
          {flipped ? 'Answer' : (item.hint ?? 'Tap to flip')}
        </span>
        <span className="mt-3 text-2xl font-semibold text-slate-100">
          {flipped ? item.answer : item.prompt}
        </span>
      </button>
      {flipped ? (
        <div className="flex gap-3 pb-6">
          <Button variant="ghost" onClick={() => grade(false)}>
            Missed it
          </Button>
          <Button onClick={() => grade(true)}>Got it</Button>
        </div>
      ) : (
        <div className="pb-6">
          <Button variant="ghost" onClick={() => setFlipped(true)}>
            Show answer
          </Button>
        </div>
      )}
    </div>
  )
}
