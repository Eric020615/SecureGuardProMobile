import { create } from 'zustand'
import { generalAction } from '@store/application/useApplication' // Import generalAction
import { GetNoticeDto } from '@dtos/notice/notice.dto'
import { getNoticeList } from '@api/noticeService/noticeService'

interface State {
	notices: GetNoticeDto[]
	id: number
	totalNotices: number
}

interface Actions {
	getNoticeAction: (limit: number) => Promise<any>
	resetNoticeAction: () => void
}

export const useNotice = create<State & Actions>((set, get) => ({
	notices: [],
	id: 0,
	totalNotices: 0,
	getNoticeAction: async (limit: number) => {
		return generalAction(
			async () => {
				const { id } = get()
				const response = await getNoticeList(id, limit)
				if (!response?.success) {
					throw new Error(response.msg)
				}
				set((state) => ({
					notices: [...state.notices, ...response.data.list],
					id: response.data.list.length > 0 ? response.data.list[response.data.list.length - 1]?.noticeId : 0,
					totalNotices: response.data.count,
				}))
				return response
			},
			'',
			'Failed to retrieve notices. Please try again.',
		)
	},
	resetNoticeAction () {
		set({ notices: [], id: 0, totalNotices: 0 })
	},
}))
