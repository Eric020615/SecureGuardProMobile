import { create } from "zustand"
import { SignInForm, UserSignUpForm } from "../types"
import { checkAuth, signIn, signUp } from "../../api/authService/authService"

const application = (set, get) => ({
    signUp: async (userSignUpForm: UserSignUpForm) => {
        try {
            const response = await signUp(userSignUpForm);
            return response;
        } catch (error) {
            console.log(error);
        }
    },
    signIn: async (userSignInForm: SignInForm) => {
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