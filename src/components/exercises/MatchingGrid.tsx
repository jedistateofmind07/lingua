import { useMemo, useRef, useState } from 'react'
import type { ExerciseItem, ExerciseOutcome, Mistake } from '../../types/exercise'
import { shuffle } from '../../lib/shuffle'

interface Side {
  key: string
  label: string
  expected?: string // present on left cards only
}

interface Props {
  items: ExerciseItem[]
  onComplete: (outcome: ExerciseOutcome) => void
  onProgress?: (matched: number, total: number) => void
}

// Tap a left (prompt) card then a right (answer) card. Matching is value-based,
// so duplicate answers (e.g. conjugation endings where two persons share an
// ending) work correctly — any right card with the right text matches.
export function MatchingGrid({ items, onComplete, onProgress }: Props) {
  const { left, right } = useMemo(() => {
    const left: Side[] = shuffle(items).map((it) => ({
      key: `l-${it.id}`,
      label: it.prompt,
      expected: it.answer
    }))
    const right: Side[] = shuffle(items).map((it) => ({ key: `r-${it.id}`, label: it.answer }))
    return { left, right }
  }, [items])

  const total = items.length
  const [matched, setMatched] = useState<Set<string>>(new Set())
  const [selLeft, setSelLeft] = useState<string | null>(null)
  const [selRight, setSelRight] = useState<string | null>(null)
  const [wrong, setWrong] = useState<Set<string>>(new Set())
  const mistakes = useRef<Mistake[]>([])

  function handleTap(side: 'left' | 'right', card: Side) {
    if (matched.has(card.key) || wrong.size > 0) return

    const nextLeft = side === 'left' ? card.key : selLeft
    const nextRight = side === 'right' ? card.key : selRight
    if (side === 'left') setSelLeft(card.key)
    else setSelRight(card.key)

    if (!nextLeft || !nextRight) return

    const leftCard = left.find((c) => c.key === nextLeft)
    const rightCard = right.find((c) => c.key === nextRight)
    if (!leftCard || !rightCard) return

    if (leftCard.expected === rightCard.label) {
      const m = new Set(matched)
      m.add(nextLeft)
      m.add(nextRight)
      setMatched(m)
      setSelLeft(null)
      setSelRight(null)
      const pairs = m.size / 2
      onProgress?.(pairs, total)
      if (pairs === total) {
        onComplete({ correct: total, total, mistakes: mistakes.current })
      }
    } else {
      mistakes.current.push({
        prompt: leftCard.label,
        expected: leftCard.expected ?? '',
        given: rightCard.label
      })
      setWrong(new Set([nextLeft, nextRight]))
      window.setTimeout(() => {
        setWrong(new Set())
        setSelLeft(null)
        setSelRight(null)
      }, 650)
    }
  }

  function cardClass(key: string): string {
    if (matched.has(key)) {
      return 'pointer-events-none border-accent/40 bg-navy-850 text-slate-500 opacity-50'
    }
    if (wrong.has(key)) return 'border-red-500 bg-navy-800 text-slate-100'
    if (key === selLeft || key === selRight) {
      return 'border-accent bg-navy-700 text-slate-100 ring-2 ring-accent/40'
    }
    return 'border-navy-700 bg-navy-800 text-slate-100 hover:border-navy-600'
  }

  const renderColumn = (cards: Side[], side: 'left' | 'right') =>
    cards.map((c) => (
      <button
        key={c.key}
        onClick={() => handleTap(side, c)}
        className={`flex min-h-[64px] items-center justify-center rounded-card border px-3 py-3 text-center text-base font-medium transition ${cardClass(
          c.key
        )}`}
      >
        {c.label}
      </button>
    ))

  return (
    <div className="grid grid-cols-2 gap-3">
      <div className="flex flex-col gap-3">{renderColumn(left, 'left')}</div>
      <div className="flex flex-col gap-3">{renderColumn(right, 'right')}</div>
    </div>
  )
}
