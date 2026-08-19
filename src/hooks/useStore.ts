import { create } from "zustand";

interface State {
    ready: boolean;
    isReady: () => void;
}

export const useStore = create<State>((set) => ({
    ready: true,
    isReady: () => set({ready: true}),
}))
