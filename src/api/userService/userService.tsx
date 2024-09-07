import { EditUserDetailsByIdDto, UserInformationFormDto } from "@zustand/types"
import GlobalHandler, { IResponse } from "../globalHandler"
import { listUrl } from "../listUrl"
import AsyncStorage from "@react-native-async-storage/async-storage"

export const createUser = async (IUserInformationDto: UserInformationFormDto, tempToken: string) : Promise<any> => {
    try {
        const [success, response] = await GlobalHandler({
            path: listUrl.user.createUser.path,
            type: listUrl.user.createUser.type,
            data: IUserInformationDto,
            _token: tempToken
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

export const getUserProfileById = async () : Promise<any> => {
    try {
        const token = await AsyncStorage.getItem('token')
        const [success, response] = await GlobalHandler({
            path: listUrl.user.getUserProfileById.path,
            type: listUrl.user.getUserProfileById.type,
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

export const editUserProfileById = async (IEditUserDetailsByIdDto : EditUserDetailsByIdDto) : Promise<any> => {
    try {
        const token = await AsyncStorage.getItem('token')
        const [success, response] = await GlobalHandler({
            path: listUrl.user.editUserProfileById.path,
            type: listUrl.user.editUserProfileById.type,
            _token: token,
            data: IEditUserDetailsByIdDto,
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