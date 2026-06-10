import { useMemo, useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import type { ExercisePlan } from '../../types/ai'
import type { ExerciseOutcome } from '../../types/exercise'
import { buildFromPlan } from '../../lib/aiBuilder'
import { MatchingGrid } from '../../components/exercises/MatchingGrid'
import { TypeAnswer } from '../../components/exercises/TypeAnswer'
import { Flashcard } from '../../components/exercises/Flashcard'
import { ConjugationTable } from '../../components/exercises/ConjugationTable'
import { ResultsPanel } from '../../components/exercises/ResultsPanel'
import { SessionHeader } from '../../components/layout/SessionHeader'
import { Button } from '../../components/ui/Button'
import { useProgress } from '../../store/progressStore'

export function AiSessionPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const recordSession = useProgress((s) => s.recordSession)
  const state = location.state as { plan?: ExercisePlan; prompt?: string } | null

  const [round, setRound] = useState(0)
  const built = useMemo(() => {
    if (!state?.plan) return { exercise: null, error: null as string | null }
    try {
      return { exercise: buildFromPlan(state.plan, state.prompt ?? ''), error: null }
    } catch (e) {
      return { exercise: null, error: e instanceof Error ? e.message : 'Could not build the exercise.' }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- round re-seeds a fresh round on replay
  }, [state, round])

  const [progress, setProgress] = useState(0)
  const [outcome, setOutcome] = useState<ExerciseOutcome | null>(null)

  if (!state?.plan) return <Navigate to="/" replace />

  const { exercise, error } = built

  if (error || !exercise) {
    return (
      <div className="flex flex-1 flex-col gap-4 py-8">
        <h2 className="text-xl font-bold">Couldn’t build that</h2>
        <p className="text-slate-300">{error ?? 'Something went wrong.'}</p>
        <div className="mt-auto pb-2">
          <Button onClick={() => navigate('/')}>Back to dashboard</Button>
        </div>
      </div>
    )
  }

  function handleComplete(o: ExerciseOutcome) {
    setOutcome(o)
    recordSession({
      source: exercise!.source,
      total: o.total,
      correct: o.correct,
      mistakes: o.mistakes,
      completedAt: Date.now()
    })
  }

  function replay() {
    setOutcome(null)
    setProgress(0)
    setRound((r) => r + 1)
  }

  if (outcome) {
    return <ResultsPanel outcome={outcome} onReplay={replay} onDone={() => navigate('/')} />
  }

  const heading =
    exercise.kind === 'matching'
      ? 'Tap the matching pairs'
      : exercise.kind === 'table'
        ? 'Fill in the conjugation'
        : exercise.title

  return (
    <div className="flex flex-1 flex-col">
      <SessionHeader value={progress} total={exercise.items.length} onExit={() => navigate('/')} />
      <h2 className="mb-4 mt-2 text-xl font-bold">{heading}</h2>
      {exercise.kind === 'matching' && (
        <MatchingGrid
          items={exercise.items}
          onProgress={(m) => setProgress(m)}
          onComplete={handleComplete}
        />
      )}
      {exercise.kind === 'type' && (
        <TypeAnswer
          items={exercise.items}
          onProgress={(c) => setProgress(c)}
          onComplete={handleComplete}
        />
      )}
      {exercise.kind === 'flashcard' && (
        <Flashcard
          items={exercise.items}
          onProgress={(c) => setProgress(c)}
          onComplete={handleComplete}
        />
      )}
      {exercise.kind === 'table' && (
        <ConjugationTable
          items={exercise.items}
          verb={exercise.meta?.verb ?? ''}
          tenseLabel={exercise.meta?.tenseLabel ?? ''}
          onProgress={(c) => setProgress(c)}
          onComplete={handleComplete}
        />
      )}
    </div>
  )
}
