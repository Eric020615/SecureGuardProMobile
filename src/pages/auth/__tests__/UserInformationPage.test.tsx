import React from 'react'
import { render, fireEvent, act } from '@testing-library/react-native'
import { NotificationProvider } from '@contexts/NotificationContext'
import * as DocumentPicker from 'react-native-document-picker'
import UserInformationPage from '@pages/auth/UserInformationPage'

jest.mock('react-native-document-picker', () => ({
	pick: jest.fn(),
	isCancel: jest.fn(() => false),
}))

jest.mock('@store/refData/useRefData', () => ({
	useRefData: () => ({
		propertyList: [
			{ floorId: '1', units: [{ unitId: '1A' }, { unitId: '1B' }] },
			{ floorId: '2', units: [{ unitId: '2A' }, { unitId: '2B' }] },
		],
		getPropertyListAction: jest.fn(),
	}),
}))

jest.mock('@store/user/useUser', () => ({
	useUser: () => ({
		createUserAction: jest.fn(),
	}),
}))

jest.mock('@store/auth/useAuth', () => ({
	useAuth: () => ({
		tempToken: 'mock-token',
	}),
}))

jest.mock('@store/application/useApplication', () => ({
	useApplication: () => ({
		isLoading: false,
	}),
}))

jest.mock('@store/modal/useModal', () => ({
	useModal: () => ({
		setActionConfirmModalAction: jest.fn(),
	}),
}))

describe('UserInformationPage', () => {
	it('renders correctly with all fields and buttons', () => {
		const { getByText, getByPlaceholderText } = render(
			<NotificationProvider>
				<UserInformationPage />
			</NotificationProvider>,
		)

		expect(getByText('Welcome')).toBeTruthy()
		expect(getByText('We need something more')).toBeTruthy()
		expect(getByPlaceholderText('Enter your username')).toBeTruthy()
		expect(getByPlaceholderText('Enter your first name')).toBeTruthy()
		expect(getByPlaceholderText('Enter your last name')).toBeTruthy()
		expect(getByPlaceholderText('Enter phone number')).toBeTruthy()
		expect(getByText('Submit')).toBeTruthy()
	})

	it('validates required fields correctly', async () => {
		const { getByText, findByText } = render(
			<NotificationProvider>
				<UserInformationPage />
			</NotificationProvider>,
		)

		await act(async () => {
			await new Promise((resolve) => setTimeout(resolve, 0)) // Simulate async effects
		})
		fireEvent.press(getByText('Submit'))

		expect(await findByText('First Name is required')).toBeTruthy()
		expect(await findByText('Last Name is required')).toBeTruthy()
		expect(await findByText('Phone Number is required')).toBeTruthy()
		expect(await findByText('Date of Birth is required')).toBeTruthy()
		expect(await findByText('Gender is required')).toBeTruthy()
	})

	// it('handles valid form submission', async () => {
	// 	const mockCreateUserAction = jest.fn()
	// 	jest.spyOn(require('@store/user/useUser'), 'useUser').mockReturnValue({
	// 		createUserAction: mockCreateUserAction,
	// 	})

	// 	const { getByPlaceholderText, getByText } = render(
	// 		<NotificationProvider>
	// 			<UserInformationPage />
	// 		</NotificationProvider>,
	// 	)

	// 	await act(async () => {
	// 		fireEvent.changeText(getByPlaceholderText('Enter your username'), 'testuser')
	// 		fireEvent.changeText(getByPlaceholderText('Enter your first name'), 'John')
	// 		fireEvent.changeText(getByPlaceholderText('Enter your last name'), 'Doe')
	// 		fireEvent.changeText(getByPlaceholderText('Enter phone number'), '1234567890')
	// 		fireEvent.press(getByText('Submit'))
	// 	})

	// 	expect(mockCreateUserAction).toHaveBeenCalled()
	// })

	// it('handles file selection', async () => {
	// 	const mockFile = { uri: 'file://mockfile', type: 'image/jpeg', name: 'mockfile.jpg' }
	// 	;(DocumentPicker.pick as jest.Mock).mockResolvedValue([mockFile])

	// 	const { getByText } = render(
	// 		<NotificationProvider>
	// 			<UserInformationPage />
	// 		</NotificationProvider>,
	// 	)

	// 	await act(async () => {
	// 		fireEvent.press(getByText('Submit'))
	// 	})

	// 	expect(DocumentPicker.pick).toHaveBeenCalled()
	// })
})
