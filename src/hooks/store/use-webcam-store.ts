import { create } from "zustand";

type WebcamState = {
  imgSrc: string | null;
  captureTrigger: number;
  setImgSrc: (src: string | null) => void;
  triggerCapture: () => void;
  retake: () => void;
};

export const useWebcamStore = create<WebcamState>((set) => ({
  imgSrc: null,
  captureTrigger: 0,
  setImgSrc: (src) => set({ imgSrc: src }),
  triggerCapture: () =>
    set((state) => ({ captureTrigger: state.captureTrigger + 1 })),
  retake: () => set({ imgSrc: null }),
}));
