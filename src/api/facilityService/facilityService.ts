import { FacilityBookingFormDto, GetFacilityBookingHistoryDto, SpaceAvailabilityDto } from '@dtos/facility/facility.dto'
import { handleApiPaginationRequest, handleApiRequest, IPaginatedResponse, IResponse } from '@api/globalHandler'
import { listUrl } from '@api/listUrl'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const createBooking = async (bookingForm: FacilityBookingFormDto): Promise<any> => {
	const token = await AsyncStorage.getItem('token')
	const response = await handleApiRequest<any>(
		listUrl.facilities.book.path,
		listUrl.facilities.book.type,
		bookingForm,
		token,
	)
	return response
}

export const getBookingHistory = async (
	isPast: boolean,
	id: number,
	limit: number,
): Promise<IPaginatedResponse<GetFacilityBookingHistoryDto>> => {
	const token = await AsyncStorage.getItem('token')
	const response = await handleApiPaginationRequest<GetFacilityBookingHistoryDto>(
		listUrl.facilities.getBookingHistory.path,
		listUrl.facilities.getBookingHistory.type,
		{},
		token,
		{
			isPast,
			id,
			limit,
		},
	)
	return response
}

export const cancelBooking = async (facilityBookingGuid: string): Promise<IResponse<any>> => {
	const token = await AsyncStorage.getItem('token')
	const response = await handleApiRequest<any>(
		listUrl.facilities.cancelBooking.path,
		listUrl.facilities.cancelBooking.type,
		{},
		token,
		{},
		{
			placeholder: ':id',
			value: facilityBookingGuid,
		},
	)
	return response
}

export const checkAvailabilitySlot = async (
	facilityId: string,
	startDate: string,
	endDate: string,
): Promise<IResponse<SpaceAvailabilityDto[]>> => {
	const token = await AsyncStorage.getItem('token')
	const response = await handleApiRequest<any>(
		listUrl.facilities.checkAvailability.path,
		listUrl.facilities.checkAvailability.type,
		{},
		token,
		{
			facilityId,
			startDate,
			endDate,
		},
	)
	return response
}
