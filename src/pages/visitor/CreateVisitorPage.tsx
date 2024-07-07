import { View, Text, ScrollView, Platform } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import CustomButton from '@components/CustomButton'
import Iconicons from 'react-native-vector-icons/Ionicons'
import moment from 'moment'
import 'moment-timezone'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Picker } from '@react-native-picker/picker'
import DatePicker from '@react-native-community/datetimepicker'
import { useFacility } from '@zustand/facilityService/facility'
import { createVisitorConst } from '@config/constant/visitor'
import { VisitorCategoryList } from '@config/listOption/visitor'
import { ICountry } from 'react-native-international-phone-number'
import CustomFormField from '@components/CustomFormField'
// import Ionicons from 'react-native-vector-icons'

interface CreateVisitor {
	visitDate: Date
	visitTime: Date
	visitorCategory: string
	visitorName: string
	visitorPhoneNumber: string
	visitorCountryCode: ICountry
}

const CreateVisitorPage = () => {
	const [showCalendar, setShowCalendar] = useState(false)
	const [showTime, setShowTime] = useState(false)
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [CreateVisitor, setCreateVisitor] = useState({})

	const validationSchema = Yup.object().shape({
		visitDate: Yup.date().required('Visit date is required'),
		visitTime: Yup.date().required('Visit time is required'),
		visitorCategory: Yup.string().min(1).required('Visitor category is required'),
		visitorName: Yup.string().min(1).required('Visitor name is required'),
		visitorPhoneNumber: Yup.string().min(1).required('Visitor phone number is required'),
	})

	const formik = useFormik<CreateVisitor>({
		enableReinitialize: true,
		validateOnBlur: false,
		initialValues: createVisitorConst,
		validationSchema: validationSchema,
		onSubmit: async (values) => {
			console.log(values)
			// const response = await submitBooking({
			// 	facilityId: formik.values.facilityId,
			// 	startDate: formik.values.startDate.toISOString(),
			// 	endDate: formik.values.endDate.toISOString(),
			// 	numOfGuest: formik.values.numofGuest,
			// })
			// if (response.success) {
			// 	formik.resetForm()
			// 	router.push('/facilityHistory')
			// } else {
			// 	Alert.alert(response.msg)
			// }
			// setIsSubmitting(false)
		},
	})
	const submitBooking = useFacility((state) => state.submitBooking)
	const onDatePickerChange = (event, selectedDate: Date) => {
		formik.handleBlur('visitDate')
		if (event.type === 'dismissed') {
			setShowCalendar(false)
			return
		}
		formik.setFieldValue('visitDate', selectedDate)
		setShowCalendar(false)
	}

	const onTimePickerChange = (event, selectedTime) => {
		if (event.type === 'dismissed') {
			setShowTime(false)
			return
		}
		formik.setFieldValue('visitTime', selectedTime)
		setShowTime(false)
	}
	const [selectedCountry, setSelectedCountry] = useState(null)
	const [inputValue, setInputValue] = useState('')

	return (
		<SafeAreaView className="bg-slate-100 h-full">
			<ScrollView>
				<View className="w-full min-h-[85vh] px-4 my-6">
					<View className="flex flex-row items-center">
						<CustomButton
							containerStyles="items-center h-fit"
							handlePress={() => {
								router.push('/home')
							}}
							reactNativeIcons={<Iconicons name="arrow-back" color={'#000000'} size={24} />}
						/>
					</View>
					<Text className="text-3xl text-black font-bold mt-6">Register Visitor</Text>
					{/* Register Visitor Form */}
					<View>
						<View>
							<CustomFormField
								title="Visitor Name"
								textStyle="text-base font-bold mt-4"
								type="Text"
								textValue={formik.values.visitorName}
								onChangeText={(e) => {
									formik.setFieldValue('visitorName', e)
								}}
								placeholder={formik.values.visitorName}
								errorMessage={
									formik.touched.visitorName &&
									formik.errors.visitorName &&
									(formik.errors.visitorName as string)
								}
							/>
						</View>
						<View className="">
							<Text className="text-base font-bold mt-4">Visitor Category</Text>
							<View className="bg-white rounded-xl mt-2">
								<Picker
									selectedValue={formik.values.visitorCategory}
									onValueChange={(itemValue, itemIndex) => {
										formik.setFieldValue('visitorCategory', itemValue)
									}}
									onBlur={formik.handleBlur('visitorCategory')}
								>
									{VisitorCategoryList.map((x) => (
										<Picker.Item key={x.id} label={x.name} value={x.value} />
									))}
								</Picker>
							</View>
							{formik.touched.visitorCategory && formik.errors.visitorCategory && (
								<Text className="text-red-700 mt-2">{formik.errors.visitorCategory as string}</Text>
							)}
						</View>
						<View className="mt-4">
							<CustomFormField
								title="Contact Number"
								textStyle="text-base font-bold mt-4"
								type="Phone"
								selectedCountryCode={formik.values.visitorCountryCode}
								setSelectedCountryCode={(e) => {
									formik.setFieldValue('visitorCountryCode', e)
								}}
								phoneNumber={formik.values.visitorPhoneNumber}
								setPhoneNumber={(e) => {
									formik.setFieldValue('visitorPhoneNumber', e)
								}}
								errorMessage={
									formik.touched.visitorPhoneNumber &&
									formik.errors.visitorPhoneNumber &&
									(formik.errors.visitorPhoneNumber as string)
								}
							/>
						</View>
						<View className="flex flex-row gap-4 mt-1">
							<View className="flex-1">
								<Text className="text-base font-bold">Visit Date</Text>
								<CustomButton
									containerStyles="items-center flex-row justify-between h-fit bg-white p-4 mt-3"
									handlePress={() => {
										setShowCalendar(true)
									}}
									title={
										formik.values.visitDate
											? moment(formik.values.visitDate)
													.tz('Asia/Kuala_Lumpur')
													.format('DD MMM YYYY')
											: '-'
									}
									reactNativeIcons={<Iconicons name="caret-down" color={'#000000'} size={14} />}
									textStyles="text-sm text-black"
								/>
								{showCalendar && (
									<>
										{Platform.OS === 'ios' ? (
											<DatePicker
												mode="date"
												timeZoneName="Asia/Kuala_Lumpur"
												value={
													formik.values.visitDate ? formik.values.visitDate : moment().toDate()
												}
												display="spinner"
												minimumDate={moment().tz('Asia/Kuala_Lumpur').toDate()}
												maximumDate={moment().tz('Asia/Kuala_Lumpur').add(2, 'week').toDate()}
												onChange={onDatePickerChange}
											/>
										) : (
											<DatePicker
												mode="date"
												timeZoneName="Asia/Kuala_Lumpur"
												value={formik.values.visitDate ? formik.values.visitDate : new Date()}
												display="calendar"
												minimumDate={moment().tz('Asia/Kuala_Lumpur').toDate()}
												maximumDate={moment().tz('Asia/Kuala_Lumpur').add(2, 'week').toDate()}
												onChange={onDatePickerChange}
											/>
										)}
									</>
								)}
							</View>
							<View className="flex-1">
								<Text className="text-base font-bold">Visit Time</Text>
								<CustomButton
									containerStyles="items-center flex-row justify-between h-fit bg-white p-4 mt-3"
									handlePress={() => {
										setShowTime(true)
									}}
									title={
										formik.values.visitTime
											? moment(formik.values.visitTime).tz('Asia/Kuala_Lumpur').format('HH:mm')
											: '-'
									}
									reactNativeIcons={<Iconicons name="caret-down" color={'#000000'} size={14} />}
									textStyles="text-sm text-black"
								/>
								{showTime && (
									<>
										{Platform.OS === 'ios' ? (
											<DatePicker
												timeZoneName="Asia/Kuala_Lumpur"
												mode="time"
												value={
													formik.values.visitTime ? formik.values.visitTime : moment().toDate()
												}
												display="spinner"
												is24Hour={true}
												onChange={onTimePickerChange}
											/>
										) : (
											<DatePicker
												timeZoneName="Asia/Kuala_Lumpur"
												mode="time"
												value={
													formik.values.visitTime ? formik.values.visitTime : moment().toDate()
												}
												display="spinner"
												is24Hour={true}
												onChange={onTimePickerChange}
											/>
										)}
									</>
								)}
								{formik.errors.visitTime && (
									<Text className="text-red-700 text-xs">{formik.errors.visitTime as string}</Text>
								)}
							</View>
						</View>
						<CustomButton
							title="Submit"
							handlePress={formik.handleSubmit}
							containerStyles="bg-primary p-4 w-full mt-8 self-center"
							isLoading={isSubmitting}
							textStyles="text-sm text-white"
						/>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	)
}

export default CreateVisitorPage
