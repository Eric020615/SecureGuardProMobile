import { View, Text, ListRenderItem, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomButton from '@components/buttons/CustomButton'
import { router } from 'expo-router'
import Ionicons from 'react-native-vector-icons/Ionicons'
import CustomFlatList from '@components/list/CustomFlatList'
import { useNotice } from '@store/notice/useNotice'
import { useApplication } from '@store/application/useApplication'
import { GetNoticeDto } from '@dtos/notice/notice.dto'
import ActionConfirmationModal from '@components/modals/ActionConfirmationModal'
import { getRelativeTimeFromNow } from '@helpers/time'

const NoticeListPage = () => {
	const { notices, id, totalNotices, getNoticeAction, resetNotice } = useNotice()
	const isLoading = useApplication((state) => state.isLoading)

	useEffect(() => {
		resetNotice()
		fetchNotice()
	}, [])

	const fetchNotice = async () => {
		await getNoticeAction(10)
	}

	const fetchNextPage = async () => {
		if (isLoading || notices.length >= totalNotices) return
		fetchNotice()
	}
	const onRefresh = async () => {
		if (isLoading == true) return
		resetNotice()
		fetchNotice()
	}

	const renderItem: ListRenderItem<GetNoticeDto> = ({ item, index }) => (
		<View className="bg-white p-4 rounded-lg flex flex-row justify-between" key={index}>
			<View>
				<Text className="font-bold">{item.title}</Text>
				<Text>{item.description}</Text>
			</View>
			<View>
				<Text className="font-bold">{getRelativeTimeFromNow(new Date(item.startDate))}</Text>
			</View>
		</View>
	)

	return (
		<SafeAreaView className="bg-slate-100 h-full">
			<ActionConfirmationModal />
			<View className="flex-1">
				<View className="w-full min-h-[85vh] px-4 my-6">
					<View className="flex flex-row items-center">
						<CustomButton
							containerStyles="items-center h-fit"
							handlePress={() => {
								router.push('/home')
							}}
							rightReactNativeIcons={<Ionicons name="arrow-back" color={'#000000'} size={24} />}
						/>
					</View>
					<Text className="text-3xl text-black font-bold mt-6">Notice</Text>
					<View className="flex-1 mt-4">
						<CustomFlatList<GetNoticeDto>
							data={notices}
							renderItem={renderItem}
							fetchNextPage={fetchNextPage}
							onRefresh={onRefresh}
							loading={isLoading}
							numColumns={1}
							itemHeight={80} // Customize the item height if needed
							listFooterComponent={
								<View className="py-4 items-center">
									{isLoading && id > 0 ? (
										// Show a loading indicator while fetching more data
										<ActivityIndicator size="large" color="#0000ff" />
									) : notices.length < totalNotices ? (
										<Text className="text-gray-500">Load More</Text>
									) : (
										// Show a message when all data is loaded
										<Text className="text-gray-500">You've reached the end of the list.</Text>
									)}
								</View>
							}
						/>
					</View>
				</View>
			</View>
		</SafeAreaView>
	)
}

export default NoticeListPage
