import { View, Text, ListRenderItem, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomButton from '@components/buttons/CustomButton'
import { router } from 'expo-router'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FacilityConst } from '@config/constant/facilities'
import {
	convertUTCStringToLocalDate,
	convertUTCStringToLocalDateString,
	getTodayDate,
} from '@helpers/time'
import { ITimeFormat } from '@config/constant'
import CustomFlatList from '@components/list/CustomFlatList'
import { useApplication } from '@store/application/useApplication'
import { useFacility } from '@store/facility/useFacility'
import { GetFacilityBookingHistoryDto } from '@dtos/facility/facility.dto'
import CustomModal from '@components/modals/CustomModal'

const FacilityBookingHistoryPage = () => {
	const {
		facilityBookingHistory,
		totalFacilityBookingHistory,
		resetFacilityBookingHistory,
		getFacilityBookingHistoryAction,
		cancelBookingAction,
	} = useFacility()
	const { isLoading } = useApplication()
	const [isPast, setIsPast] = useState(true)
	const [page, setPage] = useState(0)

	useEffect(() => {
		setPage(0)
		resetFacilityBookingHistory()
		fetchFacilityBookingHistory()
	}, [isPast])

	const fetchFacilityBookingHistory = async () => {
		await getFacilityBookingHistoryAction(isPast, page, 10)
	}

	const cancel = async (bookingGuid: string) => {
		const response = await cancelBookingAction(bookingGuid)
		if (response.success) {
			router.push('/facility/history')
		}
	}

	const fetchNextPage = async () => {
		if (isLoading || facilityBookingHistory.length >= totalFacilityBookingHistory) return
		if (facilityBookingHistory.length % 10 !== 0) return
		setPage((prev) => prev + 1)
		// Logic to fetch the next page
		fetchFacilityBookingHistory() // Fetch the first page again
	}
	const onRefresh = async () => {
		if (isLoading == true) return
		// Logic to refresh data
		setPage(0)
		resetFacilityBookingHistory()
		fetchFacilityBookingHistory() // Fetch the first page again
	}

	const renderItem: ListRenderItem<GetFacilityBookingHistoryDto> = ({ item, index }) => (
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
					convertUTCStringToLocalDate(item.startDate) > getTodayDate() && (
						<CustomButton
							containerStyles="flex flex-row self-end h-fit mt-1"
							handlePress={() => {
								cancel(item.bookingGuid)
							}}
							rightReactNativeIcons={<Ionicons name="close-circle" color={'#ff0000'} size={16} />}
						/>
					)
				)}
			</View>
		</View>
	)

	return (
		<SafeAreaView className="bg-slate-100 h-full">
			<CustomModal />
			<View className="flex-1">
				<View className="w-full px-4 my-6 flex-1">
					<View className="flex flex-row items-center">
						<CustomButton
							containerStyles="items-center h-fit"
							handlePress={() => {
								router.push('/facility/create')
							}}
							rightReactNativeIcons={<Ionicons name="arrow-back" color={'#000000'} size={24} />}
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
						<CustomFlatList<GetFacilityBookingHistoryDto>
							data={facilityBookingHistory}
							renderItem={renderItem}
							fetchNextPage={fetchNextPage}
							onRefresh={onRefresh}
							loading={isLoading}
							numColumns={1}
							itemHeight={120} // Customize the item height if needed
							listFooterComponent={
								<View className="py-4 items-center">
									{isLoading && page > 0 ? (
										// Show a loading indicator while fetching more data
										<ActivityIndicator size="large" color="#0000ff" />
									) : facilityBookingHistory.length < totalFacilityBookingHistory ? (
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

export default FacilityBookingHistoryPage
