import React from 'react'
import { act, fireEvent, render } from '@testing-library/react-native'
import { NotificationProvider } from '@contexts/NotificationContext'
import FacilityBookingHistoryPage from './FacilityBookingHistoryPage'
import { cancelBooking, getBookingHistory } from '@api/facilityService/facilityService'

jest.mock('@api/facilityService/facilityService', () => ({
	...jest.requireActual('@api/facilityService/facilityService'),
	getBookingHistory: jest.fn().mockReturnValue({
		success: true,
		msg: 'Facility Booking retrieved successfully',
		data: {
			list: [
				{
					bookingId: 1,
					bookingGuid: 'booking-guid-001',
					facilityId: 'GR', // Replace with actual key from FacilityDescriptionEnum
					startDate: '2025-02-10T09:00:00Z',
					endDate: '2025-02-11T11:00:00Z',
					bookedBy: '1',
					isCancelled: false,
					bookingStatus: 'ACTIVE', // Replace with actual key from DocumentStatusDescriptionEnum
				},
				{
					bookingId: 2,
					bookingGuid: 'booking-guid-002',
					facilityId: 'BBC', // Replace with actual key from FacilityDescriptionEnum
					startDate: '2025-01-02T15:00:00Z',
					endDate: '2025-01-02T17:00:00Z',
					bookedBy: '1',
					isCancelled: false,
					bookingStatus: 'ACTIVE', // Replace with actual key from DocumentStatusDescriptionEnum
				},
				{
					bookingId: 3,
					bookingGuid: 'booking-guid-003',
					facilityId: 'BC', // Replace with actual key from FacilityDescriptionEnum
					startDate: '2025-01-05T08:00:00Z',
					endDate: '2025-01-05T12:00:00Z',
					bookedBy: '2',
					isCancelled: false,
					bookingStatus: 'ACTIVE', // Replace with actual key from DocumentStatusDescriptionEnum
				},
			],
			count: 3,
		},
	}),
	cancelBooking: jest.fn().mockReturnValue({
		success: true,
		msg: 'Booking successfully canceled!',
	}),
}))

describe('FacilityBookingHistoryPage', () => {
	const setup = async () => {
		const utils = render(
			<NotificationProvider>
				<FacilityBookingHistoryPage />
			</NotificationProvider>,
		)

		await act(async () => {
			await new Promise((resolve) => setTimeout(resolve, 0)) // Simulate async effects
		})

		return {
			...utils,
			triggerPast: async () => {
				await act(async () => {
					fireEvent.press(utils.getByTestId('past-button'))
				})
			},
			triggerUpcoming: async () => {
				await act(async () => {
					fireEvent.press(utils.getByTestId('upcoming-button'))
				})
			},
			triggerCancelBooking: async (index: number) => {
				await act(async () => {
					fireEvent.press(utils.getByTestId(`cancel-booking-button-${index}`))
				})
			},
            triggerCancelConfirm: async () => {
                await act(async () => {
                    fireEvent.press(utils.getByTestId('cancel-confirm-button'))
                })
            }
		}
	}

	it('verify the Upcoming button', async () => {
		const { triggerUpcoming } = await setup()
		await triggerUpcoming()
		await act(async () => {
			expect(getBookingHistory).toHaveBeenCalledWith(false, 0, 10)
		})
	})

	it('verify the Past button', async () => {
		const { triggerPast } = await setup()
		await triggerPast()
		await act(async () => {
			expect(getBookingHistory).toHaveBeenCalledWith(true, 0, 10)
		})
	})

	it('verify the Cancel Booking button', async () => {
		const {getByText, triggerCancelBooking, triggerCancelConfirm } = await setup()
		await triggerCancelBooking(0)
        await triggerCancelConfirm()
		await act(async () => {
			expect(cancelBooking).toHaveBeenCalledTimes(1)
			expect(getByText('Booking successfully canceled!')).toBeTruthy()
		})
	})
})
