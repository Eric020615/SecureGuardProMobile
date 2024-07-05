import { View, Text, ScrollView, Platform, Alert } from 'react-native'
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
import PhoneInput from 'react-native-phone-input'
import CustomFormField from '@components/CustomFormField'

interface CreateVisitor {
	visitDate: Date
	visitTime: Date
	visitorCategory: string
	visitorName: string
	visitorContactNumber: string
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
		visitorContactNumber: Yup.string().min(1).required('Visitor contact number is required'),
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
	console.log(formik.errors.visitDate)
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
								handleChangeText={(e) => {
									formik.setFieldValue('visitorName', e)
								}}
								title='Visitor Name'
								textStyle='text-base font-bold mt-4'
								value={formik.values.visitorName}
								placeholder={formik.values.visitorName}
								errorMessage={formik.touched.visitorName && formik.errors.visitorName && (
									formik.errors.visitorName as string
								)}
							/>
						</View>
						<View>
							<Text className="text-base font-bold mt-4">Visitor Category</Text>
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
							{formik.touched.visitorCategory && formik.errors.visitorCategory && (
								<Text className="text-red-700">{formik.errors.visitorCategory as string}</Text>
							)}
						</View>
						<View>
							<Text className="text-base font-bold mt-4">Contact Number</Text>
							<View className='border bg-primary rounded-xl border-gray-100 p-[10px] mb-5'>
								<PhoneInput
									initialCountry="my"
									allowZeroAfterCountryCode={true}
									onChangePhoneNumber={(phoneNumber) => {
										formik.setFieldValue('visitorContactNumber', phoneNumber)
									}}
									textProps={{
										placeholder: 'Contact Number',
										value: `${formik.values.visitorContactNumber}`,
										keyboardType: 'phone-pad',
									}}
									textStyle={{
										color: "#FFFFFF"
									}}
								/>
							</View>
							{formik.touched.visitorCategory && formik.errors.visitorCategory && (
								<Text className="text-red-700">{formik.errors.visitorCategory as string}</Text>
							)}
						</View>
						<View>
							<Text className="text-base font-bold mt-4">Select Date</Text>
							<CustomButton
								containerStyles="items-center h-fit bg-primary p-3 w-full mt-3"
								handlePress={() => {
									setShowCalendar(true)
								}}
								title={
									formik.values.visitDate
										? moment(formik.values.visitDate).tz('Asia/Kuala_Lumpur').format('DD MMM YYYY')
										: '-'
								}
								textStyles="text-sm text-white"
							/>
							{showCalendar && (
								<>
									{Platform.OS === 'ios' ? (
										<DatePicker
											mode="date"
											timeZoneName="Asia/Kuala_Lumpur"
											value={formik.values.visitDate ? formik.values.visitDate : moment().toDate()}
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
						<View className="flex flex-row gap-3 mt-4">
							<View className="flex-1">
								<Text className="text-base font-bold">Visit Time</Text>
								<CustomButton
									containerStyles="items-center h-fit bg-primary p-3 mt-3"
									handlePress={() => {
										setShowTime(true)
									}}
									title={
										formik.values.visitTime
											? moment(formik.values.visitTime).tz('Asia/Kuala_Lumpur').format('HH:mm')
											: '-'
									}
									textStyles="text-sm text-white"
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
							containerStyles="border-primary border bg-white p-3 w-full mt-4 flex flex-row self-center"
							isLoading={isSubmitting}
							textStyles="text-sm text-primary"
						/>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	)
}

export default CreateVisitorPage
