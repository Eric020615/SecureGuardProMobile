import { View, Text, ScrollView, Platform, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomButton from '@components/buttons/CustomButton'
import Iconicons from 'react-native-vector-icons/Ionicons'
import 'moment-timezone'
import { router, useLocalSearchParams } from 'expo-router'
import moment from 'moment'
import 'moment-timezone'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { createVisitorConst, VisitorEnum } from '@config/constant/visitor'
import { VisitorCategoryList } from '@config/listOption/visitor'
import { ICountry } from 'react-native-international-phone-number'
import CustomFormField from '@components/form/CustomFormField'
import { CountryCode, parsePhoneNumberFromString } from 'libphonenumber-js'
import { useVisitor } from '@zustand/visitor/useVisitor'
import { GetVisitorDto } from '@zustand/types'

interface VisitorDetails {
	visitDate: Date
	visitTime: Date
	visitorCategory: VisitorEnum
	visitorName: string
	visitorCountryCode: ICountry
	visitorPhoneNumber: string
}

const VisitorDetailsPage = () => {
	const [showCalendar, setShowCalendar] = useState(false)
	const [showTime, setShowTime] = useState(false)
	const [isSubmitting, setIsSubmitting] = useState(false)
    const { getVisitorDetailsByIdAction } = useVisitor();
    const [visitorDetails, seVisitorDetails] = useState<GetVisitorDto>()
    const {id} = useLocalSearchParams();
    useEffect(() => {
        getData(id as string)
    }, [id])
    useEffect(() => {
        console.log(visitorDetails)
    }, [visitorDetails])
    const getData = async (id: string) => {
        const response = await getVisitorDetailsByIdAction(id);
        if(response.success){
            seVisitorDetails(response.data)
        }
        else {
            console.log(response.msg)
        }
    }

	const validationSchema = Yup.object().shape({
		visitDate: Yup.date().required('Visit date is required'),
		visitTime: Yup.date().required('Visit time is required'),
		visitorCategory: Yup.string().min(1).required('Visitor category is required'),
		visitorName: Yup.string().min(1).required('Visitor name is required'),
		visitorPhoneNumber: Yup.string()
			.required('Visitor phone number is required')
			.test('is-valid-phone', 'Phone number is not valid', (value) => {
				if (!value) return false
				const phone = parsePhoneNumberFromString(
					value,
					formik.values.visitorCountryCode.cca2 as CountryCode,
				)
				return phone ? phone.isValid() : false
			}),
	})
	const formik = useFormik<VisitorDetails>({
		enableReinitialize: true,
		validateOnBlur: false,
		initialValues: createVisitorConst,
		validationSchema: validationSchema,
		onSubmit: async (values) => {
			// const response = await createVisitor({
			// 	visitorName: values.visitorName,
			// 	visitorCategory: values.visitorCategory,
			// 	visitorContactNumber: values.visitorCountryCode.callingCode + values.visitorPhoneNumber,
			// 	visitDateTime:
			// 		moment(values.visitDate).format('YYYY-MM-DD ') + moment(values.visitTime).format('HH:mm'),
			// })
			// if (response.success) {
			// 	formik.resetForm()
			// 	router.push('/home')
			// } else {
			// 	Alert.alert(response.msg)
			// }
			// setIsSubmitting(false)
		},
	})
	const onDatePickerChange = (event, selectedDate: Date) => {
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
								router.replace('/visitor')
							}}
							reactNativeIcons={<Iconicons name="arrow-back" color={'#000000'} size={24} />}
						/>
					</View>
					<Text className="text-4xl text-black font-bold mt-6">Visitor Details</Text>
					<View>
						<CustomFormField
							containerStyle="mt-4"
							title="Visitor Name"
							textStyle="text-base font-bold"
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
					<CustomFormField
						containerStyle="mt-4"
						title="Visitor Category"
						textStyle="text-base font-bold"
						type="Picker"
						selectedValue={formik.values.visitorCategory}
						onValueChange={(e) => {
							formik.setFieldValue('visitorCategory', e)
						}}
						items={VisitorCategoryList}
						errorMessage={
							formik.touched.visitorCategory &&
							formik.errors.visitorCategory &&
							(formik.errors.visitorCategory as string)
						}
					/>
					<CustomFormField
						containerStyle="mt-4"
						title="Contact Number"
						textStyle="text-base font-bold"
						type="Phone"
						selectedCountryCode={formik.values.visitorCountryCode}
						setSelectedCountryCode={(e) => {
							formik.setFieldValue('visitorCountryCode', e)
						}}
						setPhoneNumber={(e) => {
							formik.setFieldValue('visitorPhoneNumber', e)
						}}
						phoneNumber={`${formik.values.visitorPhoneNumber}`}
						errorMessage={
							formik.touched.visitorPhoneNumber &&
							formik.errors.visitorPhoneNumber &&
							(formik.errors.visitorPhoneNumber as string)
						}
					/>
					<View className="flex flex-row gap-4 mt-1">
						<View className="flex-1">
							{Platform.OS === 'ios' ? (
								<CustomFormField
									title="Visit Date"
									textStyle="text-base font-bold"
									type="DateTime"
									platform="ios"
									selectedDate={
										formik.values.visitDate ? formik.values.visitDate : moment().toDate()
									}
									onChange={onDatePickerChange}
									buttonTitle={
										formik.values.visitDate
											? moment(formik.values.visitDate)
													.tz('Asia/Kuala_Lumpur')
													.format('DD MMM YYYY')
											: '-'
									}
									display="spinner"
									minimumDate={moment().tz('Asia/Kuala_Lumpur').toDate()}
									maximumDate={moment().tz('Asia/Kuala_Lumpur').add(2, 'week').toDate()}
									mode="date"
									errorMessage={
										formik.touched.visitDate &&
										formik.errors.visitDate &&
										(formik.errors.visitDate as string)
									}
									timeZoneName="Asia/Kuala_Lumpur"
									setShowDateTime={setShowCalendar}
									showDateTime={showCalendar}
								/>
							) : (
								<CustomFormField
									title="Visit Date"
									textStyle="text-base font-bold"
									type="DateTime"
									platform="android"
									selectedDate={
										formik.values.visitDate ? formik.values.visitDate : moment().toDate()
									}
									onChange={onDatePickerChange}
									buttonTitle={
										formik.values.visitDate
											? moment(formik.values.visitDate)
													.tz('Asia/Kuala_Lumpur')
													.format('DD MMM YYYY')
											: '-'
									}
									display="calendar"
									minimumDate={moment().tz('Asia/Kuala_Lumpur').toDate()}
									maximumDate={moment().tz('Asia/Kuala_Lumpur').add(2, 'week').toDate()}
									mode="date"
									errorMessage={
										formik.touched.visitDate &&
										formik.errors.visitDate &&
										(formik.errors.visitDate as string)
									}
									timeZoneName="Asia/Kuala_Lumpur"
									setShowDateTime={setShowCalendar}
									showDateTime={showCalendar}
								/>
							)}
						</View>
						<View className="flex-1">
							{Platform.OS === 'ios' ? (
								<CustomFormField
									title="Visit Time"
									textStyle="text-base font-bold"
									type="DateTime"
									platform="ios"
									selectedDate={
										formik.values.visitTime ? formik.values.visitTime : moment().toDate()
									}
									onChange={onTimePickerChange}
									buttonTitle={
										formik.values.visitTime
											? moment(formik.values.visitTime).tz('Asia/Kuala_Lumpur').format('HH:mm')
											: '-'
									}
									display="spinner"
									minimumDate={moment().tz('Asia/Kuala_Lumpur').toDate()}
									maximumDate={moment().tz('Asia/Kuala_Lumpur').add(2, 'week').toDate()}
									mode="time"
									errorMessage={
										formik.touched.visitTime &&
										formik.errors.visitTime &&
										(formik.errors.visitTime as string)
									}
									timeZoneName="Asia/Kuala_Lumpur"
									setShowDateTime={setShowTime}
									showDateTime={showTime}
								/>
							) : (
								<CustomFormField
									title="Visit Times"
									textStyle="text-base font-bold"
									type="DateTime"
									platform="android"
									selectedDate={
										formik.values.visitTime ? formik.values.visitTime : moment().toDate()
									}
									onChange={onTimePickerChange}
									buttonTitle={
										formik.values.visitTime
											? moment(formik.values.visitTime).tz('Asia/Kuala_Lumpur').format('HH:mm')
											: '-'
									}
									display="spinner"
									minimumDate={moment().tz('Asia/Kuala_Lumpur').toDate()}
									maximumDate={moment().tz('Asia/Kuala_Lumpur').add(2, 'week').toDate()}
									mode="time"
									errorMessage={
										formik.touched.visitTime &&
										formik.errors.visitTime &&
										(formik.errors.visitTime as string)
									}
									timeZoneName="Asia/Kuala_Lumpur"
									setShowDateTime={setShowTime}
									showDateTime={showTime}
								/>
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
			</ScrollView>
		</SafeAreaView>
	)
}

export default VisitorDetailsPage
