import { FacilityBookingFormDto, getFacilityBookingHistoryDto } from "../../zustand/types"
import GlobalHandler, { IResponse } from "../globalHandler"
import { listUrl } from "../listUrl"
import AsyncStorage from "@react-native-async-storage/async-storage";

export const submitBooking = async (IBooking: FacilityBookingFormDto) : Promise<any> => {
    try {
        const token = await AsyncStorage.getItem("token")
        const [success, data] = await GlobalHandler({
            path: listUrl.facility.facilityBooking.path,
            type: listUrl.facility.facilityBooking.type,
            data: IBooking,
            _token: token
        })
        const result : IResponse<any> = {
            success,
            msg: success ? 'success': data?.message,
            data: success ? data?.data : undefined
        }
        return result;
    } catch (error) {
        const result : IResponse<any> = {
            success: false,
            msg: error,
            data: null
        }
        return result;
    }
}

export const getFacilityBookingHistory = async (isPast: boolean): Promise<IResponse<getFacilityBookingHistoryDto[]>> => {
    try {
        const token = await AsyncStorage.getItem("token")
        const [success, response] = await GlobalHandler({
            path: listUrl.facility.getFacilityBookingHistory.path,
            type: listUrl.facility.getFacilityBookingHistory.type,
            data: {
                isPast: isPast
            },
            _token: token
        })
        const result : IResponse<getFacilityBookingHistoryDto[]> = {
            success,
            msg: success ? 'success': response?.message,
            data: success ? response?.data : undefined
        }
        return result;
    } catch (error) {
        const result : IResponse<any> = {
            success: false,
            msg: error,
            data: null
        }
        return result;
    }
}

export const cancelBooking = async (bookingId: string): Promise<any> => {
    try {
        const token = await AsyncStorage.getItem("token")
        const [success, data] = await GlobalHandler({
            path: listUrl.facility.cancelFacilityBooking.path,
            type: listUrl.facility.cancelFacilityBooking.type,
            data: { bookingId },
            _token: token
        })
        const result : IResponse<any> = {
            success,
            msg: success ? 'success': data?.message,
            data: success ? data?.data : undefined
        }
        return result;
    } catch (error) {
        const result : IResponse<any> = {
            success: false,
            msg: error,
            data: null
        }
        return result;
    }
}