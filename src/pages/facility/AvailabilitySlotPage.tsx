import { View, Text, ListRenderItem, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomButton from '@components/buttons/CustomButton'
import { router, useLocalSearchParams } from 'expo-router'
import { useFacility } from '@zustand/facility/useFacility'
import { useApplication } from '@zustand/index'
import { SpaceAvailabilityDto } from '@zustand/types'
import CustomFlatList from '@components/list/CustomFlatList'
import Iconicons from 'react-native-vector-icons/Ionicons'
import { facilityBookingSubmissionConst, FacilityConst } from '@config/constant/facilities'
import moment from 'moment'
import { ITimeFormat } from '@config/constant'
import CheckBox from '@react-native-community/checkbox'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import {
	convertDateStringToDate,
	convertLocalDateStringToUTCString,
	getTodayDate,
	getUTCDateString,
} from '../../helpers/time'

interface FacilityBooking {
	facilityId: string
	startDate: Date
	endDate: Date
	numOfGuest: number
	space: string
}

const AvailabilitySlotPage = () => {
	const { isLoading, setIsLoading } = useApplication()
	const { submitBooking } = useFacility()
	const { facilityId, startDate, duration, numOfGuest } = useLocalSearchParams()
	const { checkAvailabilitySlotAction } = useFacility()
	const [availabilitySlot, setAvailabilitySlot] = useState<SpaceAvailabilityDto[]>([])
	const [selectedSlot, setSelectedSlot] = useState<number | null>(null) // State to track selected slot

	useEffect(() => {
		formik.setFieldValue('facilityId', facilityId)
		formik.setFieldValue('startDate', convertDateStringToDate(startDate as string))
		formik.setFieldValue(
			'endDate',
			moment(startDate)
				.add(duration as string, 'hours')
				.format(ITimeFormat.dateTime),
		),
			formik.setFieldValue('numOfGuest', parseInt(numOfGuest as string))
		fetchAvailabilitySlot()
	}, [facilityId, startDate, duration, numOfGuest])

	const fetchAvailabilitySlot = async () => {
		try {
			setIsLoading(true)
			if (!facilityId || !startDate || !duration) return
			const response = await checkAvailabilitySlotAction(
				formik.values.facilityId,
				getUTCDateString(formik.values.startDate, ITimeFormat.dateTime),
				getUTCDateString(formik.values.endDate, ITimeFormat.dateTime),
			)
			if (response.success) {
				setAvailabilitySlot(response.data)
			}
		} catch (error) {
		} finally {
			setIsLoading(false)
		}
	}

	const handleSlotSelection = (index: number, spaceId: string) => {
		if (selectedSlot === index) {
			setSelectedSlot(null)
		} else {
			setSelectedSlot(index)
			formik.setFieldValue('space', spaceId)
		}
	}

	const validationSchema = Yup.object().shape({
		facilityId: Yup.string().required('Please select a facility to proceed.'),
		startDate: Yup.date()
			.required('Please select a start date and time for your booking.')
			.min(
				getTodayDate(),
				'Start time cannot be in the past, please select a valid future date and time',
			),
		endDate: Yup.date()
			.required('Please select a start date and time for your booking.')
			.min(
				Yup.ref('startDate'),
				'End time cannot be before the start time, please select a valid end time.',
			),
		numOfGuest: Yup.number().required('Please select the number of guests for your booking.'),
		space: Yup.string().required('Please select a slot to proceed.'),
	})

	const formik = useFormik<FacilityBooking>({
		enableReinitialize: true,
		validateOnBlur: false,
		initialValues: facilityBookingSubmissionConst,
		validationSchema: validationSchema,
		onSubmit: async (values) => {
			try {
				setIsLoading(true)
				const response = await submitBooking({
					facilityId: values.facilityId,
					startDate: getUTCDateString(values.startDate, ITimeFormat.dateTime),
					endDate: getUTCDateString(values.endDate, ITimeFormat.dateTime),
					numOfGuest: values.numOfGuest,
					spaceId: values.space,
				})
				if (response.success) {
					formik.resetForm()
					router.push('/facility/history')
				} else {
					Alert.alert(
						'Booking Error', // Title
						response.msg || 'Something went wrong. Please try again.', // Message
						[{ text: 'OK' }], // Buttons array
					)
				}
			} catch (error) {
				console.log(error)
			} finally {
				setIsLoading(false)
			}
		},
	})

	const renderItem: ListRenderItem<SpaceAvailabilityDto> = ({ item, index }) => (
		<TouchableOpacity
			className={`p-4 my-2 rounded-xl shadow-md ${
				item.isBooked
					? 'bg-red-700 opacity-70'
					: selectedSlot === index
					? 'bg-primary'
					: 'bg-green-700 border-green-800'
			}`}
			onPress={() => handleSlotSelection(index, item.spaceId)} // Handle slot selection/deselection
			disabled={item.isBooked} // Disable if booked
			key={index}
		>
			<View className="flex flex-row justify-between items-center">
				<View className="flex-row items-center gap-2">
					<CheckBox
						disabled={item.isBooked}
						value={selectedSlot === index}
						onValueChange={() => handleSlotSelection(index, item.spaceId)}
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
				<View className="w-full min-h-[85vh] my-6">
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
							handlePress={formik.handleSubmit}
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
