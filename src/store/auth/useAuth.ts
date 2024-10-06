import { create } from 'zustand'
import { SignInFormDto, UserSignUpFormDto } from '../types'
import { checkAuth, signIn, signUp } from '@api/authService/authService'
import { generalAction } from '../application/useApplication' // Import the generalAction utility

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
				set({ isLogged: true })
				return response
			},
			'Sign-up successful! Welcome to our platform.', // Custom success message
			'Sign-up failed. Please try again.', // Custom error message
		)
	},

	signInAction: async (userSignInForm: SignInFormDto) => {
		return generalAction(
			async () => {
				const response = await signIn(userSignInForm)
				set({ isLogged: true })
				return response
			},
			'Sign-in successful! Welcome back.', // Custom success message
			'Sign-in failed. Please check your credentials and try again.', // Custom error message
		)
	},

	checkJwtAuthAction: async (token: string) => {
		return generalAction(
			async () => {
				const response = await checkAuth(token)
				set({ isLogged: true })
				return response
			},
			'Authentication successful!', // Custom success message for token verification
			'Authentication failed. Please log in again.', // Custom error message for token verification failure
		)
	},
	setTempTokenAction: (token: string) => set({ tempToken: token }),
}))
