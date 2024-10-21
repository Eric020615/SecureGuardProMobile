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
	id: number
	totalFacilityBookingHistory: number
}

interface Actions {
	submitBookingAction: (facilityBookingForm: FacilityBookingFormDto) => Promise<any>
	getFacilityBookingHistoryAction: (isPast: boolean, limit: number) => Promise<any>
	resetFacilityBookingHistory: () => void
	cancelBookingAction: (bookingGuid: string) => Promise<any>
	checkAvailabilitySlotAction: (
		facilityId: string,
		startDate: string,
		endDate: string,
	) => Promise<any>
}

export const useFacility = create<State & Actions>((set, get) => ({
	availabilitySlot: [],
	facilityBookingHistory: [],
	id: 0,
	totalFacilityBookingHistory: 0,
	submitBookingAction: async (facilityBookingForm: FacilityBookingFormDto) => {
		return generalAction(
			async () => {
				const response = await submitBooking(facilityBookingForm)
				if (!response?.success) {
					throw new Error(response.msg)
				}
				return response
			},
			'Booking successfully submitted!',
			'Failed to submit booking. Please try again.',
		)
	},
	getFacilityBookingHistoryAction: async (isPast: boolean, limit: number) => {
		return generalAction(
			async () => {
				const { id } = get()
				const response = await getFacilityBookingHistory(isPast, id, limit)
				if (!response?.success) {
					throw new Error(response.msg)
				}
				set((state) => ({
					facilityBookingHistory: [...state.facilityBookingHistory, ...response.data.list],
					id: response.data.list.length > 0 ? response.data.list[response.data.list.length - 1]?.bookingId : 0,
					totalFacilityBookingHistory: response.data.count,
				}))
				return response
			},
			'',
			'Failed to retrieve booking history. Please try again.',
		)
	},
	resetFacilityBookingHistory() {
		set({ facilityBookingHistory: [], totalFacilityBookingHistory: 0, id: 0 })
	},
	cancelBookingAction: async (bookingGuid: string) => {
		return generalAction(
			async () => {
				const response = await cancelBooking(bookingGuid)
				if (!response?.success) {
					throw new Error(response.msg)
				}
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
				if (!response?.success) {
					throw new Error(response.msg)
				}
				set({ availabilitySlot: response.data })
				return response
			},
			'',
			'Failed to check slot availability. Please try again.',
		)
	},
}))
