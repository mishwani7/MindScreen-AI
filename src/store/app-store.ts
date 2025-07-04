import { create } from 'zustand'

interface AppState {
  currentScreener: string | null
  setCurrentScreener: (screener: string | null) => void
  
  // User data
  userResponses: Record<string, string | number | boolean>
  setUserResponses: (responses: Record<string, string | number | boolean>) => void
  
  // Results
  results: Record<string, string | number | boolean>
  setResults: (results: Record<string, string | number | boolean>) => void
  
  // Theme
  theme: 'light' | 'dark'
  setTheme: (theme: 'light' | 'dark') => void
}

export const useAppStore = create<AppState>((set) => ({
  currentScreener: null,
  setCurrentScreener: (screener) => set({ currentScreener: screener }),
  
  userResponses: {},
  setUserResponses: (responses) => set({ userResponses: responses }),
  
  results: {},
  setResults: (results) => set({ results }),
  
  theme: 'light',
  setTheme: (theme) => set({ theme }),
}))
