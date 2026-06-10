import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Tile } from '../../components/ui/Tile'
import { Button } from '../../components/ui/Button'
import { RegionSelector } from '../../components/ui/RegionSelector'
import { useProgress } from '../../store/progressStore'
import { generateExercise } from '../../lib/aiClient'

export function DashboardPage() {
  const navigate = useNavigate()
  const streak = useProgress((s) => s.streak)

  const [prompt, setPrompt] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function ask() {
    const q = prompt.trim()
    if (!q || loading) return
    setLoading(true)
    setError(null)
    try {
      const plan = await generateExercise(q)
      navigate('/ai/session', { state: { plan, prompt: q } })
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-1 flex-col gap-6 py-8">
      <header className="flex items-center justify-between gap-3">
        <h1 className="text-3xl font-bold">Lingua</h1>
        <RegionSelector />
      </header>
      <div className="flex items-center justify-between gap-3">
        <p className="text-slate-400">Practice Spanish — vocabulary and conjugations.</p>
        <span className="shrink-0 rounded-full bg-navy-800 px-3 py-1 text-sm text-slate-300">
          🔥 {streak}
        </span>
      </div>

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
        <h2 className="mb-2 text-lg font-semibold">Ask Lingua</h2>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          rows={3}
          maxLength={500}
          placeholder="e.g. “flashcards for past-tense -er verbs” or “kitchen vocabulary”"
          className="w-full resize-none rounded-card border border-navy-700 bg-navy-850 px-4 py-3 text-slate-100 outline-none focus:border-accent"
        />
        {error && <p className="mt-2 text-sm text-red-300">{error}</p>}
        <div className="mt-3">
          <Button onClick={ask} disabled={loading || prompt.trim() === ''}>
            {loading ? 'Generating…' : 'Generate exercise'}
          </Button>
        </div>
      </div>
    </div>
  )
}
