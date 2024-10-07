import { create } from 'zustand'
import {
	cancelBooking,
	checkAvailabilitySlot,
	getFacilityBookingHistory,
	submitBooking,
} from '@api/facilityService/facilityService'
import { generalAction } from '@store/application/useApplication' // Import generalAction
import {
	FacilityBookingFormDto,
	GetFacilityBookingHistoryDto,
	SpaceAvailabilityDto,
} from '@dtos/facility/facility.dto'

interface State {
	availabilitySlot: SpaceAvailabilityDto[]
	facilityBookingHistory: GetFacilityBookingHistoryDto[]
	totalFacilityBookingHistory: number
}

interface Actions {
	submitBookingAction: (facilityBookingForm: FacilityBookingFormDto) => Promise<any>
	getFacilityBookingHistoryAction: (isPast: boolean, page: number, limit: number) => Promise<any>
	resetFacilityBookingHistory: () => void
	cancelBookingAction: (bookingGuid: string) => Promise<any>
	checkAvailabilitySlotAction: (
		facilityId: string,
		startDate: string,
		endDate: string,
	) => Promise<any>
}

export const useFacility = create<State & Actions>((set) => ({
	availabilitySlot: [],
	facilityBookingHistory: [],
	totalFacilityBookingHistory: 0,
	submitBookingAction: async (facilityBookingForm: FacilityBookingFormDto) => {
		return generalAction(
			async () => {
				const response = await submitBooking(facilityBookingForm)
				return response
			},
			'Booking successfully submitted!',
			'Failed to submit booking. Please try again.',
		)
	},
	getFacilityBookingHistoryAction: async (isPast: boolean, page: number, limit: number) => {
		return generalAction(
			async () => {
				const response = await getFacilityBookingHistory(isPast, page, limit)
				set((state) => ({
					facilityBookingHistory: [...state.facilityBookingHistory, ...response.data.list],
				}))
				set({ totalFacilityBookingHistory: response.data.count })
				return response
			},
			'',
			'Failed to retrieve booking history. Please try again.',
		)
	},
	resetFacilityBookingHistory() {
		set({ facilityBookingHistory: [], totalFacilityBookingHistory: 0 })
	},
	cancelBookingAction: async (bookingGuid: string) => {
		return generalAction(
			async () => {
				const response = await cancelBooking(bookingGuid)
				return response
			},
			'Booking successfully canceled!',
			'Failed to cancel booking. Please try again.',
		)
	},

	checkAvailabilitySlotAction: async (facilityId: string, startDate: string, endDate: string) => {
		return generalAction(
			async () => {
				const response = await checkAvailabilitySlot(facilityId, startDate, endDate)
				set({ availabilitySlot: response.data })
				return response
			},
			'',
			'Failed to check slot availability. Please try again.',
		)
	},
}))
