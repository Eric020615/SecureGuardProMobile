import { View, Text, ScrollView, ListRenderItem, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNotice } from '@zustand/notice/useNotice'
import { getNoticeDto } from '@zustand/types'
import CustomButton from '@components/buttons/CustomButton'
import { router } from 'expo-router'
import Iconicons from 'react-native-vector-icons/Ionicons'
import { useApplication } from '@zustand/index'
import { getUTCRelativeTimeFromNow } from '../../helpers/time'
import CustomFlatList from '@components/list/CustomFlatList'

const NoticeListPage = () => {
	const { getNotice } = useNotice()
	const { isLoading, setIsLoading } = useApplication()
	const [notice, setNotice] = useState<getNoticeDto[]>([])
	const [page, setPage] = useState(0)
	const [totalRecords, setTotalRecords] = useState(0) // Track total records

	useEffect(() => {
		setNotice([]) // Reset the booking history
		setPage(0)
		fetchNotice()
	}, [])

	const fetchNotice = async () => {
		try {
			setIsLoading(true)
			const response = await getNotice(page, 10)
			if (response.success) {
				setNotice((prev) => [...prev, ...response.data.list])
				setTotalRecords(response.data.count) // Update total records from response
			}
		} catch (error) {
			console.log(error)
		} finally {
			setIsLoading(false)
		}
	}
	const fetchNextPage = async () => {
		if (isLoading || notice.length >= totalRecords) return
		if (notice.length % 10 !== 0) return
		setPage((prev) => prev + 1)
		// Logic to fetch the next page
		fetchNotice() // Fetch the first page again
	}
	const onRefresh = async () => {
		if (isLoading == true) return
		// Logic to refresh data
		setPage(0)
		setNotice([]) // Clear existing data
		fetchNotice() // Fetch the first page again
	}
	const renderItem: ListRenderItem<getNoticeDto> = ({ item, index }) => (
		<View className="bg-white p-4 rounded-lg flex flex-row justify-between" key={index}>
			<View>
				<Text className="font-bold">{item.title}</Text>
				<Text>{item.description}</Text>
			</View>
			<View>
				<Text className="font-bold">{getUTCRelativeTimeFromNow(new Date(item.startDate))}</Text>
			</View>
		</View>
	)

	return (
		<SafeAreaView className="bg-slate-100 h-full">
			<View className="flex-1">
				<View className="w-full min-h-[85vh] px-4 my-6">
					<View className="flex flex-row items-center">
						<CustomButton
							containerStyles="items-center h-fit"
							handlePress={() => {
								router.push('/home')
							}}
							rightReactNativeIcons={<Iconicons name="arrow-back" color={'#000000'} size={24} />}
						/>
					</View>
					<Text className="text-3xl text-black font-bold mt-6">Notice</Text>
					<View className="flex-1 mt-4">
						<CustomFlatList<getNoticeDto>
							data={notice}
							renderItem={renderItem}
							fetchNextPage={fetchNextPage}
							onRefresh={onRefresh}
							loading={isLoading}
							numColumns={1}
							itemHeight={80} // Customize the item height if needed
							listFooterComponent={
								<View className="py-4 items-center">
									{isLoading && page > 0 ? (
										// Show a loading indicator while fetching more data
										<ActivityIndicator size="large" color="#0000ff" />
									) : notice.length < totalRecords ? (
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
