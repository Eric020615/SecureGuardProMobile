import { create } from 'zustand'
import { generalAction } from '@store/application/useApplication' // Import generalAction
import { GetNotificationDto } from '@dtos/notification/notification.dto'
import { getNotifications } from '@api/notificationService/notificationService'

interface State {
	notifications: GetNotificationDto[]
	id: number
	totalNotifications: number
}

interface Actions {
	getNotificationAction: (limit: number) => Promise<any>
	resetNotificationAction: () => void
}

export const useNotification = create<State & Actions>((set, get) => ({
	notifications: [],
	id: 0,
	totalNotifications: 0,
	getNotificationAction: async (limit: number) => {
		return generalAction(
			async () => {
				const { id } = get()
				const response = await getNotifications(id, limit)
				if (!response?.success) {
					throw new Error(response.msg)
				}
				set((state) => ({
					notifications: [...state.notifications, ...response.data.list],
					id: response.data.list.length > 0 ? response.data.list[response.data.list.length - 1]?.notificationId : 0,
					totalnotifications: response.data.count,
				}))
				return response
			},
			'',
			'Failed to retrieve notifications. Please try again.',
		)
	},
	resetNotificationAction() {
		set({ notifications: [], id: 0, totalNotifications: 0 })
	},
}))
