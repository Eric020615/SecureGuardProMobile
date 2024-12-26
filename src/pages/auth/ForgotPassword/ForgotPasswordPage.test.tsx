import React from 'react'
import { act, fireEvent, render } from '@testing-library/react-native'
import ForgotPasswordPage from '@pages/auth/forgotPassword/ForgotPasswordPage'
import { NotificationProvider } from '@contexts/NotificationContext'

describe('ForgotPasswordPage', () => {
	// Helper function to render the component and provide reusable actions
	const setup = async () => {
		const utils = render(
			<NotificationProvider>
				<ForgotPasswordPage />
			</NotificationProvider>,
		)

		await act(async () => {
			await new Promise((resolve) => setTimeout(resolve, 0)) // Simulate async effects
		})

		return {
			...utils,
			triggerSubmit: () => fireEvent.press(utils.getByText('Submit')),
			fillEmail: (email) => fireEvent.changeText(utils.getByPlaceholderText('Enter your email'), email),
		}
	}

	it('renders correctly with default UI elements', async () => {
		const { getByText, getByPlaceholderText } = await setup()

		expect(getByText('Reset Password')).toBeTruthy()
		expect(getByText('Please enter your email address to request reset password link.')).toBeTruthy()
		expect(getByPlaceholderText('Enter your email')).toBeTruthy()
		expect(getByText('Submit')).toBeTruthy()
	})

	it('validates email field correctly', async () => {
		const { findByText, triggerSubmit, fillEmail } = await setup()

		// Trigger "Submit" without entering an email
		triggerSubmit()
		await act(async () => {
			expect(await findByText('Email is required')).toBeTruthy()
		})

		// Enter an invalid email and trigger "Submit"
		fillEmail('invalid-email')
		triggerSubmit()
		await act(async () => {
			expect(await findByText('Invalid Email')).toBeTruthy()
		})
	})
})
