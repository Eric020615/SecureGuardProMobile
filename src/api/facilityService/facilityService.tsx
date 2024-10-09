import {
	FacilityBookingFormDto,
	GetFacilityBookingHistoryDto,
	SpaceAvailabilityDto,
} from '@dtos/facility/facility.dto'
import GlobalHandler, { IPaginatedResponse, IResponse } from '@api/globalHandler'
import { listUrl } from '@api/listUrl'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const submitBooking = async (IBooking: FacilityBookingFormDto): Promise<IResponse<any>> => {
	try {
		const token = await AsyncStorage.getItem('token')
		const [success, response] = await GlobalHandler({
			path: listUrl.facility.facilityBooking.path,
			type: listUrl.facility.facilityBooking.type,
			data: IBooking,
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

export const getFacilityBookingHistory = async (
	isPast: boolean,
	page: number,
	limit: number,
): Promise<IPaginatedResponse<GetFacilityBookingHistoryDto>> => {
	try {
		const token = await AsyncStorage.getItem('token')
		const [success, response] = await GlobalHandler({
			path: listUrl.facility.getFacilityBookingHistory.path,
			type: listUrl.facility.getFacilityBookingHistory.type,
			data: {
				isPast: isPast,
				page: page,
				limit: limit,
			},
			_token: token,
		})
		const result: IPaginatedResponse<GetFacilityBookingHistoryDto> = {
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
			data: null,
		}
		return result
	}
}

export const cancelBooking = async (bookingGuid: string): Promise<IResponse<any>> => {
	try {
		const token = await AsyncStorage.getItem('token')
		const [success, response] = await GlobalHandler({
			path: listUrl.facility.cancelFacilityBooking.path,
			type: listUrl.facility.cancelFacilityBooking.type,
			data: { bookingGuid },
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

export const checkAvailabilitySlot = async (
	facilityId: string,
	startDate: string,
	endDate: string,
): Promise<IResponse<SpaceAvailabilityDto[]>> => {
	try {
		const token = await AsyncStorage.getItem('token')
		const [success, response] = await GlobalHandler({
			path: listUrl.facility.checkAvailabilitySlot.path,
			type: listUrl.facility.checkAvailabilitySlot.type,
			data: {
				facilityId: facilityId,
				startDate: startDate,
				endDate: endDate,
			},
			_token: token,
		})
		const result: IResponse<SpaceAvailabilityDto[]> = {
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
