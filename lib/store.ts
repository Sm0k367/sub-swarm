import { create } from 'zustand';
import { MULTIMEDIA_CODEX_2026 } from './codex';

interface EchoStore {
  activeTab: 'codex' | 'lab' | 'xr';
  imperfectionLevel: number;
  currentTechnique: string | null;
  isFracturing: boolean;
  
  setActiveTab: (tab: 'codex' | 'lab' | 'xr') => void;
  setImperfectionLevel: (level: number) => void;
  setCurrentTechnique: (id: string | null) => void;
  triggerFracture: () => void;
  resetFracture: () => void;
  
  // Codex data
  codex: typeof MULTIMEDIA_CODEX_2026;
}

export const useEchoStore = create<EchoStore>((set) => ({
  activeTab: 'xr',
  imperfectionLevel: 42,
  currentTechnique: null,
  isFracturing: false,
  codex: MULTIMEDIA_CODEX_2026,

  setActiveTab: (tab) => set({ activeTab: tab }),
  setImperfectionLevel: (level) => set({ imperfectionLevel: level }),
  setCurrentTechnique: (id) => set({ currentTechnique: id }),
  
  triggerFracture: () => {
    set({ isFracturing: true });
    setTimeout(() => set({ isFracturing: false }), 1200);
  },
  
  resetFracture: () => set({ isFracturing: false }),
}));
