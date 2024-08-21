import { View, Text, ScrollView, Platform, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomButton from '@components/buttons/CustomButton'
import Iconicons from 'react-native-vector-icons/Ionicons'
import 'moment-timezone'
import { router, useLocalSearchParams } from 'expo-router'
import moment from 'moment'
import 'moment-timezone'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { createVisitorConst, VisitorEnum } from '@config/constant/visitor'
import { VisitorCategoryList } from '@config/listOption/visitor'
import { ICountry } from 'react-native-international-phone-number'
import CustomFormField from '@components/form/CustomFormField'
import { CountryCode, parsePhoneNumberFromString } from 'libphonenumber-js'
import { useVisitor } from '@zustand/visitor/useVisitor'
import { GetVisitorDto } from '@zustand/types'

interface VisitorDetails {
	visitDate: Date
	visitTime: Date
	visitorCategory: VisitorEnum
	visitorName: string
	visitorCountryCode: ICountry
	visitorPhoneNumber: string
}

const VisitorDetailsViewPage = () => {
	const { getVisitorDetailsByIdAction } = useVisitor()
	const [visitorDetails, seVisitorDetails] = useState<GetVisitorDto>()
	const { id } = useLocalSearchParams()

	useEffect(() => {
		getData(id as string)
	}, [id])

	const getData = async (id: string) => {
		const response = await getVisitorDetailsByIdAction(id)
		if (response.success) {
			seVisitorDetails(response.data)
		} else {
			console.log(response.msg)
		}
	}

	return (
		<SafeAreaView className="bg-slate-100 h-full">
			<ScrollView>
				<View className="w-full min-h-[85vh] px-4 my-6">
					<View className="flex flex-row items-center">
						<CustomButton
							containerStyles="items-center h-fit"
							handlePress={() => {
								router.replace('/visitor')
							}}
							reactNativeIcons={<Iconicons name="arrow-back" color={'#000000'} size={24} />}
						/>
					</View>
					<Text className="text-4xl text-black font-bold mt-6">Visitor Details</Text>
					{visitorDetails && (
						<>
							<View className="mt-3">
								<Text className="text-lg text-black font-bold">Name</Text>
								<Text className="text-base text-black">
									{visitorDetails.visitorName ? visitorDetails.visitorName : ''}
								</Text>
							</View>
							<View className="mt-3">
								<Text className="text-lg text-black font-bold">Contact Number</Text>
								<Text className="text-base text-black">
									{visitorDetails.visitorContactNumber ? visitorDetails.visitorContactNumber : ''}
								</Text>
							</View>
							<View className="mt-3">
								<Text className="text-lg text-black font-bold">Category</Text>
								<Text className="text-base text-black">
									{VisitorEnum[visitorDetails.visitorCategory]}
								</Text>
							</View>
						</>
					)}
				</View>
			</ScrollView>
		</SafeAreaView>
	)
}

export default VisitorDetailsViewPage
