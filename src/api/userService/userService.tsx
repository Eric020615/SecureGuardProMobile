import { UserInformationFormDto } from "@zustand/types"
import GlobalHandler, { IResponse } from "../globalHandler"
import { listUrl } from "../listUrl"

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