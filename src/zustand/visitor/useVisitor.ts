import { create } from "zustand"
import { getNotices } from "@api/noticeService/noticeService";
import { CreateVisitorDto } from "@zustand/types";
import { createVisitor, getVisitorDetailsById, getVisitors } from "@api/visitorService/visitorService";

interface visitorState {
    isLoading: boolean;
    error: string | null;
    createVisitor: (createVisitorDto: CreateVisitorDto) => Promise<any>;
    getVisitorsAction: (isPast: boolean) => Promise<any>;
    getVisitorDetailsByIdAction: (id: string) => Promise<any>;
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
    getVisitorsAction: async (isPast: boolean) => {
        try {
            set({ isLoading: true, error: null });
            const response = await getVisitors(isPast);
            return response;
        } catch (error) {
            console.log(error);
            set({ error: error.msg });
        } finally {
            set({ isLoading: false })
        }
    },
    getVisitorDetailsByIdAction: async (id: string) => {
        try {
            set({ isLoading: true, error: null });
            const response = await getVisitorDetailsById(id);
            return response;
        } catch (error) {
            console.log(error);
            set({ error: error.msg });
        } finally {
            set({ isLoading: false })
        }
    }
}))