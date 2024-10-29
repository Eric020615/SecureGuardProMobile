import { CreateVisitorDto, EditVisitorByIdDto, GetVisitorDetailsDto, GetVisitorDto } from '@dtos/visitor/visitor.dto'
import GlobalHandler, { IPaginatedResponse, IResponse } from '@api/globalHandler'
import { listUrl } from '@api/listUrl'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const createVisitor = async (IVisitor: CreateVisitorDto): Promise<any> => {
	try {
		const token = await AsyncStorage.getItem('token')
		const [success, response] = await GlobalHandler({
			path: listUrl.visitor.createVisitor.path,
			type: listUrl.visitor.createVisitor.type,
			data: IVisitor,
			_token: token,
		})
		const result: IResponse<any> = {
			success,
			msg: success ? 'success' : response?.message,
			data: success ? response?.data : undefined,
		}
		return result
	} catch (error) {
		const result: IResponse<any> = {
			success: false,
			msg: error,
			data: null,
		}
		return result
	}
}

export const editVisitorById = async (
	IVisitor: EditVisitorByIdDto,
	visitorGuid: string,
): Promise<any> => {
	try {
		const token = await AsyncStorage.getItem('token')
		const [success, response] = await GlobalHandler({
			path: listUrl.visitor.editVisitorById.path,
			type: listUrl.visitor.editVisitorById.type,
			data: IVisitor,
			_token: token,
			params: {
				visitorGuid: visitorGuid,
			},
		})
		const result: IResponse<any> = {
			success,
			msg: success ? 'success' : response?.message,
			data: success ? response?.data : undefined,
		}
		return result
	} catch (error) {
		const result: IResponse<any> = {
			success: false,
			msg: error,
			data: null,
		}
		return result
	}
}

export const getVisitors = async (
	isPast: boolean,
	id: number,
	limit: number,
): Promise<IPaginatedResponse<GetVisitorDto>> => {
	try {
		const token = await AsyncStorage.getItem('token')
		const [success, response] = await GlobalHandler({
			path: listUrl.visitor.getVisitors.path,
			type: listUrl.visitor.getVisitors.type,
			data: {
				isPast,
				id,
				limit
			},
			_token: token,
		})
		const result: IPaginatedResponse<GetVisitorDto> = {
			success,
			msg: success ? 'success' : response?.message,
			data: {
				list: success ? response?.data.list : undefined,
				count: success ? response?.data.count : 0,
			},
		}
		return result
	} catch (error) {
		const result: IResponse<any> = {
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

export const getVisitorDetailsById = async (
	visitorGuid: string,
): Promise<IResponse<GetVisitorDetailsDto>> => {
	try {
		const token = await AsyncStorage.getItem('token')
		const [success, response] = await GlobalHandler({
			path: listUrl.visitor.getVisitorDetailsById.path,
			type: listUrl.visitor.getVisitorDetailsById.type,
			data: {
				visitorGuid: visitorGuid,
			},
			_token: token,
		})
		const result: IResponse<GetVisitorDetailsDto> = {
			success,
			msg: success ? 'success' : response?.message,
			data: success ? response?.data : undefined,
		}
		return result
	} catch (error) {
		const result: IResponse<any> = {
			success: false,
			msg: error,
			data: null,
		}
		return result
	}
}
