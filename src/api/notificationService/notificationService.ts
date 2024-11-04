import { handleApiRequest, IResponse } from '@api/globalHandler'
import { listUrl } from '@api/listUrl'
import { GetNotificationDto } from '@dtos/notification/notification.dto'
import AsyncStorage from '@react-native-async-storage/async-storage'

// Function to get a list of app notifications
export const getNotifications = async (id: number, limit: number): Promise<IResponse<GetNotificationDto[]>> => {
	const token = await AsyncStorage.getItem('token')
	const response = await handleApiRequest<GetNotificationDto[]>(
		listUrl.notifications.getAll.path,
		listUrl.notifications.getAll.type,
		{},
		token,
		{ id, limit },
	)
	return response
}
