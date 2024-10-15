import { create } from 'zustand'
import { uploadUserFaceAuth } from '@api/faceAuthService/faceAuthService'
import { generalAction } from '@store/application/useApplication'
import { CreateUserFaceAuthDto } from '@dtos/faceAuth/faceAuth.dto'

interface State {}

interface Actions {
	uploadUserFaceAuthAction: (createUserFaceAuthDto: CreateUserFaceAuthDto) => Promise<any>
}

export const useFaceAuth = create<State & Actions>(() => ({
	uploadUserFaceAuthAction: async (createUserFaceAuthDto: CreateUserFaceAuthDto) => {
		return generalAction(
			async () => {
				const response = await uploadUserFaceAuth(createUserFaceAuthDto)
				if(!response?.success){
					throw new Error(response.msg)
				}
				return response
			},
			'Face authentication successfully uploaded!', // Custom success message
			'Failed to upload face authentication. Please try again.', // Custom error message
		)
	},
}))
