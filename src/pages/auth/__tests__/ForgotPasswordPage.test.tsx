import React from 'react'
import { act, fireEvent, render, waitFor } from '@testing-library/react-native'
import ForgotPasswordPage from '@pages/auth/ForgotPasswordPage'
import { NotificationProvider } from '@contexts/NotificationContext'
import { useAuth } from '@store/auth/useAuth'
import { ForgotPasswordDto } from '@dtos/auth/auth.dto'

// Mock Zustand store
jest.mock('@store/auth/useAuth', () => ({
	useAuth: () => ({
		forgotPasswordAction: jest.fn((data: ForgotPasswordDto) => {}), // Mocking the action here
	}),
}))

describe('ForgotPasswordPage', () => {
	it('renders correctly with default UI elements', async () => {
		const { getByText, getByPlaceholderText } = render(
			<NotificationProvider>
				<ForgotPasswordPage />
			</NotificationProvider>,
		)

		await act(async () => {
			await new Promise((resolve) => setTimeout(resolve, 0)) // Simulate async effects
		})

		expect(getByText('Reset Password')).toBeTruthy()
		expect(getByText('Please enter your email address to request reset password link.')).toBeTruthy()
		expect(getByPlaceholderText('Enter your email')).toBeTruthy()
		expect(getByText('Submit')).toBeTruthy()
	})

	it('validates email field correctly', async () => {
		const { getByText, getByPlaceholderText, findByText } = render(
			<NotificationProvider>
				<ForgotPasswordPage />
			</NotificationProvider>,
		)

		await act(async () => {
			await new Promise((resolve) => setTimeout(resolve, 0)) // Simulate async effects
		})

		fireEvent.press(getByText('Submit'))

		// Expect validation error for empty email field
		expect(await findByText('Email is required')).toBeTruthy()

		fireEvent.changeText(getByPlaceholderText('Enter your email'), 'invalid-email')
		fireEvent.press(getByText('Submit'))

		// Expect validation error for invalid email
		expect(await findByText('Invalid Email')).toBeTruthy()
	})
})
