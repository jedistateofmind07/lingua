import { useNavigate } from 'react-router-dom'
import { Tile } from '../../components/ui/Tile'
import { useProgress } from '../../store/progressStore'

export function DashboardPage() {
  const navigate = useNavigate()
  const streak = useProgress((s) => s.streak)

  return (
    <div className="flex flex-1 flex-col gap-6 py-8">
      <header className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Lingua</h1>
        <span className="rounded-full bg-navy-800 px-3 py-1 text-sm text-slate-300">🔥 {streak}</span>
      </header>
      <p className="text-slate-400">Practice Spanish — vocabulary and conjugations.</p>

      <div className="flex flex-col gap-3">
        <Tile
          emoji="🗂️"
          title="Vocabulary"
          subtitle="Match words by topic"
          onClick={() => navigate('/vocab')}
        />
        <Tile
          emoji="🔤"
          title="Conjugations"
          subtitle="Drill verb endings & full forms"
          onClick={() => navigate('/conjugations')}
        />
      </div>

      <div className="mt-2">
        <div className="mb-2 flex items-center gap-2">
          <h2 className="text-lg font-semibold">Ask Lingua</h2>
          <span className="rounded-full bg-navy-700 px-2 py-0.5 text-xs text-slate-400">
            Coming in Phase 2
          </span>
        </div>
        <textarea
          disabled
          rows={3}
          placeholder="e.g. “Make me flashcards for past-tense -er verbs”"
          className="w-full cursor-not-allowed resize-none rounded-card border border-navy-700 bg-navy-850 px-4 py-3 text-slate-400 opacity-60"
        />
      </div>
    </div>
  )
}
