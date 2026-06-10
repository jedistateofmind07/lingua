import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Region } from '../types/vocab'

interface SettingsState {
  region: Region
  setRegion: (region: Region) => void
}

// Default to Colombian Spanish (matches the learner's context); switchable in-app.
export const useSettings = create<SettingsState>()(
  persist(
    (set) => ({
      region: 'co',
      setRegion: (region) => set({ region })
    }),
    { name: 'lingua-settings-v1' }
  )
)
