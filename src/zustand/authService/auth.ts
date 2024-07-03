import { create } from "zustand"
import { SignInFormDto, UserSignUpFormDto } from "../types"
import { checkAuth, signIn, signUp } from "@api/authService/authService"

interface authenticationState {
    isLoading: boolean;
    error: string | null;
    signUp: (userSignUpForm: UserSignUpFormDto) => Promise<any>;
    signIn: (userSignInForm: SignInFormDto) => Promise<any>;
    checkJwtAuth: (token: string) => Promise<any>;
    setLoading: (isLoading: boolean) => void;
    setError: (error: string | null) => void;
}

export const useAuth = create<authenticationState>((set) => ({
    isLoading: false,
    error: null,
    setLoading: (isLoading) => set({ isLoading }),
    setError: (error) => set({ error }),
    signUp: async (userSignUpForm: UserSignUpFormDto) => {
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
    signIn: async (userSignInForm: SignInFormDto) => {
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
    checkJwtAuth: async (token: string) => {
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