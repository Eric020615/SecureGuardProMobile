import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react-native'
import UserInformationPage from '@pages/auth/UserInformationPage'
import { UserInformationFormDto } from '@dtos/user/user.dto'

const mockCreateUserAction = jest
	.fn()
	.mockImplementation((IUserInformationFormDto: UserInformationFormDto, tempToken: string) => {
		if (tempToken === 'valid-token') {
			return Promise.resolve({
				success: true,
				data: { userId: 1 },
				msg: 'User created successfully',
			})
		}
		return Promise.resolve({
			success: false,
			data: null,
			msg: 'Invalid token',
		})
	})

const mockPropertyList = [
	{ floorId: '1', units: [{ unitId: '101' }] },
	{ floorId: '2', units: [{ unitId: '201' }] },
]
const mockGetPropertyListAction = jest.fn().mockResolvedValue({
	success: true,
	data: mockPropertyList,
	msg: '',
})

jest.mock('@store/refData/useRefData', () => ({
	useRefData: () => {
		const data = {
			propertyList: mockPropertyList, // Mock the propertyList state
			getPropertyListAction: mockGetPropertyListAction, // Mock the action
		}

		return data
	},
}))

jest.mock('@store/user/useUser', () => ({
	useUser: () => {
		const data = {
			createUserAction: mockCreateUserAction, // Mock the action
		}
		return data
	},
}))

describe('UserInformationPage', () => {
	it('renders correctly', () => {
		const { getByText } = render(<UserInformationPage />)
		expect(getByText(/Welcome/i)).toBeTruthy()
		expect(getByText(/We need something more/i)).toBeTruthy()
	})

	it('validates required fields', async () => {
		const { getByText } = render(<UserInformationPage />)

		fireEvent.press(getByText('Submit'))
		await waitFor(() => {
			expect(getByText('First Name is required')).toBeTruthy()
			expect(getByText('Last Name is required')).toBeTruthy()
			expect(getByText('Phone Number is required')).toBeTruthy()
			expect(getByText('Unit Number is required')).toBeTruthy()
			expect(getByText('Date of Birth is required')).toBeTruthy()
			expect(getByText('Gender is required')).toBeTruthy()
		})
	})

	it('validates phone number format', async () => {
		const { getByText, getByPlaceholderText } = render(<UserInformationPage />)
		const phoneNumberInput = getByPlaceholderText('Enter phone number')
		fireEvent.changeText(phoneNumberInput, 'invalid-number')

		fireEvent.press(getByText('Submit'))
		await waitFor(() => {
			expect(getByText('Phone number is not valid')).toBeTruthy()
		})
	})

	// it('submits form with valid data', async () => {
	// 	const { getByText, getByPlaceholderText, getByTestId, findByTestId } = render(<UserInformationPage />)

	// 	// Fill out the form with valid data
	// 	fireEvent.changeText(getByPlaceholderText('Enter your username'), 'testuser')
	// 	fireEvent.changeText(getByPlaceholderText('Enter your first name'), 'John')
	// 	fireEvent.changeText(getByPlaceholderText('Enter your last name'), 'Doe')
	// 	fireEvent.changeText(getByPlaceholderText('Enter phone number'), '1000000000')

	// 	// Select unit and gender
	// 	fireEvent(getByTestId('unit-picker'), 'onValueChange', '101') // Select a unit
	// 	fireEvent(getByTestId('gender-picker'), 'onValueChange', 'M') // Select gender

	// 	// Press Submit to finalize the form
	// 	fireEvent.press(getByText('Submit'))

	// 	// Check if the form submission action was called
	// 	await waitFor(() => {
	// 		expect(mockCreateUserAction).toHaveBeenCalled()
	// 	})
	// })
})
