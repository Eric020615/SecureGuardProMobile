import GlobalHandler, { IResponse } from "../globalHandler"
import { listUrl } from "../listUrl"
import AsyncStorage from "@react-native-async-storage/async-storage";

export const getNotices = async (): Promise<any> => {
    try {
        const token = await AsyncStorage.getItem("token")
        const [success, data] = await GlobalHandler({
            path: listUrl.notice.getNoticesByResident.path,
            type: listUrl.notice.getNoticesByResident.type,
            _token: token ? token : ""
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