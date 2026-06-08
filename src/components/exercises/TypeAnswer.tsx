import { useState } from 'react'
import type { ExerciseItem, ExerciseOutcome, Mistake } from '../../types/exercise'
import { isCorrect } from '../../engine/compare'
import { Button } from '../ui/Button'

export function TypeAnswer({
  items,
  accentInsensitive = true,
  onProgress,
  onComplete
}: {
  items: ExerciseItem[]
  accentInsensitive?: boolean
  onProgress?: (current: number, total: number) => void
  onComplete: (outcome: ExerciseOutcome) => void
}) {
  const [idx, setIdx] = useState(0)
  const [value, setValue] = useState('')
  const [checked, setChecked] = useState<boolean | null>(null)
  const [correct, setCorrect] = useState(0)
  const [mistakes, setMistakes] = useState<Mistake[]>([])
  const item = items[idx]

  function check() {
    const ok = isCorrect(value, item.answer, { accentInsensitive, alternates: item.alternates })
    setChecked(ok)
    if (ok) setCorrect((c) => c + 1)
    else setMistakes((m) => [...m, { prompt: item.prompt, expected: item.answer, given: value }])
  }

  function next() {
    if (idx + 1 >= items.length) {
      onComplete({ correct, total: items.length, mistakes })
      return
    }
    setIdx(idx + 1)
    setValue('')
    setChecked(null)
    onProgress?.(idx + 1, items.length)
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (checked === null) check()
    else next()
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-1 flex-col">
      <div className="my-6 flex flex-1 flex-col justify-center">
        <span className="text-sm text-slate-400">{item.hint ?? 'Type the answer'}</span>
        <span className="mt-2 text-3xl font-bold text-slate-100">{item.prompt}</span>
        <input
          key={idx}
          autoFocus
          value={value}
          onChange={(e) => setValue(e.target.value)}
          readOnly={checked !== null}
          autoCapitalize="off"
          autoCorrect="off"
          spellCheck={false}
          placeholder="Type here…"
          className="mt-6 w-full rounded-xl border border-navy-600 bg-navy-850 px-4 py-3 text-lg text-slate-100 outline-none focus:border-accent"
        />
        {checked !== null && (
          <div
            className={`mt-4 rounded-xl px-4 py-3 text-sm ${
              checked ? 'bg-green-500/15 text-green-300' : 'bg-red-500/15 text-red-300'
            }`}
          >
            {checked ? 'Correct!' : 'Not quite.'} Answer:{' '}
            <span className="font-semibold">{item.answer}</span>
          </div>
        )}
      </div>
      <div className="pb-6">
        {checked === null ? (
          <Button type="submit" disabled={value.trim() === ''}>
            Check
          </Button>
        ) : (
          <Button type="submit">{idx + 1 >= items.length ? 'Finish' : 'Next'}</Button>
        )}
      </div>
    </form>
  )
}
