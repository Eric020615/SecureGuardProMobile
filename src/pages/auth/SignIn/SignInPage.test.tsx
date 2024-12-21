import React from 'react'
import { act, fireEvent, render } from '@testing-library/react-native'
import SignInPage from '@pages/auth/signIn/SignInPage'
import { NotificationProvider } from '@contexts/NotificationContext'
import { signIn } from '@api/authService/authService'

jest.mock('@api/authService/authService', () => ({
	...jest.requireActual('@api/authService/authService'),
	signIn: jest.fn().mockReturnValue({
		success: true,
		msg: 'Sign in successful',
		data: null,
	}),
}))

describe('SignInPage', () => {
	beforeEach(() => {
		jest.clearAllMocks() // Clears all mock calls and state
	})
	const setup = async () => {
		const utils = render(
			<NotificationProvider>
				<SignInPage />
			</NotificationProvider>,
		)

		await act(async () => {
			await new Promise((resolve) => setTimeout(resolve, 0))
		})

		return {
			...utils,
			triggerLogIn: async () => {
				fireEvent.press(utils.getByTestId('sign-in-button'))
				await act(async () => {
					await new Promise((resolve) => setTimeout(resolve, 0)) // Ensure async effects complete
				})
			},
			fillEmail: async (email: string) => {
				await act(async () => {
					fireEvent.changeText(utils.getByTestId('email-form-field'), email)
				})
			},
			fillPassword: async (password: string) => {
				await act(async () => {
					fireEvent.changeText(utils.getByTestId('password-form-field'), password)
				})
			},
		}
	}

	it('verify email address field', async () => {
		const { fillEmail, queryByText, triggerLogIn } = await setup()
		await fillEmail('ericjuncheng10@gmail.com')
		await triggerLogIn()
		expect(await queryByText('Email is required')).toBeNull()
		await fillEmail('')
		await triggerLogIn()
		expect(await queryByText('Email is required')).toBeTruthy()
	})

	it('verify password field', async () => {
		const { fillPassword, queryByText, triggerLogIn } = await setup()
		await fillPassword('Abcd1234@')
		await triggerLogIn()
		expect(await queryByText('Password is required')).toBeNull()
		await fillPassword('')
		await triggerLogIn()
		expect(await queryByText('Password is required')).toBeTruthy()
	})

	it('verify Sign In button', async () => {
		const { fillEmail, fillPassword, queryByText, triggerLogIn } = await setup()
		await fillEmail('ericjuncheng10@gmail.com')
		await fillPassword('Abcd1234@')
		await triggerLogIn()
		expect(signIn).toHaveBeenCalledTimes(1)
		await act(async () => {
			expect(await queryByText('Welcome back.')).toBeTruthy()
		})
	})
})
