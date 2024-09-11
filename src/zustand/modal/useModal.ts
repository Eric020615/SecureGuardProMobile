import { create } from 'zustand'

interface CustomModal {
	title?: string
	subtitle?: string
    isError?: boolean
}

interface ModalState {
	isOpen: boolean
    content: CustomModal
    isError: boolean,
	toogleModal: () => void
    setCustomConfirmModal: (e: CustomModal) => void
}

export const useModal = create<ModalState>((set) => ({
	isOpen: false,
    content: {} as CustomModal,
    isError: false,
	toogleModal: () => set((state) => ({
        isOpen: !state.isOpen 
    })),
    setCustomConfirmModal: ({title, subtitle, isError = false}: CustomModal) => set((state) => ({
        isOpen: true,
        content: {
            title,
            subtitle,
            isError
        }
    })),
}))
