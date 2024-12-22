import React from 'react'
import { act, fireEvent, render } from '@testing-library/react-native'
import { NotificationProvider } from '@contexts/NotificationContext'
import FaceAuthPage from '@pages/face-auth/FaceAuthPage'
import { uploadUserFaceAuth } from '@api/cardService/cardService'

jest.mock('@api/cardService/cardService', () => ({
	...jest.requireActual('@api/cardService/cardService'),
	uploadUserFaceAuth: jest.fn().mockReturnValue({
		success: true,
		msg: 'Face Auth uploaded successfully!',
		data: null,
	}),
}))

jest.mock('@store/faceAuth/useFaceAuth', () => {
	const originalModule = jest.requireActual('@store/faceAuth/useFaceAuth') // Retain the original module
	return {
		...originalModule, // Retain other functionalities of useFacility
		useFaceAuth: jest.fn().mockReturnValue({
			...originalModule.useFaceAuth.getState(),
			image: {
				uri: 'file:///mocked-path-to-image.png', // Mock a valid local file path
				width: 300, // Example dimensions
				height: 300,
				base64: 'mockBase64String', // Optional
				exif: {}, // Optional
			},
		}),
	}
})

jest.mock('@helpers/file', () => ({
	convertImageToGeneralFile: jest.fn().mockReturnValue({
		fileName: 'captured-image.jpg',
		fileData: 'mockBase64String',
		contentType: 'image/jpeg', // Assuming JPEG for captured images
		size: '', // Approximation: base64 size (in bytes)
	}),
}))

jest.mock('expo-camera', () => ({
	...jest.requireActual('expo-camera'),
	CameraType: {
		front: 'front',
		back: 'back',
	},
	useCameraPermissions: jest.fn(() => [
		{
			granted: true,
		},
		jest.fn(),
	]),
}))

describe('FaceAuthPage', () => {
	const setup = async () => {
		const utils = render(
			<NotificationProvider>
				<FaceAuthPage />
			</NotificationProvider>,
		)

		await act(async () => {
			await new Promise((resolve) => setTimeout(resolve, 0)) // Simulate async effects
		})

		return {
			...utils,
			triggerSave: async () => {
				await act(async () => {
					fireEvent.press(utils.getByTestId('save-button'))
				})
			},
		}
	}

	it('verify the Save button', async () => {
		const { getByText, triggerSave } = await setup()
		await triggerSave()
		expect(uploadUserFaceAuth).toHaveBeenCalledTimes(1)
		await act(async () => {
			expect(getByText('Face authentication successfully uploaded!')).toBeTruthy()
		})
	})
})
