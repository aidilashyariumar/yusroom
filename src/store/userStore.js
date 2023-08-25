import { create } from "zustand";

export const useUserStore = create((set) => ({
    name: '',
    accesRole: [],
    setUser: (name, accessRole) => set(state => ({ name, accessRole }))
}))