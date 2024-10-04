import { Gender, RoleEnum } from '@config/constant/user'
import { VisitorEnum } from '@config/constant/visitor'

export type GeneralFile = {
	fileName: string
	data: string
}

export interface Page<T> {
	data: T[]
	previousCursor?: number
	nextCursor?: number
}

export interface UserInformationFormDto {
	firstName: string
	lastName: string
	userName: string
	contactNumber: string
	gender: string
	floorNumber: string
	unitNumber: string
	dateOfBirth: string
	supportedFiles: GeneralFile[]
}

export interface GetUserProfileByIdDto {
	userId: string
	firstName: string
	lastName: string
	userName: string
	email: string
	contactNumber: string
	gender: Gender
	role: RoleEnum
	roleInformation?: ResidentInformationDto
	dateOfBirth: string
	isActive?: boolean
	createdBy: string
	createdDateTime: string
	updatedBy: string
	updatedDateTime: string
}

export interface EditUserDetailsByIdDto {
	firstName: string
	lastName: string
	userName: string
	email: string
	contactNumber: string
	gender: string
	dateOfBirth: string
}

export interface ResidentInformationDto {
	floorNumber: string
	unitNumber: string
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
	spaceId: string
}

export interface SpaceAvailabilityDto {
	spaceId: string
	spaceName: string
	isBooked: boolean // Change to isBooked or any other name if required
	capacity: number
}

export interface getFacilityBookingHistoryDto {
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
	visitorCategory: VisitorEnum
	visitorContactNumber: string
	visitDateTime: string
}

export interface EditVisitorByIdDto {
    visitorName: string;
    visitorCategory: string;
    visitorContactNumber: string;
    visitDateTime: string;
}

export interface GetVisitorDto {
	visitorId: number
	visitorGuid: string;
	visitorName: string
	visitorCategory: VisitorEnum | null
	visitorContactNumber: string
	visitDateTime: string
	createdBy: string
	updatedBy: string
	createdDateTime: string
	updatedDateTime: string
}

export interface CreateUserFaceAuthDto {
	faceData: string
}
