import { create } from "zustand"
import { SignInFormDto, UserSignUpFormDto } from "../types"
import { checkAuth, signIn, signUp } from "@api/authService/authService"
import { IResponse } from "@api/globalHandler";

interface authenticationState {
    isLoading: boolean;
    error: string | null;
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
    signUpAction: async (userSignUpForm: UserSignUpFormDto) => {
        try {
            set({ isLoading: true, error: null });
            const response = await signUp(userSignUpForm);
            return response;
        } catch (error) {
            console.log(error);
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
            set({ isLoading: true, error: null });
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