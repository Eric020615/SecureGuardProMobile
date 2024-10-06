import { create } from 'zustand'
import { EditUserDetailsByIdDto, GetUserProfileByIdDto, UserInformationFormDto } from '../types'
import { createUser, editUserProfileById, getUserProfileById } from '@api/userService/userService'
import { generalAction } from '../application/useApplication' // Import generalAction

interface State {
	userProfile: GetUserProfileByIdDto
}

interface Actions {
	createUserAction: (
		IUserInformationFormDto: UserInformationFormDto,
		tempToken: string,
	) => Promise<any>
	getUserProfileByIdAction: () => Promise<any>
	editUserProfileByIdAction: (IEditUserDetailsByIdDto: EditUserDetailsByIdDto) => Promise<any>
}

export const useUser = create<State & Actions>((set) => ({
	userProfile: {} as GetUserProfileByIdDto,

	createUserAction: async (IUserInformationFormDto: UserInformationFormDto, tempToken: string) => {
		return generalAction(
			async () => {
				await createUser(IUserInformationFormDto, tempToken)
			},
			'User created successfully!',
			'Failed to create user. Please try again.',
		)
	},

	getUserProfileByIdAction: async () => {
		return generalAction(
			async () => {
				const response = await getUserProfileById()
				set({ userProfile: response.data })
			},
			'User profile retrieved successfully!',
			'Failed to retrieve user profile.',
		)
	},

	editUserProfileByIdAction: async (IEditUserDetailsByIdDto: EditUserDetailsByIdDto) => {
		return generalAction(
			async () => {
				await editUserProfileById(IEditUserDetailsByIdDto)
			},
			'User profile updated successfully!',
			'Failed to update user profile. Please try again.',
		)
	},
}))
