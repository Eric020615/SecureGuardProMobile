import { handleApiRequest, IResponse } from '@api/globalHandler'
import { listUrl } from '@api/listUrl'
import { GetPropertyDto } from '@dtos/refData/refData.dto'

// Function to get a list of properties list
export const getPropertyList = async (): Promise<IResponse<GetPropertyDto[]>> => {
	const response = await handleApiRequest<GetPropertyDto[]>(listUrl.parcels.getAll.path, listUrl.parcels.getAll.type, {
		checkOccupied: true,
	})
	return response
}
