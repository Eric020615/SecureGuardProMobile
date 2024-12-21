import React from 'react'
import { act, fireEvent, render } from '@testing-library/react-native'
import SignUpPage from '@pages/auth/signUp/SignUpPage'
import { NotificationProvider } from '@contexts/NotificationContext'
import { signUp } from '@api/authService/authService'

jest.mock('@api/authService/authService', () => ({
	...jest.requireActual('@api/authService/authService'),
	signUp: jest.fn().mockReturnValue({
		success: true,
		msg: 'Sign up successful',
		data: null,
	}),
}))

describe('SignUpPage', () => {
	beforeEach(() => {
		jest.clearAllMocks() // Clears all mock calls and state
	})
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
			triggerSignUp: async () => {
				await act(async () => {
					fireEvent.press(utils.getByTestId('sign-up-button'))
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
			fillConfirmPassword: async (password: string) => {
				await act(async () => {
					fireEvent.changeText(utils.getByPlaceholderText('Enter your confirm password'), password)
				})
			},
		}
	}

	it('verify email address field', async () => {
		const { fillEmail, queryByText, triggerSignUp } = await setup()
		await fillEmail('ericjuncheng10@gmail.com')
		await triggerSignUp()
		expect(await queryByText('Email is required')).toBeNull()
		await fillEmail('ericjuncheng10')
		await triggerSignUp()
		expect(await queryByText('Invalid Email')).toBeTruthy()
		await fillEmail('')
		await triggerSignUp()
		expect(await queryByText('Email is required')).toBeTruthy()
	})

	it('verify password field', async () => {
		const { fillPassword, queryByText, triggerSignUp } = await setup()
		await fillPassword('Abcd1234@')
		await triggerSignUp()
		expect(await queryByText('Password is required')).toBeNull()
		await fillPassword('')
		await triggerSignUp()
		expect(await queryByText('Password is required')).toBeTruthy()
		await fillPassword('Abcd')
		await triggerSignUp()
		expect(await queryByText('Password must be at least 8 characters long')).toBeTruthy()
	})

	it('verify confirm password field', async () => {
		const { fillPassword, fillConfirmPassword, queryByText, triggerSignUp } = await setup()
		await fillPassword('Abcd1234@')
		await fillConfirmPassword('Abcd1234@')
		await triggerSignUp()
		expect(await queryByText('Confirm Password is required')).toBeNull()
		await fillConfirmPassword('Abcd1234')
		await triggerSignUp()
		expect(await queryByText('Passwords must match')).toBeTruthy()
		await fillConfirmPassword('')
		await triggerSignUp()
		expect(await queryByText('Confirm Password is required')).toBeTruthy()
	})

	it('verify Sign Up button', async () => {
		const { fillEmail, fillPassword, fillConfirmPassword, getByText, triggerSignUp } = await setup()
		await fillEmail('ericjuncheng10@gmail.com')
		await fillPassword('Abcd1234@')
		await fillConfirmPassword('Abcd1234@')
		await triggerSignUp()
		expect(signUp).toHaveBeenCalledTimes(1)
		await act(async () => {
			expect(getByText('Account created successfully.')).toBeTruthy()
		})
	})
})
