import { GetNoticeDto } from '@dtos/notice/notice.dto'
import GlobalHandler, { IPaginatedResponse } from '../globalHandler'
import { listUrl } from '../listUrl'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const getNotices = async (
	page: number,
	limit: number,
): Promise<IPaginatedResponse<GetNoticeDto>> => {
	try {
		const token = await AsyncStorage.getItem('token')
		const [success, response] = await GlobalHandler({
			path: listUrl.notice.getNoticesByResident.path,
			type: listUrl.notice.getNoticesByResident.type,
			_token: token ? token : '',
			data: {
				page: page,
				limit: limit,
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
