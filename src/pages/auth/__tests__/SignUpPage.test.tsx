import React from 'react'
import { act, fireEvent, render } from '@testing-library/react-native'
import SignUpPage from '@pages/auth/SignUpPage'
import { NotificationProvider } from '@contexts/NotificationContext'

describe('SignUpPage', () => {
	it('renders correctly with default UI elements', async () => {
		const { findByText, getByText, getByPlaceholderText, getByTestId } = render(
			<NotificationProvider>
				<SignUpPage />
			</NotificationProvider>,
		)

		await act(async () => {
			await new Promise((resolve) => setTimeout(resolve, 0)) // Simulate async effects
		})

		expect(getByText('Gate Mate')).toBeTruthy()
		expect(getByTestId('sign-up-button')).toBeTruthy()
		expect(getByPlaceholderText('Enter your email')).toBeTruthy()
		expect(getByPlaceholderText('Enter your password')).toBeTruthy()
		expect(getByPlaceholderText('Enter your confirm password')).toBeTruthy()
		expect(getByText('Have an account already?')).toBeTruthy()
		expect(getByText('Log In')).toBeTruthy()
	})

	it('validates email, password, and confirm password fields correctly', async () => {
		const { getByPlaceholderText, findByText, getByTestId, queryByText } = render(
			<NotificationProvider>
				<SignUpPage />
			</NotificationProvider>,
		)

		await act(async () => {
			await new Promise((resolve) => setTimeout(resolve, 0))
		})

		fireEvent.press(getByTestId('sign-up-button'))

		// Expect validation errors to be displayed
		expect(await findByText('Email is required')).toBeTruthy()
		expect(await findByText('Password is required')).toBeTruthy()
		expect(await findByText('Confirm Password is required')).toBeTruthy()

		fireEvent.changeText(getByPlaceholderText('Enter your email'), 'invalid-email')
		fireEvent.changeText(getByPlaceholderText('Enter your password'), 'Password123!')
		fireEvent.changeText(getByPlaceholderText('Enter your confirm password'), 'DifferentPassword123!')
		fireEvent.press(getByTestId('sign-up-button'))

		expect(await findByText('Invalid Email')).toBeTruthy()
		expect(await findByText('Passwords must match')).toBeTruthy()
	})
})
