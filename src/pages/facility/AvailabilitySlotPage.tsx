import { View, Text, ScrollView, Platform, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Iconicons from 'react-native-vector-icons/Ionicons'
import CustomButton from '@components/buttons/CustomButton'
import { router } from 'expo-router'
import { BookingDurationList, FacilityList, GuestList } from '@config/listOption/facility'
import moment from 'moment-timezone'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useFacility } from '@zustand/facility/useFacility'
import { facilityBookingConst } from '@config/constant/facilities'
import CustomFormField from '@components/form/CustomFormField'
import { useApplication } from '@zustand/index'
import { getLocalDateString, getTodayDate, getUTCDateString } from '../../helpers/time'
import { ITimeFormat } from '@config/constant'
import CustomImageSlider from '@components/slider/CustomImageSlider'

interface FacilityBooking {
	facilityId: string
	startDate: Date
	duration: number
	numofGuest: number
}

const AvailabilitySlotPage = () => {
	const [facilityId, setFacilityId] = useState('BC')
	const [showCalendar, setShowCalendar] = useState(false)
	const { isLoading, setIsLoading } = useApplication()
	const { submitBooking } = useFacility()
	const validationSchema = Yup.object().shape({
		facilityId: Yup.string().required('Date is required'),
		startDate: Yup.date()
			.required('Start time is required')
			.min(getTodayDate(), 'Start date must be after now'),
		duration: Yup.number().required('Booking duration is required'),
		numofGuest: Yup.number().required('Number of guest is required'),
	})

	const formik = useFormik<FacilityBooking>({
		enableReinitialize: true,
		validateOnBlur: false,
		initialValues: facilityBookingConst,
		validationSchema: validationSchema,
		onSubmit: async (values) => {
			setIsLoading(true)
			const response = await submitBooking({
				facilityId: values.facilityId,
				startDate: getUTCDateString(formik.values.startDate, ITimeFormat.dateTime),
				endDate: getUTCDateString(
					moment(formik.values.startDate).add(formik.values.duration, 'hours').toDate(),
					ITimeFormat.dateTime,
				),
				numOfGuest: values.numofGuest,
			})
			if (response.success) {
				formik.resetForm()
				router.push('/facility/history')
			} else {
				Alert.alert(response.msg)
			}
			setIsLoading(false)
		},
	})

	useEffect(() => {
		formik.setFieldValue('facilityId', facilityId)
	}, [facilityId])

	const onDatePickerChange = (selectedDate: Date) => {
		formik.handleBlur('selectedDate')
		formik.setFieldValue('startDate', selectedDate)
	}

	return (
		<SafeAreaView className="bg-slate-100 h-full px-4">
			<ScrollView>
				<View className="w-full min-h-[85vh] my-6">
					<View className="flex flex-row items-center justify-between">
						<CustomButton
							containerStyles="items-center h-fit"
							handlePress={() => {
								router.push('/home')
							}}
							rightReactNativeIcons={<Iconicons name="arrow-back" color={'#000000'} size={24} />}
						/>
						<CustomButton
							containerStyles="items-center h-fit"
							handlePress={() => {
								router.push('/facility/history')
							}}
							title="View history"
							textStyles="text-sm text-gray-500"
						/>
					</View>
					<Text className="text-4xl text-black font-bold mt-6">Facilities</Text>
					<CustomImageSlider
						item={FacilityList}
						onChangeIndex={setFacilityId}
						containerStyle="my-4"
					/>
					<CustomFormField
						title="Booking Date"
						textStyle="text-base font-bold"
						type="DateTime"
						selectedDate={formik.values.startDate ? formik.values.startDate : moment().toDate()}
						onChange={onDatePickerChange}
						buttonTitle={getLocalDateString(formik.values.startDate, ITimeFormat.dateTime)}
						minimumDate={moment().toDate()}
						maximumDate={moment().add(2, 'week').toDate()}
						mode="datetime"
						errorMessage={
							formik.touched.startDate &&
							formik.errors.startDate &&
							(formik.errors.startDate as string)
						}
						setShowDateTime={setShowCalendar}
						showDateTime={showCalendar}
						placeholder={'Select booking date'}
					/>
					<CustomFormField
						containerStyle="mt-4"
						title="Duration"
						textStyle="text-base font-bold"
						type="Picker"
						selectedValue={formik.values.duration}
						onValueChange={(e) => {
							formik.setFieldValue('duration', e)
						}}
						items={BookingDurationList}
						errorMessage={
							formik.touched.duration &&
							formik.errors.duration &&
							(formik.errors.duration as string)
						}
						placeholder={'Select booking duration'}
					/>
					<CustomFormField
						containerStyle="my-4"
						title="Number of Guests"
						textStyle="text-base font-bold"
						type="Picker"
						selectedValue={formik.values.numofGuest}
						onValueChange={(e) => {
							formik.setFieldValue('numofGuest', e)
						}}
						items={GuestList}
						errorMessage={
							formik.touched.numofGuest &&
							formik.errors.numofGuest &&
							(formik.errors.numofGuest as string)
						}
						placeholder={'Select number of guests'}
					/>
					<CustomButton
						title="Submit"
						handlePress={formik.handleSubmit}
						containerStyles="border-primary border bg-primary p-3 w-full mt-2 flex flex-row self-center"
						isLoading={isLoading}
						textStyles="text-sm text-white"
					/>
				</View>
			</ScrollView>
		</SafeAreaView>
	)
}

export default AvailabilitySlotPage
