import { View, Text, ScrollView, Platform } from 'react-native'
import React, { useState } from 'react'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomFormField from '@components/form/CustomFormField'
import { userInforformDataJson } from '@config/constant/auth'
import CustomButton from '@components/buttons/CustomButton'
import { ICountry } from 'react-native-international-phone-number'
// import { useUser } from "@zustand/userService/user";
import moment from 'moment'
import 'moment-timezone'
import { GenderList } from '@config/listOption/user'
import { CountryCode, parsePhoneNumberFromString } from 'libphonenumber-js'
import * as DocumentPicker from 'react-native-document-picker'
import CustomModal from '@components/modals/CustomModal'
import { useUser } from '@zustand/user/useUser'
import { router } from 'expo-router'
import { getFile } from '../../helpers/file'
import { useModal } from '@zustand/modal/useModal'
import { useAuth } from '@zustand/auth/useAuth'
import { useApplication } from '@zustand/index'

interface UserInformationForm {
	firstName: string
	lastName: string
	userName: string
	countryCode: ICountry
	phoneNumber: string
	gender: string
	floor: string
	unitNumber: string
	dateOfBirth: Date
}

const UserInformationPage = () => {
	const { setCustomFailedModal } = useModal()
	const { setIsLoading } = useApplication()
	const { createUserAction, isLoading, error } = useUser();
	const { tempToken } = useAuth()
	const [selectedFiles, setSelectedFiles] = useState<DocumentPicker.DocumentPickerResponse[]>([])
	const [showCalendar, setShowCalendar] = useState(false)
	const validationSchema = Yup.object().shape({
		firstName: Yup.string().required('First Name is required'),
		lastName: Yup.string().required('Last Name is required'),
		phoneNumber: Yup.string()
			.required('Phone Number is required')
			.test('is-valid-phone', 'Phone number is not valid', (value) => {
				if (!value) return false
				const phone = parsePhoneNumberFromString(
					value,
					formik.values.countryCode.cca2 as CountryCode,
				)
				return phone ? phone.isValid() : false
			}),
		unitNumber: Yup.string().required('Unit Number is required'),
		dateOfBirth: Yup.date().required('Date of Birth is required'),
		gender: Yup.string().required('Gender is required'),
	})
	const onDatePickerChange = (event, selectedDate: Date) => {
		if (event.type === 'dismissed') {
			setShowCalendar(false)
			return
		}
		formik.setFieldValue('dateOfBirth', selectedDate)
		setShowCalendar(false)
	}
	const onFileChanged: () => Promise<void> = async () => {
		try {
			const pickerFile = await DocumentPicker.pick({
				type: [DocumentPicker.types.allFiles],
				allowMultiSelection: true,
				copyTo: "cachesDirectory"
			})
			setSelectedFiles(pickerFile)
		} catch (error) {
			if (DocumentPicker.isCancel(error)) {
				console.log(error)
			} else {
				setCustomFailedModal({
					title: 'File Selection Failed',
					subtitle: "Please try again or contact support if the issue persists.",
				})
			}
		}
	}
	const formik = useFormik<UserInformationForm>({
		enableReinitialize: true,
		validateOnBlur: false,
		initialValues: userInforformDataJson,
		validationSchema: validationSchema,
		onSubmit: async (values) => {
			setIsLoading(true)
			const response = await createUserAction({
				firstName: values.firstName,
				lastName: values.lastName,
				userName: values.userName,
				contactNumber: values.countryCode.callingCode + values.phoneNumber,
				gender: values.gender,
				floorNumber: values.floor,
				unitNumber: values.unitNumber,
				dateOfBirth: values.dateOfBirth.toUTCString(),
				supportedFiles: selectedFiles.length > 0 ? await Promise.all(selectedFiles.map(async (selectedFile) => {
					const file = await getFile(selectedFile)
					return file;
				})): []
			}, tempToken)
			if (response.success) {
				setCustomFailedModal({
					title: 'Account updated successfully',
					subtitle: "Please wait for system admin approval to log in",
				})
			} else {
				setCustomFailedModal({
					title: 'Account updated failed',
					subtitle: "Please contact our support team for assistance",
				})
			}
			setIsLoading(true)
		},
	})
	return (
		<SafeAreaView className="bg-slate-100 h-full">
			<ScrollView>
				<CustomModal customConfirmButtonPress={() => {
					formik.resetForm()
					router.push("/")
				}}/>
				<View className="w-full justify-center min-h-[85vh] px-4 my-8">
					<View className="items-center mb-7">
						<Text className="text-5xl font-bold text-primary">Welcome</Text>
						<Text className="text-xl font-pregular text-primary">We need something more</Text>
					</View>
					<CustomFormField
						title="Username"
						containerStyle="mb-3"
						type="Text"
						textValue={formik.values.userName}
						onChangeText={(e) => {
							formik.setFieldValue('userName', e)
						}}
						onBlur={formik.handleBlur('userName')}
						errorMessage={
							formik.touched.userName &&
							formik.errors.userName &&
							(formik.errors.userName as string)
						}
					/>
					<CustomFormField
						title="First Name"
						containerStyle="mb-3"
						type="Text"
						textValue={formik.values.firstName}
						onChangeText={(e) => {
							formik.setFieldValue('firstName', e)
						}}
						onBlur={formik.handleBlur('firstName')}
						errorMessage={
							formik.touched.firstName &&
							formik.errors.firstName &&
							(formik.errors.firstName as string)
						}
					/>
					<CustomFormField
						title="Last Name"
						containerStyle="mb-3"
						type="Text"
						textValue={formik.values.lastName}
						onChangeText={(e) => {
							formik.setFieldValue('lastName', e)
						}}
						onBlur={formik.handleBlur('lastName')}
						errorMessage={
							formik.touched.lastName &&
							formik.errors.lastName &&
							(formik.errors.lastName as string)
						}
					/>
					<CustomFormField
						title="Phone Number"
						containerStyle="mb-3"
						type="Phone"
						phoneNumber={formik.values.phoneNumber}
						setPhoneNumber={(e) => {
							formik.setFieldValue('phoneNumber', e)
						}}
						selectedCountryCode={formik.values.countryCode}
						setSelectedCountryCode={(e) => {
							formik.setFieldValue('countryCode', e)
						}}
						onBlur={formik.handleBlur('phoneNumber')}
						errorMessage={
							formik.touched.phoneNumber &&
							formik.errors.phoneNumber &&
							(formik.errors.phoneNumber as string)
						}
					/>
					<View className="flex flex-row mb-3">
						<View className="flex-1 mr-2">
							{Platform.OS === 'ios' ? (
								<CustomFormField
									title="Date of Birth"
									textStyle="text-base"
									type="DateTime"
									platform="ios"
									selectedDate={
										formik.values.dateOfBirth ? formik.values.dateOfBirth : moment().toDate()
									}
									onChange={onDatePickerChange}
									buttonTitle={
										formik.values.dateOfBirth
											? moment(formik.values.dateOfBirth)
													.tz('Asia/Kuala_Lumpur')
													.format('DD MMM YYYY')
											: '-'
									}
									display="spinner"
									minimumDate={null}
									maximumDate={moment().tz('Asia/Kuala_Lumpur').toDate()}
									mode="date"
									errorMessage={
										formik.touched.dateOfBirth &&
										formik.errors.dateOfBirth &&
										(formik.errors.dateOfBirth as string)
									}
									timeZoneName="Asia/Kuala_Lumpur"
									setShowDateTime={setShowCalendar}
									showDateTime={showCalendar}
								/>
							) : (
								<CustomFormField
									title="Date of Birth"
									textStyle="text-base"
									type="DateTime"
									platform="android"
									selectedDate={
										formik.values.dateOfBirth ? formik.values.dateOfBirth : moment().toDate()
									}
									onChange={onDatePickerChange}
									buttonTitle={
										formik.values.dateOfBirth
											? moment(formik.values.dateOfBirth)
													.tz('Asia/Kuala_Lumpur')
													.format('DD MMM YYYY')
											: '-'
									}
									display="calendar"
									minimumDate={null}
									maximumDate={moment().tz('Asia/Kuala_Lumpur').add(2, 'week').toDate()}
									mode="date"
									errorMessage={
										formik.touched.dateOfBirth &&
										formik.errors.dateOfBirth &&
										(formik.errors.dateOfBirth as string)
									}
									timeZoneName="Asia/Kuala_Lumpur"
									setShowDateTime={setShowCalendar}
									showDateTime={showCalendar}
								/>
							)}
						</View>
						<CustomFormField
							title="Gender"
							containerStyle="flex-1"
							type="Picker"
							selectedValue={formik.values.gender}
							onValueChange={(e) => {
								formik.setFieldValue('gender', e)
							}}
							items={GenderList}
							onBlur={formik.handleBlur('gender')}
							errorMessage={
								formik.touched.gender && formik.errors.gender && (formik.errors.gender as string)
							}
						/>
					</View>
					<View className="flex flex-row mb-3">
						<CustomFormField
							title="Floor"
							containerStyle="flex-1 mr-2"
							type="Text"
							textValue={formik.values.floor}
							onChangeText={(e) => {
								formik.setFieldValue('floor', e)
							}}
							onBlur={formik.handleBlur('floor')}
							errorMessage={
								formik.touched.floor && formik.errors.floor && (formik.errors.floor as string)
							}
						/>
						<CustomFormField
							title="Unit"
							containerStyle="flex-1"
							type="Text"
							textValue={formik.values.unitNumber}
							onChangeText={(e) => {
								formik.setFieldValue('unitNumber', e)
							}}
							onBlur={formik.handleBlur('unitNumber')}
							errorMessage={
								formik.touched.unitNumber &&
								formik.errors.unitNumber &&
								(formik.errors.unitNumber as string)
							}
						/>
					</View>
					<CustomFormField
						containerStyle="mb-3"
						title="Supported Document"
						textStyle="text-base"
						type="FilePicker"
						selectedFiles={selectedFiles}
						onFileChanged={onFileChanged}
						clearFile={() => {
							setSelectedFiles([])
						}}
					/>
					<CustomButton
						title="Submit"
						handlePress={formik.handleSubmit}
						containerStyles="bg-primary p-3 w-full mt-7"
						isLoading={isLoading}
					/>
				</View>
			</ScrollView>
		</SafeAreaView>
	)
}

export default UserInformationPage
