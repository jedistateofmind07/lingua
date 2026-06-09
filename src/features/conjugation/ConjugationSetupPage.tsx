import { useState } from 'react'
import type { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { TENSES, TENSE_BY_ID } from '../../data/conjugation/tenses'
import { verbsForClass } from '../../data/conjugation/verbs'
import type { TenseId, VerbClass } from '../../types/conjugation'
import type { ExerciseKind } from '../../types/exercise'
import { Button } from '../../components/ui/Button'
import { ConjugationExplanations } from './ConjugationExplanations'

type Drill = 'fullform' | 'endings' | 'table'
type ClassChoice = VerbClass | 'mixed'
type Tab = 'practice' | 'explanations'

function Chip({
  active,
  children,
  onClick
}: {
  active: boolean
  children: ReactNode
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full border px-3.5 py-1.5 text-sm transition ${
        active
          ? 'border-accent bg-accent text-white'
          : 'border-navy-700 bg-navy-800 text-slate-300 hover:border-navy-600'
      }`}
    >
      {children}
    </button>
  )
}

function Section({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <h3 className="mb-2 text-sm font-semibold text-slate-400">{label}</h3>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  )
}

export function ConjugationSetupPage() {
  const navigate = useNavigate()
  const [tab, setTab] = useState<Tab>('practice')
  const [drill, setDrill] = useState<Drill>('fullform')
  const [tense, setTense] = useState<TenseId>('presente')
  const [verbClass, setVerbClass] = useState<ClassChoice>('ar')
  const [kind, setKind] = useState<ExerciseKind>('matching')
  const [verb, setVerb] = useState<string>('random')

  const tenseOptions = drill === 'endings' ? TENSES.filter((t) => !t.isCompound) : TENSES
  const verbChoices = verbClass === 'mixed' ? [] : verbsForClass(verbClass)

  function chooseDrill(d: Drill) {
    setDrill(d)
    setVerb('random')
    if (d === 'endings') {
      if (TENSE_BY_ID[tense].isCompound) setTense('presente')
      if (verbClass === 'mixed') setVerbClass('ar')
    }
  }

  function chooseClass(c: ClassChoice) {
    setVerbClass(c)
    setVerb('random')
  }

  function start() {
    navigate('/conjugations/session', { state: { drill, tense, verbClass, kind, verb } })
  }

  return (
    <div className="flex flex-1 flex-col gap-6 py-6">
      <header className="flex items-center gap-3">
        <button
          onClick={() => navigate('/')}
          aria-label="Back"
          className="text-2xl text-slate-400 transition hover:text-slate-200"
        >
          ←
        </button>
        <h1 className="text-2xl font-bold">Conjugations</h1>
      </header>

      <div className="flex gap-2">
        <Chip active={tab === 'practice'} onClick={() => setTab('practice')}>
          Practice
        </Chip>
        <Chip active={tab === 'explanations'} onClick={() => setTab('explanations')}>
          Explanations
        </Chip>
      </div>

      {tab === 'explanations' ? (
        <ConjugationExplanations />
      ) : (
        <>
          <Section label="Drill">
            <Chip active={drill === 'fullform'} onClick={() => chooseDrill('fullform')}>
              Full forms
            </Chip>
            <Chip active={drill === 'table'} onClick={() => chooseDrill('table')}>
              Full table
            </Chip>
            <Chip active={drill === 'endings'} onClick={() => chooseDrill('endings')}>
              Endings only
            </Chip>
          </Section>

          <Section label="Tense">
            {tenseOptions.map((t) => (
              <Chip key={t.id} active={tense === t.id} onClick={() => setTense(t.id)}>
                {t.label}
              </Chip>
            ))}
          </Section>

          <Section label="Verb type">
            {(['ar', 'er', 'ir'] as const).map((c) => (
              <Chip key={c} active={verbClass === c} onClick={() => chooseClass(c)}>
                -{c}
              </Chip>
            ))}
            {drill !== 'endings' && (
              <Chip active={verbClass === 'mixed'} onClick={() => chooseClass('mixed')}>
                Mixed
              </Chip>
            )}
          </Section>

          {drill === 'table' && (
            <Section label="Verb">
              <Chip active={verb === 'random'} onClick={() => setVerb('random')}>
                🎲 Random
              </Chip>
              {verbChoices.map((v) => (
                <Chip
                  key={v.infinitive}
                  active={verb === v.infinitive}
                  onClick={() => setVerb(v.infinitive)}
                >
                  {v.infinitive}
                </Chip>
              ))}
            </Section>
          )}

          {drill === 'fullform' && (
            <Section label="Format">
              {(['matching', 'type', 'flashcard'] as const).map((k) => (
                <Chip key={k} active={kind === k} onClick={() => setKind(k)}>
                  {k === 'type' ? 'Type' : k === 'matching' ? 'Match' : 'Flashcards'}
                </Chip>
              ))}
            </Section>
          )}

          <div className="mt-auto pb-2">
            <Button onClick={start}>Start</Button>
          </div>
        </>
      )}
    </div>
  )
}
