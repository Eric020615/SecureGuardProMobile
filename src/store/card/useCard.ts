import { create } from 'zustand'
import { generalAction } from '@store/application/useApplication' // Import the generalAction utility
import { createUserCard, getQrCode, getUserCard } from '@api/cardService/cardService'
import { IResponse } from '@api/globalHandler'
import { GetCardByUserDto } from '@dtos/card/card.dto'
import AsyncStorage from '@react-native-async-storage/async-storage'

interface State {
	card: GetCardByUserDto
	qrCode: string
}

interface Actions {
	createCardAction: () => Promise<IResponse<any>>
	getCardAction: () => Promise<IResponse<GetCardByUserDto>>
	getQrCodeAction: () => Promise<any>
}

export const useCard = create<State & Actions>((set) => ({
	card: {} as GetCardByUserDto,
	qrCode: '',
	createCardAction: async () => {
		return generalAction(
			async () => {
				const response = await createUserCard()
				if (!response?.success) {
					throw new Error(response.msg)
				}
				return response
			},
			'Card created successfully.', // Custom success message
			'Card creation failed. Please try again.', // Custom error message
		)
	},
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
			'', // Custom success message
			'Qr code generated failed. Please try again.', // Custom error message
		)
	},
	getCardAction: async () => {
		return generalAction(
			async () => {
				const response = await getUserCard()
				if (!response?.success) {
					throw new Error(response.msg)
				}
				await AsyncStorage.setItem('card', response.data.badgeNumber)
				set({ card: response.data })
				return response
			},
			'', // Custom success message
			'Card fetch failed. Please try again.', // Custom error message
		)
	},
}))
