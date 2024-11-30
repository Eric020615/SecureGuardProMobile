import { GeneralFileDto } from '@dtos/application/application.dto'

export interface GetQrCodeByUserDto {
	badgeNumber: string
	data: string
}

export interface GetCardByUserDto {
	badgeNumber: string
	cardHolder: string
}

export interface CreateUserFaceAuthDto {
	faceData: GeneralFileDto
}
