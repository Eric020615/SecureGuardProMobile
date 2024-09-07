import { View, Text, ScrollView, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomButton from '@components/buttons/CustomButton'
import { router } from 'expo-router'
import Iconicons from 'react-native-vector-icons/Ionicons'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useFacility } from '@zustand/facility/useFacility'
import { getFacilityBookingHistoryDto } from '@zustand/types'
import { FacilityConst } from '@config/constant/facilities'
import { useApplication } from '@zustand/index'
import { convertDateStringToDate, convertUTCStringToLocalDateString, getTodayDate } from '../../helpers/time'
import { ITimeFormat } from '@config/constant'

const FacilityBookingHistoryPage = () => {
	const { getFacilityBookingHistory } = useFacility()
	const { cancelBooking } = useFacility()
	const { setIsLoading } = useApplication()
	const [isPast, setIsPast] = useState(true)
	const [bookingHistory, setBookingHistory] = useState<getFacilityBookingHistoryDto[]>([])

	useEffect(() => {
		getData(isPast)
	}, [])

	useEffect(() => {
		getData(isPast)
	}, [isPast])

	const getData = async (isPast: boolean) => {
		try {
			setIsLoading(true)
			const response = await getFacilityBookingHistory(isPast)
			if (response.success) {
				setBookingHistory(response.data)
				console.log(response.data)
			}
			setIsLoading(false)
		} catch (error) {
			setIsLoading(false)
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

	return (
		<SafeAreaView className="bg-slate-100 h-full">
			<ScrollView>
				<View className="w-full min-h-[85vh] px-4 my-6">
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
					{bookingHistory.length > 0 &&
						bookingHistory.map((x, index) => (
							<View
								className="bg-white mt-5 p-4 rounded-lg flex flex-row justify-between"
								key={index}
							>
								<View>
									<Text className="font-bold">{FacilityConst[x.facilityId]}</Text>
									<View className="flex flex-row gap-1">
										<Text className="">
											{convertUTCStringToLocalDateString(x.startDate, ITimeFormat.dateTime)}
										</Text>
										<Text>-</Text>
										<Text className="">
											{convertUTCStringToLocalDateString(x.endDate, ITimeFormat.time)}
										</Text>
									</View>
								</View>
								<View>
									<Text className="font-bold">{x.numOfGuest} Guests(s)</Text>
									{x.isCancelled ? (
										<Text className="bg-red-500 text-xs text-white rounded-lg text-center mt-1">
											Cancelled
										</Text>
									) : (
										convertDateStringToDate(x.startDate) > getTodayDate() && (
											<CustomButton
												containerStyles="flex flex-row self-end h-fit mt-1"
												handlePress={() => {
													cancel(x.bookingId)
												}}
												rightReactNativeIcons={
													<Iconicons name="close-circle" color={'#ff0000'} size={16} />
												}
											/>
										)
									)}
								</View>
							</View>
						))}
				</View>
			</ScrollView>
		</SafeAreaView>
	)
}

export default FacilityBookingHistoryPage
