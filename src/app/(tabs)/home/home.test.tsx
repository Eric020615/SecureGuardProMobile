import React from 'react'
import { act, fireEvent, render, waitFor } from '@testing-library/react-native'
import { NotificationProvider } from '@contexts/NotificationContext'
import Home from '@app/(tabs)/home/index'
import { useRouter } from 'expo-router'

jest.mock('expo-router', () => ({
	...jest.requireActual('expo-router'),
	useRouter: jest.fn().mockReturnValue({
		push: jest.fn(),
	}),
}))

describe('Home', () => {
	beforeEach(() => {
		jest.clearAllMocks() // Clears all mock calls and state
	})
	const setup = async () => {
		const utils = render(
			<NotificationProvider>
				<Home />
			</NotificationProvider>,
		)

		await act(async () => {
			await new Promise((resolve) => setTimeout(resolve, 0)) // Ensure async effects complete
		})

		return {
			...utils,
			triggerNavigateToCreateVisitor: async () => {
				await act(async () => {
					fireEvent.press(utils.getByTestId('create-visitor-button'))
				})
			},
		}
	}

	it('verifies the Circular button', async () => {
		const router = useRouter()
		const { triggerNavigateToCreateVisitor } = await setup()
		await triggerNavigateToCreateVisitor()
		await waitFor(() => {
            expect(router.push).toHaveBeenCalledTimes(1)
			expect(router.push).toHaveBeenCalledWith('/visitor/create')
		})
	})
})
