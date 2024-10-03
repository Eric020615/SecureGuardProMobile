import {
	FacilityBookingFormDto,
	getFacilityBookingHistoryDto,
	SpaceAvailabilityDto,
} from '@zustand/types'
import GlobalHandler, { IResponse } from '../globalHandler'
import { listUrl } from '../listUrl'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const submitBooking = async (IBooking: FacilityBookingFormDto): Promise<any> => {
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
): Promise<IResponse<getFacilityBookingHistoryDto[]>> => {
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
		const result: IResponse<getFacilityBookingHistoryDto[]> = {
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

export const cancelBooking = async (bookingGuid: string): Promise<any> => {
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
	duration: string,
): Promise<IResponse<SpaceAvailabilityDto[]>> => {
	try {
		const token = await AsyncStorage.getItem('token')
		const [success, response] = await GlobalHandler({
			path: listUrl.facility.checkAvailabilitySlot.path,
			type: listUrl.facility.checkAvailabilitySlot.type,
			data: {
				facilityId: facilityId,
				startDate: startDate,
				duration: duration,
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
