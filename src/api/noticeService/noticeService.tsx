import { getNoticeDto } from "@zustand/types";
import GlobalHandler, { IResponse } from "../globalHandler"
import { listUrl } from "../listUrl"
import AsyncStorage from "@react-native-async-storage/async-storage";

export const getNotices = async (): Promise<IResponse<getNoticeDto[]>> => {
    try {
        const token = await AsyncStorage.getItem("token")
        const [success, response] = await GlobalHandler({
            path: listUrl.notice.getNoticesByResident.path,
            type: listUrl.notice.getNoticesByResident.type,
            _token: token ? token : ""
        })
        const result : IResponse<getNoticeDto[]> = {
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