import React from 'react'
import { act, render, waitFor } from '@testing-library/react-native'
import { NotificationProvider } from '@contexts/NotificationContext'
import QrCodePage from '@pages/qr-code/QrCodePage'
import { getQrCode } from '@api/cardService/cardService'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useCard } from '@store/card/useCard'

jest.mock('@api/cardService/cardService', () => ({
	...jest.requireActual('@api/cardService/cardService'),
	getQrCode: jest.fn().mockReturnValue({
		success: true,
		msg: 'QR Code retrieve successfully!',
		data: {
			badgeNumber: 1,
			data: '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',
		},
	}),
}))

jest.mock('@store/card/useCard', () => {
	const originalModule = jest.requireActual('@store/card/useCard') // Retain the original implementation

	return {
		...originalModule, // Keep all the original exports
		useCard: originalModule.useCard, // Keep the original `useCard` store
	}
})

describe('QrCodePage', () => {
	const setup = async () => {
		const utils = render(
			<NotificationProvider>
				<QrCodePage />
			</NotificationProvider>,
		)

		await act(async () => {
			await new Promise((resolve) => setTimeout(resolve, 0)) // Simulate async effects
		})

		return {
			...utils,
		}
	}

	it('verify the no QR code', async () => {
		await waitFor(async () => {
			await AsyncStorage.setItem('card', null)
		})
		const { getByText } = await setup()
		await waitFor(() => {
			expect(getByText('No QR Code found for your account.')).toBeTruthy()
			expect(getByText('Please activate your badge to access with qr code.')).toBeTruthy()
		})
	})

	it('verify the QR code image', async () => {
		await act(async () => {
			await AsyncStorage.setItem('card', '1')
		})
		const { getByTestId } = await setup()
		await waitFor(() => {
			expect(getQrCode).toHaveBeenCalledTimes(1)
			const qrCodeImage = getByTestId('qr-code-image')
			expect(qrCodeImage).toBeTruthy()
		})
	})
})
