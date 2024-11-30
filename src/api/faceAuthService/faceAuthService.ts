import { CreateUserFaceAuthDto } from '@dtos/faceAuth/faceAuth.dto'
import { handleApiRequest, IResponse } from '@api/globalHandler'
import { listUrl } from '@api/listUrl'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const uploadUserFaceAuth = async (createUserFaceAuthDto: CreateUserFaceAuthDto): Promise<IResponse<any>> => {
	const token = await AsyncStorage.getItem('token')
	return handleApiRequest<any>(listUrl.cards.upload.path, listUrl.cards.upload.type, createUserFaceAuthDto, token)
}
