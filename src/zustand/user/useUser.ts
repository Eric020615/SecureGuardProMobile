import { create } from "zustand"
import { UserInformationFormDto } from "../types"
import { createUser } from "@api/userService/userService";

interface userState {
    isLoading: boolean;
    error: string | null;
    createUserAction: (IUserInformationFormDto: UserInformationFormDto, tempToken: string) => Promise<any>;
    setLoading: (isLoading: boolean) => void;
    setError: (error: string | null) => void;
}

export const useUser = create<userState>((set) => ({
    isLoading: false,
    error: null,
    setLoading: (isLoading) => set({ isLoading }),
    setError: (error) => set({ error }),
    createUserAction: async (IUserInformationFormDto: UserInformationFormDto, tempToken: string) => {
        try {
            set({ isLoading: true, error: null });
            const response = await createUser(IUserInformationFormDto, tempToken);
            return response;
        } catch (error) {
            console.log(error);
            set({ error: error.msg });
        } finally {
            set({ isLoading: false })
        }
    }
}))