import { useMemo, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { getDeck } from '../../data/vocab'
import { buildVocabMatching } from '../../lib/exerciseBuilders'
import { MatchingGrid } from '../../components/exercises/MatchingGrid'
import { ResultsPanel } from '../../components/exercises/ResultsPanel'
import { SessionHeader } from '../../components/layout/SessionHeader'
import { useProgress } from '../../store/progressStore'
import type { ExerciseOutcome } from '../../types/exercise'

export function VocabSessionPage() {
  const { topicId } = useParams()
  const navigate = useNavigate()
  const recordSession = useProgress((s) => s.recordSession)
  const deck = topicId ? getDeck(topicId) : undefined

  const [round, setRound] = useState(0)
  const exercise = useMemo(
    () => (deck ? buildVocabMatching(deck) : null),
    // eslint-disable-next-line react-hooks/exhaustive-deps -- round re-seeds a fresh round on replay
    [deck, round]
  )
  const [progress, setProgress] = useState(0)
  const [outcome, setOutcome] = useState<ExerciseOutcome | null>(null)

  if (!deck || !exercise) return <Navigate to="/vocab" replace />

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
    return <ResultsPanel outcome={outcome} onReplay={replay} onDone={() => navigate('/vocab')} />
  }

  return (
    <div className="flex flex-1 flex-col">
      <SessionHeader value={progress} total={exercise.items.length} onExit={() => navigate('/vocab')} />
      <h2 className="mb-4 mt-2 text-xl font-bold">Tap the matching pairs</h2>
      <MatchingGrid
        items={exercise.items}
        onProgress={(m) => setProgress(m)}
        onComplete={handleComplete}
      />
    </div>
  )
}
