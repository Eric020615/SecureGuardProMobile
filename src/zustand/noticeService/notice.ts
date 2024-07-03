import { create } from "zustand"
import { getNotices } from "../../api/noticeService/noticeService";

const application = (set, get) => ({
    getNotice: async () => {
        try {
            const response = await getNotices();
            return response;
        } catch (error) {
            console.log(error);
        }
    }
})

export const useNotice = create(application)