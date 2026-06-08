import type { EndingsTable } from '../../types/conjugation'

// Regular endings. Person order: [yo, tu, el, nosotros, ellos].
// VERIFIED against standard Spanish. This corrects typos in Robbie's source
// spreadsheet (e.g. -er/-ir preterite Nosotros is "imos" not "emos"; accents restored).
//
// -er and -ir share endings everywhere EXCEPT present-tense nosotros
// (comemos vs vivimos), so each class is listed explicitly.
//
// Note: the subjImperfecto rows are the textbook class generalisations used by
// the endings-recall drill. The engine computes full subjunctive-imperfect
// forms from the 3rd-person-plural preterite (correct for irregular verbs too).
export const ENDINGS: EndingsTable = {
  presente: {
    ar: ['o', 'as', 'a', 'amos', 'an'],
    er: ['o', 'es', 'e', 'emos', 'en'],
    ir: ['o', 'es', 'e', 'imos', 'en']
  },
  indefinido: {
    ar: ['é', 'aste', 'ó', 'amos', 'aron'],
    er: ['í', 'iste', 'ió', 'imos', 'ieron'],
    ir: ['í', 'iste', 'ió', 'imos', 'ieron']
  },
  imperfecto: {
    ar: ['aba', 'abas', 'aba', 'ábamos', 'aban'],
    er: ['ía', 'ías', 'ía', 'íamos', 'ían'],
    ir: ['ía', 'ías', 'ía', 'íamos', 'ían']
  },
  futuro: {
    all: ['é', 'ás', 'á', 'emos', 'án']
  },
  condicionalSimple: {
    all: ['ía', 'ías', 'ía', 'íamos', 'ían']
  },
  subjPresente: {
    ar: ['e', 'es', 'e', 'emos', 'en'],
    er: ['a', 'as', 'a', 'amos', 'an'],
    ir: ['a', 'as', 'a', 'amos', 'an']
  },
  subjImperfecto: {
    ar: ['ara', 'aras', 'ara', 'áramos', 'aran'],
    er: ['iera', 'ieras', 'iera', 'iéramos', 'ieran'],
    ir: ['iera', 'ieras', 'iera', 'iéramos', 'ieran']
  }
}
