import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import ActionConfirmationModal from '@components/modals/ActionConfirmationModal'
import CustomButton from '@components/buttons/CustomButton'
import { router } from 'expo-router'
import Ionicons from 'react-native-vector-icons/Ionicons'
import * as Yup from 'yup'
import CustomFormField from '@components/form/CustomFormField'
import { useFormik } from 'formik'
import { useApplication } from '@store/application/useApplication'
import { useAuth } from '@store/auth/useAuth'

interface ResetPassword {
	currentPassword: string
	newPassword: string
}

const ResetPasswordPage = () => {
	const isLoading = useApplication((state) => state.isLoading)
    const resetPasswordAction = useAuth((state) => state.resetPasswordAction)

	const validationSchema = Yup.object().shape({
		currentPassword: Yup.string().required('Current Password is required'),
		newPassword: Yup.string()
			.required('New Password is required')
			.min(6, 'New Password must be at least 6 characters long'),
	})

	const formik = useFormik<ResetPassword>({
		enableReinitialize: true,
		validateOnBlur: false,
		initialValues: {
			currentPassword: '',
			newPassword: '',
		},
		validationSchema: validationSchema,
		onSubmit: async (values) => {
            await resetPasswordAction(values)
		},
	})

	return (
		<SafeAreaView className="bg-slate-100 h-full">
			<ActionConfirmationModal
				onSuccessConfirm={() => {
					formik.resetForm()
                    router.push('/profile/view') // Navigate back to the profile page
				}}
			/>
			<View className="flex-1">
				<View className="w-full min-h-[85vh] px-4 my-6">
					<View className="flex flex-row items-center">
						<CustomButton
							containerStyles="items-center h-fit"
							handlePress={() => {
								router.push('/profile/view') // Navigate back to the profile page
							}}
							rightReactNativeIcons={<Ionicons name="arrow-back" color={'#000000'} size={24} />}
						/>
					</View>
					<View className="grid justify-center flex-1">
						<View className="mb-5 gap-2">
							<Text className="text-3xl text-black font-bold text-center">Reset Password</Text>
							<Text className="text-xl text-gray-600 font-normal text-center">
								Please enter your current password and new password.
							</Text>
						</View>
						<CustomFormField
							title="Current Password"
							type="Text"
							textValue={formik.values.currentPassword}
							onChangeText={(e) => {
								formik.setFieldValue('currentPassword', e)
							}}
							errorMessage={formik.errors.currentPassword}
							placeholder={'Enter your current password'}
							isSecureTextEntry={true}
						/>
						<CustomFormField
							title="New Password"
							type="Text"
							textValue={formik.values.newPassword}
							onChangeText={(e) => {
								formik.setFieldValue('newPassword', e)
							}}
							errorMessage={formik.errors.newPassword}
							placeholder={'Enter your new password'}
							isSecureTextEntry={true}
                            containerStyle='mt-3'
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

export default ResetPasswordPage
