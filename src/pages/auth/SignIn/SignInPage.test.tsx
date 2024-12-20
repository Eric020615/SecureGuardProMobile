import React from 'react'
import { act, fireEvent, render } from '@testing-library/react-native'
import SignInPage from '@pages/auth/signIn/SignInPage'
import { NotificationProvider } from '@contexts/NotificationContext'

describe('SignInPage', () => {
	// Helper function to render the component
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
			fillEmail: (email: string) => fireEvent.changeText(utils.getByTestId('email-form-field'), email),
			fillPassword: (password: string) => fireEvent.changeText(utils.getByTestId('password-form-field'), password),
		}
	}

	it('verify email address field', async () => {
		const { fillEmail, queryByText, triggerLogIn } = await setup()
		fillEmail('ericjuncheng10@gmail.com')
		await triggerLogIn()
		expect(await queryByText('Email is required')).toBeNull()
		fillEmail('')
		await triggerLogIn()
		expect(await queryByText('Email is required')).toBeTruthy()
	})

	it('verify password field', async () => {
		const { fillPassword, queryByText, triggerLogIn } = await setup()
		fillPassword('Abcd1234@')
		await triggerLogIn()
		expect(await queryByText('Password is required')).toBeNull()
		fillPassword('')
		await triggerLogIn()
		expect(await queryByText('Password is required')).toBeTruthy()
	})
})
