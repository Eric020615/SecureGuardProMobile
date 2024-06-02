import GlobalHandler, { IResponse } from "../globalHandler"
import { listUrl } from "../listUrl"
import { SignInForm, UserSignUpForm } from "../../zustand/types"

export const signUp = async (ISignUp: UserSignUpForm) : Promise<any> => {
    try {
        const [success, data] = await GlobalHandler({
            path: listUrl.auth.signUp.path,
            type: listUrl.auth.signUp.type,
            data: ISignUp
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

export const signIn = async (ISignIn: SignInForm) : Promise<any> => {
    try {
        const [success, data] = await GlobalHandler({
            path: listUrl.auth.logIn.path,
            type: listUrl.auth.logIn.type,
            data: ISignIn
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