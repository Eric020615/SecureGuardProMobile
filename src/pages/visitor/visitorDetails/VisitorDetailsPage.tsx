import React, { useEffect, useState } from 'react'
import { View, Text, ScrollView, ActivityIndicator, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomButton from '@components/buttons/customButton/CustomButton'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { router, useLocalSearchParams } from 'expo-router'
import { ITimeFormat } from '@config/constant'
import { useVisitor } from '@store/visitor/useVisitor'
import ActionConfirmationModal from '@components/modals/ActionConfirmationModal'
import { convertDateStringToFormattedString } from '@helpers/time'
import Share from 'react-native-share'
import { VisitorCategoryDescriptionEnum } from '@config/constant/visitor'

const VisitorDetailsPage = () => {
	const { visitorDetails, getVisitorDetailsByIdAction } = useVisitor()
	const { id } = useLocalSearchParams()
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		if (id) {
			fetchVisitorDetailsByVisitorId(id as string)
		}
	}, [id])

	const fetchVisitorDetailsByVisitorId = async (id: string) => {
		try {
			setLoading(true)
			await getVisitorDetailsByIdAction(id)
		} catch (error) {
			console.error('Error fetching visitor details:', error)
			Alert.alert('Error', 'Failed to fetch visitor details.')
		} finally {
			setLoading(false)
		}
	}

	const onShare = async () => {
		if (!visitorDetails) {
			Alert.alert('Error', 'No visitor details to share.')
			return
		}

		const shareOptions = {
			title: 'Share via',
			message: `Visitor Details: \n\n👤 Name: ${visitorDetails.visitorName || 'N/A'}
			\n📅 Visit Date: ${
				visitorDetails.visitDateTime
					? convertDateStringToFormattedString(visitorDetails.visitDateTime, ITimeFormat.dateTime)
					: 'N/A'
			}\n\n🔗 View Details: ${process.env.EXPO_PUBLIC_WEB_URL}/visitor/access-pass/?token=${visitorDetails.token}`,
		}
		try {
			await Share.open({
				title: shareOptions.title,
				message: shareOptions.message.trim(),
			})
		} catch (error) {
			Alert.alert('Error', 'Failed to share visitor details.')
		}
	}

	const VisitorDetails = () => {
		if (!visitorDetails) return null

		return (
			<>
				<DetailRow label="Name" value={visitorDetails.visitorName} />
				<DetailRow label="Email" value={visitorDetails.visitorEmail} />
				<DetailRow label="Contact Number" value={visitorDetails.visitorContactNumber} />
				<DetailRow label="Category" value={VisitorCategoryDescriptionEnum[visitorDetails.visitorCategory]} />
				<DetailRow
					label="Visit Date"
					value={
						visitorDetails.visitDateTime
							? convertDateStringToFormattedString(visitorDetails.visitDateTime, ITimeFormat.dateTime)
							: ''
					}
				/>
			</>
		)
	}

	const DetailRow = ({ label, value }: { label: string; value: string | undefined }) => (
		<View className="mt-3">
			<Text className="text-lg text-black font-bold">{label}</Text>
			<Text className="text-base text-black">{value || 'N/A'}</Text>
		</View>
	)

	return (
		<SafeAreaView className="bg-slate-100 h-full">
			<ActionConfirmationModal />
			<ScrollView>
				<View className="w-full min-h-[85vh] px-4 my-6">
					{/* Header */}
					<View className="flex flex-row items-center justify-between">
						<CustomButton
							containerStyles="items-center h-fit"
							handlePress={() => {
								router.push('/visitor')
							}}
							rightReactNativeIcons={<Ionicons name="arrow-back" color={'#000000'} size={24} />}
						/>
						<CustomButton
							containerStyles="items-center h-fit"
							handlePress={onShare}
							rightReactNativeIcons={<Ionicons name="share-social" color={'#000000'} size={24} />}
						/>
					</View>

					{/* Title */}
					<Text className="text-4xl text-black font-bold mt-6">Visitor Details</Text>

					{/* Loading State */}
					{loading ? <ActivityIndicator size="large" color="#000000" style={{ marginTop: 20 }} /> : <VisitorDetails />}
				</View>
			</ScrollView>
		</SafeAreaView>
	)
}

export default VisitorDetailsPage
