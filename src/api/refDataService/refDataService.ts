import { handleApiRequest, IResponse } from '@api/globalHandler'
import { listUrl } from '@api/listUrl'
import { GetPropertyDto } from '@dtos/refData/refData.dto'

// Function to get a list of properties list
export const getPropertyList = async (): Promise<IResponse<GetPropertyDto[]>> => {
	const response = await handleApiRequest<GetPropertyDto[]>(
		listUrl.refData.getProperties.path,
		listUrl.refData.getProperties.type,
		undefined,
		'',
		{
			checkOccupied: true,
		},
	)
	return response
}
