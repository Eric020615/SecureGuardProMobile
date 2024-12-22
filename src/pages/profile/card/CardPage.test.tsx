import React from 'react'
import { act, fireEvent, render } from '@testing-library/react-native'
import { NotificationProvider } from '@contexts/NotificationContext'
import CardPage from '@pages/profile/card/CardPage'
import { createUserCard } from '@api/cardService/cardService'

jest.mock('@api/cardService/cardService', () => ({
	...jest.requireActual('@api/cardService/cardService'),
	createUserCard: jest.fn().mockReturnValue({
		success: true,
		msg: 'Card created successfully!',
		data: null,
	}),
	getUserCard: jest.fn().mockReturnValue({
		success: true,
		msg: 'Card retrieved successfully!',
		data: null,
	}),
}))

jest.mock('@store/card/useCard', () => {
	const originalModule = jest.requireActual('@store/card/useCard') // Retain the original module
	return {
		...originalModule, // Retain other functionalities of useFacility
		useCard: jest.fn().mockReturnValue({
            ...originalModule.useCard.getState(),
			getCardAction: jest.fn(),
		}),
	}
})

describe('CardPage', () => {
	const setup = async () => {
		const utils = render(
			<NotificationProvider>
				<CardPage />
			</NotificationProvider>,
		)

		await act(async () => {
			await new Promise((resolve) => setTimeout(resolve, 0)) // Simulate async effects
		})

		return {
			...utils,
			triggerByCreateCard: async () => {
				await act(async () => {
					fireEvent.press(utils.getByTestId('activate-badge-button'))
				})
			},
		}
	}

	it('verify the Activate Badge button', async () => {
		const { getByText, triggerByCreateCard } = await setup()
		await triggerByCreateCard()
        expect(createUserCard).toHaveBeenCalledTimes(1)
		await act(async () => {
			expect(getByText('Card created successfully.')).toBeTruthy()
        })
	})
})
