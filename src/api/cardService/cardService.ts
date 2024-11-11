import { handleApiRequest, IResponse } from '@api/globalHandler'
import { listUrl } from '@api/listUrl'
import { GetQrCodeByUserDto } from '@dtos/card/card.dto'
import AsyncStorage from '@react-native-async-storage/async-storage'

// Reset password
export const getQrCode = async (): Promise<IResponse<GetQrCodeByUserDto>> => {
	const token = await AsyncStorage.getItem('token')
	return handleApiRequest<GetQrCodeByUserDto>(
		listUrl.cards.getQrCode.path,
		listUrl.cards.getQrCode.type,
		undefined,
		token,
	)
}
