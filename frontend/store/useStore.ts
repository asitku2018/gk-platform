import { create } from 'zustand';

interface AppState {
  language: string;
  setLanguage: (lang: string) => void;
  audioState: { url: string; title: string } | null;
  setAudio: (url: string, title: string) => void;
  closeAudio: () => void;
}

export const useStore = create<AppState>((set) => ({
  language: 'en',
  setLanguage: (lang) => set({ language: lang }),
  audioState: null,
  setAudio: (url, title) => set({ audioState: { url, title } }),
  closeAudio: () => set({ audioState: null }),
}));
