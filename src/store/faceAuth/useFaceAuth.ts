import { create } from 'zustand'
import { CreateUserFaceAuthDto } from '../types'
import { uploadUserFaceAuth } from '@api/faceAuthService/faceAuthService'
import { generalAction } from '../application/useApplication'

interface State {}

interface Actions {
	uploadUserFaceAuthAction: (createUserFaceAuthDto: CreateUserFaceAuthDto) => Promise<any>
}

export const useFaceAuth = create<State & Actions>((set) => ({
	uploadUserFaceAuthAction: async (createUserFaceAuthDto: CreateUserFaceAuthDto) => {
		return generalAction(
			async () => {
				const response = await uploadUserFaceAuth(createUserFaceAuthDto)
				return response
			},
			'Face authentication successfully uploaded!', // Custom success message
			'Failed to upload face authentication. Please try again.', // Custom error message
		)
	},
}))
