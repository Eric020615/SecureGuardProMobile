import React from 'react'
import { act, render } from '@testing-library/react-native'
import { NotificationProvider } from '@contexts/NotificationContext'
import VisitorDetailsPage from './VisitorDetailsPage'
import { GetVisitorDetailsDto } from '@dtos/visitor/visitor.dto'

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

jest.mock('react-native-share', () => ({}))

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
		}
	}

	it('should render visitor details', async () => {
		const { getByText } = await setup()
		expect(getByText('John Doe')).toBeDefined()
	})
})
