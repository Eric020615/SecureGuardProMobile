import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import CustomButton from '@components/buttons/CustomButton'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { createVisitorConst, VisitorEnum } from '@config/constant/visitor'
import { VisitorCategoryList } from '@config/listOption/visitor'
import { ICountry } from 'react-native-international-phone-number'
import CustomFormField from '@components/form/CustomFormField'
import { CountryCode, parsePhoneNumberFromString } from 'libphonenumber-js'
import { ITimeFormat } from '@config/constant'
import { useApplication } from '@store/application/useApplication'
import { useVisitor } from '@store/visitor/useVisitor'
import ActionConfirmationModal from '@components/modals/ActionConfirmationModal'
import { useModal } from '@store/modal/useModal'
import { convertDateToDateString, getCurrentDate } from '@helpers/time'

interface CreateVisitor {
	visitDateTime: Date
	visitorCategory: VisitorEnum
	visitorName: string
	visitorEmail: string
	visitorCountryCode: ICountry
	visitorPhoneNumber: string
}

const CreateVisitorPage = () => {
	const [showCalendar, setShowCalendar] = useState(false)
	const { createVisitorAction } = useVisitor()
	const { isLoading } = useApplication()
	const { resetModalAction } = useModal()

	useEffect(() => {
		resetModalAction()
	}, [])

	const validationSchema = Yup.object().shape({
		visitDateTime: Yup.date().required('Visit date is required'),
		visitorCategory: Yup.string().min(1).required('Visitor category is required'),
		visitorName: Yup.string().min(1).required('Visitor name is required'),
		visitorEmail: Yup.string().email('Invalid email address'),
		visitorPhoneNumber: Yup.string()
			.required('Visitor phone number is required')
			.test('is-valid-phone', 'Phone number is not valid', (value) => {
				if (!value) return false
				const phone = parsePhoneNumberFromString(value, formik.values.visitorCountryCode.cca2 as CountryCode)
				return phone ? phone.isValid() : false
			}),
	})

	const formik = useFormik<CreateVisitor>({
		enableReinitialize: true,
		validateOnBlur: false,
		initialValues: createVisitorConst,
		validationSchema: validationSchema,
		onSubmit: async (values) => {
			await createVisitorAction({
				visitorName: values.visitorName,
				visitorEmail: values.visitorEmail,
				visitorCategory: values.visitorCategory,
				visitorContactNumber: values.visitorCountryCode.callingCode + values.visitorPhoneNumber,
				visitDateTime: convertDateToDateString(values.visitDateTime, ITimeFormat.isoDateTime),
			})
		},
	})
	const onDatePickerChange = (selectedDate: Date) => {
		formik.setFieldValue('visitDateTime', selectedDate)
		setShowCalendar(false)
	}

	return (
		<SafeAreaView className="bg-slate-100 h-full">
			<ActionConfirmationModal
				onSuccessConfirm={() => {
					formik.resetForm()
					router.push('/home')
				}}
			/>
			<ScrollView>
				{/* <ActionConfirmationModal title="Hi" isVisible={isModalVisible} onCloseModal={toggleModal} /> */}
				<View className="w-full min-h-[85vh] px-4 my-6">
					<View className="flex flex-row items-center">
						<CustomButton
							containerStyles="items-center h-fit"
							handlePress={() => {
								router.push('/home')
							}}
							rightReactNativeIcons={<Ionicons name="arrow-back" color={'#000000'} size={24} />}
						/>
					</View>
					<Text className="text-3xl text-black font-bold mt-6">Register Visitor</Text>
					{/* Register Visitor Form */}
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
							placeholder={'Enter full name'}
							errorMessage={
								formik.touched.visitorName && formik.errors.visitorName && (formik.errors.visitorName as string)
							}
						/>
						<CustomFormField
							containerStyle="mt-4"
							title="Visitor Email"
							textStyle="text-base font-bold"
							type="Text"
							textValue={formik.values.visitorEmail}
							onChangeText={(e) => {
								formik.setFieldValue('visitorEmail', e)
							}}
							placeholder={'Enter email'}
							errorMessage={
								formik.touched.visitorEmail && formik.errors.visitorEmail && (formik.errors.visitorEmail as string)
							}
						/>
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
							placeholder={'Select visitor category'}
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
						<CustomButton
							title="Submit"
							handlePress={formik.handleSubmit}
							containerStyles="bg-primary p-4 w-full mt-8 self-center"
							isLoading={isLoading}
							textStyles="text-sm text-white"
						/>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	)
}

export default CreateVisitorPage
