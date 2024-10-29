export interface FacilityBookingFormDto {
	facilityId: string
	startDate: string
	endDate: string
	numOfGuest: number
	spaceId: string
}

export interface SpaceAvailabilityDto {
	spaceId: string
	spaceName: string
	isBooked: boolean // Change to isBooked or any other name if required
	capacity: number
}

export interface GetFacilityBookingHistoryDto {
	bookingId: number
	bookingGuid: string
	facilityName: string
	startDate: string
	endDate: string
	bookedBy: string
	isCancelled: boolean
	status: string
}

export interface CancelFacilityBookingDto {
	cancelRemark: string
}
