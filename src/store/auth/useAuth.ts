import { create } from 'zustand'
import { checkAuth, signIn, signUp } from '@api/authService/authService'
import { generalAction } from '@store/application/useApplication' // Import the generalAction utility
import { SignInFormDto, UserSignUpFormDto } from '@dtos/auth/auth.dto'
import AsyncStorage from '@react-native-async-storage/async-storage'

interface State {
	isLogged: boolean
	tempToken: string
}

interface Actions {
	signUpAction: (userSignUpForm: UserSignUpFormDto) => Promise<any>
	signInAction: (userSignInForm: SignInFormDto) => Promise<any>
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
			'', // Custom success message
			'Sign-in failed. Please check your credentials and try again.', // Custom error message
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
