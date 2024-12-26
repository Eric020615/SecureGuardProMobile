import React from 'react'
import { act, fireEvent, render } from '@testing-library/react-native'
import { NotificationProvider } from '@contexts/NotificationContext'
import VisitorDetailsPage from './VisitorDetailsPage'
import { GetVisitorDetailsDto } from '@dtos/visitor/visitor.dto'
import Share from 'react-native-share'
import { convertDateStringToFormattedString } from '@helpers/time'
import { ITimeFormat } from '@config/constant'

jest.mock('@api/visitorService/visitorService', () => ({
	...jest.requireActual('@api/visitorService/visitorService'),
	getVisitorDetailsById: jest.fn().mockReturnValue({
		success: true,
		msg: 'Visitor details retrieve successfully!',
		data: {
			visitorId: 1,
			visitorGuid: 'abc123-guid-visitor',
			visitorName: 'John Doe',
			visitorEmail: 'johndoe@example.com',
			visitorCategory: 'F', // Key of VisitorCategoryDescriptionEnum
			visitorContactNumber: '1234567890',
			visitDateTime: '2025-01-01T10:00:00Z', // ISO date string
			token: 'mock-token-123',
			status: 'ACTIVE', // Key of DocumentStatusDescriptionEnum
			createdBy: 'admin',
			updatedBy: 'manager',
			createdDateTime: '2024-12-01T09:00:00Z', // ISO date string
			updatedDateTime: '2024-12-05T15:30:00Z',
		} as GetVisitorDetailsDto,
	}),
}))

jest.mock('expo-router', () => ({
	...jest.requireActual('expo-router'), // Retain other functionalities of expo-router
	useLocalSearchParams: jest.fn().mockReturnValue({
		id: '1',
	}),
}))

jest.mock('react-native-share', () => ({
	open: jest.fn().mockResolvedValue({}),
}))

describe('VisitorDetailsPage', () => {
	beforeEach(() => {
		jest.clearAllMocks()
	})

	const setup = async () => {
		const utils = render(
			<NotificationProvider>
				<VisitorDetailsPage />
			</NotificationProvider>,
		)

		await act(async () => {
			await new Promise((resolve) => setTimeout(resolve, 0))
		})

		return {
			...utils,
			triggerShare: async () => {
				await act(async () => {
					fireEvent.press(utils.getByTestId('share-button'))
				})
			},
		}
	}

	it('verified share button', async () => {
		const { triggerShare } = await setup()
		triggerShare()
		const shareOptions = {
			title: 'Share via',
			message: `Visitor Details: \n\n👤 Name: John Doe
			\n📅 Visit Date: ${
				convertDateStringToFormattedString('2025-01-01T10:00:00Z', ITimeFormat.dateTime)
			}\n\n🔗 View Details: ${process.env.EXPO_PUBLIC_WEB_URL}/visitor/access-pass/?token=mock-token-123`,
		}
		await act(async () => {
			expect(Share.open).toHaveBeenCalledTimes(1)
			expect(Share.open).toHaveBeenCalledWith(shareOptions)
		})
	})
})
