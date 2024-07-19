import { View, Text, ScrollView, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomFormField from '@components/form/CustomFormField'
import CustomButton from '@components/buttons/CustomButton'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Link, router } from 'expo-router'
import { signUpformDataJson } from '@config/constant/auth/index'
import { useAuth } from '@zustand/auth/useAuth'
import { UserSignUpFormDto } from '@zustand/types'

const SignUpPage = () => {
	const [isSubmitting, setIsSubmitting] = useState(false)
	const validationSchema = Yup.object().shape({
		email: Yup.string().email('Invalid Email').required('Email is required'),
		password: Yup.string()
			.min(6, 'Password must be at least 6 characters')
			.required('Password is required'),
		confirmPassword: Yup.string()
			.oneOf([Yup.ref('password')], 'Passwords must match')
			.required('Confirm Password is required'),
	})
	const formik = useFormik<UserSignUpFormDto>({
		enableReinitialize: true,
		validateOnBlur: false,
		initialValues: signUpformDataJson,
		validationSchema: validationSchema,
		onSubmit: (values) => {
			signUp()
		},
	})
	const authSelector = useAuth((state) => state.signUp)

	const signUp = async () => {
		setIsSubmitting(true)
		try {
			const response = await authSelector(formik.values)
			if (response.success) {
				router.replace('/home')
			} else {
				Alert.alert(response.msg)
			}
		} catch (error) {
			console.log(error)
		} finally {
			setIsSubmitting(false)
		}
	}

	return (
		<SafeAreaView className="bg-slate-100 h-full">
			<ScrollView>
				<View className="w-full justify-center min-h-[85vh] px-4 my-6">
					<Text className="text-3xl text-black">Gate Mate</Text>
					<Text className="text-7xl w-full font-bold text-primary">Sign Up</Text>
					<CustomFormField
						title="Email"
						type="Text"
						textValue={formik.values.email}
						onChangeText={(e) => {
							formik.setFieldValue('email', e)
						}}
						onBlur={formik.handleBlur('email')}
						errorMessage={formik.errors.email}
					/>
					<CustomFormField
						title="Password"
						type="Text"
						textValue={formik.values.password}
						onChangeText={(e) => {
							formik.setFieldValue('password', e)
						}}
						isSecureTextEntry={true}
						containerStyle="mt-3"
						onBlur={formik.handleBlur('password')}
						errorMessage={formik.errors.password}
					/>
					<CustomFormField
						title="Confirm Password"
						type="Text"
						textValue={formik.values.confirmPassword}
						onChangeText={(e) => {
							formik.setFieldValue('confirmPassword', e)
						}}
						isSecureTextEntry={true}
						containerStyle="mt-3"
						onBlur={formik.handleBlur('confirmPassword')}
						errorMessage={formik.errors.confirmPassword}
					/>
					<CustomButton
						title="Sign Up"
						handlePress={formik.handleSubmit}
						containerStyles="bg-primary p-3 w-full mt-7"
						isLoading={isSubmitting}
					/>

					<View className="justify-center pt-5 flex-row gap-2">
						<Text className="text-sm font-pregular">Have an account already?</Text>
						<Link href="/sign-in" className="text-sm font-psemibold text-primary">
							Log In
						</Link>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	)
}

export default SignUpPage
