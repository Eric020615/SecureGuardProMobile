import { create } from 'zustand'
import { generalAction } from '@store/application/useApplication'
import { CameraCapturedPicture, CameraView } from 'expo-camera'
import { MutableRefObject } from 'react'
import { CreateUserFaceAuthDto } from '@dtos/card/card.dto'
import { uploadUserFaceAuth } from '@api/cardService/cardService'

interface State {
	image: CameraCapturedPicture
}

interface Actions {
	retakePictureAction: () => void
	takePictureAction: (cameraRef: MutableRefObject<CameraView>) => Promise<void>
	uploadUserFaceAuthAction: (createUserFaceAuthDto: CreateUserFaceAuthDto) => Promise<any>
}

export const useFaceAuth = create<State & Actions>((set) => ({
	image: null,
	retakePictureAction: () => {
		set({ image: null })
	},
	takePictureAction: async (cameraRef: MutableRefObject<CameraView>) => {
		return generalAction(
			async () => {
				if (!cameraRef) {
					throw new Error('Camera not found. Please try again.')
				}
				const data = await cameraRef.current.takePictureAsync()
				set({ image: data })
			},
			'', // Custom success message
			'Failed to take picture. Please try again.', // Custom error message
		)
	},
	uploadUserFaceAuthAction: async (createUserFaceAuthDto: CreateUserFaceAuthDto) => {
		return generalAction(
			async () => {
				const response = await uploadUserFaceAuth(createUserFaceAuthDto)
				if (!response?.success) {
					throw new Error(response.msg)
				}
				return response
			},
			'Face authentication successfully uploaded!', // Custom success message
			'Failed to upload face authentication. Please try again.', // Custom error message
		)
	},
}))
