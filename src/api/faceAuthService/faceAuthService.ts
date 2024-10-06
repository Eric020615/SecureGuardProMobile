import { CreateUserFaceAuthDto } from '../../dtos/faceAuth/faceAuth.dto'
import GlobalHandler, { IResponse } from '../globalHandler'
import { listUrl } from '../listUrl'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const uploadUserFaceAuth = async (
	createUserFaceAuthDto: CreateUserFaceAuthDto,
): Promise<IResponse<any>> => {
	try {
		const token = await AsyncStorage.getItem('token')
		const [success, response] = await GlobalHandler({
			path: listUrl.faceAuth.create.path,
			type: listUrl.faceAuth.create.type,
			_token: token ? token : '',
            data: createUserFaceAuthDto,
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
