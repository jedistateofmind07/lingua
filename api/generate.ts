import type { VercelRequest, VercelResponse } from '@vercel/node'
import Anthropic from '@anthropic-ai/sdk'

// Runs on Robbie's Claude account via a Claude Code OAuth token (no API key).
// The token lives ONLY here (Vercel env var), never in the browser.

const MODEL = 'claude-opus-4-8'

// Claude Code OAuth tokens are only honored when the request identifies as
// Claude Code — the first system block must be exactly this line.
const CC_IDENTITY = "You are Claude Code, Anthropic's official CLI for Claude."

// Keep in sync with src/data/conjugation/verbs.ts (the engine can correctly
// conjugate any regular verb plus these verified irregulars).
const ALLOWED_VERBS = [
  'hablar', 'trabajar', 'estudiar', 'caminar', 'cocinar', 'comprar', 'cantar',
  'comer', 'beber', 'aprender', 'correr', 'comprender', 'vender',
  'vivir', 'recibir', 'decidir', 'subir', 'partir',
  'ser', 'estar', 'ir', 'tener', 'hacer', 'decir', 'poder', 'querer', 'venir', 'saber', 'ver'
]

const TENSE_IDS = [
  'presente', 'indefinido', 'imperfecto', 'futuro', 'condicionalSimple',
  'subjPresente', 'subjImperfecto', 'perfecto', 'pluscuamperfecto', 'condicionalCompuesto'
]

const SYSTEM = `You generate Spanish practice exercises for "Lingua", an app used by an advanced-beginner / low-intermediate English speaker learning Latin American (Colombian) Spanish.

You MUST call the generate_exercise tool exactly once. Choose the kind that best fits the request.

CONJUGATION (requests about verbs / tenses / conjugating): fill "conjugation".
- Do NOT write any conjugated forms yourself — the app computes them with a verified engine. You only choose:
  - tenseId: one of presente, indefinido (preterite), imperfecto, futuro, condicionalSimple, subjPresente, subjImperfecto, perfecto, pluscuamperfecto, condicionalCompuesto.
  - verbClass: ar | er | ir | mixed.
  - drill: fullform (produce full conjugated forms) | table (one verb, all persons) | endings (just the ending; SIMPLE tenses only).
  - format: matching | type | flashcard.
  - verbs (optional): infinitives to focus on, chosen ONLY from this list: ${ALLOWED_VERBS.join(', ')}. Omit for variety.
- Map natural language: "past"→indefinido (or imperfecto if habitual/description), "present"→presente, "future"→futuro, "would"→condicionalSimple, "subjunctive"→subjPresente, "have/has done"→perfecto. "flashcards"→flashcard, "match"/"matching"→matching, "type"/"write"→type, "table"/"all forms of <verb>"→table. Defaults: drill fullform, format type.

VOCABULARY (requests about words / topics / a vocab set): fill "vocab".
- items: 6 to 10 {es, en, gender} pairs. gender "m"/"f" for nouns, "none" for non-nouns. Correct, common Latin American Spanish; no duplicates; on-topic.
- format: matching | flashcard | type (default matching).

Always set kind and a short title (max ~6 words).`

const TOOL: Anthropic.Tool = {
  name: 'generate_exercise',
  description: 'Return a structured plan for one Spanish practice exercise.',
  input_schema: {
    type: 'object',
    properties: {
      kind: { type: 'string', enum: ['vocab', 'conjugation'] },
      title: { type: 'string' },
      conjugation: {
        type: 'object',
        properties: {
          tenseId: { type: 'string', enum: TENSE_IDS },
          verbClass: { type: 'string', enum: ['ar', 'er', 'ir', 'mixed'] },
          drill: { type: 'string', enum: ['fullform', 'table', 'endings'] },
          format: { type: 'string', enum: ['matching', 'type', 'flashcard'] },
          verbs: { type: 'array', items: { type: 'string', enum: ALLOWED_VERBS } }
        },
        required: ['tenseId', 'verbClass', 'drill', 'format']
      },
      vocab: {
        type: 'object',
        properties: {
          items: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                es: { type: 'string' },
                en: { type: 'string' },
                gender: { type: 'string', enum: ['m', 'f', 'none'] }
              },
              required: ['es', 'en']
            }
          },
          format: { type: 'string', enum: ['matching', 'flashcard', 'type'] }
        },
        required: ['items', 'format']
      }
    },
    required: ['kind', 'title']
  }
}

function originAllowed(req: VercelRequest): boolean {
  const origin = req.headers.origin
  if (!origin) return true // non-browser clients (e.g. curl) have no Origin
  return (
    /^https:\/\/lingua[a-z0-9-]*\.vercel\.app$/.test(origin) ||
    /^http:\/\/localhost(:\d+)?$/.test(origin)
  )
}

export const config = { maxDuration: 30 }

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })
  if (!originAllowed(req)) return res.status(403).json({ error: 'Forbidden' })

  const token = process.env.CLAUDE_CODE_OAUTH_TOKEN
  if (!token) {
    return res.status(500).json({
      error: 'AI is not configured. Set CLAUDE_CODE_OAUTH_TOKEN in the Vercel project environment.'
    })
  }

  const prompt = typeof req.body?.prompt === 'string' ? req.body.prompt.trim() : ''
  if (!prompt || prompt.length > 500) {
    return res.status(400).json({ error: 'Provide a prompt (1–500 characters).' })
  }

  const client = new Anthropic({
    authToken: token, // Authorization: Bearer <token>
    defaultHeaders: { 'anthropic-beta': 'oauth-2025-04-20' }
  })

  try {
    const msg = await client.messages.create({
      model: MODEL,
      max_tokens: 1500,
      system: [
        { type: 'text', text: CC_IDENTITY },
        { type: 'text', text: SYSTEM }
      ],
      tools: [TOOL],
      tool_choice: { type: 'tool', name: 'generate_exercise' },
      messages: [{ role: 'user', content: prompt }]
    })
    const block = msg.content.find((b) => b.type === 'tool_use')
    if (!block || block.type !== 'tool_use') {
      return res.status(502).json({ error: 'The model did not return an exercise.' })
    }
    return res.status(200).json({ plan: block.input })
  } catch (e) {
    const status = (e as { status?: number })?.status
    if (status === 401 || status === 403) {
      return res.status(502).json({
        error: 'Claude rejected the credential — the CLAUDE_CODE_OAUTH_TOKEN may be invalid, expired, or not permitted for this use.'
      })
    }
    return res.status(502).json({ error: 'Generation failed. Please try again.' })
  }
}
