import { create } from "zustand";

type ProgressState = { percent: number; setPercent: (p: number)=>void };
export const useProgress = create<ProgressState>((set) => ({
  percent: 0,
  setPercent: (p) => set({ percent: Math.max(0, Math.min(100, p)) }),
}));
