import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomButton from '@components/buttons/customButton/CustomButton'
import { router } from 'expo-router'
import * as Yup from 'yup'
import CustomFormField from '@components/form/CustomFormField'
import { useFormik } from 'formik'
import { useApplication } from '@store/application/useApplication'
import { useAuth } from '@store/auth/useAuth'
import ActionConfirmationModal from '@components/modals/ActionConfirmationModal'
import { ForgotPasswordDto } from '@dtos/auth/auth.dto'

interface ForgotPassword {
	email: string
}

const ForgotPasswordPage = () => {
	const isLoading = useApplication((state) => state.isLoading)
	const { forgotPasswordAction } = useAuth()
	const validationSchema = Yup.object().shape({
		email: Yup.string().email('Invalid Email').required('Email is required'),
	})
	const formik = useFormik<ForgotPassword>({
		enableReinitialize: true,
		validateOnBlur: false,
		initialValues: {
			email: '',
		},
		validationSchema: validationSchema,
		onSubmit: (values) => {
			forgotPassword(values)
		},
	})

	const forgotPassword = async (values: ForgotPasswordDto) => {
		await forgotPasswordAction(values)
	}
	
	return (
		<SafeAreaView className="bg-slate-100 h-full">
			<ActionConfirmationModal
				onSuccessConfirm={() => {
					formik.resetForm()
					router.push('/sign-in')
				}}
			/>
			<View className="flex-1">
				<View className="w-full min-h-[85vh] px-4 my-6">
					<View className="grid justify-center flex-1">
						<View className="mb-5 gap-2">
							<Text className="text-3xl text-black font-bold text-center">Reset Password</Text>
							<Text className="text-xl text-gray-600 font-normal text-center">
								Please enter your email address to request reset password link.
							</Text>
						</View>
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
						<CustomButton
							title="Submit"
							handlePress={formik.handleSubmit}
							containerStyles="bg-primary p-3 w-full mt-7"
							isLoading={isLoading}
						/>
					</View>
				</View>
			</View>
		</SafeAreaView>
	)
}

export default ForgotPasswordPage
