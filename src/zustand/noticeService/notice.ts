import { create } from "zustand"
import { getNotices } from "../../api/noticeService/noticeService";

interface noticeState {
    isLoading: boolean;
    error: string | null;
    getNotice: () => Promise<any>;
    setLoading: (isLoading: boolean) => void;
    setError: (error: string | null) => void;
}

export const useNotice = create<noticeState>((set) => ({
    isLoading: false,
    error: null,
    setLoading: (isLoading) => set({ isLoading }),
    setError: (error) => set({ error }),
    getNotice: async () => {
        try {
            set({ isLoading: true, error: null });
            const response = await getNotices();
            return response;
        } catch (error) {
            console.log(error);
            set({ error: error.msg });
        } finally {
            set({ isLoading: false })
        }
    }
}))