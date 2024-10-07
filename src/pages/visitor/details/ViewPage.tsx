import { View, Text, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomButton from '@components/buttons/CustomButton'
import Iconicons from 'react-native-vector-icons/Ionicons'
import { router, useLocalSearchParams } from 'expo-router'
import { VisitorEnum } from '@config/constant/visitor'
import { ITimeFormat } from '@config/constant'
import { convertUTCStringToLocalDateString } from '@helpers/time'
import { useVisitor } from '@store/visitor/useVisitor'
import CustomModal from '@components/modals/CustomModal'

const VisitorDetailsViewPage = () => {
	const { visitorDetails, getVisitorDetailsByIdAction } = useVisitor()
	const { id } = useLocalSearchParams()

	useEffect(() => {
		fetchVisitorDetailsByVisitorId(id as string)
	}, [id])

	const fetchVisitorDetailsByVisitorId = async (id: string) => {
		await getVisitorDetailsByIdAction(id)
	}

	return (
		<SafeAreaView className="bg-slate-100 h-full">
			<CustomModal />
			<ScrollView>
				<View className="w-full min-h-[85vh] px-4 my-6">
					<View className="flex flex-row items-center">
						<CustomButton
							containerStyles="items-center h-fit"
							handlePress={() => {
								router.replace('/visitor')
							}}
							rightReactNativeIcons={<Iconicons name="arrow-back" color={'#000000'} size={24} />}
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
							<View className="mt-3">
								<Text className="text-lg text-black font-bold">Visit Date</Text>
								<Text className="text-base text-black">
									{visitorDetails.visitDateTime
										? convertUTCStringToLocalDateString(
												visitorDetails.visitDateTime,
												ITimeFormat.dateTime,
										  )
										: ''}
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
