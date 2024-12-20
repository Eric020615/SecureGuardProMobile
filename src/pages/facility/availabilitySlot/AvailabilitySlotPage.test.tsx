import React from 'react'
import { act, fireEvent, render } from '@testing-library/react-native'
import { NotificationProvider } from '@contexts/NotificationContext'
import AvailabilitySlotPage from './AvailabilitySlotPage'
import { FacilityBookingFormDto } from '@dtos/facility/facility.dto'
import { useFacility } from '@store/facility/useFacility'

jest.mock('expo-router', () => ({
	...jest.requireActual('expo-router'), // Retain other functionalities of expo-router
	useLocalSearchParams: jest.fn().mockReturnValue({
		id: 'BC',
		startDate: '2024-12-22T12:00:00',
		duration: '2',
		numOfGuest: '2',
	}),
}))

jest.mock('@store/facility/useFacility', () => ({
	...jest.requireActual('@store/facility/useFacility'), // Retain other functionalities of useFacility
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
		checkAvailabilitySlotAction: jest.fn(),
		submitBookingAction: jest.fn((facilityBookingForm: FacilityBookingFormDto) => {}),
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
			selectSlot: (index: number) => fireEvent(utils.getByTestId(`slot-${index}`), 'onValueChange', true),
			deselectSlot: (index: number) => fireEvent(utils.getByTestId(`slot-${index}`), 'onValueChange', false),
			triggerSubmit: async () => {
				fireEvent.press(utils.getByTestId('submit-button'))
				await act(async () => {
					await new Promise((resolve) => setTimeout(resolve, 0)) // Ensure async effects complete
				})
			},
		}
	}

	it('verifies the slot selection field', async () => {
		const { queryByText, triggerSubmit, selectSlot } = await setup()
		await triggerSubmit()
		expect(queryByText('Please select a slot to proceed.')).toBeTruthy()

		selectSlot(0)
		await triggerSubmit()
		expect(queryByText('Please select a slot to proceed.')).toBeNull()
	})

	it('verifies the submit button', async () => {
		const { queryByText, triggerSubmit, selectSlot } = await setup()
		selectSlot(0) // Deselect the slot
		await triggerSubmit()
		await act(async () => {
			await new Promise((resolve) => setTimeout(resolve, 0)) // Ensure async effects complete
		})
		expect(useFacility().submitBookingAction).toHaveBeenCalledTimes(1)
	})
})
