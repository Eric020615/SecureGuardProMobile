import GlobalHandler, { IPaginatedResponse } from '@api/globalHandler'
import { listUrl } from '@api/listUrl'
import { GetNotificationDto } from '@dtos/notification/notification.dto'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const getNotifications = async (
	id: number,
	limit: number,
): Promise<IPaginatedResponse<GetNotificationDto>> => {
	try {
		const token = await AsyncStorage.getItem('token')
		const [success, response] = await GlobalHandler({
			path: listUrl.notification.getNotification.path,
			type: listUrl.notification.getNotification.type,
			_token: token ? token : '',
			data: {
				id,
				limit,
			},
		})
		const result: IPaginatedResponse<GetNotificationDto> = {
			success,
			msg: success ? 'success' : response?.message,
			data: {
				list: success ? response?.data.list : undefined,
				count: success ? response?.data.count : 0,
			},
		}
		return result
	} catch (error) {
		const result: IPaginatedResponse<any> = {
			success: false,
			msg: error,
			data: {
				list: null,
				count: 0,
			},
		}
		return result
	}
}
