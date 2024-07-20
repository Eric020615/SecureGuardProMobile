import { UserInformationFormDto } from "@zustand/types"
import GlobalHandler, { IResponse } from "../globalHandler"
import { listUrl } from "../listUrl"
import AsyncStorage from "@react-native-async-storage/async-storage";

export const createUser = async (IUserInformationDto: UserInformationFormDto) : Promise<any> => {
    try {
        const token = await AsyncStorage.getItem("token")
        const [success, response] = await GlobalHandler({
            path: listUrl.user.createUser.path,
            type: listUrl.user.createUser.type,
            data: IUserInformationDto,
            _token: token
        })
        const result : IResponse<any> = {
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