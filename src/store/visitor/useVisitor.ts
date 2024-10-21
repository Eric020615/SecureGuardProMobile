import { create } from 'zustand'
import {
	createVisitor,
	editVisitorById,
	getVisitorDetailsById,
	getVisitors,
} from '@api/visitorService/visitorService'
import { CreateVisitorDto, EditVisitorByIdDto, GetVisitorDto } from '@dtos/visitor/visitor.dto'
import { generalAction } from '@store/application/useApplication' // Import generalAction

interface State {
	visitors: GetVisitorDto[]
	visitorDetails: GetVisitorDto
	id: number
	totalVisitors: number
}

interface Actions {
	createVisitorAction: (createVisitorDto: CreateVisitorDto) => Promise<any>
	editVisitorByIdAction: (
		editVisitorByIdDto: EditVisitorByIdDto,
		visitorGuid: string,
	) => Promise<any>
	getVisitorsAction: (isPast: boolean, limit: number) => Promise<any>
	resetVisitorAction: () => void
	getVisitorDetailsByIdAction: (visitorGuid: string) => Promise<any>
}

export const useVisitor = create<State & Actions>((set, get) => ({
	visitors: [],
	visitorDetails: {} as GetVisitorDto,
	id: 0,
	totalVisitors: 0,
	createVisitorAction: async (createVisitorDto: CreateVisitorDto) => {
		return generalAction(
			async () => {
				const response = await createVisitor(createVisitorDto)
				if(!response?.success){
					throw new Error(response.msg)
				}
				return response
			},
			'Visitor created successfully!',
			'Failed to create visitor. Please try again.',
		)
	},
	editVisitorByIdAction: async (editVisitorByIdDto: EditVisitorByIdDto, visitorGuid: string) => {
		return generalAction(
			async () => {
				const response = await editVisitorById(editVisitorByIdDto, visitorGuid)
				if(!response?.success){
					throw new Error(response.msg)
				}
				return response
			},
			'Visitor updated successfully!',
			'Failed to update visitor. Please try again.',
		)
	},

	getVisitorsAction: async (isPast: boolean, limit: number) => {
		return generalAction(
			async () => {
				const { id } = get()
				const response = await getVisitors(isPast, id, limit)
				if(!response?.success){
					throw new Error(response.msg)
				}
				set((state) => ({
					visitors: [...state.visitors, ...response.data.list],
					id: response.data.list.length > 0 ? response.data.list[response.data.list.length - 1]?.visitorId : 0,
					totalVisitors: response.data.count
				}))
				return response
			},
			'',
			'Failed to retrieve visitors.',
		)
	},

	resetVisitorAction() {
		set({ visitors: [], id: 0, totalVisitors: 0 })
	},

	getVisitorDetailsByIdAction: async (visitorGuid: string) => {
		return generalAction(
			async () => {
				const response = await getVisitorDetailsById(visitorGuid)
				if(!response?.success){
					throw new Error(response.msg)
				}
				set({ visitorDetails: response.data })
				return response
			},
			'',
			'Failed to retrieve visitor details.',
		)
	},
}))
