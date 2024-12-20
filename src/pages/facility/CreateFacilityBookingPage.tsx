import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Ionicons from 'react-native-vector-icons/Ionicons'
import CustomButton from '@components/buttons/customButton/CustomButton'
import { router } from 'expo-router'
import { BookingDurationList, FacilityOptions, GuestList } from '@config/listOption/facility'
import moment from 'moment-timezone'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { facilityBookingSlotCheckConst, FacilityDescriptionEnum } from '@config/constant/facilities'
import CustomFormField from '@components/form/CustomFormField'
import { ITimeFormat } from '@config/constant'
import CustomImageSlider from '@components/slider/CustomImageSlider'
import { useApplication } from '@store/application/useApplication'
import ActionConfirmationModal from '@components/modals/ActionConfirmationModal'
import { useModal } from '@store/modal/useModal'
import { convertDateToDateString, getCurrentDate } from '@helpers/time'

interface FacilityBooking {
	facility: keyof typeof FacilityDescriptionEnum
	startDate: Date
	duration: number
	numOfGuest: number
}

const CreateFacilityBookingPage = () => {
	const [facility, setfacility] = useState('BC')
	const [showCalendar, setShowCalendar] = useState(false)
	const { isLoading, setIsLoading } = useApplication()
	const { setActionConfirmModalAction } = useModal()
	const validationSchema = Yup.object().shape({
		facility: Yup.string().required('Date is required'),
		startDate: Yup.date()
			.required('Start time is required')
			.min(getCurrentDate(), 'Start date must be after now'),
		duration: Yup.number().required('Booking duration is required'),
		numOfGuest: Yup.number().required('Number of guest is required'),
	})

	const formik = useFormik<FacilityBooking>({
		enableReinitialize: true,
		validateOnBlur: false,
		initialValues: facilityBookingSlotCheckConst,
		validationSchema: validationSchema,
		onSubmit: async (values) => {
			try {
				setIsLoading(true)
				router.push(
					`/facility/${values.facility}/${convertDateToDateString(
						values.startDate,
						ITimeFormat.dateTime,
					)}/${values.duration}/${values.numOfGuest}/check`,
				)
			} catch (error) {
				setActionConfirmModalAction({
					title: 'Error',
					subtitle: 'An error occurred while processing your request',
					isError: true,
				})
			} finally {
				setIsLoading(false)
			}
		},
	})

	useEffect(() => {
		formik.setFieldValue('facility', facility)
	}, [facility])

	const onDatePickerChange = (selectedDate: Date) => {
		formik.handleBlur('selectedDate')
		formik.setFieldValue('startDate', selectedDate)
	}

	return (
		<SafeAreaView className="bg-slate-100 h-full">
			<ActionConfirmationModal />
			<ScrollView className="px-4">
				{/* Adding horizontal padding */}
				<View className="w-full min-h-[85vh] my-6">
					<View className="flex flex-row items-center justify-between">
						<CustomButton
							containerStyles="items-center h-fit"
							handlePress={() => {
								router.push('/home')
							}}
							rightReactNativeIcons={<Ionicons name="arrow-back" color={'#000000'} size={24} />}
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
					<View className="items-center my-4">
						{/* Centering image slider */}
						<CustomImageSlider
							item={FacilityOptions}
							onChangeIndex={setfacility}
							containerStyle="w-full" // Ensure slider takes full width
						/>
					</View>
					<View>
						{/* Horizontal padding for form */}
						<CustomFormField
							title="Booking Date"
							textStyle="text-base font-bold"
							type="DateTime"
							selectedDate={
								formik.values.startDate
									? formik.values.startDate
									: moment().add(1, 'minute').toDate()
							}
							onChange={onDatePickerChange}
							buttonTitle={convertDateToDateString(formik.values.startDate, ITimeFormat.dateTime)}
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
							selectedValue={formik.values.numOfGuest}
							onValueChange={(e) => {
								formik.setFieldValue('numOfGuest', e)
							}}
							items={GuestList}
							errorMessage={
								formik.touched.numOfGuest &&
								formik.errors.numOfGuest &&
								(formik.errors.numOfGuest as string)
							}
							placeholder={'Select number of guests'}
						/>
						<CustomButton
							title="Check"
							handlePress={formik.handleSubmit}
							containerStyles="border-primary border bg-primary p-3 w-full mt-2 flex flex-row self-center"
							isLoading={isLoading}
							textStyles="text-sm text-white"
						/>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	)
}

export default CreateFacilityBookingPage
