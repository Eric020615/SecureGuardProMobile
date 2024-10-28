
export interface GetNotificationDto {
	notificationId: number
	notificationGuid: string
	userGuid: string
	title: string
	body: string
	data: any
	isRead: boolean
	createdBy: string
	createdDateTime: string
	updatedBy: string
	updatedDateTime: string
}
