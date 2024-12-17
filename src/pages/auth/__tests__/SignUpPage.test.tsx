import React from 'react'
import { act, fireEvent, render } from '@testing-library/react-native'
import SignUpPage from '@pages/auth/SignUpPage'
import { NotificationProvider } from '@contexts/NotificationContext'

describe('SignUpPage', () => {
	const setup = async () => {
		const utils = render(
			<NotificationProvider>
				<SignUpPage />
			</NotificationProvider>,
		)

		await act(async () => {
			await new Promise((resolve) => setTimeout(resolve, 0)) // Ensure async effects complete
		})

		return {
			...utils,
			triggerSignUp: () => fireEvent.press(utils.getByTestId('sign-up-button')),
			fillEmail: (email) => fireEvent.changeText(utils.getByPlaceholderText('Enter your email'), email),
			fillPassword: (password) => fireEvent.changeText(utils.getByPlaceholderText('Enter your password'), password),
			fillConfirmPassword: (password) =>
				fireEvent.changeText(utils.getByPlaceholderText('Enter your confirm password'), password),
		}
	}

	it('renders correctly with default UI elements', async () => {
		const { getByText, getByPlaceholderText, getByTestId } = await setup()

		expect(getByText('Gate Mate')).toBeTruthy()
		expect(getByTestId('sign-up-button')).toBeTruthy()
		expect(getByPlaceholderText('Enter your email')).toBeTruthy()
		expect(getByPlaceholderText('Enter your password')).toBeTruthy()
		expect(getByPlaceholderText('Enter your confirm password')).toBeTruthy()
		expect(getByText('Have an account already?')).toBeTruthy()
		expect(getByText('Log In')).toBeTruthy()
	})

	it('validates email, password, and confirm password fields correctly', async () => {
		const { findByText, triggerSignUp, fillEmail, fillPassword, fillConfirmPassword } = await setup()

		// Trigger "Sign Up" without filling any fields
		triggerSignUp()
		expect(await findByText('Email is required')).toBeTruthy()
		expect(await findByText('Password is required')).toBeTruthy()
		expect(await findByText('Confirm Password is required')).toBeTruthy()

		// Fill fields with invalid email and mismatched passwords
		fillEmail('invalid-email')
		fillPassword('Password123!')
		fillConfirmPassword('DifferentPassword123!')
		triggerSignUp()

		expect(await findByText('Invalid Email')).toBeTruthy()
		expect(await findByText('Passwords must match')).toBeTruthy()
	})
})
