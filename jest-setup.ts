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

console.log('jest-setup.ts is executed!')
