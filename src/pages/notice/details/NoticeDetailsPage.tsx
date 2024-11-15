import { View, Text, ScrollView, TouchableOpacity, Linking } from 'react-native'
import React, { useEffect } from 'react'
import { useNotice } from '@store/notice/useNotice'
import { router, useLocalSearchParams } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import ActionConfirmationModal from '@components/modals/ActionConfirmationModal'
import CustomButton from '@components/buttons/CustomButton'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { convertDateStringToFormattedString } from '@helpers/time'
import { ITimeFormat } from '@config/constant'

const NoticeDetailsPage = () => {
	const { noticeDetails, getNoticeDetailsByIdAction } = useNotice()
	const { id } = useLocalSearchParams()

	useEffect(() => {
		fetchNoticeDetailsById(id as string)
	}, [id])

	const fetchNoticeDetailsById = async (id: string) => {
		await getNoticeDetailsByIdAction(id)
	}

	useEffect(() => {
		console.log(noticeDetails)
	}, [noticeDetails])

	return (
		<SafeAreaView className="bg-slate-100 h-full">
			<ActionConfirmationModal />
			<ScrollView>
				<View className="w-full min-h-[85vh] px-4 my-6">
					<View className="flex flex-row items-center">
						<CustomButton
							containerStyles="items-center h-fit"
							handlePress={() => {
								router.push('/visitor')
							}}
							rightReactNativeIcons={<Ionicons name="arrow-back" color={'#000000'} size={24} />}
						/>
					</View>
					<Text className="text-4xl text-black font-bold mt-6">Notice Details</Text>
					{noticeDetails && (
						<>
							{/* Other Notice Details */}
							<View className="mt-3">
								<Text className="text-lg text-black font-bold">Title</Text>
								<Text className="text-base text-black">{noticeDetails.title || 'N/A'}</Text>
							</View>
							<View className="mt-3">
								<Text className="text-lg text-black font-bold">Description</Text>
								<Text className="text-base text-black">{noticeDetails.description || 'N/A'}</Text>
							</View>
							<View className="mt-3">
								<Text className="text-lg text-black font-bold">Start Date</Text>
								<Text className="text-base text-black">
									{noticeDetails.startDate
										? convertDateStringToFormattedString(noticeDetails.startDate, ITimeFormat.dateTime)
										: 'N/A'}
								</Text>
							</View>
							<View className="mt-3">
								<Text className="text-lg text-black font-bold">End Date</Text>
								<Text className="text-base text-black">
									{noticeDetails.endDate
										? convertDateStringToFormattedString(noticeDetails.endDate, ITimeFormat.dateTime)
										: 'N/A'}
								</Text>
							</View>
							{/* Attachments Section */}
							<View className="mt-3">
								<Text className="text-lg text-black font-bold">Attachments</Text>
								<View className="mt-2">
									{noticeDetails.attachments && noticeDetails.attachments.length > 0 ? (
										noticeDetails.attachments.map((attachment, index) => (
											<View key={index} className="bg-white p-2 rounded-lg shadow-md">
												{/* File Details */}
												<Text className="text-base font-semibold text-black">File Name: {attachment.fileName}</Text>
												<Text className="text-sm text-gray-600">Type: {attachment.contentType}</Text>
												<Text className="text-sm text-gray-600">
													Size: {(attachment.size / (1024 * 1024)).toFixed(2)} MB
												</Text>
												{/* View/Download Button */}
												<TouchableOpacity className="mt-3 py-2 px-4 bg-blue-500 rounded-md">
													<Text
														className="text-sm text-white font-semibold"
														onPress={() => Linking.openURL(attachment.fileUrl)}
													>
														View/Download
													</Text>
												</TouchableOpacity>
											</View>
										))
									) : (
										<Text className="text-base text-black">No attachments available.</Text>
									)}
								</View>
							</View>
						</>
					)}
				</View>
			</ScrollView>
		</SafeAreaView>
	)
}

export default NoticeDetailsPage
