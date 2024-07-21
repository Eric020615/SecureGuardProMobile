export interface UserInformationFormDto {
	firstName: string
	lastName: string
	userName: string
	contactNumber: string
	gender: string
	floorNumber: string
	unitNumber: string
	dateOfBirth: string
	supportedFiles: string[]
}

export interface UserSignUpFormDto {
	email: string
	password: string
	confirmPassword: string
}

export interface SignInFormDto {
	email: string
	password: string
}

export interface FacilityBookingFormDto {
	facilityId: string
	startDate: string
	endDate: string
	numOfGuest: number
}

export interface getFacilityBookingHistoryDto {
	bookingId: string
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

export interface cancelFacilityBookingDto {
	cancelRemark: string
}

export interface getNoticeDto {
	title: string
	description: string
	startDate: string
	endDate: string
}

export interface CreateVisitorDto {
	visitorName: string
	visitorCategory: string
	visitorContactNumber: string
	visitDateTime: string
}

export interface GetVisitorDto {
	visitorId: string
	visitorName: string
	visitorCategory: string
	visitorContactNumber: string
	visitDateTime: string
	createdBy: string
	updatedBy: string
	createdDateTime: string
	updatedDateTime: string
}
