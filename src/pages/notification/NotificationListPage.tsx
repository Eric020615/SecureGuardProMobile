import { View, Text, TouchableOpacity, ListRenderItem, ActivityIndicator } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomFlatList from '@components/list/CustomFlatList'
import { useNotification } from '@store/notification/useNotification'
import { useApplication } from '@store/application/useApplication'
import { GetNotificationDto } from '@dtos/notification/notification.dto'
import { convertDateStringToFormattedString } from '@helpers/time'
import { ITimeFormat } from '@config/constant'
import AntDesign from 'react-native-vector-icons/AntDesign'

const NotificationListPage = () => {
	const { notifications, totalNotifications, getNotificationAction, resetNotificationAction } = useNotification()
	const { isLoading } = useApplication()

	useEffect(() => {
		resetNotificationAction()
		fetchNotifications()
	}, [])

	const fetchNotifications = async () => {
		await getNotificationAction(10)
	}

	const fetchNextPage = async () => {
		if (isLoading || notifications.length >= totalNotifications) return
		await fetchNotifications()
	}

	const onRefresh = async () => {
		if (isLoading) return
		resetNotificationAction()
		fetchNotifications() // Reset and fetch latest notifications
	}

	const renderItem: ListRenderItem<GetNotificationDto> = ({ item }) => (
		<TouchableOpacity
			className={`p-4 rounded-lg flex flex-row justify-between ${item.isRead ? 'bg-gray-200' : 'bg-white'}`}
			onPress={() => {
				if (!item.isRead) {
				}
			}}
		>
			<View className="flex-1">
				<Text className="font-bold text-lg">{item.title}</Text>
				<Text className="text-gray-500">{item.body}</Text>
				<View className="flex flex-row items-center mt-2">
					<AntDesign name="clockcircle" color="#10312b" size={14} />
					<Text className="ml-2">{convertDateStringToFormattedString(item.createdDateTime, ITimeFormat.dateTime)}</Text>
				</View>
			</View>
			{!item.isRead && <AntDesign name="dotchart" color="#10312b" size={16} />}
		</TouchableOpacity>
	)

	return (
		<SafeAreaView className="bg-slate-100 h-full">
			<View className="flex-1 px-4 my-6">
				<Text className="text-4xl text-black font-bold mt-6">Notifications</Text>
				<View className="flex-1 mt-4">
					<CustomFlatList<GetNotificationDto>
						data={notifications}
						renderItem={renderItem}
						fetchNextPage={fetchNextPage}
						onRefresh={onRefresh}
						loading={isLoading}
						numColumns={1}
						itemHeight={100}
						listFooterComponent={
							<View className="py-4 items-center">
								{isLoading ? (
									<ActivityIndicator size="large" color="#0000ff" />
								) : notifications.length < totalNotifications ? (
									<Text className="text-gray-500">Load More</Text>
								) : (
									<Text className="text-gray-500">You've reached the end of the list.</Text>
								)}
							</View>
						}
					/>
				</View>
			</View>
		</SafeAreaView>
	)
}

export default NotificationListPage
