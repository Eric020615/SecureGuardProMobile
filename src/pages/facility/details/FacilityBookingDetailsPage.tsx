import { View, Text, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import { useFacility } from '@store/facility/useFacility'
import { router, useLocalSearchParams } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import ActionConfirmationModal from '@components/modals/ActionConfirmationModal'
import CustomButton from '@components/buttons/CustomButton'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { convertDateStringToDate, convertDateStringToFormattedString, getCurrentDate } from '@helpers/time'
import { ITimeFormat } from '@config/constant'
import { FacilityDescriptionEnum } from '@config/constant/facilities'

const FacilityBookingDetails = () => {
	const { facilityBookingDetails, getFacilityBookingDetailsByIdAction } = useFacility()
	const { id } = useLocalSearchParams()

	useEffect(() => {
		fetchFacilityBookingDetailsById(id as string)
	}, [id])

	const fetchFacilityBookingDetailsById = async (id: string) => {
		await getFacilityBookingDetailsByIdAction(id)
	}

	const getBookingStatus = (startDate: Date, isCancelled: boolean) => {
		if (!startDate) return 'N/A'
		const currentDate = getCurrentDate()
		if (startDate > currentDate) {
			return isCancelled ? 'Cancelled' : 'Active'
		}
		return 'Expired'
	}

	return (
		<SafeAreaView className="bg-slate-100 h-full">
			<ActionConfirmationModal />
			<ScrollView>
				<View className="w-full min-h-[85vh] px-4 my-6">
					<View className="flex flex-row items-center">
						<CustomButton
							containerStyles="items-center h-fit"
							handlePress={() => {
								router.push('/facility/history')
							}}
							rightReactNativeIcons={<Ionicons name="arrow-back" color={'#000000'} size={24} />}
						/>
					</View>
					<Text className="text-4xl text-black font-bold mt-6">Booking Details</Text>

					{facilityBookingDetails ? (
						<>
							{/* Facility Name */}
							<View className="mt-3">
								<Text className="text-lg text-black font-bold">Facility Name</Text>
								<Text className="text-base text-black">{FacilityDescriptionEnum[facilityBookingDetails.facilityId] || 'N/A'}</Text>
							</View>

							{/* Booked By */}
							<View className="mt-3">
								<Text className="text-lg text-black font-bold">Booked By</Text>
								<Text className="text-base text-black">{facilityBookingDetails.bookedBy || 'N/A'}</Text>
							</View>

							{/* Start Date */}
							<View className="mt-3">
								<Text className="text-lg text-black font-bold">Start Date</Text>
								<Text className="text-base text-black">
									{facilityBookingDetails.startDate
										? convertDateStringToFormattedString(facilityBookingDetails.startDate, ITimeFormat.dateTime)
										: 'N/A'}
								</Text>
							</View>

							{/* End Date */}
							<View className="mt-3">
								<Text className="text-lg text-black font-bold">End Date</Text>
								<Text className="text-base text-black">
									{facilityBookingDetails.endDate
										? convertDateStringToFormattedString(facilityBookingDetails.endDate, ITimeFormat.dateTime)
										: 'N/A'}
								</Text>
							</View>

							{/* Number of Guests */}
							<View className="mt-3">
								<Text className="text-lg text-black font-bold">Number of Guests</Text>
								<Text className="text-base text-black">{facilityBookingDetails.numOfGuest || 'N/A'}</Text>
							</View>

							{/* Status */}
							<View className="mt-3">
								<Text className="text-lg text-black font-bold">Booking Status</Text>
								<Text className="text-base text-black">
									{getBookingStatus(
										convertDateStringToDate(facilityBookingDetails.startDate),
										facilityBookingDetails.isCancelled,
									)}
								</Text>
							</View>

							{/* Cancellation Remark (only if cancelled) */}
							{facilityBookingDetails.isCancelled && (
								<View className="mt-3">
									<Text className="text-lg text-black font-bold">Cancellation Remark</Text>
									<Text className="text-base text-black">{facilityBookingDetails.cancelRemark || 'N/A'}</Text>
								</View>
							)}
						</>
					) : (
						<Text className="text-center text-gray-500 mt-10">Loading booking details...</Text>
					)}
				</View>
			</ScrollView>
		</SafeAreaView>
	)
}

export default FacilityBookingDetails
