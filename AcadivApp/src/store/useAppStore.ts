import { create } from 'zustand';

interface AppState {
  // User Profile & Selection
  selectedField: string | null;
  setSelectedField: (field: string) => void;
  
  // Assessment
  riasecScores: Record<string, number>;
  setRiasecScore: (category: string, score: number) => void;

  // Offline Settings
  offlineMode: boolean;
  toggleOfflineMode: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  selectedField: null,
  setSelectedField: (field) => set({ selectedField: field }),

  riasecScores: {},
  setRiasecScore: (category, score) =>
    set((state) => ({
      riasecScores: { ...state.riasecScores, [category]: score },
    })),

  offlineMode: true,
  toggleOfflineMode: () => set((state) => ({ offlineMode: !state.offlineMode })),
}));