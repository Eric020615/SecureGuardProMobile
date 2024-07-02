import { create } from "zustand"
import { SignInFormDto, UserSignUpFormDto } from "../types"
import { checkAuth, signIn, signUp } from "../../api/authService/authService"

const application = (set, get) => ({
    signUp: async (userSignUpForm: UserSignUpFormDto) => {
        try {
            const response = await signUp(userSignUpForm);
            return response;
        } catch (error) {
            console.log(error);
        }
    },
    signIn: async (userSignInForm: SignInFormDto) => {
        try {
            const response = await signIn(userSignInForm);
            return response;
        } catch (error) {
            console.log(error)
        }
    },
    checkJwtAuth: async (token: string) => {
        try {
            const response = await checkAuth(token);
            return response;
        } catch (error) {
            console.log(error)
        }
    }
})

export const useAuth = create(application)