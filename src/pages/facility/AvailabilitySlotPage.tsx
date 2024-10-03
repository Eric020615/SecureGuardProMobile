import { View, Text, ListRenderItem, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomButton from '@components/buttons/CustomButton'
import { router, useLocalSearchParams } from 'expo-router'
import { useFacility } from '@zustand/facility/useFacility'
import { useApplication } from '@zustand/index'
import { SpaceAvailabilityDto } from '@zustand/types'
import CustomFlatList from '@components/list/CustomFlatList'
import Iconicons from 'react-native-vector-icons/Ionicons'
import { FacilityConst } from '@config/constant/facilities'
import moment from 'moment'
import { ITimeFormat } from '@config/constant'
import CheckBox from '@react-native-community/checkbox'

const AvailabilitySlotPage = () => {
	const { isLoading, setIsLoading } = useApplication()
	const { submitBooking } = useFacility()
	const { facilityId, startDate, duration } = useLocalSearchParams()
	const { checkAvailabilitySlotAction } = useFacility()
	const [availabilitySlot, setAvailabilitySlot] = useState<SpaceAvailabilityDto[]>([])
	const [selectedSlot, setSelectedSlot] = useState<number | null>(null) // State to track selected slot

	useEffect(() => {
		fetchAvailabilitySlot()
	}, [facilityId, startDate, duration])

	const fetchAvailabilitySlot = async () => {
		try {
			setIsLoading(true)
			if (!facilityId || !startDate || !duration) return
			const response = await checkAvailabilitySlotAction(
				facilityId as string,
				startDate as string,
				duration as string,
			)
			if (response.success) {
				setAvailabilitySlot(response.data)
			}
		} catch (error) {
			console.log(error)
		} finally {
			setIsLoading(false)
		}
	}

	const handleSlotSelection = (index: number) => {
		// If the same slot is clicked again, deselect it by setting selectedSlot to null
		if (selectedSlot === index) {
			setSelectedSlot(null)
		} else {
			setSelectedSlot(index)
		}
	}

	const renderItem: ListRenderItem<SpaceAvailabilityDto> = ({ item, index }) => (
		<TouchableOpacity
			className={`p-4 my-2 rounded-xl shadow-md ${
				item.isBooked
					? 'bg-red-700 opacity-70'
					: selectedSlot === index
					? 'bg-primary'
					: 'bg-green-700 border-green-800'
			}`}
			onPress={() => handleSlotSelection(index)} // Handle slot selection/deselection
			disabled={item.isBooked} // Disable if booked
			key={index}
		>
			<View className="flex flex-row justify-between items-center">
				<View className="flex-row items-center gap-2">
					<CheckBox
						disabled={item.isBooked}
						value={selectedSlot === index}
						onValueChange={() => handleSlotSelection(index)}
						tintColors={{ true: 'white', false: 'white' }}
					/>
					<View>
						<Text className="text-lg font-bold text-white">{item.spaceName}</Text>
					</View>
				</View>
				<View className="items-end">
					<Text className="text-sm text-white">Capacity: {item.capacity}</Text>
					<Text className="mt-2 font-semibold text-white">
						{item.isBooked ? 'Booked' : 'Available'}
					</Text>
				</View>
			</View>
		</TouchableOpacity>
	)

	const onRefresh = async () => {
		if (isLoading == true) return
		// Logic to refresh data
		fetchAvailabilitySlot()
	}

	return (
		<SafeAreaView className="bg-slate-100 h-full px-4">
			<View className="flex-1">
				<View className="w-full min-h-[85vh] px-4 my-6">
					<View className="flex flex-row items-center">
						<CustomButton
							containerStyles="items-center h-fit"
							handlePress={() => {
								router.push('/facility/create')
							}}
							rightReactNativeIcons={<Iconicons name="arrow-back" color={'#000000'} size={24} />}
						/>
					</View>
					<Text className="text-4xl text-black font-bold mt-6">Book Slot</Text>
					<View style={{ marginTop: 10 }}>
						<View className="flex flex-row items-center gap-1">
							<Iconicons name="location-sharp" color={'#2A5D4F'} size={24} />
							<Text className="text-lg text-black">{FacilityConst[facilityId as string]}</Text>
						</View>
						<View className="flex flex-row items-center gap-1">
							<Iconicons name="calendar-outline" color={'#10312B'} size={24} />
							<Text className="text-lg text-black">{startDate}</Text>
						</View>
						<View className="flex flex-row items-center gap-1">
							<Iconicons name="calendar-outline" color={'#B75E2A'} size={24} />
							<Text className="text-lg text-black">
								{moment(startDate)
									.add(duration as string, 'hours')
									.format(ITimeFormat.dateTime)}
							</Text>
						</View>
					</View>
					<View className="flex-1 mt-4">
						<CustomFlatList<SpaceAvailabilityDto>
							data={availabilitySlot}
							renderItem={renderItem}
							onRefresh={onRefresh}
							loading={isLoading}
							numColumns={1}
							itemHeight={120} // Customize the item height if needed
							listFooterComponent={<></>}
						/>
					</View>
					<View>
						<CustomButton
							title="Submit"
							handlePress={() => {
								// Handle submit logic here
								console.log(`Selected slot: ${selectedSlot}`)
							}}
							containerStyles={`border-primary border bg-primary
							p-3 w-full mt-2 flex flex-row self-center`}
							isLoading={isLoading}
							textStyles="text-sm text-white"
						/>
					</View>
				</View>
			</View>
		</SafeAreaView>
	)
}

export default AvailabilitySlotPage
