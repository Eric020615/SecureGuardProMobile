import { GeneralFileResponseDto } from "@dtos/application/application.dto"

export interface GetNoticeDto {
    noticeId: number
    noticeGuid: string
    title: string
    description: string
    startDate: string
    endDate: string
    status: string
}

export interface GetNoticeDetailsDto {
	noticeId: number
	noticeGuid: string
	title: string
	description: string
	startDate: string
	endDate: string
	attachments: GeneralFileResponseDto[]
	status: string
	createdBy: string
	createdDateTime: string
	updatedBy: string
	updatedDateTime: string
}


export interface DeleteNoticeDto {
	noticeGuid: string
}