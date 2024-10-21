import { create } from 'zustand'
import {
	createSubUser,
	createUser,
	deleteSubUserById,
	editSubUserStatusById,
	editUserProfileById,
	getSubUserList,
	getUserProfileById,
} from '@api/userService/userService'
import { generalAction } from '@store/application/useApplication'
import {
	CreateSubUserDto,
	EditUserDetailsByIdDto,
	GetSubUserDto,
	GetUserProfileByIdDto,
	UserInformationFormDto,
} from '@dtos/user/user.dto'

interface State {
	userProfile: GetUserProfileByIdDto
	subUsers: GetSubUserDto[]
	id: number
	totalSubUsers: number
}

interface Actions {
	createUserAction: (
		IUserInformationFormDto: UserInformationFormDto,
		tempToken: string,
	) => Promise<any>
	getUserProfileByIdAction: () => Promise<any>
	getSubUserListAction: (limit: number) => Promise<any>
	resetSubUserListAction: () => void
	editUserProfileByIdAction: (IEditUserDetailsByIdDto: EditUserDetailsByIdDto) => Promise<any>
	createSubUserAction: (createSubUserDto: CreateSubUserDto) => Promise<any>
	editSubUserStatusByIdAction: (subUserGuid: string, status: boolean) => Promise<any>
	deleteSubUserByIdAction: (subUserGuid: string) => Promise<any>
}

export const useUser = create<State & Actions>((set, get) => ({
	userProfile: {} as GetUserProfileByIdDto,
	subUsers: [],
	id: 0,
	totalSubUsers: 0,
	createUserAction: async (IUserInformationFormDto: UserInformationFormDto, tempToken: string) => {
		return generalAction(
			async () => {
				const response = await createUser(IUserInformationFormDto, tempToken)
				if (!response?.success) {
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
				if (!response?.success) {
					throw new Error(response.msg)
				}
				set({ userProfile: response.data })
			},
			'',
			'Failed to retrieve user profile.',
		)
	},

	getSubUserListAction: async (limit: number) => {
		return generalAction(
			async () => {
				const { id } = get()
				const response = await getSubUserList(id, limit)
				if (!response?.success) {
					throw new Error(response.msg)
				}
				set((state) => ({
					subUsers: [...state.subUsers, ...response.data.list],
					id:
						response.data.list.length > 0
							? response.data.list[response.data.list.length - 1]?.userId
							: 0,
					totalSubUsers: response.data.count,
				}))
			},
			'',
			'Failed to retrieve sub user list.',
		)
	},

	resetSubUserListAction() {
		set({ subUsers: [], id: 0, totalSubUsers: 0 })
	},

	editUserProfileByIdAction: async (IEditUserDetailsByIdDto: EditUserDetailsByIdDto) => {
		return generalAction(
			async () => {
				const response = await editUserProfileById(IEditUserDetailsByIdDto)
				if (!response?.success) {
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
				if (!response?.success) {
					throw new Error(response.msg)
				}
			},
			'Sub user created successfully!',
			'Failed to create sub user. Please try again.',
		)
	},

	editSubUserStatusByIdAction: async (subUserGuid: string, status: boolean) => {
		return generalAction(
			async () => {
				const response = await editSubUserStatusById(subUserGuid, status)
				if (!response?.success) {
					throw new Error(response.msg)
				}
			},
			'Sub user status updated successfully!',
			'Failed to update sub user status. Please try again.',
		)
	},

	deleteSubUserByIdAction: async (subUserGuid: string) => {
		return generalAction(
			async () => {
				const response = await deleteSubUserById(subUserGuid)
				if (!response?.success) {
					throw new Error(response.msg)
				}
			},
			'Sub user deleted successfully!',
			'Failed to delete sub user. Please try again.',
		)
	},
}))
