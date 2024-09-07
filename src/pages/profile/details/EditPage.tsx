import { ScrollView, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomButton from '@components/buttons/CustomButton'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { router, usePathname } from 'expo-router'
import { useApplication } from '@zustand/index'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { CountryCode, parsePhoneNumberFromString } from 'libphonenumber-js'
import { GetUserProfileByIdDto } from '@zustand/types'
import { Gender, RoleEnum } from '@config/constant/user'
import {
	convertUTCStringToLocalDate,
	getLocalDateString,
	getTodayDate,
	getUTCDateString,
} from '../../../helpers/time'
import { getCountriesByCallingCode, ICountry } from 'react-native-international-phone-number'
import { useUser } from '@zustand/user/useUser'
import CustomFormField from '@components/form/CustomFormField'
import { GenderList } from '@config/listOption/user'
import { ITimeFormat } from '@config/constant'

interface UserDetails {
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
	const [isSubmitting, setIsSubmitting] = useState(false)
	const { setIsLoading } = useApplication()
	const [userDetails, setUserDetails] = useState<GetUserProfileByIdDto>()
	const { getUserProfileByIdAction, editUserProfileByIdAction } = useUser()
	const currentPath = usePathname()
	const logOut = async () => {
		try {
			await AsyncStorage.clear()
			router.push('/sign-in')
		} catch (error) {
			console.log(error)
		}
	}
	useEffect(() => {
		getData()
	}, [])
	const getData = async () => {
		try {
			setIsLoading(true)
			const response = await getUserProfileByIdAction()
			if (response.success) {
				setUserDetails(response.data)
			} else {
				console.log(response.msg)
			}
			setIsLoading(false)
		} catch (error) {
			setIsLoading(false)
		}
	}

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
	const formik = useFormik<UserDetails>({
		enableReinitialize: true,
		validateOnBlur: false,
		initialValues: {
			firstName: userDetails?.firstName ? userDetails.firstName : '',
			lastName: userDetails?.lastName ? userDetails.lastName : '',
			userName: userDetails?.userName ? userDetails.userName : '',
			email: userDetails?.email ? userDetails.email : '',
			userCountryCode: userDetails?.contactNumber
				? getCountriesByCallingCode(
						parsePhoneNumberFromString(userDetails.contactNumber).countryCallingCode,
				  )[0]
				: null,
			userPhoneNumber: userDetails?.contactNumber
				? parsePhoneNumberFromString(userDetails?.contactNumber).nationalNumber
				: '',
			gender: userDetails?.gender ? userDetails.gender : null,
			dateOfBirth: convertUTCStringToLocalDate(userDetails?.dateOfBirth),
		},
		validationSchema: validationSchema,
		onSubmit: async (values) => {
			setIsLoading(true)
			const response = await editUserProfileByIdAction({
				firstName: values.firstName,
				lastName: values.lastName,
				userName: values.userName,
				email: values.email,
				contactNumber: values.userCountryCode.callingCode + values.userPhoneNumber,
				gender: values.gender,
				dateOfBirth: getUTCDateString(values.dateOfBirth, ITimeFormat.date),
				userId: userDetails?.userId,
			})
			if (response.success) {
				formik.resetForm()
				router.push(currentPath.replace('edit', 'view'))
			} else {
				console.log(response.msg)
			}
			setIsLoading(false)
		},
	})
	const onDatePickerChange = (selectedDate: Date) => {
		formik.setFieldValue('dateOfBirth', selectedDate)
		setShowCalendar(false)
	}

	return (
		<SafeAreaView className="bg-slate-100 h-full">
			<ScrollView>
				<View className="w-full min-h-[85vh] px-4 my-6">
					<Text className="text-4xl text-black font-bold mt-6">User Details</Text>
					{userDetails && (
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
									placeholder={formik.values.firstName}
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
									placeholder={formik.values.lastName}
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
									placeholder={formik.values.userName}
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
								placeholder="Email"
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
				<View className="px-4">
					<CustomButton
						title="Log Out"
						handlePress={() => {
							logOut()
						}}
						containerStyles="bg-primary p-3 w-full"
					/>
				</View>
			</ScrollView>
		</SafeAreaView>
	)
}

export default ProfileDetailsEditPage
