import { ScrollView, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomButton from '@components/buttons/CustomButton'
import { router, usePathname } from 'expo-router'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { CountryCode, parsePhoneNumberFromString } from 'libphonenumber-js'
import { Gender } from '@config/constant/user'
import {
	convertUTCStringToLocalDate,
	getLocalDateString,
	getTodayDate,
	getUTCDateString,
} from '@helpers/time'
import { getCountriesByCallingCode, ICountry } from 'react-native-international-phone-number'
import CustomFormField from '@components/form/CustomFormField'
import { GenderList } from '@config/listOption/user'
import { ITimeFormat } from '@config/constant'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useApplication } from '@store/application/useApplication'
import { useUser } from '@store/user/useUser'
import ActionConfirmationModal from '@components/modals/ActionConfirmationModal'

interface UserProfile {
	firstName: string
	lastName: string
	userName: string
	email: string
	userCountryCode: ICountry
	userPhoneNumber: string
	gender: Gender
	dateOfBirth: Date
}

const ProfileDetailsEditPage = () => {
	const [showCalendar, setShowCalendar] = useState(false)
	const { isLoading } = useApplication()
	const { userProfile, getUserProfileByIdAction, editUserProfileByIdAction } = useUser()
	const [formInitialValue, setFormInitialValue] = useState<UserProfile>({} as UserProfile)
	const currentPath = usePathname()
	const handlePress = () => {
		if (currentPath.includes('edit')) {
			router.push(currentPath.replace('edit', 'view'))
			return
		}
		router.push(currentPath.concat('/view'))
	}
	useEffect(() => {
		fetchUserProfileByUserId()
	}, [])
	const fetchUserProfileByUserId = async () => {
		await getUserProfileByIdAction()
	}
	useEffect(() => {
		if (userProfile) {
			setFormInitialValue({
				firstName: userProfile?.firstName ? userProfile.firstName : '',
				lastName: userProfile?.lastName ? userProfile.lastName : '',
				userName: userProfile?.userName ? userProfile.userName : '',
				email: userProfile?.email ? userProfile.email : '',
				userCountryCode: userProfile?.contactNumber
					? getCountriesByCallingCode(
							parsePhoneNumberFromString(userProfile.contactNumber).countryCallingCode,
					  )[0]
					: null,
				userPhoneNumber: userProfile?.contactNumber
					? parsePhoneNumberFromString(userProfile?.contactNumber).nationalNumber
					: '',
				gender: userProfile?.gender ? userProfile.gender : null,
				dateOfBirth: convertUTCStringToLocalDate(userProfile?.dateOfBirth),
			})
		}
	}, [userProfile])

	const validationSchema = Yup.object().shape({
		firstName: Yup.string().min(1).required('First name is required'),
		lastName: Yup.string().min(1).required('Last name is required'),
		userName: Yup.string().min(1).required('Username is required'),
		email: Yup.string().email('Invalid email').required('Email is required'),
		userPhoneNumber: Yup.string()
			.required('Phone number is required')
			.test('is-valid-phone', 'Phone number is not valid', (value) => {
				if (!value) return false
				const phone = parsePhoneNumberFromString(
					value,
					formik.values.userCountryCode.cca2 as CountryCode,
				)
				return phone ? phone.isValid() : false
			}),
	})
	const formik = useFormik<UserProfile>({
		enableReinitialize: true,
		validateOnBlur: false,
		initialValues: formInitialValue,
		validationSchema: validationSchema,
		onSubmit: async (values) => {
			await editUserProfileByIdAction({
				firstName: values.firstName,
				lastName: values.lastName,
				userName: values.userName,
				email: values.email,
				contactNumber: values.userCountryCode.callingCode + values.userPhoneNumber,
				gender: values.gender,
				dateOfBirth: getUTCDateString(values.dateOfBirth, ITimeFormat.date),
			})
			formik.resetForm()
			router.push(currentPath.replace('edit', 'view'))
		},
	})
	const onDatePickerChange = (selectedDate: Date) => {
		formik.setFieldValue('dateOfBirth', selectedDate)
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
								handlePress()
							}}
							rightReactNativeIcons={<Ionicons name="arrow-back" color={'#000000'} size={24} />}
						/>
					</View>
					<Text className="text-4xl text-black font-bold mt-6">User Details</Text>
					{userProfile && (
						<>
							<View>
								<CustomFormField
									containerStyle="mt-4"
									title="First Name"
									textStyle="text-base font-bold"
									type="Text"
									textValue={formik.values.firstName}
									onChangeText={(e) => {
										formik.setFieldValue('firstName', e)
									}}
									placeholder="Enter your first name"
									errorMessage={
										formik.touched.firstName &&
										formik.errors.firstName &&
										(formik.errors.firstName as string)
									}
								/>
							</View>
							<View>
								<CustomFormField
									containerStyle="mt-4"
									title="Last Name"
									textStyle="text-base font-bold"
									type="Text"
									textValue={formik.values.lastName}
									onChangeText={(e) => {
										formik.setFieldValue('lastName', e)
									}}
									placeholder="Enter your last name"
									errorMessage={
										formik.touched.lastName &&
										formik.errors.lastName &&
										(formik.errors.lastName as string)
									}
								/>
							</View>
							<View>
								<CustomFormField
									containerStyle="mt-4"
									title="Username"
									textStyle="text-base font-bold"
									type="Text"
									textValue={formik.values.userName}
									onChangeText={(e) => {
										formik.setFieldValue('userName', e)
									}}
									placeholder="Enter your username"
									errorMessage={
										formik.touched.userName &&
										formik.errors.userName &&
										(formik.errors.userName as string)
									}
								/>
							</View>
							<CustomFormField
								containerStyle="mt-4"
								title="Email"
								textStyle="text-base font-bold"
								type="Text"
								textValue={formik.values.email}
								onChangeText={(e) => {
									formik.setFieldValue('email', e)
								}}
								placeholder="Enter your email"
								errorMessage={
									formik.touched.email && formik.errors.email && (formik.errors.email as string)
								}
							/>
							<CustomFormField
								containerStyle="mt-4"
								title="Contact Number"
								textStyle="text-base font-bold"
								type="Phone"
								selectedCountryCode={formik.values.userCountryCode}
								setSelectedCountryCode={(e) => {
									formik.setFieldValue('userCountryCode', e)
								}}
								setPhoneNumber={(e) => {
									formik.setFieldValue('userPhoneNumber', e)
								}}
								phoneNumber={`${formik.values.userPhoneNumber}`}
								errorMessage={
									formik.touched.userPhoneNumber &&
									formik.errors.userPhoneNumber &&
									(formik.errors.userPhoneNumber as string)
								}
								placeholder="Enter phone number"
							/>
							<CustomFormField
								containerStyle="mt-4"
								title="Gender"
								textStyle="text-base font-bold"
								type="Picker"
								selectedValue={formik.values.gender}
								onValueChange={(e) => {
									formik.setFieldValue('gender', e)
								}}
								items={GenderList}
								errorMessage={
									formik.touched.gender && formik.errors.gender && (formik.errors.gender as string)
								}
								placeholder="Select gender"
							/>
							<View className="flex flex-row gap-4 mt-1">
								<View className="flex-1">
									<CustomFormField
										title="DOB"
										textStyle="text-base font-bold"
										type="DateTime"
										selectedDate={
											formik.values.dateOfBirth ? formik.values.dateOfBirth : getTodayDate()
										}
										onChange={onDatePickerChange}
										buttonTitle={getLocalDateString(
											formik.values.dateOfBirth,
											ITimeFormat.dateTime,
										)}
										maximumDate={getTodayDate()}
										mode="date"
										errorMessage={
											formik.touched.dateOfBirth &&
											formik.errors.dateOfBirth &&
											(formik.errors.dateOfBirth as string)
										}
										setShowDateTime={setShowCalendar}
										showDateTime={showCalendar}
										placeholder="Select date of birth"
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

export default ProfileDetailsEditPage
