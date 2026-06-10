import type { ExercisePlan } from '../types/ai'

// Calls the serverless endpoint that talks to Claude on Robbie's account.
export async function generateExercise(prompt: string): Promise<ExercisePlan> {
  const res = await fetch('/api/generate', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ prompt })
  })
  const data = (await res.json().catch(() => ({}))) as { plan?: ExercisePlan; error?: string }
  if (!res.ok) throw new Error(data?.error || 'Generation failed.')
  if (!data.plan) throw new Error('No exercise was returned.')
  return data.plan
}
