import { handleApiPaginationRequest, handleApiRequest, IPaginatedResponse, IResponse } from '@api/globalHandler'
import { listUrl } from '@api/listUrl'
import { GetParcelDetailsDto, GetParcelDto } from '@dtos/parcel/parcel.dto'
import AsyncStorage from '@react-native-async-storage/async-storage'

// Function to get a list of app notifications
export const getParcels = async (id: number, limit: number): Promise<IPaginatedResponse<GetParcelDto>> => {
	const token = await AsyncStorage.getItem('token')
	const response = await handleApiPaginationRequest<GetParcelDto>(
		listUrl.parcels.getAll.path,
		listUrl.parcels.getAll.type,
		{},
		token,
		{ id, limit },
	)
	return response
}

// Function to get a single parcel by id
export const getParcelDetailsById = async (id: string): Promise<IResponse<GetParcelDetailsDto>> => {
	const token = await AsyncStorage.getItem('token')
	const response = await handleApiRequest<GetParcelDetailsDto>(
		listUrl.parcels.getById.path,
		listUrl.parcels.getById.type,
		{},
		token,
		{},
		{
			placeholder: ':id',
			value: id,
		},
	)
	return response
}
