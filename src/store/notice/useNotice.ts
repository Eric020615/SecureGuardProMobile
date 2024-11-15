import { create } from 'zustand'
import { generalAction } from '@store/application/useApplication' // Import generalAction
import { GetNoticeDetailsDto, GetNoticeDto } from '@dtos/notice/notice.dto'
import { getNoticeDetailsById, getNoticeList } from '@api/noticeService/noticeService'

interface State {
	noticeDetails: GetNoticeDetailsDto
	notices: GetNoticeDto[]
	id: number
	totalNotices: number
}

interface Actions {
	getNoticeDetailsByIdAction: (id: string) => Promise<any>
	getNoticesAction: (limit: number) => Promise<any>
	resetNoticeAction: () => void
}

export const useNotice = create<State & Actions>((set, get) => ({
	noticeDetails: {} as GetNoticeDetailsDto,
	notices: [],
	id: 0,
	totalNotices: 0,
	getNoticeDetailsByIdAction: async (id: string) => {
		return generalAction(
			async () => {
				const response = await getNoticeDetailsById(id)
				if (!response?.success) {
					throw new Error(response.msg)
				}
				set({ noticeDetails: response.data })
				return response
			},
			'',
			'Failed to retrieve notice. Please try again.',
		)
	},
	getNoticesAction: async (limit: number) => {
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
