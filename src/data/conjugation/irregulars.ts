import type { IrregularVerb } from '../../types/conjugation'

// ============================================================================
// VERIFIED IRREGULAR VERB DATA — the audit surface for "never display wrong Spanish".
//
// Every string below is human-verified standard Spanish (5-person paradigm:
// yo / tú / él-ella / nosotros / ellos — no vosotros).
// DO NOT populate or edit this file from model output without checking a
// reliable reference (RAE / standard conjugation table).
//
// Only the tenses where a verb is irregular are listed; the engine falls back
// to the regular rule for any omitted tense (those are genuinely regular for
// these verbs — e.g. tener.imperfecto = tenía). Compound tenses are composed by
// the engine (haber + participle) and are NOT listed here. Subjunctive imperfect
// is derived by the engine from the (overridden) 3rd-person-plural preterite, so
// it is not listed either.
// ============================================================================

const ser: IrregularVerb = {
  infinitive: 'ser',
  verbClass: 'er',
  participle: 'sido',
  forms: {
    presente: { yo: 'soy', tu: 'eres', el: 'es', nosotros: 'somos', ellos: 'son' },
    indefinido: { yo: 'fui', tu: 'fuiste', el: 'fue', nosotros: 'fuimos', ellos: 'fueron' },
    imperfecto: { yo: 'era', tu: 'eras', el: 'era', nosotros: 'éramos', ellos: 'eran' },
    subjPresente: { yo: 'sea', tu: 'seas', el: 'sea', nosotros: 'seamos', ellos: 'sean' }
    // futuro (seré…) & condicional (sería…) are regular — engine handles them.
  }
}

const estar: IrregularVerb = {
  infinitive: 'estar',
  verbClass: 'ar',
  participle: 'estado',
  forms: {
    presente: { yo: 'estoy', tu: 'estás', el: 'está', nosotros: 'estamos', ellos: 'están' },
    indefinido: {
      yo: 'estuve',
      tu: 'estuviste',
      el: 'estuvo',
      nosotros: 'estuvimos',
      ellos: 'estuvieron'
    },
    subjPresente: { yo: 'esté', tu: 'estés', el: 'esté', nosotros: 'estemos', ellos: 'estén' }
    // imperfecto (estaba…), futuro, condicional are regular.
  }
}

const ir: IrregularVerb = {
  infinitive: 'ir',
  verbClass: 'ir',
  participle: 'ido',
  forms: {
    presente: { yo: 'voy', tu: 'vas', el: 'va', nosotros: 'vamos', ellos: 'van' },
    indefinido: { yo: 'fui', tu: 'fuiste', el: 'fue', nosotros: 'fuimos', ellos: 'fueron' },
    imperfecto: { yo: 'iba', tu: 'ibas', el: 'iba', nosotros: 'íbamos', ellos: 'iban' },
    subjPresente: { yo: 'vaya', tu: 'vayas', el: 'vaya', nosotros: 'vayamos', ellos: 'vayan' }
    // futuro (iré…) & condicional (iría…) are regular.
  }
}

const tener: IrregularVerb = {
  infinitive: 'tener',
  verbClass: 'er',
  participle: 'tenido',
  forms: {
    presente: { yo: 'tengo', tu: 'tienes', el: 'tiene', nosotros: 'tenemos', ellos: 'tienen' },
    indefinido: { yo: 'tuve', tu: 'tuviste', el: 'tuvo', nosotros: 'tuvimos', ellos: 'tuvieron' },
    futuro: { yo: 'tendré', tu: 'tendrás', el: 'tendrá', nosotros: 'tendremos', ellos: 'tendrán' },
    condicionalSimple: {
      yo: 'tendría',
      tu: 'tendrías',
      el: 'tendría',
      nosotros: 'tendríamos',
      ellos: 'tendrían'
    },
    subjPresente: { yo: 'tenga', tu: 'tengas', el: 'tenga', nosotros: 'tengamos', ellos: 'tengan' }
    // imperfecto (tenía…) is regular.
  }
}

const hacer: IrregularVerb = {
  infinitive: 'hacer',
  verbClass: 'er',
  participle: 'hecho',
  forms: {
    presente: { yo: 'hago', tu: 'haces', el: 'hace', nosotros: 'hacemos', ellos: 'hacen' },
    indefinido: { yo: 'hice', tu: 'hiciste', el: 'hizo', nosotros: 'hicimos', ellos: 'hicieron' },
    futuro: { yo: 'haré', tu: 'harás', el: 'hará', nosotros: 'haremos', ellos: 'harán' },
    condicionalSimple: {
      yo: 'haría',
      tu: 'harías',
      el: 'haría',
      nosotros: 'haríamos',
      ellos: 'harían'
    },
    subjPresente: { yo: 'haga', tu: 'hagas', el: 'haga', nosotros: 'hagamos', ellos: 'hagan' }
  }
}

const decir: IrregularVerb = {
  infinitive: 'decir',
  verbClass: 'ir',
  participle: 'dicho',
  forms: {
    presente: { yo: 'digo', tu: 'dices', el: 'dice', nosotros: 'decimos', ellos: 'dicen' },
    indefinido: { yo: 'dije', tu: 'dijiste', el: 'dijo', nosotros: 'dijimos', ellos: 'dijeron' },
    futuro: { yo: 'diré', tu: 'dirás', el: 'dirá', nosotros: 'diremos', ellos: 'dirán' },
    condicionalSimple: {
      yo: 'diría',
      tu: 'dirías',
      el: 'diría',
      nosotros: 'diríamos',
      ellos: 'dirían'
    },
    subjPresente: { yo: 'diga', tu: 'digas', el: 'diga', nosotros: 'digamos', ellos: 'digan' }
  }
}

