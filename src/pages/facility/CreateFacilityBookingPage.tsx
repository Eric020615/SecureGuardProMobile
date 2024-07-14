import { View, Text, ScrollView, Platform, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Iconicons from 'react-native-vector-icons/Ionicons'
import CustomButton from '@components/buttons/CustomButton'
import CustomSwiper from '@components/form/CustomSwiper'
import { router } from 'expo-router'
import { FacilityList, GuestList } from '@config/listOption/facility'
import DatePicker from '@react-native-community/datetimepicker'
import moment from 'moment'
import 'moment-timezone'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useFacility } from '@zustand/facilityService/facility'
import { facilityBookingConst } from '@config/constant/facilities'
import CustomFormField from '@components/form/CustomFormField'

interface FacilityBooking {
	facilityId: string
	startDate: Date
	endDate: Date
	numofGuest: number
}

const CreateFacilityBookingPage = () => {
	const [facilityId, setFacilityId] = useState('BC')
	const [showCalendar, setShowCalendar] = useState(false)
	const [showStartTime, setShowStartTime] = useState(false)
	const [showEndTime, setShowEndTime] = useState(false)
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [isEndTimeTouched, setisEndTimeTouched] = useState(false)

	const validationSchema = Yup.object().shape({
		facilityId: Yup.string().required('Date is required'),
		startDate: Yup.date().required('Start time is required'),
		endDate: Yup.date()
			.required('End time is required')
			.min(Yup.ref('startDate'), 'End date must be after start date'),
		numofGuest: Yup.number().required('Number of guest is required'),
	})

	const formik = useFormik<FacilityBooking>({
		enableReinitialize: true,
		validateOnBlur: false,
		initialValues: facilityBookingConst,
		validationSchema: validationSchema,
		onSubmit: async (values) => {
			const response = await submitBooking({
				facilityId: values.facilityId,
				startDate: values.startDate.toISOString(),
				endDate: values.endDate.toISOString(),
				numOfGuest: values.numofGuest,
			})
			if (response.success) {
				formik.resetForm()
				router.push('/facilityHistory')
			} else {
				Alert.alert(response.msg)
			}
			setIsSubmitting(false)
		},
	})

	const submitBooking = useFacility((state) => state.submitBooking)

	useEffect(() => {
		formik.setFieldValue('facilityId', facilityId)
	}, [facilityId])

	const onDatePickerChange = (event, selectedDate: Date) => {
		formik.handleBlur('startDate')
		if (event.type === 'dismissed') {
			setShowCalendar(false)
			return
		}
		formik.setFieldValue('startDate', selectedDate)
		formik.setFieldValue('endDate', selectedDate)
		setShowCalendar(false)
	}

	const onStartTimePickerChange = (event, selectedTime) => {
		if (event.type === 'dismissed') {
			setShowStartTime(false)
			return
		}
		formik.setFieldValue('startDate', selectedTime)
		setShowStartTime(false)
	}

	const onEndTimePickerChange = (event, selectedTime) => {
		setisEndTimeTouched(true)
		if (event.type === 'dismissed') {
			setShowEndTime(false)
			return
		}
		formik.setFieldValue('endDate', selectedTime)
		setShowEndTime(false)
	}

	return (
		<SafeAreaView className="bg-slate-100 h-full">
			<ScrollView>
				<View className="w-full min-h-[85vh] px-4 my-6">
					<View className="flex flex-row items-center justify-between">
						<CustomButton
							containerStyles="items-center h-fit"
							handlePress={() => {
								router.push('/home')
							}}
							reactNativeIcons={<Iconicons name="arrow-back" color={'#000000'} size={24} />}
						/>
						<CustomButton
							containerStyles="items-center h-fit"
							handlePress={() => {
								router.push('/facilityHistory')
							}}
							title="View history"
							textStyles="text-sm text-gray-500"
						/>
					</View>
					<Text className="text-4xl text-black font-bold mt-6">Facilities</Text>
					<CustomSwiper item={FacilityList} onChangeIndex={setFacilityId} />
					{/* form */}
					{Platform.OS === 'ios' ? (
						<CustomFormField
							title="Booking Date"
							textStyle="text-base font-bold"
							type="DateTime"
							platform="ios"
							selectedDate={formik.values.startDate ? formik.values.startDate : moment().toDate()}
							onChange={onDatePickerChange}
							buttonTitle={
								formik.values.startDate
									? moment(formik.values.startDate).tz('Asia/Kuala_Lumpur').format('DD MMM YYYY')
									: '-'
							}
							display="spinner"
							minimumDate={moment().tz('Asia/Kuala_Lumpur').toDate()}
							maximumDate={moment().tz('Asia/Kuala_Lumpur').add(2, 'week').toDate()}
							mode="date"
							errorMessage={
								formik.touched.startDate &&
								formik.errors.startDate &&
								(formik.errors.startDate as string)
							}
							timeZoneName="Asia/Kuala_Lumpur"
							setShowDateTime={setShowCalendar}
							showDateTime={showCalendar}
						/>
					) : (
						<CustomFormField
							title="Booking Date"
							textStyle="text-base font-bold"
							type="DateTime"
							platform="android"
							selectedDate={formik.values.startDate ? formik.values.startDate : moment().toDate()}
							onChange={onDatePickerChange}
							buttonTitle={
								formik.values.startDate
									? moment(formik.values.startDate).tz('Asia/Kuala_Lumpur').format('DD MMM YYYY')
									: '-'
							}
							display="calendar"
							minimumDate={moment().tz('Asia/Kuala_Lumpur').toDate()}
							maximumDate={moment().tz('Asia/Kuala_Lumpur').add(2, 'week').toDate()}
							mode="date"
							errorMessage={
								formik.touched.startDate &&
								formik.errors.startDate &&
								(formik.errors.startDate as string)
							}
							timeZoneName="Asia/Kuala_Lumpur"
							setShowDateTime={setShowCalendar}
							showDateTime={showCalendar}
						/>
					)}
					<View className="flex flex-row gap-3 mt-1">
						<View className="flex-1">
							<Text className="text-base font-bold">Start Time</Text>
							<CustomButton
								containerStyles="items-center h-fit bg-primary p-3 mt-3"
								handlePress={() => {
									setShowStartTime(true)
								}}
								title={
									formik.values.startDate
										? moment(formik.values.startDate).tz('Asia/Kuala_Lumpur').format('HH:mm')
										: '-'
								}
								textStyles="text-sm text-white"
							/>
							{showStartTime && (
								<>
									{Platform.OS === 'ios' ? (
										<DatePicker
											timeZoneName="Asia/Kuala_Lumpur"
											mode="time"
											value={formik.values.startDate ? formik.values.startDate : moment().toDate()}
											display="spinner"
											is24Hour={true}
											onChange={onStartTimePickerChange}
										/>
									) : (
										<DatePicker
											timeZoneName="Asia/Kuala_Lumpur"
											mode="time"
											value={formik.values.startDate ? formik.values.startDate : moment().toDate()}
											display="spinner"
											is24Hour={true}
											onChange={onStartTimePickerChange}
										/>
									)}
								</>
							)}
						</View>
						<View className="flex-1">
							<Text className="text-base font-bold">End Time</Text>
							<CustomButton
								containerStyles="items-center h-fit bg-primary p-3 mt-3"
								handlePress={() => {
									setShowEndTime(true)
								}}
								title={
									formik.values.endDate
										? moment(formik.values.endDate).tz('Asia/Kuala_Lumpur').format('HH:mm')
										: '-'
								}
								textStyles="text-sm text-white"
							/>
							{showEndTime && (
								<>
									{Platform.OS === 'ios' ? (
										<DatePicker
											timeZoneName="Asia/Kuala_Lumpur"
											mode="time"
											value={formik.values.endDate ? formik.values.endDate : new Date()}
											display="spinner"
											is24Hour={true}
											onChange={onEndTimePickerChange}
										/>
									) : (
										<DatePicker
											timeZoneName="Asia/Kuala_Lumpur"
											mode="time"
											value={formik.values.endDate ? formik.values.endDate : new Date()}
											display="spinner"
											is24Hour={true}
											onChange={onEndTimePickerChange}
										/>
									)}
								</>
							)}
							{isEndTimeTouched && formik.errors.endDate && (
								<Text className="text-red-700 text-xs">{formik.errors.endDate as string}</Text>
							)}
						</View>
					</View>
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
					/>
					<CustomButton
						title="Submit"
						handlePress={formik.handleSubmit}
						containerStyles="border-primary border bg-white p-3 w-full mt-2 flex flex-row self-center"
						isLoading={isSubmitting}
						textStyles="text-sm text-primary"
					/>
				</View>
			</ScrollView>
		</SafeAreaView>
	)
}

export default CreateFacilityBookingPage
