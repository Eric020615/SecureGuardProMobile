import { create } from "zustand"
import { SignInFormDto, UserSignUpFormDto } from "../types"
import { checkAuth, signIn, signUp } from "@api/authService/authService"

interface authenticationState {
    isLoading: boolean;
    error: string | null;
    isLogged: boolean;
    setIsLogged: (value: boolean) => void;
    signUpAction: (userSignUpForm: UserSignUpFormDto) => Promise<any>;
    signInAction: (userSignInForm: SignInFormDto) => Promise<any>;
    checkJwtAuthAction: (token: string) => Promise<any>;
    setLoading: (isLoading: boolean) => void;
    setError: (error: string | null) => void;
}

export const useAuth = create<authenticationState>((set) => ({
    isLoading: false,
    error: null,
    setLoading: (isLoading) => set({ isLoading }),
    setError: (error) => set({ error }),
    isLogged: false,
    setIsLogged: (isLogged) => set({ isLogged }),
    signUpAction: async (userSignUpForm: UserSignUpFormDto) => {
        try {
            set({ isLoading: true, error: null });
            const response = await signUp(userSignUpForm);
            return response;
        } catch (error) {
            set({ error: error.msg });
        } finally {
            set({ isLoading: false })
        }
    },
    signInAction: async (userSignInForm: SignInFormDto) => {
        try {
            set({ isLoading: true, error: null });
            const response = await signIn(userSignInForm);
            return response;
        } catch (error) {
            console.log(error)
            set({ error: error.msg });
        } finally {
            set({ isLoading: false })
        }
    },
    checkJwtAuthAction: async (token: string) => {
        try {
            const response = await checkAuth(token);
            return response;
        } catch (error) {
            console.log(error)
            set({ error: error.msg });
        } finally {
            set({ isLoading: false })
        }
    }
}));