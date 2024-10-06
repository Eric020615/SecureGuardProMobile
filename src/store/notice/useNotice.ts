import { create } from 'zustand'
import { getNotices } from '@api/noticeService/noticeService'
import { getNoticeDto } from '../types'
import { generalAction } from '../application/useApplication' // Import generalAction

interface State {
	notices: getNoticeDto[]
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
				set((state) => ({
					notices: [...state.notices, ...response.data.list],
				}))
				set({ totalNotices: response.data.count })
			},
			'Notices retrieved successfully!',
			'Failed to retrieve notices. Please try again.',
		)
	},
	resetNotice() {
		set({ notices: [], totalNotices: 0 })
	},
}))
