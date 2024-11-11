import { View, Text, ScrollView, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomButton from '@components/buttons/CustomButton'
import Ionicons from 'react-native-vector-icons/Ionicons'
import 'moment-timezone'
import { router, useLocalSearchParams, usePathname } from 'expo-router'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { createVisitorConst, VisitorEnum } from '@config/constant/visitor'
import { VisitorCategoryList } from '@config/listOption/visitor'
import { getCountriesByCallingCode, ICountry } from 'react-native-international-phone-number'
import CustomFormField from '@components/form/CustomFormField'
import { CountryCode, parsePhoneNumberFromString } from 'libphonenumber-js'
import { ITimeFormat } from '@config/constant'
import { useVisitor } from '@store/visitor/useVisitor'
import { useApplication } from '@store/application/useApplication'
import ActionConfirmationModal from '@components/modals/ActionConfirmationModal'
import { convertDateStringToDate, convertDateToDateString, getCurrentDate } from '@helpers/time'

interface VisitorDetails {
	visitDateTime: Date
	visitorCategory: string
	visitorName: string
	visitorEmail: string
	visitorCountryCode: ICountry
	visitorPhoneNumber: string
}

const VisitorDetailsEditPage = () => {
	const [showCalendar, setShowCalendar] = useState(false)
	const [formInitialValue, setFormInitialValue] = useState<VisitorDetails>(createVisitorConst)
	const { visitorDetails, getVisitorDetailsByIdAction, editVisitorByIdAction } = useVisitor()
	const { isLoading } = useApplication()
	const { id } = useLocalSearchParams()
	const currentPath = usePathname()
	useEffect(() => {
		fetchVisitorDetailsByVisitorId(id as string)
	}, [id])
	useEffect(() => {
		if (visitorDetails) {
			setFormInitialValue({
				visitDateTime: convertDateStringToDate(visitorDetails?.visitDateTime),
				visitorEmail: visitorDetails?.visitorEmail ? visitorDetails?.visitorEmail : '',
				visitorCategory: visitorDetails?.visitorCategory in VisitorEnum ? visitorDetails.visitorCategory : null,
				visitorName: visitorDetails?.visitorName ? visitorDetails?.visitorName : '',
				visitorCountryCode: visitorDetails?.visitorContactNumber
					? getCountriesByCallingCode(
							parsePhoneNumberFromString(visitorDetails.visitorContactNumber).countryCallingCode,
					  )[0]
					: null,
				visitorPhoneNumber: visitorDetails?.visitorContactNumber
					? parsePhoneNumberFromString(visitorDetails?.visitorContactNumber).nationalNumber
					: '',
			})
		}
	}, [visitorDetails])
	const fetchVisitorDetailsByVisitorId = async (id: string) => {
		await getVisitorDetailsByIdAction(id)
	}
	const validationSchema = Yup.object().shape({
		visitDateTime: Yup.date().required('Visit date is required'),
		visitorCategory: Yup.string().min(1).required('Visitor category is required'),
		visitorName: Yup.string().min(1).required('Visitor name is required'),
		visitorPhoneNumber: Yup.string()
			.required('Visitor phone number is required')
			.test('is-valid-phone', 'Phone number is not valid', (value) => {
				if (!value) return false
				const phone = parsePhoneNumberFromString(value, formik.values.visitorCountryCode.cca2 as CountryCode)
				return phone ? phone.isValid() : false
			}),
	})
	const formik = useFormik<VisitorDetails>({
		enableReinitialize: true,
		validateOnBlur: false,
		initialValues: formInitialValue,
		validationSchema: validationSchema,
		onSubmit: async (values) => {
			await editVisitorByIdAction(
				{
					visitorName: values.visitorName,
					visitorEmail: values.visitorEmail,
					visitorCategory: values.visitorCategory,
					visitorContactNumber: values.visitorCountryCode.callingCode + values.visitorPhoneNumber,
					visitDateTime: convertDateToDateString(values.visitDateTime, ITimeFormat.isoDateTime),
				},
				id as string,
			)
			formik.resetForm()
			router.push(currentPath.replace('edit', 'view'))
		},
	})

	const onDatePickerChange = (selectedDate: Date) => {
		formik.setFieldValue('visitDateTime', selectedDate)
		setShowCalendar(false)
	}

	return (
		<SafeAreaView className="bg-slate-100 h-full">
			<ActionConfirmationModal />
			<ScrollView>
				<View className="w-full min-h-[85vh] px-4 my-6">
					<View className="flex flex-row items-center">
						<CustomButton
							containerStyles="items-center h-fit"
							handlePress={() => {
								router.push('/visitor')
							}}
							rightReactNativeIcons={<Ionicons name="arrow-back" color={'#000000'} size={24} />}
						/>
					</View>
					<Text className="text-4xl text-black font-bold mt-6">Visitor Details</Text>
					{visitorDetails && (
						<>
							<CustomFormField
								containerStyle="mt-4"
								title="Visitor Name"
								textStyle="text-base font-bold"
								type="Text"
								textValue={formik.values.visitorName}
								onChangeText={(e) => {
									formik.setFieldValue('visitorName', e)
								}}
								placeholder={'Enter full name'}
								errorMessage={
									formik.touched.visitorName && formik.errors.visitorName && (formik.errors.visitorName as string)
								}
							/>
							<CustomFormField
								containerStyle="mt-4"
								title="Visitor email"
								textStyle="text-base font-bold"
								type="Text"
								textValue={formik.values.visitorEmail}
								onChangeText={(e) => {
									formik.setFieldValue('visitorEmail', e)
								}}
								placeholder={'Enter email address'}
								errorMessage={
									formik.touched.visitorEmail && formik.errors.visitorEmail && (formik.errors.visitorEmail as string)
								}
							/>
							<CustomFormField
								containerStyle="mt-4"
								title="Visitor Category"
								textStyle="text-base font-bold"
								type="Picker"
								placeholder={'Select visitor category'}
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
								phoneNumber={
									formik.values.visitorPhoneNumber
										? formik.values.visitorPhoneNumber
										: visitorDetails.visitorContactNumber
								}
								setPhoneNumber={(e) => {
									formik.setFieldValue('visitorPhoneNumber', e)
								}}
								errorMessage={
									formik.touched.visitorPhoneNumber &&
									formik.errors.visitorPhoneNumber &&
									(formik.errors.visitorPhoneNumber as string)
								}
								placeholder={'Enter phone number'}
							/>
							<View className="flex flex-row gap-4 mt-1">
								<View className="flex-1">
									<CustomFormField
										title="Visit Date"
										textStyle="text-base font-bold"
										type="DateTime"
										selectedDate={formik.values.visitDateTime ? formik.values.visitDateTime : getCurrentDate()}
										onChange={onDatePickerChange}
										buttonTitle={convertDateToDateString(formik.values.visitDateTime, ITimeFormat.dateTime)}
										minimumDate={getCurrentDate()}
										mode="datetime"
										errorMessage={
											formik.touched.visitDateTime &&
											formik.errors.visitDateTime &&
											(formik.errors.visitDateTime as string)
										}
										setShowDateTime={setShowCalendar}
										showDateTime={showCalendar}
										placeholder={'Select visit date'}
									/>
								</View>
							</View>
						</>
					)}
					<CustomButton
						title="Submit"
						handlePress={formik.handleSubmit}
						containerStyles="bg-primary p-4 w-full mt-8 self-center"
						isLoading={isLoading}
						textStyles="text-sm text-white"
					/>
				</View>
			</ScrollView>
		</SafeAreaView>
	)
}

export default VisitorDetailsEditPage
