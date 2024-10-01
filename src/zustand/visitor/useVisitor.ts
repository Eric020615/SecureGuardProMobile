import { create } from 'zustand'
import { CreateVisitorDto, EditVisitorByIdDto } from '@zustand/types'
import {
	createVisitor,
    editVisitorById,
	getVisitorDetailsById,
	getVisitors,
} from '@api/visitorService/visitorService'

interface visitorState {
	isLoading: boolean
	error: string | null
	createVisitor: (createVisitorDto: CreateVisitorDto) => Promise<any>
	editVisitorByIdAction: (EditVisitorByIdDto: EditVisitorByIdDto, visitorGuid: string) => Promise<any>
	getVisitorsAction: (isPast: boolean) => Promise<any>
	getVisitorDetailsByIdAction: (visitorGuid: string) => Promise<any>
	setLoading: (isLoading: boolean) => void
	setError: (error: string | null) => void
}

export const useVisitor = create<visitorState>((set) => ({
	isLoading: false,
	error: null,
	setLoading: (isLoading) => set({ isLoading }),
	setError: (error) => set({ error }),
	createVisitor: async (createVisitorDto: CreateVisitorDto) => {
		try {
			set({ isLoading: true, error: null })
			const response = await createVisitor(createVisitorDto)
			return response
		} catch (error) {
			console.log(error)
			set({ error: error.msg })
		} finally {
			set({ isLoading: false })
		}
	},
	editVisitorByIdAction: async (editVisitorByIdDto: EditVisitorByIdDto, visitorGuid: string) => {
        try {
			set({ isLoading: true, error: null })
			const response = await editVisitorById(editVisitorByIdDto, visitorGuid)
			return response
		} catch (error) {
			set({ error: error.msg })
		} finally {
			set({ isLoading: false })
		}
    },
	getVisitorsAction: async (isPast: boolean) => {
		try {
			set({ isLoading: true, error: null })
			const response = await getVisitors(isPast)
			return response
		} catch (error) {
			console.log(error)
			set({ error: error.msg })
		} finally {
			set({ isLoading: false })
		}
	},
	getVisitorDetailsByIdAction: async (visitorGuid: string) => {
		try {
			set({ isLoading: true, error: null })
			const response = await getVisitorDetailsById(visitorGuid)
			return response
		} catch (error) {
			console.log(error)
			set({ error: error.msg })
		} finally {
			set({ isLoading: false })
		}
	},
}))
