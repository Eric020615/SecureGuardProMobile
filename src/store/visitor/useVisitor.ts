import { create } from 'zustand'
import {
	createVisitor,
	editVisitorById,
	getVisitorDetailsById,
	getVisitors,
} from '@api/visitorService/visitorService'
import { CreateVisitorDto, EditVisitorByIdDto, GetVisitorDto } from '../../dtos/visitor/visitor.dto'
import { generalAction } from '../application/useApplication' // Import generalAction

interface State {
	visitors: GetVisitorDto[]
	visitorDetails: GetVisitorDto
	totalVisitors: number
}

interface Actions {
	createVisitorAction: (createVisitorDto: CreateVisitorDto) => Promise<any>
	editVisitorByIdAction: (
		editVisitorByIdDto: EditVisitorByIdDto,
		visitorGuid: string,
	) => Promise<any>
	getVisitorsAction: (isPast: boolean, page: number, limit: number) => Promise<any>
	resetVisitorAction: () => void
	getVisitorDetailsByIdAction: (visitorGuid: string) => Promise<any>
}

export const useVisitor = create<State & Actions>((set) => ({
	visitors: [],
	visitorDetails: {} as GetVisitorDto,
	totalVisitors: 0,
	createVisitorAction: async (createVisitorDto: CreateVisitorDto) => {
		return generalAction(
			async () => {
				const response = await createVisitor(createVisitorDto)
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
				return response
			},
			'Visitor updated successfully!',
			'Failed to update visitor. Please try again.',
		)
	},

	getVisitorsAction: async (isPast: boolean, page: number, limit: number) => {
		return generalAction(
			async () => {
				const response = await getVisitors(isPast, page, limit)
				set((state) => ({
					visitors: [...state.visitors, ...response.data.list],
				}))
				set({ totalVisitors: response.data.count })
				return response
			},
			'',
			'Failed to retrieve visitors.',
		)
	},

	resetVisitorAction() {
		set({ visitors: [], totalVisitors: 0 })
	},

	getVisitorDetailsByIdAction: async (visitorGuid: string) => {
		return generalAction(
			async () => {
				const response = await getVisitorDetailsById(visitorGuid)
				set({ visitorDetails: response.data })
				return response
			},
			'',
			'Failed to retrieve visitor details.',
		)
	},
}))
