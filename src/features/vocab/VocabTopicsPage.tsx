import { useNavigate } from 'react-router-dom'
import { DECKS } from '../../data/vocab'
import { Tile } from '../../components/ui/Tile'
import { RegionSelector } from '../../components/ui/RegionSelector'
import { useProgress } from '../../store/progressStore'

export function VocabTopicsPage() {
  const navigate = useNavigate()
  const vocabCompleted = useProgress((s) => s.vocabCompleted)

  return (
    <div className="flex flex-1 flex-col gap-4 py-6">
      <header className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/')}
            aria-label="Back"
            className="text-2xl text-slate-400 transition hover:text-slate-200"
          >
            ←
          </button>
          <h1 className="text-2xl font-bold">Vocabulary</h1>
        </div>
        <RegionSelector />
      </header>
      <div className="flex flex-col gap-3">
        {DECKS.map((d) => {
          const count = vocabCompleted[d.id] ?? 0
          return (
            <Tile
              key={d.id}
              emoji={d.emoji}
              title={d.title}
              subtitle={`${d.entries.length} words`}
              badge={count > 0 ? `✓ ${count}` : undefined}
              onClick={() => navigate(`/vocab/${d.id}`)}
            />
          )
        })}
      </div>
    </div>
  )
}
