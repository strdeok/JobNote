import { create } from "zustand";

interface AuthState {
  token: string | null;
  setToken: (token: string) => void;
  clearToken: () => void;
  isInitialized: boolean;
  setInitialized: (isInitialized: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isInitialized: false,
  setInitialized: (isInitialized) => set({ isInitialized }),
  token: null,
  setToken: (token) => set({ token }),
  clearToken: () => set({ token: null }),
}));
