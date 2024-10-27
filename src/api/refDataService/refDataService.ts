import GlobalHandler, { IResponse } from '@api/globalHandler'
import { listUrl } from '@api/listUrl'
import { GetPropertyDto } from '@dtos/refData/refData.dto'

export const getPropertyList = async (): Promise<IResponse<GetPropertyDto[]>> => {
	try {
		const [success, response] = await GlobalHandler({
			path: listUrl.refData.getPropertyList.path,
			type: listUrl.refData.getPropertyList.type,
			data: {
				checkOccupied: true,
			}, 
		})
		const result: IResponse<GetPropertyDto[]> = {
			success,
			msg: success ? 'success' : response?.message,
			data: response.data,
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
