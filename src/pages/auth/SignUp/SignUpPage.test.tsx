import React from 'react'
import { act, fireEvent, render } from '@testing-library/react-native'
import SignUpPage from '@pages/auth/SignUp/SignUpPage'
import { NotificationProvider } from '@contexts/NotificationContext'
import { UserSignUpFormDto } from '@dtos/auth/auth.dto'
import { useAuth } from '@store/auth/useAuth'

const mockSignUpAction = jest.fn()
jest.mock('@store/auth/useAuth', () => ({
	useAuth: () => ({
		signUpAction: mockSignUpAction, // Mock the action
	}),
}))

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
			triggerSignUp: async () => {
				fireEvent.press(utils.getByTestId('sign-up-button'))
				await act(async () => {
					await new Promise((resolve) => setTimeout(resolve, 0)) // Ensure async effects complete
				})
			},
			fillEmail: (email: string) => fireEvent.changeText(utils.getByTestId('email-form-field'), email),
			fillPassword: (password: string) => fireEvent.changeText(utils.getByTestId('password-form-field'), password),
			fillConfirmPassword: (password: string) =>
				fireEvent.changeText(utils.getByPlaceholderText('Enter your confirm password'), password),
		}
	}

	it('verify email address field', async () => {
		const { fillEmail, queryByText, triggerSignUp } = await setup()
		fillEmail('ericjuncheng10@gmail.com')
		await triggerSignUp()
		expect(await queryByText('Email is required')).toBeNull()
		fillEmail('ericjuncheng10')
		await triggerSignUp()
		expect(await queryByText('Invalid Email')).toBeTruthy()
		fillEmail('')
		await triggerSignUp()
		expect(await queryByText('Email is required')).toBeTruthy()
	})

	it('verify password field', async () => {
		const { fillPassword, queryByText, triggerSignUp } = await setup()
		fillPassword('Abcd1234@')
		await triggerSignUp()
		expect(await queryByText('Password is required')).toBeNull()
		fillPassword('')
		await triggerSignUp()
		expect(await queryByText('Password is required')).toBeTruthy()
		fillPassword('Abcd')
		await triggerSignUp()
		expect(await queryByText('Password must be at least 8 characters long')).toBeTruthy()
	})

	it('verify confirm password field', async () => {
		const { fillPassword, fillConfirmPassword, queryByText, triggerSignUp } = await setup()
		fillPassword('Abcd1234@')
		fillConfirmPassword('Abcd1234@')
		await triggerSignUp()
		expect(await queryByText('Confirm Password is required')).toBeNull()
		fillConfirmPassword('Abcd1234')
		await triggerSignUp()
		expect(await queryByText('Passwords must match')).toBeTruthy()
		fillConfirmPassword('')
		await triggerSignUp()
		expect(await queryByText('Confirm Password is required')).toBeTruthy()
	})

	// it('verify Sign Up button', async () => {
	// 	const { fillEmail, fillPassword, fillConfirmPassword, queryByText, triggerSignUp } = await setup()
	// 	fillEmail('ericjuncheng10@gmail.com')
	// 	fillPassword('Abcd1234@')
	// 	fillConfirmPassword('Abcd1234@')
	// 	await triggerSignUp()
	// 	await act(async () => {
	// 		await new Promise((resolve) => setTimeout(resolve, 0)) // Ensure async effects complete
	// 	})
	// 	expect(mockSignUpAction).toHaveBeenCalledTimes(1)
	// })
})
