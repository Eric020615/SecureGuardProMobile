import { create } from "zustand"

interface ApplicationState {
    isLoading: boolean;
    setIsLoading: (isLoading: boolean) => void;
}

export const useApplication = create<ApplicationState>((set) => ({
    isLoading: false,
    setIsLoading: (isLoading: boolean) => set({isLoading})
}));