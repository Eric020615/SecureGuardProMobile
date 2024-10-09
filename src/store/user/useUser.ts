import { create } from 'zustand'
import { createSubUser, createUser, editUserProfileById, getUserProfileById } from '@api/userService/userService'
import { generalAction } from '@store/application/useApplication' // Import generalAction
import {
	CreateSubUserDto,
	EditUserDetailsByIdDto,
	GetUserProfileByIdDto,
	UserInformationFormDto,
} from '@dtos/user/user.dto'

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
	createSubUserAction: (createSubUserDto: CreateSubUserDto) => Promise<any>
}

export const useUser = create<State & Actions>((set) => ({
	userProfile: {} as GetUserProfileByIdDto,

	createUserAction: async (IUserInformationFormDto: UserInformationFormDto, tempToken: string) => {
		return generalAction(
			async () => {
				const response = await createUser(IUserInformationFormDto, tempToken)
				if(!response.success){
					throw new Error(response.msg)
				}
			},
			'User created successfully!',
			'Failed to create user. Please try again.',
		)
	},

	getUserProfileByIdAction: async () => {
		return generalAction(
			async () => {
				const response = await getUserProfileById()
				if(!response.success){
					throw new Error(response.msg)
				}
				set({ userProfile: response.data })
			},
			'',
			'Failed to retrieve user profile.',
		)
	},

	editUserProfileByIdAction: async (IEditUserDetailsByIdDto: EditUserDetailsByIdDto) => {
		return generalAction(
			async () => {
				const response = await editUserProfileById(IEditUserDetailsByIdDto)
				if(!response.success){
					throw new Error(response.msg)
				}
			},
			'User profile updated successfully!',
			'Failed to update user profile. Please try again.',
		)
	},

	createSubUserAction: async (createSubUserDto: CreateSubUserDto) => {
		return generalAction(
			async () => {
				const response = await createSubUser(createSubUserDto)
				if(!response.success){
					throw new Error(response.msg)
				}
			},
			'Sub user created successfully!',
			'Failed to create sub user. Please try again.',
		)
	},
}))
