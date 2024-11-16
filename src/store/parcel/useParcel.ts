import { create } from 'zustand'
import { getParcelDetailsById, getParcels } from '@api/parcelService/parcelService'
import { generalAction } from '@store/application/useApplication'
import { GetParcelDetailsDto, GetParcelDto } from '@dtos/parcel/parcel.dto'

interface State {
	parcelDetails: GetParcelDetailsDto
	parcels: GetParcelDto[]
	id: number
	totalParcels: number
}

interface Actions {
	getParcelsAction: (limit: number) => Promise<any>
	resetParcelAction: () => void
	getParcelDetailsByIdAction: (id: string) => Promise<any>
}

export const useParcel = create<State & Actions>((set, get) => ({
	parcelDetails: {} as GetParcelDetailsDto,
	parcels: [],
	id: 0,
	totalParcels: 0,
	getParcelsAction: async (limit: number) => {
		return generalAction(
			async () => {
				const { id } = get()
				const response = await getParcels(id, limit)
				if (!response?.success) {
					throw new Error(response.msg)
				}
				set((state) => ({
					parcels: [...state.parcels, ...response.data.list],
					id: response.data.list.length > 0 ? response.data.list[response.data.list.length - 1]?.parcelId : 0,
					totalParcels: response.data.count,
				}))
				return response
			},
			'',
			'Failed to retrieve Parcels. Please try again.',
		)
	},
	resetParcelAction() {
		set({ parcels: [], id: 0, totalParcels: 0 })
	},
	getParcelDetailsByIdAction: async (id: string) => {
		return generalAction(
			async () => {
				const response = await getParcelDetailsById(id)
				if (!response) {
					throw new Error(response.msg)
				}
				set({ parcelDetails: response.data })
				return response
			},
			'',
			'Failed to retrieve Parcel details. Please try again.',
		)
	},
}))
