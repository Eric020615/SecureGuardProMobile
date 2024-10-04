import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomFormField from '@components/form/CustomFormField'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import CustomButton from '@components/buttons/CustomButton'
import { Link, router } from 'expo-router'
import { signInformDataJson } from '@config/constant/auth/index'
import { useAuth } from '@zustand/auth/useAuth'
import { SignInFormDto } from '@zustand/types'
import { useModal } from '@zustand/modal/useModal'
import CustomModal from '@components/modals/CustomModal'
import { useApplication } from '@zustand/index'

const SignInPage = () => {
	const validationSchema = Yup.object().shape({
		email: Yup.string().email('Invalid Email').required('Email is required'),
		password: Yup.string().required('Password is required'),
	})
	const { setCustomConfirmModal } = useModal()
	const { setIsLoading } = useApplication()
	const formik = useFormik<SignInFormDto>({
		enableReinitialize: true,
		validateOnBlur: false,
		initialValues: signInformDataJson,
		validationSchema: validationSchema,
		onSubmit: (values) => {
			signInWithPassword(values)
		},
	})
	const { signInAction, isLoading } = useAuth()

	const signInWithPassword = async (values: SignInFormDto) => {
		try {
			setIsLoading(true)
			const response = await signInAction(values)
			if (response.success) {
				router.replace('/home')
			} else {
				setCustomConfirmModal({
					title: 'Log In Failed',
					subtitle: 'Please Retry It Again',
				})
			}
			setIsLoading(false)
		} catch (error) {
			setCustomConfirmModal({
				title: 'Log In Failed',
				subtitle: 'Please Retry It Again',
			})
			setIsLoading(false)
		}
	}
	return (
		<SafeAreaView className="bg-slate-100 h-full">
			<ScrollView>
				<CustomModal />
				<View className="w-full justify-center min-h-[85vh] px-4 my-6">
					<Text className="text-3xl text-black">Gate Mate</Text>
					<Text className="text-7xl w-full font-bold text-primary">Log in</Text>
					<CustomFormField
						title="Email"
						type="Text"
						textValue={formik.values.email}
						onChangeText={(e) => {
							formik.setFieldValue('email', e)
						}}
						errorMessage={formik.errors.email}
						placeholder={"Enter your email"}
					/>
					<CustomFormField
						title="Password"
						containerStyle="mt-3"
						type="Text"
						textValue={formik.values.password}
						onChangeText={(e) => {
							formik.setFieldValue('password', e)
						}}
						isSecureTextEntry={true}
						errorMessage={formik.errors.password}
						placeholder={"Enter your password"}
					/>
					<CustomButton
						title="Log In"
						handlePress={formik.handleSubmit}
						containerStyles="bg-primary p-3 w-full mt-7"
						isLoading={isLoading}
					/>
					<View className="justify-center pt-5 flex-row gap-2">
						<Text className="text-sm font-pregular">Don't have account?</Text>
						<Link href="/sign-up" className="text-sm font-psemibold text-primary">
							Sign Up
						</Link>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	)
}

export default SignInPage
