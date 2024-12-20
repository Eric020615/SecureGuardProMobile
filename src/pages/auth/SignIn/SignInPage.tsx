import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomFormField from '@components/form/CustomFormField'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import CustomButton from '@components/buttons/customButton/CustomButton'
import { Link, router } from 'expo-router'
import { signInConst } from '@config/constant/auth/index'
import ActionConfirmationModal from '@components/modals/ActionConfirmationModal'
import { SignInFormDto } from '@dtos/auth/auth.dto'
import { useAuth } from '@store/auth/useAuth'
import { useApplication } from '@store/application/useApplication'
import { useNotification } from '../../../context/NotificationContext'

const SignInPage = () => {
	const validationSchema = Yup.object().shape({
		email: Yup.string().email('Invalid Email').required('Email is required'),
		password: Yup.string().required('Password is required'),
	})
	const notificationToken = useNotification()
	const formik = useFormik<SignInFormDto>({
		enableReinitialize: true,
		validateOnBlur: false,
		initialValues: signInConst,
		validationSchema: validationSchema,
		onSubmit: (values) => {
			signInWithPassword({
				notificationToken: notificationToken.expoPushToken,
				...values
			} as SignInFormDto)
		},
	})
	const signInAction = useAuth((state) => state.signInAction)
	const isLoading = useApplication((state) => state.isLoading)

	const signInWithPassword = async (values: SignInFormDto) => {
		await signInAction(values)
	}

	return (
		<SafeAreaView className="bg-slate-100 h-full">
			<ActionConfirmationModal
				onSuccessConfirm={() => {
					router.push('/home')
				}}
			/>
			<ScrollView>
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
						placeholder={'Enter your email'}
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
						placeholder={'Enter your password'}
					/>
					<View className="justify-end flex-row pt-2">
						<Link href="/forgot-password" className="text-sm font-psemibold text-primary">
							Forgot your password?
						</Link>
					</View>
					<CustomButton
						title="Log In"
						handlePress={formik.handleSubmit}
						containerStyles="bg-primary p-3 w-full mt-4"
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
