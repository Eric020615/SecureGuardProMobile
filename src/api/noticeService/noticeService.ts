import { GetNoticeDetailsDto, GetNoticeDto } from '@dtos/notice/notice.dto'
import { handleApiPaginationRequest, handleApiRequest, IPaginatedResponse, IResponse } from '@api/globalHandler'
import { listUrl } from '@api/listUrl'
import AsyncStorage from '@react-native-async-storage/async-storage'

// Function to get a list of notices
export const getNoticeList = async (id: number, limit: number): Promise<IPaginatedResponse<GetNoticeDto>> => {
	const token = await AsyncStorage.getItem('token')
	const response = await handleApiPaginationRequest<GetNoticeDto>(
		listUrl.notices.getAll.path,
		listUrl.notices.getAll.type,
		{},
		token,
		{ id, limit },
	)
	return response
}

export const getNoticeDetailsById = async (id: string): Promise<IResponse<GetNoticeDetailsDto>> => {
	const token = await AsyncStorage.getItem('token')
	const response = await handleApiRequest<GetNoticeDetailsDto>(
		listUrl.notices.getById.path,
		listUrl.notices.getById.type,
		{},
		token,
		{},
		{
			placeholder: ':id',
			value: id,
		},
	)
	return response
}
