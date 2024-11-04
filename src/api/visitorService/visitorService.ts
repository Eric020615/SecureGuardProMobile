import { CreateVisitorDto, EditVisitorByIdDto, GetVisitorDto } from '@dtos/visitor/visitor.dto'
import { handleApiRequest, IResponse } from '@api/globalHandler'
import { listUrl } from '@api/listUrl'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const createVisitor = async (IVisitor: CreateVisitorDto): Promise<IResponse<any>> => {
	const token = await AsyncStorage.getItem('token')
	const response = await handleApiRequest<any>(
		listUrl.visitors.create.path,
		listUrl.visitors.create.type,
		IVisitor,
		token,
	)
	return response
}

export const getVisitors = async (isPast: boolean, id: number, limit: number): Promise<IResponse<GetVisitorDto>> => {
	const token = await AsyncStorage.getItem('token')
	const response = await handleApiRequest<GetVisitorDto>(
		listUrl.visitors.getAll.path,
		listUrl.visitors.getAll.type,
		{},
		token,
		{ isPast, id, limit },
	)
	return response
}

// Get visitor details by ID
export const getVisitorDetailsById = async (visitorGuid: string): Promise<IResponse<GetVisitorDto>> => {
	const token = await AsyncStorage.getItem('token')
	return handleApiRequest<GetVisitorDto>(
		listUrl.visitors.getById.path,
		listUrl.visitors.getById.type,
		{},
		token,
		{},
		{
			placeholder: ':id',
			value: visitorGuid,
		},
	)
}

export const editVisitorById = async (IVisitor: EditVisitorByIdDto, visitorGuid: string): Promise<IResponse<any>> => {
	const token = await AsyncStorage.getItem('token')
	const response = await handleApiRequest<any>(
		listUrl.visitors.update.path,
		listUrl.visitors.update.type,
		IVisitor,
		token,
		{},
		{
			placeholder: ':id',
			value: visitorGuid,
		},
	)
	return response
}
