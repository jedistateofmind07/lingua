import { useMemo, useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import {
  buildConjugationEndings,
  buildConjugationFullForm,
  buildConjugationTable
} from '../../lib/exerciseBuilders'
import type { TenseId, VerbClass } from '../../types/conjugation'
import type { ExerciseKind, ExerciseOutcome } from '../../types/exercise'
import { MatchingGrid } from '../../components/exercises/MatchingGrid'
import { TypeAnswer } from '../../components/exercises/TypeAnswer'
import { Flashcard } from '../../components/exercises/Flashcard'
import { ConjugationTable } from '../../components/exercises/ConjugationTable'
import { ResultsPanel } from '../../components/exercises/ResultsPanel'
import { SessionHeader } from '../../components/layout/SessionHeader'
import { useProgress } from '../../store/progressStore'

interface Config {
  drill: 'endings' | 'fullform' | 'table'
  tense: TenseId
  verbClass: VerbClass | 'mixed'
  kind: ExerciseKind
  verb?: string
}

export function ConjugationSessionPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const recordSession = useProgress((s) => s.recordSession)
  const config = location.state as Config | null

  const [round, setRound] = useState(0)
  const exercise = useMemo(() => {
    if (!config) return null
    if (config.drill === 'endings') {
      const vc = config.verbClass === 'mixed' ? 'ar' : config.verbClass
      return buildConjugationEndings(config.tense, vc)
    }
    if (config.drill === 'table') {
      return buildConjugationTable(config.tense, config.verbClass, config.verb)
    }
    return buildConjugationFullForm(config.tense, config.verbClass, config.kind)
    // eslint-disable-next-line react-hooks/exhaustive-deps -- round re-seeds a fresh round on replay
  }, [config, round])

  const [progress, setProgress] = useState(0)
  const [outcome, setOutcome] = useState<ExerciseOutcome | null>(null)

  if (!config || !exercise) return <Navigate to="/conjugations" replace />

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
    return (
      <ResultsPanel outcome={outcome} onReplay={replay} onDone={() => navigate('/conjugations')} />
    )
  }

  const heading =
    exercise.kind === 'matching'
      ? 'Tap the matching pairs'
      : exercise.kind === 'table'
        ? 'Fill in the conjugation'
        : exercise.title

  return (
    <div className="flex flex-1 flex-col">
      <SessionHeader
        value={progress}
        total={exercise.items.length}
        onExit={() => navigate('/conjugations')}
      />
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
