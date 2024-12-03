import { create } from 'zustand'
import {
	cancelBooking,
	checkAvailabilitySlot,
	createBooking,
	getBookingHistory,
	getBookingHistoryById,
} from '@api/facilityService/facilityService'
import { generalAction } from '@store/application/useApplication' // Import generalAction
import {
	FacilityBookingFormDto,
	GetFacilityBookingDetailsDto,
	GetFacilityBookingHistoryDto,
	SpaceAvailabilityDto,
} from '@dtos/facility/facility.dto'

interface State {
	availabilitySlot: SpaceAvailabilityDto[]
	facilityBookingHistory: GetFacilityBookingHistoryDto[]
	facilityBookingDetails: GetFacilityBookingDetailsDto
	id: number
	totalFacilityBookingHistory: number
}

interface Actions {
	submitBookingAction: (facilityBookingForm: FacilityBookingFormDto) => Promise<any>
	getFacilityBookingHistoryAction: (isPast: boolean, limit: number) => Promise<any>
	getFacilityBookingDetailsByIdAction: (id: string) => Promise<any>
	resetFacilityBookingHistory: () => void
	cancelBookingAction: (bookingGuid: string) => Promise<any>
	checkAvailabilitySlotAction: (facility: string, startDate: string, endDate: string) => Promise<any>
}

export const useFacility = create<State & Actions>((set, get) => ({
	availabilitySlot: [],
	facilityBookingHistory: [],
	facilityBookingDetails: {} as GetFacilityBookingDetailsDto,
	id: 0,
	totalFacilityBookingHistory: 0,
	submitBookingAction: async (facilityBookingForm: FacilityBookingFormDto) => {
		return generalAction(
			async () => {
				const response = await createBooking(facilityBookingForm)
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
				const response = await getBookingHistory(isPast, id, limit)
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
	getFacilityBookingDetailsByIdAction: async (id: string) => {
		return generalAction(
			async () => {
				const response = await getBookingHistoryById(id)
				if (!response?.success) {
					throw new Error(response.msg)
				}
				set({ facilityBookingDetails: response.data })
				return response
			},
			'',
			'Failed to retrieve booking details. Please try again.',
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

	checkAvailabilitySlotAction: async (facility: string, startDate: string, endDate: string) => {
		return generalAction(
			async () => {
				const response = await checkAvailabilitySlot(facility, startDate, endDate)
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
