import { create } from "zustand";

type ExperienceState = {
  progress: number;
  assemblyProgress: number;
  stageProgress: number[];
  activeSection: number;
  worldReady: boolean;
  setProgress: (progress: number) => void;
  setAssemblyProgress: (progress: number) => void;
  setStageProgress: (stage: number, progress: number) => void;
  setWorldReady: (ready: boolean) => void;
};

export const useExperience = create<ExperienceState>((set) => ({
  progress: 0,
  assemblyProgress: 0,
  stageProgress: [0, 0, 0, 0, 0, 0, 0],
  activeSection: 0,
  worldReady: false,
  setProgress: (progress) =>
    set({ progress, activeSection: Math.min(6, Math.round(progress * 6)) }),
  setAssemblyProgress: (assemblyProgress) => set({ assemblyProgress }),
  setStageProgress: (stage, progress) =>
    set((state) => {
      const stageProgress = [...state.stageProgress];
      stageProgress[stage] = progress;
      return { stageProgress };
    }),
  setWorldReady: (worldReady) => set({ worldReady }),
}));
