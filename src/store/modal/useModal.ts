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
	resetModalAction: () => void
	toogleModalAction: () => void
	setActionConfirmModalAction: (e: CustomModal) => void
}

export const useModal = create<State & Actions>((set) => ({
	isOpen: false,
	content: {} as CustomModal,
	isError: false,
	resetModalAction: () => {
		set(() => ({
			isOpen: false,
			content: {},
			isError: false,
		}))
	},
	toogleModalAction: () =>
		set((state) => ({
			isOpen: !state.isOpen,
		})),
	setActionConfirmModalAction: ({ title, subtitle, isError = false }: CustomModal) =>
		set(() => ({
			isOpen: true,
			content: {
				title,
				subtitle,
				isError,
			},
		})),
}))
