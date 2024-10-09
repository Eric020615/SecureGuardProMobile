import { create } from 'zustand'
import { useModal } from '@store/modal/useModal'

interface State {
	isLoading: boolean
}

interface Actions {
	setIsLoading: (isLoading: boolean) => void
}

export const useApplication = create<State & Actions>((set) => ({
	isLoading: false,
	setIsLoading(isLoading) {
		set({ isLoading })
	},
}))

export const generalAction = async <T>(
	action: () => Promise<T>,
	successMessage?: string,
	errorMessage?: string,
): Promise<T | undefined> => {
	const { setIsLoading } = useApplication.getState()
	const { setCustomConfirmModalAction } = useModal.getState()

	setIsLoading(true)

	try {
		const result = await action()
		if (successMessage) {
			setCustomConfirmModalAction({
				title: 'Success',
				subtitle: successMessage,
				isError: false,
			})
		}
		return result
	} catch (error: Error | any) {
		if (errorMessage) {
			// const errorMsg = error?.message || errorMessage
			setCustomConfirmModalAction({
				title: 'Error',
				subtitle: errorMessage,
				isError: true,
			})
		}
	} finally {
		setIsLoading(false)
	}
}
