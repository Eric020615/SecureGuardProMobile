import { create } from 'zustand'
import { useModal } from '../modal/useModal'

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
	successMessage = 'Operation completed successfully',
	errorMessage = 'An unexpected error occurred',
): Promise<T | undefined> => {
	const { setIsLoading } = useApplication.getState()
	const { setCustomConfirmModalAction } = useModal.getState()

	setIsLoading(true)

	try {
		const result = await action()
		setCustomConfirmModalAction({
			title: 'Success',
			subtitle: successMessage,
			isError: false,
		})
		return result
	} catch (error: any) {
		const errorMsg = error?.message || errorMessage
		setCustomConfirmModalAction({
			title: 'Error',
			subtitle: errorMsg,
			isError: true,
		})
		throw error
	} finally {
		setIsLoading(false)
	}
}
