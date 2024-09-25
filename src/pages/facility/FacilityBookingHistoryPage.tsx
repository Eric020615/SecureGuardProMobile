import { View, Text, ScrollView, Alert, FlatList, ListRenderItem } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomButton from '@components/buttons/CustomButton'
import { router } from 'expo-router'
import Iconicons from 'react-native-vector-icons/Ionicons'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useFacility } from '@zustand/facility/useFacility'
import { getFacilityBookingHistoryDto, Page } from '@zustand/types'
import { FacilityConst } from '@config/constant/facilities'
import { useApplication } from '@zustand/index'
import {
	convertDateStringToDate,
	convertUTCStringToLocalDateString,
	getTodayDate,
} from '../../helpers/time'
import { ITimeFormat } from '@config/constant'
import { useInfiniteQuery } from 'react-query'
import CustomLoader from '@components/loader/CustomLoader'
import CustomFlatList from '@components/list/CustomFlatList'

const FacilityBookingHistoryPage = () => {
	const { getFacilityBookingHistory } = useFacility()
	const { cancelBooking } = useFacility()
	const { isLoading, setIsLoading } = useApplication()
	const [isPast, setIsPast] = useState(true)
	const [bookingHistory, setBookingHistory] = useState<getFacilityBookingHistoryDto[]>([])
	const [currentPage, setCurrentPage] = useState(0)

	useEffect(() => {
		fetchFacilityBookingHistory(0)
	}, [])

	useEffect(() => {
		fetchFacilityBookingHistory(0)
	}, [isPast])

	const fetchFacilityBookingHistory = async (page: number) => {
		try {
			setIsLoading(true)
			console.log('fetching page: ', page)
			const response = await getFacilityBookingHistory(isPast, page, 10)
			if (response.success) {
				setBookingHistory(response.data)
				setCurrentPage(page)
			}
			setIsLoading(false)
		} catch (error) {
			setIsLoading
		}
	}

	const cancel = async (bookingId: string) => {
		try {
			setIsLoading(true)
			const response = await cancelBooking(bookingId)
			if (response.success) {
				router.push('/facilityHistory')
			} else {
				Alert.alert(response.msg)
			}
			setIsLoading(false)
		} catch (error) {
			setIsLoading(false)
		}
	}

	const fetchNextPage = async () => {
		// Logic to fetch the next page
		fetchFacilityBookingHistory(currentPage + 1) // Fetch the first page again
	}
	const onRefresh = async () => {
		// Logic to refresh data
		setBookingHistory([]) // Clear existing data
		fetchFacilityBookingHistory(0) // Fetch the first page again
	}

	const renderItem: ListRenderItem<getFacilityBookingHistoryDto> = ({ item, index }) => (
		<View className="bg-white p-4 rounded-lg flex flex-row justify-between" key={index}>
			<View>
				<Text className="font-bold">{FacilityConst[item.facilityId]}</Text>
				<View className="flex flex-row gap-1">
					<Text className="">
						{convertUTCStringToLocalDateString(item.startDate, ITimeFormat.dateTime)}
					</Text>
					<Text>-</Text>
					<Text className="">
						{convertUTCStringToLocalDateString(item.endDate, ITimeFormat.time)}
					</Text>
				</View>
			</View>
			<View>
				<Text className="font-bold">{item.numOfGuest} Guests(s)</Text>
				{item.isCancelled ? (
					<Text className="bg-red-500 text-xs text-white rounded-lg text-center mt-1">
						Cancelled
					</Text>
				) : (
					convertDateStringToDate(item.startDate) > getTodayDate() && (
						<CustomButton
							containerStyles="flex flex-row self-end h-fit mt-1"
							handlePress={() => {
								cancel(item.bookingId)
							}}
							rightReactNativeIcons={<Iconicons name="close-circle" color={'#ff0000'} size={16} />}
						/>
					)
				)}
			</View>
		</View>
	)

	return (
		<SafeAreaView className="bg-slate-100 h-full">
			<View className="flex-1">
				<View className="w-full px-4 my-6 flex-1">
					<View className="flex flex-row items-center">
						<CustomButton
							containerStyles="items-center h-fit"
							handlePress={() => {
								router.push('/facility')
							}}
							rightReactNativeIcons={<Iconicons name="arrow-back" color={'#000000'} size={24} />}
						/>
					</View>
					<Text className="text-4xl text-black font-bold mt-6">Booking History</Text>
					<View className="flex flex-row justify-between mt-5">
						<CustomButton
							containerStyles={`${isPast ? 'bg-primary' : 'bg-white'} p-2 mr-5 flex-1 rounded-2xl`}
							handlePress={() => {
								setIsPast(!isPast)
							}}
							title="Past"
							textStyles={`text-base ${isPast ? 'text-white' : 'text-primary'} `}
						/>
						<CustomButton
							containerStyles={`${!isPast ? 'bg-primary' : 'bg-white'} p-2 flex-1 rounded-2xl`}
							handlePress={() => {
								setIsPast(!isPast)
							}}
							title="Upcoming"
							textStyles={`text-base ${!isPast ? 'text-white' : 'text-primary'} `}
						/>
					</View>
					<View className="flex-1 mt-4">
						{/* <FlatList
							data={bookingHistory}
							renderItem={({ item, index }) => (
								<View className="bg-white p-4 rounded-lg flex flex-row justify-between" key={index}>
									<View>
										<Text className="font-bold">{FacilityConst[item.facilityId]}</Text>
										<View className="flex flex-row gap-1">
											<Text className="">
												{convertUTCStringToLocalDateString(item.startDate, ITimeFormat.dateTime)}
											</Text>
											<Text>-</Text>
											<Text className="">
												{convertUTCStringToLocalDateString(item.endDate, ITimeFormat.time)}
											</Text>
										</View>
									</View>
									<View>
										<Text className="font-bold">{item.numOfGuest} Guests(s)</Text>
										{item.isCancelled ? (
											<Text className="bg-red-500 text-xs text-white rounded-lg text-center mt-1">
												Cancelled
											</Text>
										) : (
											convertDateStringToDate(item.startDate) > getTodayDate() && (
												<CustomButton
													containerStyles="flex flex-row self-end h-fit mt-1"
													handlePress={() => {
														cancel(item.bookingId)
													}}
													rightReactNativeIcons={
														<Iconicons name="close-circle" color={'#ff0000'} size={16} />
													}
												/>
											)
										)}
									</View>
								</View>
							)}
							contentContainerStyle={{ gap: 20 }}
							onEndReached={() => fetchFacilityBookingHistory(next)}
							onEndReachedThreshold={5}
							refreshing={isRefreshing}
							ListFooterComponent={() => (
								<View>
									{isRefreshing ? (
										<CustomLoader loaderHeight={100} loaderWidth={100} />
									) : (
										<Text className="self-center text-xl text-blue-600">
											Load more
										</Text>
									)}
								</View>
							)}
						/> */}
						<CustomFlatList<getFacilityBookingHistoryDto>
							data={bookingHistory}
							renderItem={renderItem}
							fetchNextPage={fetchNextPage}
							loading={isLoading}
							onRefresh={onRefresh}
							numColumns={1}
							itemHeight={120} // Customize the item height if needed
						/>
					</View>
				</View>
			</View>
		</SafeAreaView>
	)
}

export default FacilityBookingHistoryPage
