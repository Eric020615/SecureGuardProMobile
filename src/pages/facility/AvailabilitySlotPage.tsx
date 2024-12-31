import { View, Text, ListRenderItem, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomButton from '@components/buttons/CustomButton'
import { router, useLocalSearchParams } from 'expo-router'
import CustomFlatList from '@components/list/CustomFlatList'
import Ionicons from 'react-native-vector-icons/Ionicons'
import moment from 'moment'
import { ITimeFormat } from '@config/constant'
import CheckBox from '@react-native-community/checkbox'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { convertDateStringToDate, convertDateToDateString, getCurrentDate } from '@helpers/time'
import { SpaceAvailabilityDto } from '@dtos/facility/facility.dto'
import { useFacility } from '@store/facility/useFacility'
import { useApplication } from '@store/application/useApplication'
import ActionConfirmationModal from '@components/modals/ActionConfirmationModal'
import { FacilityDescriptionEnum } from '@config/constant/facilities'

interface FacilityBooking {
	facilityId: keyof typeof FacilityDescriptionEnum
	spaceId: string
	startDate: Date
	endDate: Date
	numOfGuest: number
}

const AvailabilitySlotPage = () => {
	const { id, startDate, duration, numOfGuest } = useLocalSearchParams()
	const [selectedSlot, setSelectedSlot] = useState<number | null>(null) // State to track selected slot
	const { availabilitySlot, checkAvailabilitySlotAction, submitBookingAction } = useFacility()
	const { isLoading } = useApplication()

	useEffect(() => {
		formik.setFieldValue('facilityId', id)
		formik.setFieldValue('startDate', convertDateStringToDate(startDate as string))
		formik.setFieldValue(
			'endDate',
			moment(startDate)
				.add(duration as string, 'hours')
				.format(ITimeFormat.dateTime),
		),
			formik.setFieldValue('numOfGuest', parseInt(numOfGuest as string))
		fetchAvailabilitySlot()
	}, [id, startDate, duration, numOfGuest])

	const fetchAvailabilitySlot = async () => {
		await checkAvailabilitySlotAction(
			formik.values.facilityId,
			convertDateToDateString(formik.values.startDate, ITimeFormat.isoDateTime),
			convertDateToDateString(formik.values.endDate, ITimeFormat.isoDateTime),
		)
	}

	const handleSlotSelection = (index: number, space: string) => {
		if (selectedSlot === index) {
			setSelectedSlot(null)
			formik.setFieldValue('spaceId', null)
		} else {
			setSelectedSlot(index)
			formik.setFieldValue('spaceId', space)
		}
	}

	const validationSchema = Yup.object().shape({
		facilityId: Yup.string().required('Please select a facility to proceed.'),
		startDate: Yup.date()
			.required('Please select a start date and time for your booking.')
			.min(getCurrentDate(), 'Start time cannot be in the past, please select a valid future date and time'),
		endDate: Yup.date()
			.required('Please select a start date and time for your booking.')
			.min(Yup.ref('startDate'), 'End time cannot be before the start time, please select a valid end time.'),
		numOfGuest: Yup.number().required('Please select the number of guests for your booking.'),
		spaceId: Yup.string().required('Please select a slot to proceed.'),
	})

	const formik = useFormik<FacilityBooking>({
		enableReinitialize: true,
		validateOnBlur: false,
		initialValues: {
			facilityId: id as keyof typeof FacilityDescriptionEnum,
			startDate: convertDateStringToDate(startDate as string),
			endDate: moment(startDate as string)
				.add(duration as string, 'hours')
				.toDate(),
			numOfGuest: parseInt(numOfGuest as string),
			spaceId: '',
		},
		validationSchema: validationSchema,
		onSubmit: async (values) => {
			console.log('values', values)
			await submitBookingAction({
				facilityId: values.facilityId,
				startDate: convertDateToDateString(values.startDate, ITimeFormat.isoDateTime),
				endDate: convertDateToDateString(values.endDate, ITimeFormat.isoDateTime),
				numOfGuest: values.numOfGuest,
				spaceId: values.spaceId,
			})
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
					<Text className="mt-2 font-semibold text-white">{item.isBooked ? 'Booked' : 'Available'}</Text>
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
			<ActionConfirmationModal
				onSuccessConfirm={() => {
					formik.resetForm()
					router.push('/facility/history')
				}}
			/>
			<View className="flex-1">
				<View className="w-full min-h-[85vh] my-6">
					<View className="flex flex-row items-center">
						<CustomButton
							containerStyles="items-center h-fit"
							handlePress={() => {
								router.push('/facility/create')
							}}
							rightReactNativeIcons={<Ionicons name="arrow-back" color={'#000000'} size={24} />}
						/>
					</View>
					<Text className="text-4xl text-black font-bold mt-6">Book Slot</Text>
					<View style={{ marginTop: 10 }}>
						<View className="flex flex-row items-center gap-1">
							<Ionicons name="location-sharp" color={'#2A5D4F'} size={24} />
							<Text className="text-lg text-black">{FacilityDescriptionEnum[id as string]}</Text>
						</View>
						<View className="flex flex-row items-center gap-1">
							<Ionicons name="calendar-outline" color={'#10312B'} size={24} />
							<Text className="text-lg text-black">{startDate}</Text>
						</View>
						<View className="flex flex-row items-center gap-1">
							<Ionicons name="calendar-outline" color={'#B75E2A'} size={24} />
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
						{formik.touched.spaceId && formik.errors.spaceId && (formik.errors.spaceId as string) && (
							<Text className="text-red-500 text-sm mt-4">{formik.errors.spaceId}</Text>
						)}
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
