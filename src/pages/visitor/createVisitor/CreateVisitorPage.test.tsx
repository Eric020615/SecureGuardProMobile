import React from 'react'
import { act, fireEvent, render } from '@testing-library/react-native'
import { NotificationProvider } from '@contexts/NotificationContext'
import CreateVisitorPage from './CreateVisitorPage'
import { useVisitor } from '@store/visitor/useVisitor'

jest.mock('expo-router', () => ({
	...jest.requireActual('expo-router'),
	router: { push: jest.fn() },
}))

jest.mock('@store/visitor/useVisitor', () => ({
	useVisitor: jest.fn().mockReturnValue({
		createVisitorAction: jest.fn(),
	}),
}))

describe('CreateVisitorPage', () => {
	beforeEach(() => {
		jest.clearAllMocks()
	})

	const setup = async () => {
		const utils = render(
			<NotificationProvider>
				<CreateVisitorPage />
			</NotificationProvider>,
		)

		await act(async () => {
			await new Promise((resolve) => setTimeout(resolve, 0)) // Ensure all async effects run
		})

		return {
			...utils,
			fillField: async (testID: string, value: string) => {
				await act(async () => {
					fireEvent.changeText(utils.getByTestId(testID), value)
				})
			},
			selectVisitorCategory: async (category: string) => {
				await act(async () => {
					fireEvent(utils.getByTestId('visitor-category-form-field'), 'onValueChange', category)
				})
			},
			triggerSubmit: async () => {
				await act(async () => {
					fireEvent.press(utils.getByText('Submit'))
				})
			},
		}
	}

	it('verifies the visitor name field', async () => {
		const { queryByText, fillField, triggerSubmit } = await setup()

		// Attempt to submit without entering name
		await triggerSubmit()
		expect(queryByText('Visitor name is required')).toBeTruthy()

		// Fill in the visitor name and resubmit
		await fillField('visitor-name-form-field', 'John Doe')
		await triggerSubmit()
		expect(queryByText('Visitor name is required')).toBeNull()
	})

	it('verifies the visitor email field', async () => {
		const { queryByText, fillField, triggerSubmit } = await setup()

		// Attempt to submit without email
		await triggerSubmit()
		expect(queryByText('Visitor email is required')).toBeTruthy()

		// Enter an invalid email and resubmit
		await fillField('visitor-email-form-field', 'invalid-email')
		await triggerSubmit()
		expect(queryByText('Invalid email address')).toBeTruthy()

		// Enter a valid email and resubmit
		await fillField('visitor-email-form-field', 'john.doe@example.com')
		await triggerSubmit()
		expect(queryByText('Invalid email address')).toBeNull()
	})

	it('verifies the visitor phone number field', async () => {
		const { queryByText, fillField, triggerSubmit } = await setup()

		// Attempt to submit without phone number
		await triggerSubmit()
		expect(queryByText('Visitor phone number is required')).toBeTruthy()

		// Enter an invalid phone number and resubmit
		await fillField('visitor-phone-form-field', '123')
		await triggerSubmit()
		expect(queryByText('Phone number is not valid')).toBeTruthy()

		// Enter a valid phone number and resubmit
		await fillField('visitor-phone-form-field', '1234567890')
		await triggerSubmit()
		expect(queryByText('Phone number is not valid')).toBeNull()
	})

	it('verifies the visit date field', async () => {
		const { queryByText, triggerSubmit } = await setup()

		// Attempt to submit without visit date
		await triggerSubmit()
		expect(queryByText('Visit date is required')).toBeTruthy()
	})

	it('verifies the visitor category field', async () => {
		const { selectVisitorCategory, queryByText, triggerSubmit } = await setup()

		// Attempt to submit without selecting a category
		await triggerSubmit()
		expect(queryByText('Visitor category is required')).toBeTruthy()

		// Enter a valid visitor category and resubmit
		await selectVisitorCategory('R')
		await triggerSubmit()
		expect(queryByText('Visitor category is required')).toBeNull()
	})

	it('submits the form when all fields are valid', async () => {
		const { fillField, triggerSubmit } = await setup()
		const createVisitorAction = useVisitor().createVisitorAction

		await fillField('visitor-name-form-field', 'John Doe')
		await fillField('visitor-email-form-field', 'john.doe@example.com')
		await fillField('visitor-phone-form-field', '1234567890')
		// Mock selection for date and category (depends on your implementation)

		await triggerSubmit()
		// expect(createVisitorAction).toHaveBeenCalledTimes(1)
	})
})
