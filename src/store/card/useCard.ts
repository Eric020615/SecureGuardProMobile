import { create } from 'zustand'
import { generalAction } from '@store/application/useApplication' // Import the generalAction utility
import { getQrCode } from '@api/cardService/cardService'

interface State {
    qrCode: string
}

interface Actions {
	getQrCodeAction: () => Promise<any>
}

export const useQrCode = create<State & Actions>((set) => ({
    qrCode: '',
	getQrCodeAction: async () => {
		return generalAction(
			async () => {
				const response = await getQrCode()
				if (!response?.success) {
					throw new Error(response.msg)
				}
				set({ qrCode: response.data.data })
				return response
			},
			'Qr code generated successfully.', // Custom success message
			'Qr code generated failed. Please try again.', // Custom error message
		)
	},
}))
