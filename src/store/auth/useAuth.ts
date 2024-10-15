import { create } from 'zustand'
import { checkAuth, forgotPassword, resetPassword, signIn, signUp } from '@api/authService/authService'
import { generalAction } from '@store/application/useApplication' // Import the generalAction utility
import { ForgotPasswordDto, ResetPasswordDto, SignInFormDto, UserSignUpFormDto } from '@dtos/auth/auth.dto'
import AsyncStorage from '@react-native-async-storage/async-storage'

interface State {
	isLogged: boolean
	tempToken: string
}

interface Actions {
	signUpAction: (userSignUpForm: UserSignUpFormDto) => Promise<any>
	signInAction: (userSignInForm: SignInFormDto) => Promise<any>
	resetPasswordAction: (resetPasswordDto: ResetPasswordDto) => Promise<any>
	forgotPasswordAction: (ForgotPasswordDto: ForgotPasswordDto) => Promise<any>
	checkJwtAuthAction: (token: string) => Promise<any>
	setTempTokenAction: (token: string) => void
}

export const useAuth = create<State & Actions>((set) => ({
	isLogged: false,
	tempToken: '',
	signUpAction: async (userSignUpForm: UserSignUpFormDto) => {
		return generalAction(
			async () => {
				const response = await signUp(userSignUpForm)
				if(!response?.success){
					throw new Error(response.msg)
				}
				set({ isLogged: true, tempToken: response.data })
				return response
			},
			'', // Custom success message
			'Account created failed. Please try again.', // Custom error message
		)
	},

	signInAction: async (userSignInForm: SignInFormDto) => {
		return generalAction(
			async () => {
				const response = await signIn(userSignInForm)
				if (response?.success) {
					await AsyncStorage.setItem('token', response?.data)
					set({ isLogged: true })
				} else {
					throw new Error(response.msg)
				}
				return response
			},
			'Welcome back.', // Custom success message
			'Sign-in failed. Please check your credentials and try again.', // Custom error message
		)
	},

	forgotPasswordAction: async (ForgotPasswordDto: ForgotPasswordDto) => {
		return generalAction(
			async () => {
				const response = await forgotPassword(ForgotPasswordDto)
				if(!response?.success){
					throw new Error(response.msg)
				}
				return response
			},
			'Password reset email sent! Please check your email', // Custom success message
			'Failed to send password reset email. Please try again.', // Custom error message
		)
	},

	resetPasswordAction: async (resetPasswordDto: ResetPasswordDto) => {
		return generalAction(
			async () => {
				const response = await resetPassword(resetPasswordDto)
				if(!response?.success){
					throw new Error(response.msg)
				}
				return response
			},
			'Password reset successful!', // Custom success message
			'Failed to reset password. Please try again.', // Custom error message
		)
	},

	checkJwtAuthAction: async (token: string) => {
		return generalAction(
			async () => {
				const response = await checkAuth(token)
				if(!response?.success){
					throw new Error(response.msg)
				}
				return response
			},
			'',
			'Authentication failed. Please log in again.', // Custom error message
		)
	},
	setTempTokenAction: (token: string) => set({ tempToken: token }),
}))
