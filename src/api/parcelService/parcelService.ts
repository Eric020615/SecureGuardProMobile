import GlobalHandler, { IPaginatedResponse } from "@api/globalHandler"
import { listUrl } from "@api/listUrl"
import { GetParcelDto } from "@dtos/parcel/parcel.dto"
import AsyncStorage from "@react-native-async-storage/async-storage"

export const getParcels = async (
	id: number,
	limit: number,
): Promise<IPaginatedResponse<GetParcelDto>> => {
	try {
		const token = await AsyncStorage.getItem('token')
		const [success, response] = await GlobalHandler({
			path: listUrl.parcel.getParcels.path,
			type: listUrl.parcel.getParcels.type,
			_token: token ? token : '',
			data: {
				id,
				limit,
			},
		})
		const result: IPaginatedResponse<GetParcelDto> = {
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
