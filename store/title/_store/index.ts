import { create } from 'zustand';

interface State {
    title: string;
}

interface Actions {
    setTitle: (newTitle: string) => void;
}

export const useTitleStore = create<State & Actions>((set) => ({
    title: 'Admin Panel',

    setTitle: (newTitle: string) => set({ title: newTitle }),
}));