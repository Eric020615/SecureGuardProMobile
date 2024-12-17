import React from 'react'
import { act, fireEvent, render } from '@testing-library/react-native'
import SignInPage from '@pages/auth/SignInPage'
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
			triggerLogIn: () => fireEvent.press(utils.getByText('Log In')),
			fillEmail: (email) => fireEvent.changeText(utils.getByPlaceholderText('Enter your email'), email),
			fillPassword: (password) => fireEvent.changeText(utils.getByPlaceholderText('Enter your password'), password),
		}
	}
	
	it('renders correctly with default UI elements', async () => {
		const { getByText, getByPlaceholderText } = await setup()

		expect(getByText('Gate Mate')).toBeTruthy()
		expect(getByText('Log in')).toBeTruthy()
		expect(getByPlaceholderText('Enter your email')).toBeTruthy()
		expect(getByPlaceholderText('Enter your password')).toBeTruthy()
		expect(getByText('Forgot your password?')).toBeTruthy()
		expect(getByText("Don't have account?")).toBeTruthy()
	})

	it('validates email and password fields correctly', async () => {
		const { findByText, triggerLogIn, fillEmail, fillPassword } = await setup()

		// Trigger "Log In" without filling any fields
		triggerLogIn()
		expect(await findByText('Email is required')).toBeTruthy()
		expect(await findByText('Password is required')).toBeTruthy()

		// Fill fields with invalid email and valid password
		fillEmail('invalid-email')
		fillPassword('password123')
		triggerLogIn()

		expect(await findByText('Invalid Email')).toBeTruthy()
	})
})
