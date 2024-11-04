import { GetNoticeDto } from '@dtos/notice/notice.dto'
import { handleApiPaginationRequest, IPaginatedResponse } from '@api/globalHandler'
import { listUrl } from '@api/listUrl'
import AsyncStorage from '@react-native-async-storage/async-storage'

// Function to get a list of notices
export const getNoticeList = async (id: number, limit: number): Promise<IPaginatedResponse<GetNoticeDto>> => {
	const token = await AsyncStorage.getItem('token')
	const response = await handleApiPaginationRequest<GetNoticeDto>(
		listUrl.notices.getByResident.path,
		listUrl.notices.getByResident.type,
		{},
		token,
		{ id, limit },
	)
	return response
}
