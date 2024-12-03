import { DocumentStatusDescriptionEnum } from "@config/constant"
import { GeneralFileResponseDto } from "@dtos/application/application.dto"

export interface GetNoticeDto {
    noticeId: number
    noticeGuid: string
    title: string
    description: string
    startDate: string
    endDate: string
    status: keyof typeof DocumentStatusDescriptionEnum
}

export interface GetNoticeDetailsDto {
	noticeId: number
	noticeGuid: string
	title: string
	description: string
	startDate: string
	endDate: string
	attachments: GeneralFileResponseDto[]
	status: keyof typeof DocumentStatusDescriptionEnum
	createdBy: string
	createdDateTime: string
	updatedBy: string
	updatedDateTime: string
}


export interface DeleteNoticeDto {
	noticeGuid: string
}