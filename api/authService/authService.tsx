import GlobalHandler, { IResponse } from "../globalHandler"
import { listUrl } from "../listUrl"
import { SignInForm, UserSignUpForm } from "../../zustand/types"
import AsyncStorage from "@react-native-async-storage/async-storage";

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
        const [success, response] = await GlobalHandler({
            path: listUrl.auth.logIn.path,
            type: listUrl.auth.logIn.type,
            data: ISignIn
        })
        await AsyncStorage.setItem("token", response?.data.data)
        const result : IResponse<any> = {
            success,
            msg: success ? 'success': response?.data.message,
            data: success ? response?.data.data : undefined
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