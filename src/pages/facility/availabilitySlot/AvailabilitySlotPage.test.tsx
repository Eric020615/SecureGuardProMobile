import React from 'react'
import { act, fireEvent, render } from '@testing-library/react-native'
import { NotificationProvider } from '@contexts/NotificationContext'
import AvailabilitySlotPage from './AvailabilitySlotPage'
import { createBooking } from '@api/facilityService/facilityService'

jest.mock('expo-router', () => ({
	...jest.requireActual('expo-router'), // Retain other functionalities of expo-router
	useLocalSearchParams: jest.fn().mockReturnValue({
		id: 'BC',
		startDate: '2025-12-10T12:00:00',
		duration: '2',
		numOfGuest: '2',
	}),
}))

jest.mock('@store/facility/useFacility', () => {
	const originalModule = jest.requireActual('@store/facility/useFacility') // Retain the original module
	return {
		...originalModule, // Retain other functionalities of useFacility
		useFacility: jest.fn().mockReturnValue({
			availabilitySlot: [
				{
					spaceId: '1',
					spaceName: 'Space 1',
					isAvailable: true,
				},
				{
					spaceId: '2',
					spaceName: 'Space 2',
					isAvailable: false,
				},
			],
			checkAvailabilitySlotAction: jest.fn(), // Mocked action
			submitBookingAction: originalModule.useFacility.getState().submitBookingAction, // Retain the original action
		}),
	}
})

jest.mock('@api/facilityService/facilityService', () => ({
	...jest.requireActual('@api/facilityService/facilityService'),
	createBooking: jest.fn().mockReturnValue({
		success: true,
		msg: 'Booking successfully submitted!',
		data: null,
	}),
}))

describe('AvailabilitySlotPage', () => {
	beforeEach(() => {
		jest.clearAllMocks() // Clears all mock calls and state
	})
	const setup = async () => {
		const utils = render(
			<NotificationProvider>
				<AvailabilitySlotPage />
			</NotificationProvider>,
		)

		await act(async () => {
			await new Promise((resolve) => setTimeout(resolve, 0)) // Ensure async effects complete
		})

		return {
			...utils,
			selectSlot: async (index: number) => {
				await act(async () => {
					fireEvent(utils.getByTestId(`slot-${index}`), 'onValueChange', true)
				})
			},
			deselectSlot: async (index: number) => {
				await act(async () => {
					fireEvent(utils.getByTestId(`slot-${index}`), 'onValueChange', false)
				})
			},
			triggerSubmit: async () => {
				await act(async () => {
					fireEvent.press(utils.getByTestId('submit-button'))
				})
			},
		}
	}

	it('verifies the slot selection field', async () => {
		const { queryByText, triggerSubmit, selectSlot } = await setup()
		await triggerSubmit()
		await act(async () => {
			expect(queryByText('Please select a slot to proceed.')).toBeTruthy()
		})

		await selectSlot(0)
		await triggerSubmit()
		await act(async () => {
			expect(queryByText('Please select a slot to proceed.')).toBeNull()
		})
	})

	it('verifies the submit button', async () => {
		const { triggerSubmit, selectSlot, getByText } = await setup()
		await selectSlot(0)
		await triggerSubmit()
		await act(async () => {
			expect(createBooking).toHaveBeenCalledTimes(1)
			expect(getByText('Booking successfully submitted!')).toBeTruthy()
		})
	})
})
