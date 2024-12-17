import { create } from 'zustand'
import { generalAction } from '@store/application/useApplication'
import { GetPropertyDto } from '@dtos/refData/refData.dto'
import { getPropertyList } from '@api/refDataService/refDataService'

interface State {
	propertyList: GetPropertyDto[]
}

interface Actions {
    getPropertyListAction: () => Promise<any>
}

export const useRefData = create<State & Actions>((set) => ({
	propertyList: [],
	getPropertyListAction: async () => {
		return generalAction(
			async () => {
                const response = await getPropertyList()
                if (!response?.success) {
                    throw new Error(response.msg)
                }
                set({ propertyList: response.data })
				return response
			},
			'',
			'Failed to retrieve property list. Please try again.',
		)
	},
}))
