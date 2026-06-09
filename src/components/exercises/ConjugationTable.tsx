import { useState } from 'react'
import type { ExerciseItem, ExerciseOutcome, Mistake } from '../../types/exercise'
import { isCorrect } from '../../engine/compare'
import { Button } from '../ui/Button'

// Fill in every person's form for one verb + tense, then check the whole table.
export function ConjugationTable({
  items,
  verb,
  tenseLabel,
  accentInsensitive = true,
  onProgress,
  onComplete
}: {
  items: ExerciseItem[]
  verb: string
  tenseLabel: string
  accentInsensitive?: boolean
  onProgress?: (current: number, total: number) => void
  onComplete: (outcome: ExerciseOutcome) => void
}) {
  const [values, setValues] = useState<string[]>(() => items.map(() => ''))
  const [checked, setChecked] = useState(false)

  const grade = (i: number) =>
    isCorrect(values[i], items[i].answer, {
      accentInsensitive,
      alternates: items[i].alternates
    })

  function setValue(i: number, v: string) {
    const next = values.slice()
    next[i] = v
    setValues(next)
    onProgress?.(next.filter((x) => x.trim() !== '').length, items.length)
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!checked) {
      setChecked(true)
      return
    }
    const mistakes: Mistake[] = []
    let correct = 0
    items.forEach((it, i) => {
      if (grade(i)) correct++
      else mistakes.push({ prompt: `${verb} · ${it.prompt}`, expected: it.answer, given: values[i] })
    })
    onComplete({ correct, total: items.length, mistakes })
  }

  const allFilled = values.every((v) => v.trim() !== '')

  return (
    <form onSubmit={onSubmit} className="flex flex-1 flex-col">
      <div className="mb-5 mt-2">
        <span className="block text-3xl font-bold text-slate-100">{verb}</span>
        <span className="text-sm text-slate-400">{tenseLabel}</span>
      </div>

      <div className="flex flex-col gap-2.5">
        {items.map((it, i) => {
          const ok = checked && grade(i)
          return (
            <div key={it.id} className="flex items-start gap-3">
              <span className="mt-2.5 w-24 shrink-0 text-sm text-slate-400">{it.prompt}</span>
              <div className="flex-1">
                <input
                  autoFocus={i === 0}
                  value={values[i]}
                  onChange={(e) => setValue(i, e.target.value)}
                  readOnly={checked}
                  autoCapitalize="off"
                  autoCorrect="off"
                  spellCheck={false}
                  placeholder="…"
                  className={`w-full rounded-xl border bg-navy-850 px-3 py-2.5 text-base text-slate-100 outline-none ${
                    checked
                      ? ok
                        ? 'border-green-500'
                        : 'border-red-500'
                      : 'border-navy-600 focus:border-accent'
                  }`}
                />
                {checked && !ok && (
                  <span className="mt-1 block text-xs text-red-300">
                    Answer: <span className="font-semibold">{it.answer}</span>
                  </span>
                )}
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-auto pb-6 pt-6">
        <Button type="submit" disabled={!checked && !allFilled}>
          {checked ? 'Continue' : 'Check'}
        </Button>
      </div>
    </form>
  )
}
