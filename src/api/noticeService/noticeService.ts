import { DeleteNoticeDto, GetNoticeDto } from '@dtos/notice/notice.dto'
import GlobalHandler, { IPaginatedResponse, IResponse } from '@api/globalHandler'
import { listUrl } from '@api/listUrl'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const getNotices = async (id: number, limit: number): Promise<IPaginatedResponse<GetNoticeDto>> => {
	try {
		const token = await AsyncStorage.getItem('token')
		const [success, response] = await GlobalHandler({
			path: listUrl.notice.getNoticesByResident.path,
			type: listUrl.notice.getNoticesByResident.type,
			_token: token ? token : '',
			data: {
				id,
				limit,
			},
		})
		const result: IPaginatedResponse<GetNoticeDto> = {
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
