import GlobalHandler, { IResponse } from "../globalHandler";
import { listUrl } from "../listUrl";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RoleEnum } from "@config/constant/user";
import { SignInFormDto, UserSignUpFormDto } from "@dtos/auth/auth.dto";

export const signUp = async (ISignUp: UserSignUpFormDto): Promise<any> => {
  try {
    const [success, response] = await GlobalHandler({
      path: listUrl.auth.signUp.path,
      type: listUrl.auth.signUp.type,
      data: ISignUp,
      params: { role: RoleEnum.RESIDENT }
    });
    const result: IResponse<any> = {
      success,
      msg: success ? "success" : response.message,
      data: success ? response.data : null,
    };
    return result;
  } catch (error) {
    const result: IResponse<any> = {
      success: false,
      msg: error,
      data: null,
    };
    return result;
  }
};

export const signIn = async (ISignIn: SignInFormDto): Promise<any> => {
  try {
    const [success, response] = await GlobalHandler({
      path: listUrl.auth.logIn.path,
      type: listUrl.auth.logIn.type,
      data: ISignIn,
      params: { role: RoleEnum.RESIDENT }
    });
    await AsyncStorage.setItem("token", response?.data);
    const result: IResponse<any> = {
      success,
      msg: success ? "success" : response?.data.message,
      data: success ? response?.data : undefined,
    };
    return result;
  } catch (error) {
    const result: IResponse<any> = {
      success: false,
      msg: error,
      data: null,
    };
    return result;
  }
};

export const checkAuth = async (token: string): Promise<any> => {
  try {
    const [success, response] = await GlobalHandler({
      path: listUrl.auth.checkJwtAuth.path,
      type: listUrl.auth.checkJwtAuth.type,
      _token: token,
    });
    const result: IResponse<any> = {
      success,
      msg: success ? "success" : response?.message,
      data: success ? response?.data : undefined,
    };
    return result;
  } catch (error) {
    const result: IResponse<any> = {
      success: false,
      msg: error,
      data: null,
    };
    return result;
  }
};
