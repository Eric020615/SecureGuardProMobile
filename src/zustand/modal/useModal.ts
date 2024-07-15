import { create } from 'zustand'

interface CustomModal {
	title?: string
	subtitle?: string
}

interface ModalState {
	isOpen: boolean
    content: CustomModal
	toogleModal: () => void
    setCustomFailedModal: (e: CustomModal) => void
}

export const useModal = create<ModalState>((set) => ({
	isOpen: false,
    content: {} as CustomModal,
	toogleModal: () => set((state) => ({
        isOpen: !state.isOpen 
    })),
    setCustomFailedModal: ({title, subtitle}: CustomModal) => set((state) => ({
        isOpen: true,
        content: {
            title,
            subtitle
        }
    })),
}))
