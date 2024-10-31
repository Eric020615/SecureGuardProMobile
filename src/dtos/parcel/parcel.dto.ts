import { GeneralFileResponseDto } from "@dtos/application/application.dto"

export interface GetParcelDto {
	parcelId: number
	parcelGuid: string
	parcelImage: GeneralFileResponseDto
	floor: string
	unit: string
	createdBy: string
	createdDateTime: string
	updatedBy: string
	updatedDateTime: string
}
