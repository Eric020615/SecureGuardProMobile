import { View, Text, ListRenderItem, ActivityIndicator, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomButton from '@components/buttons/customButton/CustomButton'
import { router } from 'expo-router'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ITimeFormat } from '@config/constant'
import CustomFlatList from '@components/list/CustomFlatList'
import { useApplication } from '@store/application/useApplication'
import { useFacility } from '@store/facility/useFacility'
import { GetFacilityBookingHistoryDto } from '@dtos/facility/facility.dto'
import ActionConfirmationModal from '@components/modals/ActionConfirmationModal'
import CustomConfirmModal from '@components/modals/CustomConfirmationModal'
import { convertDateStringToDate, convertDateStringToFormattedString, getCurrentDate } from '@helpers/time'
import { FacilityDescriptionEnum } from '@config/constant/facilities'

const FacilityBookingHistoryPage = () => {
	const {
		facilityBookingHistory,
		totalFacilityBookingHistory,
		id,
		resetFacilityBookingHistory,
		getFacilityBookingHistoryAction,
		cancelBookingAction,
	} = useFacility()
	const { isLoading } = useApplication()
	const [isPast, setIsPast] = useState(true)
	const [open, setOpen] = useState(false)

	const [selectedFacilityBookingId, setSelectedFacilityBookingId] = useState('')

	useEffect(() => {
		resetFacilityBookingHistory()
		fetchFacilityBookingHistory()
	}, [isPast])

	const fetchFacilityBookingHistory = async () => {
		await getFacilityBookingHistoryAction(isPast, 10)
	}

	const fetchNextPage = async () => {
		if (isLoading || facilityBookingHistory.length >= totalFacilityBookingHistory) return
		fetchFacilityBookingHistory()
	}

	const onRefresh = async () => {
		if (isLoading == true) return
		resetFacilityBookingHistory()
		fetchFacilityBookingHistory() // Fetch the first page again
	}

	const renderItem: ListRenderItem<GetFacilityBookingHistoryDto> = ({ item, index }) => (
		<TouchableOpacity
			className="bg-white p-4 rounded-lg shadow-sm"
			key={index}
			onPress={() => {
				router.push(`/facility/${item.bookingGuid}`)
			}}
		>
			{/* Facility Name and Status */}
			<View className="flex flex-row justify-between items-center mb-2" key={index}>
				<Text className="font-bold text-lg">{FacilityDescriptionEnum[item.facilityId]}</Text>
				{item.isCancelled ? (
					<Text className="bg-red-500 text-xs text-white rounded-lg px-2 py-1">Cancelled</Text>
				) : convertDateStringToDate(item.startDate) > getCurrentDate() ? (
					<CustomButton
						title="Cancel Booking"
						containerStyles="flex flex-row items-center bg-red-500 p-1 rounded-md"
						textStyles="text-white text-xs"
						handlePress={() => {
							setOpen(!open)
							setSelectedFacilityBookingId(item.bookingGuid)
						}}
						leftReactNativeIcons={<Ionicons name="close-circle" color={'#ffffff'} size={16} />}
					/>
				) : (
					<></>
					// <Text
					// 	className={`bg-${
					// 		item.status === 'confirmed' ? 'green' : 'yellow'
					// 	}-500 text-xs text-white rounded-lg px-2 py-1`}
					// >
					// 	{item.status.charAt(0).toUpperCase() + item.status.slice(1)}
					// </Text>
				)}
			</View>

			{/* Booking Dates */}
			<View className="flex flex-row justify-between">
				<Text className="text-sm text-gray-500">
					{convertDateStringToFormattedString(item.startDate, ITimeFormat.dateTime)}
				</Text>
				<Text className="text-sm text-gray-500">
					{convertDateStringToFormattedString(item.endDate, ITimeFormat.dateTime)}
				</Text>
			</View>
		</TouchableOpacity>
	)

	const onConfirm = () => {
		cancelFacilityBooking(selectedFacilityBookingId)
	}

	const cancelFacilityBooking = async (bookingGuid: string) => {
		await cancelBookingAction(bookingGuid)
	}

	return (
		<SafeAreaView className="bg-slate-100 h-full">
			<CustomConfirmModal
				isOpen={open}
				setOpen={() => {
					setOpen(!open)
				}}
				content={{
					title: 'Are you sure you want to cancel this booking?',
					subtitle: 'This action cannot be undone',
				}}
				onConfirm={onConfirm}
			/>
			<ActionConfirmationModal
				onSuccessConfirm={() => {
					router.push('/facility/history')
				}}
			/>
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
									{isLoading && id > 0 ? (
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
