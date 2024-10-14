import GlobalHandler, { IPaginatedResponse, IResponse } from '@api/globalHandler'
import { listUrl } from '@api/listUrl'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
	CreateSubUserDto,
	DeleteSubUserByIdDto,
	EditUserDetailsByIdDto,
	GetSubUserDto,
	GetUserProfileByIdDto,
	UserInformationFormDto,
} from '@dtos/user/user.dto'

export const createUser = async (
	IUserInformationDto: UserInformationFormDto,
	tempToken: string,
): Promise<IResponse<any>> => {
	try {
		const [success, response] = await GlobalHandler({
			path: listUrl.user.createUser.path,
			type: listUrl.user.createUser.type,
			data: IUserInformationDto,
			_token: tempToken,
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

export const createSubUser = async (
	createSubUserDto: CreateSubUserDto,
): Promise<IResponse<any>> => {
	try {
		const token = await AsyncStorage.getItem('token')
		const [success, response] = await GlobalHandler({
			path: listUrl.user.createSubUser.path,
			type: listUrl.user.createSubUser.type,
			data: createSubUserDto,
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

export const getSubUserList = async (
	page: number,
	limit: number,
): Promise<IPaginatedResponse<GetSubUserDto>> => {
	try {
		const token = await AsyncStorage.getItem('token')
		const [success, response] = await GlobalHandler({
			path: listUrl.user.getSubUserList.path,
			type: listUrl.user.getSubUserList.type,
			_token: token ? token : '',
			data: {
				page: page,
				limit: limit,
			},
		})
		const result: IPaginatedResponse<GetSubUserDto> = {
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

export const getUserProfileById = async (): Promise<IResponse<GetUserProfileByIdDto>> => {
	try {
		const token = await AsyncStorage.getItem('token')
		const [success, response] = await GlobalHandler({
			path: listUrl.user.getUserProfileById.path,
			type: listUrl.user.getUserProfileById.type,
			_token: token,
		})
		const result: IResponse<GetUserProfileByIdDto> = {
			success,
			msg: success ? 'success' : response?.message,
			data: success ? response?.data : undefined,
		}
		return result
	} catch (error) {
		const result: IResponse<GetUserProfileByIdDto> = {
			success: false,
			msg: error,
			data: null,
		}
		return result
	}
}

export const editUserProfileById = async (
	IEditUserDetailsByIdDto: EditUserDetailsByIdDto,
): Promise<any> => {
	try {
		const token = await AsyncStorage.getItem('token')
		const [success, response] = await GlobalHandler({
			path: listUrl.user.editUserProfileById.path,
			type: listUrl.user.editUserProfileById.type,
			_token: token,
			data: IEditUserDetailsByIdDto,
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

export const editSubUserStatusById = async (subUserGuid: string, status: boolean): Promise<any> => {
	try {
		const token = await AsyncStorage.getItem('token')
		const [success, response] = await GlobalHandler({
			path: listUrl.user.editSubUserStatusById.path,
			type: listUrl.user.editSubUserStatusById.type,
			_token: token,
			params: {
				subUserGuid,
				status,
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

export const deleteSubUserById = async (subUserGuid: string): Promise<any> => {
	try {
		const token = await AsyncStorage.getItem('token')
		const [success, response] = await GlobalHandler({
			path: listUrl.user.deleteSubUserById.path,
			type: listUrl.user.deleteSubUserById.type,
			_token: token,
			data: {
				subUserGuid,
			} as DeleteSubUserByIdDto,
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
