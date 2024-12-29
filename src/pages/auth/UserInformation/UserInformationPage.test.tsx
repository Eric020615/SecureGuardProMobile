import React from 'react'
import { render, fireEvent, act } from '@testing-library/react-native'
import UserInformationPage from '@pages/auth/userInformation/UserInformationPage'
import { NotificationProvider } from '@contexts/NotificationContext'

const mockPropertyList = [
	{ floorId: '1', units: [{ unitId: '101', isAssigned: false, assignedTo: null }] },
	{ floorId: '2', units: [{ unitId: '201', isAssigned: false, assignedTo: null }] },
]

const mockGetPropertyListAction = jest.fn().mockResolvedValue({
	success: true,
	data: mockPropertyList,
	msg: '',
})

jest.mock('@store/refData/useRefData', () => ({
	useRefData: () => {
		return {
			propertyList: mockPropertyList, // Mock the propertyList state
			getPropertyListAction: mockGetPropertyListAction, // Mock the action
		}
	},
}))

jest.mock('@api/userService/userService', () => ({
	...jest.requireActual('@api/userService/userService'),
	createUser: jest.fn().mockReturnValue({
		success: true,
		msg: 'User created successfully!',
		data: null,
	}),
}))

describe('UserInformationPage', () => {
	const setup = async () => {
		const utils = render(
			<NotificationProvider>
				<UserInformationPage />
			</NotificationProvider>,
		)

		await act(async () => {
			await new Promise((resolve) => setTimeout(resolve, 0)) // Ensure async effects complete
		})

		return {
			...utils,
			triggerSubmit: async () => {
				await act(async () => {
					fireEvent.press(utils.getByTestId('submit-button'))
				})
			},
			fillUsername: async (username: string) => {
				await act(async () => {
					fireEvent.changeText(utils.getByTestId('username-form-field'), username)
				})
			},
			fillFirstName: async (firstName: string) => {
				await act(async () => {
					fireEvent.changeText(utils.getByTestId('first-name-form-field'), firstName)
				})
			},
			fillLastName: async (lastName: string) => {
				await act(async () => {
					fireEvent.changeText(utils.getByTestId('last-name-form-field'), lastName)
				})
			},
			fillPhoneNumber: async (phoneNumber: string) => {
				await act(async () => {
					fireEvent.changeText(utils.getByTestId('phone-number-form-field'), phoneNumber)
				})
			},
			fillDOB: async (dob: string) => {
				await act(async () => {
					fireEvent.changeText(utils.getByTestId('dob-form-field'), dob)
				})
			},
			fillGender: async (gender: string) => {
				await act(async () => {
					fireEvent(utils.getByTestId('gender-form-field'), 'onValueChange', gender)
				})
			},
			fillFloor: async (floor: string) => {
				await act(async () => {
					fireEvent(utils.getByTestId('floor-form-field'), 'onValueChange', floor)
				})
			},
			fillUnit: async (unit: string) => {
				await act(async () => {
					fireEvent(utils.getByTestId('unit-form-field'), 'onValueChange', unit)
				})
			},
		}
	}

	it('verify username field', async () => {
		const { fillUsername, queryByText, triggerSubmit } = await setup()
		await fillUsername('eric123')
		await triggerSubmit()
		expect(await queryByText('Username is required')).toBeNull()
		await fillUsername('')
		await triggerSubmit()
		expect(await queryByText('Username is required')).toBeTruthy()
	})

	it('verify first name field', async () => {
		const { fillFirstName, queryByText, triggerSubmit } = await setup()
		await fillFirstName('Eng')
		await triggerSubmit()
		expect(await queryByText('First Name is required')).toBeNull()
		await fillFirstName('')
		await triggerSubmit()
		expect(await queryByText('First Name is required')).toBeTruthy()
	})

	it('verify last name field', async () => {
		const { fillLastName, queryByText, triggerSubmit } = await setup()
		await fillLastName('Cheng')
		await triggerSubmit()
		expect(await queryByText('Last Name is required')).toBeNull()
		await fillLastName('')
		await triggerSubmit()
		expect(await queryByText('Last Name is required')).toBeTruthy()
	})

	it('verify phone number field', async () => {
		const { fillPhoneNumber, queryByText, triggerSubmit } = await setup()
		await fillPhoneNumber('012-1234567')
		await triggerSubmit()
		expect(await queryByText('Phone Number is required')).toBeNull()
		expect(await queryByText('Phone number is not valid')).toBeNull()
		await fillPhoneNumber('')
		await triggerSubmit()
		expect(await queryByText('Phone Number is required')).toBeTruthy()
		await fillPhoneNumber('012-123')
		await triggerSubmit()
		expect(await queryByText('Phone number is not valid')).toBeTruthy()
	})

	it('verify gender field', async () => {
		const { fillGender, queryByText, triggerSubmit } = await setup()
		await fillGender('M')
		await triggerSubmit()
		expect(await queryByText('Gender is required')).toBeNull()
		await fillGender('')
		await triggerSubmit()
		expect(await queryByText('Gender is required')).toBeTruthy()
	})

	it('verify floor field', async () => {
		const { fillFloor, queryByText, triggerSubmit } = await setup()
		await fillFloor('1')
		await triggerSubmit()
		expect(await queryByText('Floor number is required')).toBeNull()
		await fillFloor('')
		await triggerSubmit()
		expect(await queryByText('Floor number is required')).toBeTruthy()
	})

	it('verify unit field', async () => {
		const { fillFloor, fillUnit, queryByText, triggerSubmit } = await setup()
		await fillFloor('1')
		await fillUnit('101')
		await triggerSubmit()
		expect(await queryByText('Unit number is required')).toBeNull()
		await fillUnit('')
		await triggerSubmit()
		expect(await queryByText('Unit number is required')).toBeTruthy()
	})

	it('verify Submit button', async () => {
	})
})
