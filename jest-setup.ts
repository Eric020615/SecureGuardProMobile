import '@testing-library/react-native/extend-expect'

jest.mock('@react-native-async-storage/async-storage', () =>
	require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
)

jest.mock('expo-notifications', () => ({
	addNotificationReceivedListener: jest.fn(() => ({ remove: jest.fn() })),
	addNotificationResponseReceivedListener: jest.fn(() => ({ remove: jest.fn() })),
	removeNotificationSubscription: jest.fn(),
}))

jest.mock('@helpers/notification', () => ({
	registerForPushNotificationsAsync: jest.fn(() => Promise.resolve('mock-token')),
}))

jest.mock('react-native-document-picker', () => ({
	pick: jest.fn(),
	isCancel: jest.fn(() => false),
}))

jest.mock('./node_modules/react-native-date-picker/src/modules', () => {
	return {
		getNativeModule: () => ({
			openPicker: jest.fn(), // Mock openPicker
			closePicker: jest.fn(), // Mock closePicker
		}),
		// Mock the getNativeComponent function to return a mock component
		getNativeComponent: jest.fn(() => {}),
	}
})

// jest.setup.ts
beforeAll(() => {
	const originalWarn = console.warn
	console.warn = (...args: any[]) => {
		if (
			args[0] &&
			typeof args[0] === 'string' &&
			args[0].includes('new NativeEventEmitter() was called with a non-null argument without the required `removeListeners` method')
		) {
			return // Ignore the specific warning
		}
		// originalWarn(...args) // Call the original warn method for other warnings
	}
})
