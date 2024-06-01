import { create } from "zustand"
import { UserSignUpForm } from "../types"
import { signUp } from "../../api/authService/authService"

const application = (set, get) => ({
    signUp: async (userSignUpForm: UserSignUpForm) => {
        try {
            const response = await signUp(userSignUpForm);
            return response;
        } catch (error) {
            console.log(error);
        }
    }
})

export const useAuth = create(application)