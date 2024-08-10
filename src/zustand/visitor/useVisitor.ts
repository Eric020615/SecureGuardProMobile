import { create } from "zustand"
import { getNotices } from "@api/noticeService/noticeService";
import { CreateVisitorDto } from "@zustand/types";
import { createVisitor, getVisitorById } from "@api/visitorService/visitorService";

interface visitorState {
    isLoading: boolean;
    error: string | null;
    createVisitor: (createVisitorDto: CreateVisitorDto) => Promise<any>;
    getVisitorByIdAction: (isPast: boolean) => Promise<any>;
    setLoading: (isLoading: boolean) => void;
    setError: (error: string | null) => void;
}

export const useVisitor = create<visitorState>((set) => ({
    isLoading: false,
    error: null,
    setLoading: (isLoading) => set({ isLoading }),
    setError: (error) => set({ error }),
    createVisitor: async (createVisitorDto: CreateVisitorDto) => {
        try {
            set({ isLoading: true, error: null });
            const response = await createVisitor(createVisitorDto);
            return response;
        } catch (error) {
            console.log(error);
            set({ error: error.msg });
        } finally {
            set({ isLoading: false })
        }
    },
    getVisitorByIdAction: async (isPast: boolean) => {
        try {
            set({ isLoading: true, error: null });
            const response = await getVisitorById(isPast);
            return response;
        } catch (error) {
            console.log(error);
            set({ error: error.msg });
        } finally {
            set({ isLoading: false })
        }
    }
}))