const poder: IrregularVerb = {
  infinitive: 'poder',
  verbClass: 'er',
  participle: 'podido',
  forms: {
    presente: { yo: 'puedo', tu: 'puedes', el: 'puede', nosotros: 'podemos', ellos: 'pueden' },
    indefinido: { yo: 'pude', tu: 'pudiste', el: 'pudo', nosotros: 'pudimos', ellos: 'pudieron' },
    futuro: { yo: 'podré', tu: 'podrás', el: 'podrá', nosotros: 'podremos', ellos: 'podrán' },
    condicionalSimple: {
      yo: 'podría',
      tu: 'podrías',
      el: 'podría',
      nosotros: 'podríamos',
      ellos: 'podrían'
    },
    subjPresente: { yo: 'pueda', tu: 'puedas', el: 'pueda', nosotros: 'podamos', ellos: 'puedan' }
  }
}

const querer: IrregularVerb = {
  infinitive: 'querer',
  verbClass: 'er',
  participle: 'querido',
  forms: {
    presente: { yo: 'quiero', tu: 'quieres', el: 'quiere', nosotros: 'queremos', ellos: 'quieren' },
    indefinido: { yo: 'quise', tu: 'quisiste', el: 'quiso', nosotros: 'quisimos', ellos: 'quisieron' },
    futuro: { yo: 'querré', tu: 'querrás', el: 'querrá', nosotros: 'querremos', ellos: 'querrán' },
    condicionalSimple: {
      yo: 'querría',
      tu: 'querrías',
      el: 'querría',
      nosotros: 'querríamos',
      ellos: 'querrían'
    },
    subjPresente: { yo: 'quiera', tu: 'quieras', el: 'quiera', nosotros: 'queramos', ellos: 'quieran' }
  }
}

const venir: IrregularVerb = {
  infinitive: 'venir',
  verbClass: 'ir',
  participle: 'venido',
  forms: {
    presente: { yo: 'vengo', tu: 'vienes', el: 'viene', nosotros: 'venimos', ellos: 'vienen' },
    indefinido: { yo: 'vine', tu: 'viniste', el: 'vino', nosotros: 'vinimos', ellos: 'vinieron' },
    futuro: { yo: 'vendré', tu: 'vendrás', el: 'vendrá', nosotros: 'vendremos', ellos: 'vendrán' },
    condicionalSimple: {
      yo: 'vendría',
      tu: 'vendrías',
      el: 'vendría',
      nosotros: 'vendríamos',
      ellos: 'vendrían'
    },
    subjPresente: { yo: 'venga', tu: 'vengas', el: 'venga', nosotros: 'vengamos', ellos: 'vengan' }
  }
}

const saber: IrregularVerb = {
  infinitive: 'saber',
  verbClass: 'er',
  participle: 'sabido',
  forms: {
    presente: { yo: 'sé', tu: 'sabes', el: 'sabe', nosotros: 'sabemos', ellos: 'saben' },
    indefinido: { yo: 'supe', tu: 'supiste', el: 'supo', nosotros: 'supimos', ellos: 'supieron' },
    futuro: { yo: 'sabré', tu: 'sabrás', el: 'sabrá', nosotros: 'sabremos', ellos: 'sabrán' },
    condicionalSimple: {
      yo: 'sabría',
      tu: 'sabrías',
      el: 'sabría',
      nosotros: 'sabríamos',
      ellos: 'sabrían'
    },
    subjPresente: { yo: 'sepa', tu: 'sepas', el: 'sepa', nosotros: 'sepamos', ellos: 'sepan' }
  }
}

const ver: IrregularVerb = {
  infinitive: 'ver',
  verbClass: 'er',
  participle: 'visto',
  forms: {
    presente: { yo: 'veo', tu: 'ves', el: 've', nosotros: 'vemos', ellos: 'ven' },
    indefinido: { yo: 'vi', tu: 'viste', el: 'vio', nosotros: 'vimos', ellos: 'vieron' },
    imperfecto: { yo: 'veía', tu: 'veías', el: 'veía', nosotros: 'veíamos', ellos: 'veían' },
    subjPresente: { yo: 'vea', tu: 'veas', el: 'vea', nosotros: 'veamos', ellos: 'vean' }
    // futuro (veré…) & condicional (vería…) are regular.
  }
}

// Auxiliary verb — required to compose every verb's compound tenses.
// Only the tenses used as compound auxiliaries need overriding:
//   perfecto -> haber.presente ; condicionalCompuesto -> haber.condicionalSimple.
// haber.imperfecto (había…) is regular, so it is omitted (engine computes it).
const haber: IrregularVerb = {
  infinitive: 'haber',
  verbClass: 'er',
  participle: 'habido',
  forms: {
    presente: { yo: 'he', tu: 'has', el: 'ha', nosotros: 'hemos', ellos: 'han' },
    condicionalSimple: {
      yo: 'habría',
      tu: 'habrías',
      el: 'habría',
      nosotros: 'habríamos',
      ellos: 'habrían'
    }
  }
}

export const irregulars: Record<string, IrregularVerb> = {
  ser,
  estar,
  ir,
  tener,
  hacer,
  decir,
  poder,
  querer,
  venir,
  saber,
  ver,
  haber
}
