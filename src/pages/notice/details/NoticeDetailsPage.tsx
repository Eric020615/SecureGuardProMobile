import React, { useEffect, useState } from 'react'
import { View, Text, ScrollView } from 'react-native'
import { useNotice } from '@store/notice/useNotice'
import { router, useLocalSearchParams } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import Ionicons from 'react-native-vector-icons/Ionicons'
import CustomButton from '@components/buttons/CustomButton'
import CustomPdfSlider from '@components/slider/CustomPdfSlider'

const NoticeDetailsPage = () => {
	const { noticeDetails, getNoticeDetailsByIdAction } = useNotice()
	const { id } = useLocalSearchParams()

	useEffect(() => {
		fetchNoticeDetailsById(id as string)
	}, [id])

	const fetchNoticeDetailsById = async (id: string) => {
		await getNoticeDetailsByIdAction(id)
	}

	return (
		<SafeAreaView className="flex-1 bg-white">
			{/* Header Section */}
			<View className="px-4 mt-6">
				<View className="flex-row items-center">
					<CustomButton
						containerStyles="items-center h-fit"
						handlePress={() => {
							router.push('/visitor')
						}}
						rightReactNativeIcons={<Ionicons name="arrow-back" color={'#000000'} size={24} />}
					/>
				</View>
				<Text className="text-4xl font-bold mt-6">Notice Details</Text>
			</View>

			{/* Scrollable Notice Information Section */}
			<View className="px-4 py-2">
				<ScrollView horizontal showsHorizontalScrollIndicator={false}>
					<View>
						<View>
							<Text className="text-lg font-bold">Title</Text>
							<Text className="text-base">{noticeDetails?.title || 'N/A'}</Text>
						</View>
						<View>
							<Text className="text-lg font-bold">Description</Text>
							<Text className="text-base">{noticeDetails?.description || 'N/A'}</Text>
						</View>
					</View>
				</ScrollView>
			</View>

			{/* PDF Viewer Section */}
			<View className="mt-4 flex-1 w-full px-4 pb-7">
				{noticeDetails && noticeDetails.attachments && noticeDetails.attachments.length > 0 ? (
					<CustomPdfSlider
						item={noticeDetails.attachments.map((attachment, key) => ({
							key: key,
							name: attachment.fileName,
							pdfUrl: attachment.fileUrl,
						}))}
					/>
				) : (
					<Text className="text-base">No attachments available.</Text>
				)}
			</View>
		</SafeAreaView>
	)
}

export default NoticeDetailsPage
