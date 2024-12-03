import { GenderDescriptionEnum, RoleEnum } from '@config/constant/user'
import { GeneralFileDto } from '@dtos/application/application.dto'

export interface UserInformationFormDto {
	firstName: string
	lastName: string
	userName: string
	contactNumber: string
	gender: keyof typeof GenderDescriptionEnum
	floor: string
	unit: string
	dateOfBirth: string
	supportedDocuments: GeneralFileDto[]
}

export interface GetUserProfileByIdDto {
	userId: string
	firstName: string
	lastName: string
	userName: string
	email: string
	contactNumber: string
	gender: keyof typeof GenderDescriptionEnum
	role: keyof typeof RoleEnum
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
	gender: keyof typeof GenderDescriptionEnum
	dateOfBirth: string
}

export interface ResidentInformationDto {
	floor: string
	unit: string
	supportedDocuments: string[]
}

export interface CreateSubUserDto {
	email: string
}

export interface GetSubUserDto {
	userId: number
	userGuid: string
	firstName: string
	lastName: string
	userName: string
	contactNumber: string
	gender: keyof typeof GenderDescriptionEnum
	dateOfBirth: string
	status: boolean
}

export interface DeleteSubUserByIdDto {
	subUserGuid: string
}
