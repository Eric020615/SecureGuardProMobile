import { create } from 'zustand'

interface CustomModal {
	title?: string
	subtitle?: string
	isError?: boolean
}

interface State {
	isOpen: boolean
	content: CustomModal
	isError: boolean
}

interface Actions {
	toogleModalAction: () => void
	setCustomConfirmModalAction: (e: CustomModal) => void
}

export const useModal = create<State & Actions>((set) => ({
	isOpen: false,
	content: {} as CustomModal,
	isError: false,
	toogleModalAction: () =>
		set((state) => ({
			isOpen: !state.isOpen,
		})),
	setCustomConfirmModalAction: ({ title, subtitle, isError = false }: CustomModal) =>
		set(() => ({
			isOpen: true,
			content: {
				title,
				subtitle,
				isError,
			},
		})),
}))
