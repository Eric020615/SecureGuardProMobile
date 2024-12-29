import React from 'react'
import { act, fireEvent, render } from '@testing-library/react-native'
import { NotificationProvider } from '@contexts/NotificationContext'
import ParcelListPage from './ParcelListPage'
import { deleteParcelById, getParcels } from '@api/parcelService/parcelService'

jest.mock('expo-router', () => ({
	...jest.requireActual('expo-router'),
	router: {
		...jest.requireActual('expo-router').router,
		push: jest.fn(),
	},
}))

jest.mock('@api/parcelService/parcelService', () => ({
	...jest.requireActual('@api/parcelService/parcelService'),
	getParcels: jest.fn().mockResolvedValue({
		success: true,
		msg: 'Parcels retrieved successfully',
		data: {
			list: [
				{
					parcelGuid: 'parcel-guid-001',
					floor: '2nd',
					unit: 'B2-01',
					createdDateTime: '2025-01-01T09:00:00Z',
					parcelImage: {
						fileUrl: 'https://example.com/image1.jpg',
					},
				},
				{
					parcelGuid: 'parcel-guid-002',
					floor: '3rd',
					unit: 'B3-02',
					createdDateTime: '2025-01-02T15:00:00Z',
					parcelImage: null,
				},
			],
			count: 2,
		},
	}),
	deleteParcelById: jest.fn().mockResolvedValue({
		success: true,
		msg: 'Parcel successfully deleted!',
		data: null,
	}),
}))

jest.mock('react', () => ({
	...jest.requireActual('react'),
	useState: jest.fn().mockReturnValue([true, jest.fn()]),
}))

describe('ParcelListPage', () => {
	beforeEach(() => {
		jest.clearAllMocks()
	})

	const setup = async () => {
		const utils = render(
			<NotificationProvider>
				<ParcelListPage />
			</NotificationProvider>,
		)

		await act(async () => {
			await new Promise((resolve) => setTimeout(resolve, 0)) // Simulate async effects
		})

		return {
			...utils,
			triggerRefresh: async () => {
				await act(async () => {
					fireEvent(utils.getByTestId('flat-list'), 'onRefresh')
				})
			},
			triggerDeleteParcel: async (index: number) => {
				await act(async () => {
					fireEvent.press(utils.getByTestId(`menu-${index}`))
					fireEvent.press(utils.findByText(`delete-button-${index}`))
				})
			},
			triggerDeleteConfirm: async () => {
				await act(async () => {
					fireEvent.press(utils.getByTestId('delete-confirm-button'))
				})
			},
		}
	}

	it('verifies fetch parcels on initial load', async () => {
		await setup()
		await act(async () => {
			expect(getParcels).toHaveBeenCalledWith(0, 10)
		})
	})

	it('verifies refresh functionality', async () => {
		const { triggerRefresh } = await setup()
		await triggerRefresh()
		await act(async () => {
			expect(getParcels).toHaveBeenCalledTimes(2) // Initial load + refresh
		})
	})

	it('verifies parcel deletion', async () => {
		const { getByText, findByText, triggerDeleteParcel, triggerDeleteConfirm } = await setup()
		React.useState = jest.fn().mockReturnValue([true, { open: true }])
		await triggerDeleteParcel(0)
		await triggerDeleteConfirm()
		await act(async () => {
			expect(deleteParcelById).toHaveBeenCalledTimes(1)
			expect(getByText('Parcel deleted successfully.')).toBeTruthy()
		})
	})
})
