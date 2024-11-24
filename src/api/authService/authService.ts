import { handleApiRequest, IResponse } from '@api/globalHandler'
import { listUrl } from '@api/listUrl'
import { RoleEnum } from '@config/constant/user'
import {
	AuthTokenPayloadDto,
	ForgotPasswordDto,
	ResetPasswordDto,
	SignInFormDto,
	UserSignUpFormDto,
} from '@dtos/auth/auth.dto'
import AsyncStorage from '@react-native-async-storage/async-storage'

// Sign up for user
export const signUp = async (ISignUp: UserSignUpFormDto): Promise<IResponse<any>> => {
	return handleApiRequest<any>(listUrl.auth.signUp.path, listUrl.auth.signUp.type, ISignUp, undefined, {
		role: RoleEnum.RESIDENT,
	})
}

// Sign in an existing user
export const signIn = async (ISignIn: SignInFormDto): Promise<IResponse<any>> => {
	const response = await handleApiRequest<any>(listUrl.auth.logIn.path, listUrl.auth.logIn.type, ISignIn)
	return response
}

// forgot password
export const forgotPassword = async (forgotPasswordDto: ForgotPasswordDto): Promise<IResponse<any>> => {
	return handleApiRequest<any>(
		listUrl.auth.requestPasswordReset.path,
		listUrl.auth.requestPasswordReset.type,
		forgotPasswordDto,
	)
}

// Check authentication
export const checkAuth = async (token: string): Promise<IResponse<AuthTokenPayloadDto>> => {
	return handleApiRequest<AuthTokenPayloadDto>(listUrl.auth.checkAuth.path, listUrl.auth.checkAuth.type, {}, token)
}

// Reset password
export const resetPassword = async (resetPasswordDto: ResetPasswordDto): Promise<IResponse<any>> => {
	const token = await AsyncStorage.getItem('token')
	return handleApiRequest<any>(
		listUrl.auth.resetPassword.path,
		listUrl.auth.resetPassword.type,
		resetPasswordDto,
		token,
	)
}
