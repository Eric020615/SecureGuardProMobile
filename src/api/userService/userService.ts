import { handleApiPaginationRequest, handleApiRequest, IPaginatedResponse, IResponse } from '@api/globalHandler'
import { listUrl } from '@api/listUrl'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
	CreateSubUserDto,
	EditUserDetailsByIdDto,
	GetSubUserDto,
	GetUserProfileByIdDto,
	UserInformationFormDto,
} from '@dtos/user/user.dto'

// Function to create a new user
export const createUser = async (
	IUserInformationDto: UserInformationFormDto,
	tempToken: string,
): Promise<IResponse<any>> => {
	const response = await handleApiRequest<any>(
		listUrl.users.create.path,
		listUrl.users.create.type,
		IUserInformationDto,
		tempToken,
	)
	return response
}

export const getUserProfileById = async (): Promise<IResponse<GetUserProfileByIdDto>> => {
	const token = await AsyncStorage.getItem('token')
	const response = await handleApiRequest<GetUserProfileByIdDto>(
		listUrl.users.getById.path,
		listUrl.users.getById.type,
		{},
		token,
	)
	return response
}

// Function to edit user profile by id
export const editUserProfileById = async (IEditUserDetailsByIdDto: EditUserDetailsByIdDto): Promise<any> => {
	const token = await AsyncStorage.getItem('token')
	const response = await handleApiRequest<GetUserProfileByIdDto>(
		listUrl.users.update.path,
		listUrl.users.update.type,
		IEditUserDetailsByIdDto,
		token,
	)
	return response
}

// Function to create a new user
export const createSubUser = async (createSubUserDto: CreateSubUserDto): Promise<IResponse<any>> => {
	const token = await AsyncStorage.getItem('token')
	const response = await handleApiRequest<any>(
		listUrl.users.createSubUser.path,
		listUrl.users.createSubUser.type,
		createSubUserDto,
		token,
	)
	return response
}

export const getSubUserList = async (id: number, limit: number): Promise<IPaginatedResponse<GetSubUserDto>> => {
	const token = await AsyncStorage.getItem('token')
	const response = await handleApiPaginationRequest<GetSubUserDto>(
		listUrl.users.getSubUsers.path,
		listUrl.users.getSubUsers.type,
		{},
		token,
		{ id, limit },
	)
	return response
}

export const editSubUserStatusById = async (subUserGuid: string, status: boolean): Promise<any> => {
	const token = await AsyncStorage.getItem('token')
	const response = await handleApiRequest<any>(
		listUrl.users.updateSubUserStatus.path,
		listUrl.users.updateSubUserStatus.type,
		{},
		token,
		{ status },
		{
			placeholder: ':id',
			value: subUserGuid,
		},
	)
	return response
}

export const deleteSubUserById = async (subUserGuid: string): Promise<any> => {
	const token = await AsyncStorage.getItem('token')
	const response = await handleApiRequest<any>(
		listUrl.users.deleteSubUser.path,
		listUrl.users.deleteSubUser.type,
		{},
		token,
		{},
		{
			placeholder: ':id',
			value: subUserGuid,
		},
	)
	return response
}
