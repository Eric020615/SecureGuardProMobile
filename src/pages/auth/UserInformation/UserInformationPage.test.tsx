import React from 'react'
import { render, fireEvent, act, waitFor } from '@testing-library/react-native'
import UserInformationPage from '@pages/auth/userInformation/UserInformationPage'
import { UserInformationFormDto } from '@dtos/user/user.dto'
import { NotificationProvider } from '@contexts/NotificationContext'

const mockCreateUserAction = jest.fn().mockImplementation((IUserInformationFormDto: UserInformationFormDto, tempToken: string) => {
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
				fireEvent.press(utils.getByTestId('submit-button'))
				await act(async () => {
					await new Promise((resolve) => setTimeout(resolve, 0)) // Ensure async effects complete
				})
			},
			fillUsername: (username: string) => fireEvent.changeText(utils.getByTestId('username-form-field'), username),
			fillFirstName: (firstName: string) => fireEvent.changeText(utils.getByTestId('first-name-form-field'), firstName),
			fillLastName: (lastName: string) => fireEvent.changeText(utils.getByTestId('last-name-form-field'), lastName),
			fillPhoneNumber: (phoneNumber: string) => fireEvent.changeText(utils.getByTestId('phone-number-form-field'), phoneNumber),
			fillDOB: (dob: string) => fireEvent.changeText(utils.getByTestId('dob-form-field'), dob),
			fillGender: (gender: string) => fireEvent(utils.getByTestId('gender-form-field'), 'onValueChange', gender),
			fillFloor: (floor: string) => fireEvent(utils.getByTestId('floor-form-field'), 'onValueChange', floor),
			fillUnit: (unit: string) => fireEvent(utils.getByTestId('unit-form-field'), 'onValueChange', unit),
		}
	}

	it('verify username field', async () => {
		const { fillUsername, queryByText, triggerSubmit } = await setup()
		fillUsername('eric123')
		await triggerSubmit()
		expect(await queryByText('Username is required')).toBeNull()
		fillUsername('')
		await triggerSubmit()
		expect(await queryByText('Username is required')).toBeTruthy()
	})

	it('verify first name field', async () => {
		const { fillFirstName, queryByText, triggerSubmit } = await setup()
		fillFirstName('Eng')
		await triggerSubmit()
		expect(await queryByText('First Name is required')).toBeNull()
		fillFirstName('')
		await triggerSubmit()
		expect(await queryByText('First Name is required')).toBeTruthy()
	})

	it('verify last name field', async () => {
		const { fillLastName, queryByText, triggerSubmit } = await setup()
		fillLastName('Cheng')
		await triggerSubmit()
		expect(await queryByText('Last Name is required')).toBeNull()
		fillLastName('')
		await triggerSubmit()
		expect(await queryByText('Last Name is required')).toBeTruthy()
	})

	it('verify phone number field', async () => {
		const { fillPhoneNumber, queryByText, triggerSubmit } = await setup()
		fillPhoneNumber('012-1234567')
		await triggerSubmit()
		expect(await queryByText('Phone Number is required')).toBeNull()
		expect(await queryByText('Phone number is not valid')).toBeNull()
		fillPhoneNumber('')
		await triggerSubmit()
		expect(await queryByText('Phone Number is required')).toBeTruthy()
		fillPhoneNumber('012-123')
		await triggerSubmit()
		expect(await queryByText('Phone number is not valid')).toBeTruthy()
	})

	// it('verify date of birth field', async () => {
	// 	const { fillDOB, queryByText, triggerSubmit } = await setup()
	// 	fillDOB('2000-01-01')
	// 	await triggerSubmit()
	// 	expect(await queryByText('Date of Birth is required')).toBeNull()
	// 	fillDOB('')
	// 	await triggerSubmit()
	// 	expect(await queryByText('Date of Birth is required')).toBeTruthy()
	// })

	it('verify gender field', async () => {
		const { fillGender, queryByText, triggerSubmit } = await setup()
		fillGender('M')
		await triggerSubmit()
		expect(await queryByText('Gender is required')).toBeNull()
		fillGender('')
		await triggerSubmit()
		expect(await queryByText('Gender is required')).toBeTruthy()
	})

	it('verify floor field', async () => {
		const { fillFloor, queryByText, triggerSubmit } = await setup()
		fillFloor('1')
		await triggerSubmit()
		expect(await queryByText('Floor number is required')).toBeNull()
		fillFloor('')
		await triggerSubmit()
		expect(await queryByText('Floor number is required')).toBeTruthy()
	})

	it('verify unit field', async () => {
		const { fillFloor, fillUnit, queryByText, triggerSubmit } = await setup()
		fillFloor('1')
		fillUnit('101')
		await triggerSubmit()
		expect(await queryByText('Unit number is required')).toBeNull()
		fillUnit('')
		await triggerSubmit()
		expect(await queryByText('Unit number is required')).toBeTruthy()
	})
})
