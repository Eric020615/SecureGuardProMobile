import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomModal from '@components/modals/CustomModal'
import CustomButton from '@components/buttons/CustomButton'
import { router } from 'expo-router'
import Ionicons from 'react-native-vector-icons/Ionicons'
import * as Yup from 'yup'
import CustomFormField from '@components/form/CustomFormField'
import { useFormik } from 'formik'
import { useApplication } from '@store/application/useApplication'
import { useUser } from '@store/user/useUser'

interface CreateSubUser {
	email: string
}

const CreateSubUserPage = () => {
    const isLoading = useApplication((state) => state.isLoading)
    const createSubUserAction = useUser((state) => state.createSubUserAction)
	const validationSchema = Yup.object().shape({
		email: Yup.string().email('Invalid Email').required('Email is required'),
	})
	const formik = useFormik<CreateSubUser>({
		enableReinitialize: true,
		validateOnBlur: false,
		initialValues: {
			email: '',
		},
		validationSchema: validationSchema,
		onSubmit: async (values) => {
            await createSubUserAction({
                email: values.email,
			})
			formik.resetForm()
			router.push('/sub-user')
        },
	})
	return (
		<SafeAreaView className="bg-slate-100 h-full">
			<CustomModal />
			<View className="flex-1">
				<View className="w-full min-h-[85vh] px-4 my-6">
					<View className="flex flex-row items-center">
						<CustomButton
							containerStyles="items-center h-fit"
							handlePress={() => {
								router.push('/sub-user')
							}}
							rightReactNativeIcons={<Ionicons name="arrow-back" color={'#000000'} size={24} />}
						/>
					</View>
					<View className="grid justify-center flex-1">
						<View className="mb-5 gap-2">
							<Text className="text-3xl text-black font-bold text-center">Register Sub-User</Text>
							<Text className="text-xl text-gray-600 font-normal text-center">
								Please enter the recipient's email address to send them the registration link.
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

export default CreateSubUserPage
