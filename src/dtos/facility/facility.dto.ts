import { DocumentStatusDescriptionEnum } from "@config/constant"
import { FacilityDescriptionEnum } from "@config/constant/facilities"

export interface FacilityBookingFormDto {
	facilityId: keyof typeof FacilityDescriptionEnum
	spaceId: string
	startDate: string
	endDate: string
	numOfGuest: number
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
	facilityId: keyof typeof FacilityDescriptionEnum
	startDate: string
	endDate: string
	bookedBy: string
	isCancelled: boolean
	bookingStatus: keyof typeof DocumentStatusDescriptionEnum
}

export interface GetFacilityBookingDetailsDto {
	bookingId: number
	bookingGuid: string
	facilityId: keyof typeof FacilityDescriptionEnum
	startDate: string
	endDate: string
	bookedBy: string
	numOfGuest: number
	isCancelled: boolean
	cancelRemark: string
	status: keyof typeof DocumentStatusDescriptionEnum
	createdBy: string
	createdDateTime: string
	updatedBy: string
	updatedDateTime: string
}

export interface CancelFacilityBookingDto {
	cancelRemark: string
}
