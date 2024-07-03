import { create } from "zustand"

const application = (set, get) => ({
    isLoading: Boolean,
    setIsLoading: (isLoading) => {
        set((state) => ({
            isLoading: isLoading
        }))
    }
})

export const useApplication = create(application)