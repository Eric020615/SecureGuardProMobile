import React from 'react'
import { act, fireEvent, render } from '@testing-library/react-native'
import SignInPage from '@pages/auth/SignInPage'
import { NotificationProvider } from '@contexts/NotificationContext'

describe('SignInPage', () => {
	it('renders correctly with default UI elements', async () => {
		const { getByText, getByPlaceholderText } = render(
			<NotificationProvider>
				<SignInPage />
			</NotificationProvider>,
		)

		await act(async () => {
			await new Promise((resolve) => setTimeout(resolve, 0)) // Simulate async effects
		})

		expect(getByText('Gate Mate')).toBeTruthy()
		expect(getByText('Log in')).toBeTruthy()
		expect(getByPlaceholderText('Enter your email')).toBeTruthy()
		expect(getByPlaceholderText('Enter your password')).toBeTruthy()
    expect(getByText("Forgot your password?")).toBeTruthy()
		expect(getByText("Don't have account?")).toBeTruthy()
	})

	it('validates email and password fields correctly', async () => {
		const { getByText, getByPlaceholderText, findByText } = render(
			<NotificationProvider>
				<SignInPage />
			</NotificationProvider>,
		)

		await act(async () => {
			await new Promise((resolve) => setTimeout(resolve, 0))
		})

		fireEvent.press(getByText('Log In'))

		// Expect validation errors to be displayed
		expect(await findByText('Email is required')).toBeTruthy()
		expect(await findByText('Password is required')).toBeTruthy()

		fireEvent.changeText(getByPlaceholderText('Enter your email'), 'invalid-email')
		fireEvent.changeText(getByPlaceholderText('Enter your password'), 'password123')
		fireEvent.press(getByText('Log In'))

		expect(await findByText('Invalid Email')).toBeTruthy()
	})
})
