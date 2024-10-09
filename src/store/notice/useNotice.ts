import { create } from 'zustand'
import { getNotices } from '@api/noticeService/noticeService'
import { generalAction } from '@store/application/useApplication' // Import generalAction
import { GetNoticeDto } from '@dtos/notice/notice.dto'

interface State {
	notices: GetNoticeDto[]
	totalNotices: number
}

interface Actions {
	getNoticeAction: (page: number, limit: number) => Promise<any>
	resetNotice: () => void
}

export const useNotice = create<State & Actions>((set) => ({
	notices: [],
	totalNotices: 0,
	getNoticeAction: async (page: number, limit: number) => {
		return generalAction(
			async () => {
				const response = await getNotices(page, limit)
				if(!response.success){
					throw new Error(response.msg)
				}
				set((state) => ({
					notices: [...state.notices, ...response.data.list],
				}))
				set({ totalNotices: response.data.count })
			},
			'',
			'Failed to retrieve notices. Please try again.',
		)
	},
	resetNotice() {
		set({ notices: [], totalNotices: 0 })
	},
}))
