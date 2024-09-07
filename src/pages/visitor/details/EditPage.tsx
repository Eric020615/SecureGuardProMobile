import { View, Text, ScrollView, Platform, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomButton from '@components/buttons/CustomButton'
import Iconicons from 'react-native-vector-icons/Ionicons'
import 'moment-timezone'
import { router, useLocalSearchParams, usePathname } from 'expo-router'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { VisitorEnum } from '@config/constant/visitor'
import { VisitorCategoryList } from '@config/listOption/visitor'
import { getCountriesByCallingCode, ICountry } from 'react-native-international-phone-number'
import CustomFormField from '@components/form/CustomFormField'
import { CountryCode, parsePhoneNumberFromString } from 'libphonenumber-js'
import { useVisitor } from '@zustand/visitor/useVisitor'
import { GetVisitorDto } from '@zustand/types'
import { useApplication } from '@zustand/index'
import { ITimeFormat } from '@config/constant'
import {
	convertUTCStringToLocalDate,
	getLocalDateString,
	getTodayDate,
	getUTCDateString,
} from '../../../helpers/time'

interface VisitorDetails {
	visitDateTime: Date
	visitorCategory: VisitorEnum
	visitorName: string
	visitorCountryCode: ICountry
	visitorPhoneNumber: string
}

const VisitorDetailsEditPage = () => {
	const [showCalendar, setShowCalendar] = useState(false)
	const [isSubmitting, setIsSubmitting] = useState(false)
	const { getVisitorDetailsByIdAction, editVisitorByIdAction } = useVisitor()
	const { setIsLoading } = useApplication()
	const [visitorDetails, setVisitorDetails] = useState<GetVisitorDto>()
	const { id } = useLocalSearchParams()
	const currentPath = usePathname()
	useEffect(() => {
		getData(id as string)
	}, [id])
	const getData = async (id: string) => {
		try {
			setIsLoading(true)
			const response = await getVisitorDetailsByIdAction(id)
			if (response.success) {
				setVisitorDetails(response.data)
			} else {
				console.log(response.msg)
			}
			setIsLoading(false)
		} catch (error) {
			setIsLoading(false)
		}
	}

	const validationSchema = Yup.object().shape({
		visitDateTime: Yup.date().required('Visit date is required'),
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
		initialValues: {
			visitDateTime: convertUTCStringToLocalDate(visitorDetails?.visitDateTime),
			visitorCategory:
				visitorDetails?.visitorCategory in VisitorEnum ? visitorDetails.visitorCategory : null,
			visitorName: visitorDetails?.visitorName ? visitorDetails?.visitorName : '',
			visitorCountryCode: visitorDetails?.visitorContactNumber
				? getCountriesByCallingCode(
						parsePhoneNumberFromString(visitorDetails.visitorContactNumber).countryCallingCode,
				  )[0]
				: null,
			visitorPhoneNumber: visitorDetails?.visitorContactNumber
				? parsePhoneNumberFromString(visitorDetails.visitorContactNumber).nationalNumber
				: '',
		},
		validationSchema: validationSchema,
		onSubmit: async (values) => {
			const response = await editVisitorByIdAction({
				visitorId: id as string,
				visitorName: values.visitorName,
				visitorCategory: values.visitorCategory,
				visitorContactNumber: values.visitorCountryCode.callingCode + values.visitorPhoneNumber,
				visitDateTime: getUTCDateString(values.visitDateTime, ITimeFormat.dateTime),
			})
			if (response.success) {
				formik.resetForm()
				router.push(currentPath.replace('edit', 'view'))
			} else {
				Alert.alert(response.msg)
			}
			setIsSubmitting(false)
		},
	})
	const onDatePickerChange = (selectedDate: Date) => {
		formik.setFieldValue('visitDateTime', selectedDate)
		setShowCalendar(false)
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
					{visitorDetails && (
						<>
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
									<CustomFormField
										title="Visit Date"
										textStyle="text-base font-bold"
										type="DateTime"
										selectedDate={
											formik.values.visitDateTime ? formik.values.visitDateTime : getTodayDate()
										}
										onChange={onDatePickerChange}
										buttonTitle={getLocalDateString(
											formik.values.visitDateTime,
											ITimeFormat.dateTime,
										)}
										minimumDate={getTodayDate()}
										mode="datetime"
										errorMessage={
											formik.touched.visitDateTime &&
											formik.errors.visitDateTime &&
											(formik.errors.visitDateTime as string)
										}
										setShowDateTime={setShowCalendar}
										showDateTime={showCalendar}
									/>
								</View>
							</View>
						</>
					)}
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

export default VisitorDetailsEditPage
