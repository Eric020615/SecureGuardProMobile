import GlobalHandler, { IResponse } from "../globalHandler"
import { listUrl } from "../listUrl"
import { UserSignUpForm } from "../../zustand/types"

export const signUp = async (ISignUp: UserSignUpForm) : Promise<any> => {
    try {
        const [success, data] = await GlobalHandler({
            path: listUrl.auth.signUp.path,
            type: listUrl.auth.signUp.type,
            data: ISignUp
        })
        if(!success){
            throw data
        }
        const result : IResponse<any> = {
            success,
            msg: success ? 'success': data?.response?.data.msg,
            data: success ? data : undefined
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