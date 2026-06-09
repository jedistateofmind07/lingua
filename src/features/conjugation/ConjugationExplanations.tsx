import { useState } from 'react'
import { TENSES, TENSE_BY_ID } from '../../data/conjugation/tenses'
import { ENDINGS } from '../../data/conjugation/endings'
import { PERSONS, PERSON_LABELS } from '../../types/conjugation'
import type { TenseId } from '../../types/conjugation'
import { TENSE_EXPLANATIONS } from '../../data/conjugation/explanations'

function EndingsGrid({ tense }: { tense: TenseId }) {
  const row = ENDINGS[tense]
  if (!row) return null
  const columns =
    'all' in row
      ? [{ header: 'ending', values: row.all }]
      : [
          { header: '-ar', values: row.ar },
          { header: '-er', values: row.er },
          { header: '-ir', values: row.ir }
        ]
  return (
    <div className="overflow-hidden rounded-lg border border-navy-700">
      <table className="w-full text-sm">
        <thead className="bg-navy-850 text-xs text-slate-400">
          <tr>
            <th className="px-3 py-1.5 text-left font-medium"> </th>
            {columns.map((c) => (
              <th key={c.header} className="px-3 py-1.5 text-left font-medium">
                {c.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {PERSONS.map((p, i) => (
            <tr key={p} className="border-t border-navy-700">
              <td className="px-3 py-1.5 text-slate-400">{PERSON_LABELS[p]}</td>
              {columns.map((c) => (
                <td key={c.header} className="px-3 py-1.5 font-medium text-slate-100">
                  {c.values[i]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function ConjugationExplanations() {
  const [open, setOpen] = useState<TenseId | null>('presente')

  return (
    <div className="flex flex-col gap-3">
      {TENSES.map((t) => {
        const isOpen = open === t.id
        const ex = TENSE_EXPLANATIONS[t.id]
        return (
          <div key={t.id} className="overflow-hidden rounded-card border border-navy-700 bg-navy-800">
            <button
              onClick={() => setOpen(isOpen ? null : t.id)}
              className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left"
            >
              <span className="font-semibold text-slate-100">{t.label}</span>
              <span className="text-lg leading-none text-slate-400">{isOpen ? '−' : '+'}</span>
            </button>
            {isOpen && (
              <div className="border-t border-navy-700 px-4 py-4">
                <p className="text-sm text-slate-300">{ex.summary}</p>

                <h4 className="mb-2 mt-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Framework
                </h4>
                {TENSE_BY_ID[t.id].isCompound ? (
                  <p className="text-sm text-slate-300">{ex.formula}</p>
                ) : (
                  <>
                    <EndingsGrid tense={t.id} />
                    {ex.frameworkNote && (
                      <p className="mt-2 text-xs text-slate-400">{ex.frameworkNote}</p>
                    )}
                  </>
                )}

                <h4 className="mb-2 mt-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Examples
                </h4>
                <ul className="flex flex-col gap-2">
                  {ex.examples.map((e, i) => (
                    <li key={i} className="text-sm">
                      <span className="text-slate-100">{e.es}</span>
                      <span className="block text-slate-400">{e.en}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
