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
	startDate: string
	facilityId: string
	facilityName: string
	endDate: string
	bookedBy: string
	numOfGuest: number
	isCancelled: boolean
	cancelRemark: string
	createdBy: string
	createdDateTime: string
	updatedBy: string
	updatedDateTime: string
}

export interface CancelFacilityBookingDto {
	cancelRemark: string
}
