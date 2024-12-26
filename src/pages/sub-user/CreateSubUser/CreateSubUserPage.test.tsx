import React from 'react'
import { act, fireEvent, render } from '@testing-library/react-native'
import { NotificationProvider } from '@contexts/NotificationContext'
import { createSubUser } from '@api/userService/userService'
import CreateSubUserPage from './CreateSubUserPage'

jest.mock('@api/userService/userService', () => ({
	...jest.requireActual('@api/userService/userService'),
	createSubUser: jest.fn().mockReturnValue({
		success: true,
		msg: 'Sub-user created successfully!',
		data: null,
	}),
}))

describe('CreateSubUserPage', () => {
	beforeEach(() => {
		jest.clearAllMocks() // Clears all mock calls and state
	})
	const setup = async () => {
		const utils = render(
			<NotificationProvider>
				<CreateSubUserPage />
			</NotificationProvider>,
		)

		await act(async () => {
			await new Promise((resolve) => setTimeout(resolve, 0))
		})

		return {
			...utils,
			triggerSubmit: async () => {
				await act(async () => {
                    fireEvent.press(utils.getByTestId('submit-button'))
				})
			},
			fillEmail: async (email: string) => {
				await act(async () => {
					fireEvent.changeText(utils.getByTestId('email-form-field'), email)
				})
			},
		}
	}

	it('verify email address field', async () => {
		const { fillEmail, queryByText, triggerSubmit } = await setup()
		await fillEmail('junchengeng6@gmail.com')
		await triggerSubmit()
        await act(async () => {
            expect(await queryByText('Email is required')).toBeNull()
		})
		await fillEmail('')
		await triggerSubmit()
        await act(async () => {
            expect(await queryByText('Email is required')).toBeTruthy()
		})
	})

	it('verify Submit button', async () => {
		const { fillEmail, queryByText, triggerSubmit } = await setup()
		await fillEmail('junchengeng6@gmail.com')
		await triggerSubmit()
		await act(async () => {
            expect(createSubUser).toHaveBeenCalledTimes(1)
            expect(createSubUser).toHaveBeenCalledWith({ email: 'junchengeng6@gmail.com' })
			expect(await queryByText('Sub user created successfully!')).toBeTruthy()
		})
	})
})
