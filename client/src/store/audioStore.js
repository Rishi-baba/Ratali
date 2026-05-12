import { create } from 'zustand';

const useAudioStore = create((set) => ({
  isMuted: true,
  customAudio: null,
  setIsMuted: (isMuted) => set({ isMuted }),
  setCustomAudio: (customAudio) => set({ customAudio }),
}));

export default useAudioStore;
