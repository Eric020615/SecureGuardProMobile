import React from 'react'
import { act, fireEvent, render } from '@testing-library/react-native'
import { NotificationProvider } from '@contexts/NotificationContext'
import CreateFacilityBookingPage from '@pages/facility/createFacilityBooking/CreateFacilityBookingPage'

describe('CreateFacilityBookingPage', () => {
	const setup = async () => {
		const utils = render(
			<NotificationProvider>
				<CreateFacilityBookingPage />
			</NotificationProvider>,
		)

		await act(async () => {
			await new Promise((resolve) => setTimeout(resolve, 0)) // Ensure async effects complete
		})

		return {
			...utils,
			selectFacility: (index: number) => fireEvent(utils.getByTestId('facility-image-slider'), 'onSnapToItem', index),
			fillDate: async (date: Date) => {
				fireEvent.press(utils.getByTestId('booking-date-form-field-button'))
				fireEvent.changeText(utils.getByTestId('booking-date-form-field-date-picker'), date.toISOString())
			},
			selectDuration: (duration?: number) => fireEvent(utils.getByTestId('booking-duration-form-field'), 'onValueChange', duration ? duration.toString() : ''),
			selectNumOfGuests: (guests?: number) => fireEvent(utils.getByTestId('number-of-guest-form-field'), 'onValueChange', guests ? guests.toString() : ''),
			triggerSubmit: async () => {
				fireEvent.press(utils.getByTestId('check-booking-button'))
				await act(async () => {
					await new Promise((resolve) => setTimeout(resolve, 0)) // Ensure async effects complete
				})
			},
		}
	}

	it('verifies the facility field', async () => {
		const { queryByText, triggerSubmit } = await setup()
		await triggerSubmit()
		expect(queryByText('Facility is required')).toBeNull()
	})

	// it('verifies the booking date field', async () => {
	// 	const { fillDate, queryByText, triggerSubmit } = await setup()
	// 	await fillDate(new Date('2024-12-21T12:00:00')) // Valid date
	// 	await triggerSubmit()
	// 	expect(queryByText('Start time is required')).toBeNull()

	// 	fillDate(new Date('2023-12-15T12:00:00')) // Invalid date
	// 	await triggerSubmit()
	// 	expect(queryByText('Start date must be after now')).toBeTruthy()

	// 	fillDate(new Date('')) // Empty date
	// 	await triggerSubmit()
	// 	expect(queryByText('Start time is required')).toBeTruthy()
	// })

	it('verifies the duration field', async () => {
		const { selectDuration, queryByText, triggerSubmit } = await setup()
		selectDuration(1) // Valid duration
		await triggerSubmit()
		expect(queryByText('Booking duration is required')).toBeNull()

		selectDuration() // Invalid duration
		await triggerSubmit()
		expect(queryByText('Booking duration is required')).toBeTruthy()
	})

	it('verifies the number of guests field', async () => {
		const { selectNumOfGuests, queryByText, triggerSubmit } = await setup()
		selectNumOfGuests(1) // Valid number of guests
		await triggerSubmit()
		expect(queryByText('Number of guest is required')).toBeNull()

		selectNumOfGuests() // Invalid number of guests
		await triggerSubmit()
		expect(queryByText('Number of guest is required')).toBeTruthy()
	})
})
