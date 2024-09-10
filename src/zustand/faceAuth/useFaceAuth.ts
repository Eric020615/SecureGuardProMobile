import { create } from "zustand"
import { CreateUserFaceAuthDto } from "../types"
import { uploadUserFaceAuth } from "@api/faceAuthService/faceAuthService";

interface faceAuthState {
    error: string | null;
    uploadUserFaceAuthAction: (createUserFaceAuthDto: CreateUserFaceAuthDto) => Promise<any>;
    setError: (error: string | null) => void;
}

export const useFaceAuth = create<faceAuthState>((set) => ({
    error: null,
    setError: (error) => set({ error }),
    uploadUserFaceAuthAction: async (createUserFaceAuthDto: CreateUserFaceAuthDto) => {
        try {
            set({ error: null });
            const response = await uploadUserFaceAuth(createUserFaceAuthDto);
            return response;
        } catch (error) {
            console.log(error);
            set({ error: error.msg });
        }
    }
}))