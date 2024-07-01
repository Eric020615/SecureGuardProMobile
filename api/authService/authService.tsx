import GlobalHandler, { IResponse } from "../globalHandler"
import { listUrl } from "../listUrl"
import { SignInFormDto, UserSignUpFormDto } from "../../zustand/types"
import AsyncStorage from "@react-native-async-storage/async-storage";

export const signUp = async (ISignUp: UserSignUpFormDto) : Promise<any> => {
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

export const signIn = async (ISignIn: SignInFormDto) : Promise<any> => {
    try {
        const [success, response] = await GlobalHandler({
            path: listUrl.auth.logIn.path,
            type: listUrl.auth.logIn.type,
            data: ISignIn
        })
        await AsyncStorage.setItem("token", response?.data)
        const result : IResponse<any> = {
            success,
            msg: success ? 'success': response?.data.message,
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

export const checkAuth = async (token: string) : Promise<any> => {
    try {
        const [success, data] = await GlobalHandler({
            path: listUrl.auth.checkJwtAuth.path,
            type: listUrl.auth.checkJwtAuth.type,
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