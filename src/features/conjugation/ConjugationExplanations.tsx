import { useState } from 'react'
import { TENSES, TENSE_BY_ID } from '../../data/conjugation/tenses'
import { ENDINGS } from '../../data/conjugation/endings'
import { IRREGULAR_VERBS } from '../../data/conjugation/verbs'
import { conjugate } from '../../engine/conjugate'
import { PERSONS, PERSON_LABELS } from '../../types/conjugation'
import type { Person, TenseId } from '../../types/conjugation'
import { TENSE_EXPLANATIONS } from '../../data/conjugation/explanations'

// Compact person headers so the wide irregulars table fits a phone better.
const COMPACT_PERSON: Record<Person, string> = {
  yo: 'Yo',
  tu: 'Tú',
  el: 'Él',
  nosotros: 'Nos.',
  ellos: 'Ellos'
}

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

// Full conjugation of the common irregular verbs for a (simple) tense.
function IrregularsTable({ tense }: { tense: TenseId }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-navy-700">
      <table className="w-full text-sm">
        <thead className="bg-navy-850 text-xs text-slate-400">
          <tr>
            <th className="px-2.5 py-1.5 text-left font-medium">verb</th>
            {PERSONS.map((p) => (
              <th key={p} className="whitespace-nowrap px-2.5 py-1.5 text-left font-medium">
                {COMPACT_PERSON[p]}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {IRREGULAR_VERBS.map((v) => (
            <tr key={v.infinitive} className="border-t border-navy-700">
              <td className="whitespace-nowrap px-2.5 py-1.5 font-semibold text-accent">
                {v.infinitive}
              </td>
              {PERSONS.map((p) => (
                <td key={p} className="whitespace-nowrap px-2.5 py-1.5 text-slate-100">
                  {conjugate(v.infinitive, tense, p)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// For compound tenses the only irregular part is the past participle.
function IrregularParticiples() {
  const items: [string, string][] = [
    ['ver', 'visto'],
    ['hacer', 'hecho'],
    ['decir', 'dicho'],
    ['poner', 'puesto'],
    ['volver', 'vuelto'],
    ['abrir', 'abierto'],
    ['escribir', 'escrito'],
    ['romper', 'roto']
  ]
  return (
    <div className="text-sm text-slate-300">
      <p>
        Only the participle changes — the rest is just <span className="text-slate-100">haber</span>{' '}
        + participle. Common irregular participles:
      </p>
      <ul className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1">
        {items.map(([inf, part]) => (
          <li key={inf}>
            <span className="text-slate-400">{inf} → </span>
            <span className="font-semibold text-slate-100">{part}</span>
          </li>
        ))}
      </ul>
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
        const compound = TENSE_BY_ID[t.id].isCompound
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
                {compound ? (
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
                  {compound ? 'Irregular participles' : 'Common irregulars'}
                </h4>
                {compound ? <IrregularParticiples /> : <IrregularsTable tense={t.id} />}

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
